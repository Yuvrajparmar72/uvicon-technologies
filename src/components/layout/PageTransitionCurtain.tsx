"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

export interface PageTransitionData {
  title: string;
  watermark: string;
  quote: string;
}

/**
 * Returns Home-Page Section Style Heading, Watermark, and Content Quote
 * tailored for each route on the website.
 */
export function getTransitionPageData(path: string): PageTransitionData {
  if (!path || path === "/") {
    return {
      title: "Uvicon Technologies",
      watermark: "INNOVATION",
      quote:
        "“Your vision, engineered to perfection. Specialized teams delivering secure, high-performance digital solutions.”",
    };
  }

  const cleanPath = path.split("?")[0].split("#")[0];
  const normalized =
    cleanPath.endsWith("/") && cleanPath.length > 1
      ? cleanPath.slice(0, -1)
      : cleanPath;

  const exactData: Record<string, PageTransitionData> = {
    "/": {
      title: "Uvicon Technologies",
      watermark: "INNOVATION",
      quote:
        "“Your vision, engineered to perfection. Specialized teams delivering secure, high-performance digital solutions.”",
    },
    "/services": {
      title: "Our Core Expertise",
      watermark: "EXPERTISE",
      quote:
        "“Your vision, engineered to perfection. Our specialized teams work in sync to deliver secure, high-performance, and user-centric solutions tailored to meet the complex demands of the modern digital landscape.”",
    },
    "/services/software": {
      title: "Custom Software",
      watermark: "SOFTWARE",
      quote:
        "“Architecting scalable, enterprise-grade software solutions engineered with high precision and robust security.”",
    },
    "/services/web": {
      title: "Web Development",
      watermark: "WEB DEV",
      quote:
        "“Crafting modern, high-speed web experiences with state-of-the-art frameworks and stunning visual design.”",
    },
    "/services/mobile": {
      title: "Mobile App Development",
      watermark: "MOBILE",
      quote:
        "“Empowering users with intuitive, high-performance iOS and Android applications built for modern devices.”",
    },
    "/services/games-ai": {
      title: "Game & AI Development",
      watermark: "AI & GAMES",
      quote:
        "“Pioneering immersive gaming experiences and intelligent AI systems that define the future of technology.”",
    },
    "/pricing": {
      title: "Pricing & Plans",
      watermark: "PRICING",
      quote:
        "“Transparent, flexible investment models designed to scale seamlessly with your digital ambitions.”",
    },
    "/resources": {
      title: "Resources & Guides",
      watermark: "RESOURCES",
      quote:
        "“Explore in-depth tutorials, technical guides, and industry insights curated by Uvicon engineering experts.”",
    },
    "/faqs": {
      title: "FAQ's & Tutorials",
      watermark: "ANSWERS",
      quote:
        "“Clear answers and comprehensive guidance to help you navigate your digital transformation journey.”",
    },
    "/case-studies": {
      title: "Case Studies",
      watermark: "IMPACT",
      quote:
        "“Real-world success stories demonstrating our engineering excellence, measurable growth, and client impact.”",
    },
    "/blog": {
      title: "Blog & Insights",
      watermark: "INSIGHTS",
      quote:
        "“Perspectives, architectural trends, and technological innovations from the frontier of web and AI development.”",
    },
    "/company": {
      title: "Company Overview",
      watermark: "COMPANY",
      quote:
        "“Dedicated to technological excellence, integrity, and building lasting digital partnerships.”",
    },
    "/about-us": {
      title: "About Us",
      watermark: "ABOUT US",
      quote:
        "“Meet the specialized engineering minds behind Uvicon Technologies and our relentless pursuit of quality.”",
    },
    "/why-choose-us": {
      title: "Why Choose Us",
      watermark: "ADVANTAGE",
      quote:
        "“Unrivaled engineering speed, robust security standards, and client-centric collaboration that sets us apart.”",
    },
    "/visions": {
      title: "Vision & Values",
      watermark: "VISION",
      quote:
        "“Shaping a smarter digital tomorrow through ethical innovation, transparency, and architectural mastery.”",
    },
    "/contact": {
      title: "Contact Us",
      watermark: "CONNECT",
      quote:
        "“Let’s start a conversation. We are ready to turn your complex digital challenges into powerful solutions.”",
    },
    "/privacy-policy": {
      title: "Privacy Policy",
      watermark: "PRIVACY",
      quote:
        "“Your security and data integrity are paramount. Review our rigorous standards for data protection.”",
    },
    "/refund-policy": {
      title: "Refund Policy",
      watermark: "POLICY",
      quote:
        "“Clear, transparent terms designed to ensure complete trust and confidence in our partnerships.”",
    },
  };

  if (exactData[normalized]) {
    return exactData[normalized];
  }

  if (normalized.startsWith("/blog/")) {
    return {
      title: "Blog & Insights",
      watermark: "INSIGHTS",
      quote:
        "“Perspectives, architectural trends, and technological innovations from the frontier of web and AI development.”",
    };
  }

  if (normalized.startsWith("/case-studies/")) {
    return {
      title: "Case Studies",
      watermark: "IMPACT",
      quote:
        "“Real-world success stories demonstrating our engineering excellence, measurable growth, and client impact.”",
    };
  }

  if (normalized.startsWith("/services/")) {
    return {
      title: "Our Services",
      watermark: "SOLUTIONS",
      quote:
        "“Your vision, engineered to perfection. Our specialized teams work in sync to deliver secure, high-performance solutions.”",
    };
  }

  // Fallback
  const segments = normalized.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] || "Technologies";
  const formattedTitle = lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: formattedTitle,
    watermark: lastSegment.toUpperCase(),
    quote:
      "“Your vision, engineered to perfection. Specialized teams delivering secure, high-performance digital solutions.”",
  };
}

