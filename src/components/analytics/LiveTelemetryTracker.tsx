"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CONSENT_STORAGE_KEY } from "@/components/layout/CookieConsentBanner";
import type { RealtimeChannel } from "@supabase/supabase-js";

function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof window === "undefined") return "Desktop";
  const width = window.innerWidth;
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|iphone|ipod|android.*mobile/.test(ua) || width < 640) {
    return "Mobile";
  }
  if (/ipad|tablet|android/.test(ua) || (width >= 640 && width < 1024)) {
    return "Tablet";
  }
  return "Desktop";
}

function getBrowserName(): string {
  if (typeof window === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome") && !ua.includes("Edg/")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  return "Browser";
}

function getReferrerHostname(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direct";
  try {
    const url = new URL(document.referrer);
    if (url.hostname === window.location.hostname) return "Internal";
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}

function getRegion(): string {
  if (typeof Intl === "undefined") return "India";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) return "India";
    if (tz.includes("Dubai") || tz.includes("Asia/Muscat")) return "UAE";
    if (tz.includes("London") || tz.includes("Europe/")) return "UK";
    if (tz.includes("America") || tz.includes("New_York") || tz.includes("Los_Angeles")) return "United States";
    return tz.split("/")[1]?.replace(/_/g, " ") || tz || "India";
  } catch {
    return "India";
  }
}

function getRealPerformanceTTFB(): number {
  if (typeof window === "undefined" || !window.performance) return 38;
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (nav && nav.responseStart && nav.requestStart) {
      return Math.max(15, Math.round(nav.responseStart - nav.requestStart));
    }
  } catch {
    // fallback
  }
  return 38;
}

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    let vid = sessionStorage.getItem("uvicon_vid");
    if (!vid) {
      vid = "uv_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now().toString(36);
      sessionStorage.setItem("uvicon_vid", vid);
    }
    return vid;
  } catch {
    return "uv_" + Math.random().toString(36).substring(2, 9);
  }
}

// Lightweight atomic daily counter with real IP & Geolocation tracking
async function recordDailyPageView(path: string): Promise<string> {
  if (typeof window === "undefined") return "Delhi NCR & Northern Region";
  try {
    const today = new Date().toISOString().split("T")[0];
    const cleanPath = path || "/";
    const cacheKey = `uv_pv_${today}_${cleanPath}`;

    const isNewSession = !sessionStorage.getItem("uv_sess_recorded");
    if (isNewSession) {
      sessionStorage.setItem("uv_sess_recorded", "1");
    }

    // Throttle repeated navigations to exact same URL within 20 seconds
    const lastTime = sessionStorage.getItem(cacheKey);
    const now = Date.now();
    const shouldThrottle = lastTime && now - parseInt(lastTime, 10) < 20000;

    if (!shouldThrottle) {
      sessionStorage.setItem(cacheKey, now.toString());
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const res = await fetch("/api/telemetry/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: cleanPath, isNewSession, timezone: tz }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.region) {
          sessionStorage.setItem("uv_geo_region", data.region);
          return data.region;
        }
      }
    }
  } catch {
    // Silent catch so visitor experience is never affected
  }
  return sessionStorage.getItem("uv_geo_region") || getRegion();
}

export default function LiveTelemetryTracker() {
  const pathname = usePathname();
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isTrackingRef = useRef(false);

  useEffect(() => {
    function hasConsent(): boolean {
      try {
        return localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted";
      } catch {
        return false;
      }
    }

    function initChannel() {
      if (!hasConsent()) {
        cleanupChannel();
        return;
      }

      if (channelRef.current) {
        // Channel already active, update presence state for new pathname
        updatePresence();
        return;
      }

      const visitorId = getOrCreateVisitorId();
      const channel = supabase.channel("uvicon_live_traffic", {
        config: {
          presence: {
            key: visitorId,
          },
        },
      });

      channel
        .on("presence", { event: "sync" }, () => {
          // Presence synchronized
        })
        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            isTrackingRef.current = true;
            await channel.track({
              visitorId,
              path: pathname || "/",
              title: typeof document !== "undefined" ? document.title : "Uvicon Technologies",
              enteredAt: Date.now(),
              device: getDeviceType(),
              browser: getBrowserName(),
              referrer: getReferrerHostname(),
              region: (typeof window !== "undefined" && sessionStorage.getItem("uv_geo_region")) || getRegion(),
              ttfbMs: getRealPerformanceTTFB(),
            });
          }
        });

      channelRef.current = channel;
    }

    async function updatePresence() {
      if (channelRef.current && isTrackingRef.current) {
        const visitorId = getOrCreateVisitorId();
        await channelRef.current.track({
          visitorId,
          path: pathname || "/",
          title: typeof document !== "undefined" ? document.title : "Uvicon Technologies",
          enteredAt: Date.now(),
          device: getDeviceType(),
          browser: getBrowserName(),
          referrer: getReferrerHostname(),
          region: (typeof window !== "undefined" && sessionStorage.getItem("uv_geo_region")) || getRegion(),
          ttfbMs: getRealPerformanceTTFB(),
        });
      }
    }

    function cleanupChannel() {
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        isTrackingRef.current = false;
      }
    }

    initChannel();
    recordDailyPageView(pathname);

    // Listen for consent changes from CookieConsentBanner
    const handleConsentEvent = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail === "accepted") {
        initChannel();
    recordDailyPageView(pathname);
      } else {
        cleanupChannel();
      }
    };

    window.addEventListener("uvicon_consent_changed", handleConsentEvent);

    return () => {
      window.removeEventListener("uvicon_consent_changed", handleConsentEvent);
    };
  }, [pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (channelRef.current) {
        channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        isTrackingRef.current = false;
      }
    };
  }, []);

  return null;
}
