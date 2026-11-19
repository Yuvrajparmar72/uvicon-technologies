"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, X, Check, EyeOff } from "lucide-react";

export type ConsentStatus = "accepted" | "declined" | "pending";

export const CONSENT_STORAGE_KEY = "uvicon_cookie_consent";

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentStatus>("pending");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentStatus | null;
      if (stored === "accepted" || stored === "declined") {
        setConsent(stored);
        setIsVisible(false);
      } else {
        // Show after brief subtle delay for a polished UX
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted (e.g. strict private mode)
      setIsVisible(false);
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // ignore storage error
    }
    setConsent(choice);
    setIsVisible(false);

    // Notify listeners (like LiveTelemetryTracker) immediately
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("uvicon_consent_changed", { detail: choice })
      );
    }
  };

  if (!isVisible || consent !== "pending") {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 md:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-5 shadow-2xl backdrop-blur-xl transition-all">
        {/* Glow accent */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--color-primary)]/10 blur-2xl" />

        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
            <Cookie className="h-5 w-5" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                <span>Privacy & Telemetry Consent</span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium">
                  GDPR Ready
                </span>
              </h3>
              <button
                type="button"
                onClick={() => handleConsent("declined")}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition p-1 -mr-1"
                aria-label="Decline and close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed pt-1">
              We use lightweight, in-memory live telemetry to monitor page response times and active visitor counts. We do not sell your personal data or track you across other websites.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleConsent("accepted")}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--color-primary)] text-white hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-[var(--color-primary)]/20 cursor-pointer"
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                Agree & Allow
              </button>

              <button
                type="button"
                onClick={() => handleConsent("declined")}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition cursor-pointer"
              >
                <EyeOff className="h-3.5 w-3.5" />
                Decline
              </button>

              <Link
                href="/privacy-policy"
                className="text-xs text-[var(--color-primary)] hover:underline ml-auto flex items-center gap-1"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