export default function PageTransitionCurtain() {
  const pathname = usePathname();
  const router = useRouter();

  const [transitionState, setTransitionState] = useState<
    "idle" | "entering" | "active" | "exiting"
  >("idle");
  const [pageData, setPageData] = useState<PageTransitionData>({
    title: "Uvicon Technologies",
    watermark: "INNOVATION",
    quote:
      "“Your vision, engineered to perfection. Specialized teams delivering secure, high-performance digital solutions.”",
  });

  const isTransitioningRef = useRef(false);
  const prevPathnameRef = useRef(pathname);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const easeCubic: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  /**
   * Orchestrates the 1.4s Center Round Glassmorphism to Smooth Fade-Out Transition:
   * - 0 to 450ms: Circular Frosted Glass Portal expands 360° from exact screen center (scale 0 -> 1)
   *               with a clean frosted glass rim & deep luxury shadow.
   * - 450 to 950ms: Active Hold — Instant clear display of official Uvicon Logo (high up, no container box),
   *                 Bolt Icons, Tourney Outlined Watermark + Section Heading, and Content Quote.
   * - 950 to 1400ms: Smooth Silky GPU Fade Out (opacity: 1 -> 0) revealing the newly loaded page.
   */
  const startPageTransition = React.useCallback(
    (targetPath: string) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];

      const targetData = getTransitionPageData(targetPath);
      setPageData(targetData);
      setTransitionState("entering");

      // Step 1: At 450ms, round glass portal covers 100% of screen
      const enterTimer = setTimeout(() => {
        setTransitionState("active");
        window.scrollTo(0, 0);
        router.push(targetPath);
      }, 450);

      // Step 2: At 950ms (500ms active hold), start silky smooth fade out
      const exitTimer = setTimeout(() => {
        setTransitionState("exiting");
      }, 950);

      // Step 3: At 1400ms, complete animation
      const doneTimer = setTimeout(() => {
        setTransitionState("idle");
        isTransitioningRef.current = false;
      }, 1400);

      timersRef.current = [enterTimer, exitTimer, doneTimer];
    },
    [router]
  );

  // Intercept all internal page link clicks across the document
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 1. Check if default was prevented or if modifier keys were pressed (new tab, etc.)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // 2. Ignore if animation is already running
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      // 3. Find closest anchor tag
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // 4. Ignore external links, mailto:, tel:, download, target="_blank", or pure anchors
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        if (href.startsWith("http")) {
          try {
            const targetUrl = new URL(href);
            if (targetUrl.origin !== window.location.origin) return;
          } catch {
            return;
          }
        } else {
          return;
        }
      }

      // 5. Parse URL
      let targetUrl: URL;
      try {
        targetUrl = new URL(anchor.href, window.location.origin);
      } catch {
        return;
      }

      // 6. Ignore different origin
      if (targetUrl.origin !== window.location.origin) return;

      // 7. Ignore if exact same pathname and search (same page or same-page anchor)
      if (
        targetUrl.pathname === window.location.pathname &&
        targetUrl.search === window.location.search
      ) {
        return;
      }

      // 8. Ignore external auth/app/marketplace subdomains or auth routes
      if (
        targetUrl.pathname === "/login" ||
        targetUrl.pathname === "/signup" ||
        targetUrl.hostname.includes("auth.uvicon.in") ||
        targetUrl.hostname.includes("pro.uvicon.in") ||
        targetUrl.hostname.includes("marketplace.uvicon.in")
      ) {
        return;
      }

      // 9. Trigger Center Round Glassmorphism transition
      e.preventDefault();
      startPageTransition(
        targetUrl.pathname + targetUrl.search + targetUrl.hash
      );
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [pathname, startPageTransition]);

  // Handle browser Back/Forward navigation (where pathname changes without a link click)
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      const previousPath = prevPathnameRef.current;
      prevPathnameRef.current = pathname;

      if (!isTransitioningRef.current && previousPath !== pathname) {
        startPageTransition(pathname);
      }
    }
  }, [pathname, startPageTransition]);

  if (transitionState === "idle") {
    return null;
  }

  const isVisible =
    transitionState === "entering" || transitionState === "active";

  return (
    <div
      className={`fixed inset-0 z-[9999] ${
        transitionState === "exiting"
          ? "pointer-events-none"
          : "pointer-events-auto"
      } overflow-hidden select-none flex items-center justify-center`}
    >
      {/* Main Center Circular Frosted Glass Portal (Scale 0 -> 1 on Enter, Fade Out on Exit) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isVisible ? 1 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: transitionState === "exiting" ? 0.45 : 0.42,
          ease: easeCubic,
        }}
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="absolute w-[320vw] h-[320vw] sm:w-[280vw] sm:h-[280vw] md:w-[240vw] md:h-[240vw] max-w-[4000px] max-h-[4000px] rounded-full bg-[#004D50]/30 dark:bg-[#003B3E]/35 backdrop-blur-[24px] backdrop-saturate-[180%] border-2 border-white/20 shadow-[0_0_150px_rgba(0,0,0,0.75)] flex items-center justify-center overflow-hidden"
      >
        {/* Subtle Luxury Radial Teal Ambient Light (No Geometric Lines!) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_#00595C_0%,_transparent_75%)]"
          aria-hidden="true"
        />

        {/* Decorative Golden Corner Crossbars inside Portal Canvas */}
        <div className="absolute top-[20%] left-[20%] w-6 h-6 border-t-2 border-l-2 border-[#FFC050]/70 pointer-events-none" />
        <div className="absolute top-[20%] right-[20%] w-6 h-6 border-t-2 border-r-2 border-[#FFC050]/70 pointer-events-none" />
        <div className="absolute bottom-[20%] left-[20%] w-6 h-6 border-b-2 border-l-2 border-[#FFC050]/70 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-6 h-6 border-b-2 border-r-2 border-[#FFC050]/70 pointer-events-none" />

        {/* Main Content Area: Instant Reveal after portal covers screen */}
        <AnimatePresence>
          {isVisible && (
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 max-w-5xl pointer-events-none">
              {/* Top Brand Header Block — Positioned Much Higher Above the Heading (No Container Box, Responsive Large Logo for Mobile/Tab) */}
              <div className="flex flex-col items-center justify-center mb-8 sm:mb-12 lg:mb-16 -translate-y-4 sm:-translate-y-8 lg:-translate-y-10 relative z-10">
                <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3 whitespace-nowrap">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#FFC050] drop-shadow-[0_0_12px_rgba(255,192,80,0.85)] animate-pulse shrink-0" />

                  <Image
                    src="/assets/icons/uvicon-technologies-logo.webp"
                    alt="Uvicon Technologies"
                    width={112}
                    height={112}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_25px_rgba(255,192,80,0.7)] shrink-0"
                    priority
                  />

                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 text-[#FFC050] drop-shadow-[0_0_12px_rgba(255,192,80,0.85)] animate-pulse shrink-0" />
                </div>

                {/* Brand Top Tagline — Single Line Inline */}
                <span className="text-brand-accent text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] sm:tracking-[0.32em] uppercase font-[family-name:var(--font-body)] whitespace-nowrap inline-block">
                  UVICON TECHNOLOGIES
                </span>
              </div>

              {/* Badi Heading (Watermark) with Sub Heading in its Exact Center */}
              <div className="relative flex items-center justify-center w-full py-4 sm:py-8 my-1 sm:my-2 overflow-visible">
                {/* Large Background Badi Heading (Watermark - same font as Home/Services pages: --font-heading-main) */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-25 font-[family-name:var(--font-heading-main)] text-6xl xs:text-7xl sm:text-[7rem] md:text-[9.5rem] lg:text-[12rem] xl:text-[14rem] font-black tracking-widest text-transparent uppercase whitespace-nowrap inline-block px-4"
                  style={{
                    WebkitTextStroke: "2px #FFFFFF",
                  }}
                  aria-hidden="true"
                >
                  {pageData.watermark}
                </div>

                {/* Sub Heading (Main Title) — Centered exactly inside Badi Heading */}
                <h2 className="relative z-10 font-[family-name:var(--font-heading-main)] text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)] max-w-[90vw] sm:max-w-none px-2 text-center inline-block">
                  {pageData.title}
                </h2>
              </div>

              {/* Expanding Golden Accent Divider Line */}
              <div className="relative z-10 my-4 w-40 sm:w-60 h-1 bg-white/15 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={
                    transitionState === "active"
                      ? { width: "100%" }
                      : { width: "35%" }
                  }
                  transition={{ duration: 0.48, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#00595C] via-[#FFC050] to-[#FFD780] rounded-full shadow-[0_0_16px_#FFC050]"
                />
              </div>

              {/* Home-Page Style Subtitle Quote Content — Contained within screen width so it never cuts off */}
              <p className="relative z-10 w-full max-w-[88vw] sm:max-w-2xl text-[11px] xs:text-xs sm:text-sm md:text-base text-white/95 italic font-[family-name:var(--font-body)] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] px-2 mx-auto text-center break-words">
                {pageData.quote}
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
