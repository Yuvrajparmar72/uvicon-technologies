import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight, Sparkles, Store, ChevronRight, TrendingUp, Globe, Smartphone, Gamepad2, Zap } from "lucide-react";
import CoreExpertiseSection from "@/components/CoreExpertiseSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TechStackSection from "@/components/TechStackSection";

export default function Page() {
    // Inner Ring Tech Icons (6 items evenly spaced at 60deg intervals)
    const innerIcons = [
        { src: "/assets/icons/python.png", alt: "Python", angle: 0 },
        { src: "/assets/icons/node-js.png", alt: "Node.js", angle: 60 },
        { src: "/assets/icons/figma.png", alt: "Figma", angle: 120 },
        { src: "/assets/icons/swift.png", alt: "Swift", angle: 180 },
        { src: "/assets/icons/java-logo.png", alt: "Java", angle: 240 },
        { src: "/assets/icons/html.png", alt: "HTML5", angle: 300 },
    ];

    // Outer Ring Tech Icons (7 items evenly spaced at 51.4deg intervals)
    const outerIcons = [
        { src: "/assets/icons/css.png", alt: "CSS3", angle: 0 },
        { src: "/assets/icons/angular.js.png", alt: "Angular", angle: 51.4 },
        { src: "/assets/icons/github.png", alt: "GitHub", angle: 102.8 },
        { src: "/assets/icons/gitlab.png", alt: "GitLab", angle: 154.2 },
        { src: "/assets/icons/photoshop.png", alt: "Photoshop", angle: 205.7 },
        { src: "/assets/icons/illustrator.png", alt: "Illustrator", angle: 257.1 },
        { src: "/assets/icons/illustrator-draw.png", alt: "Illustrator Draw", angle: 308.5 },
    ];

    // Quick Launch Dock Apps
    const quickApps = [
        { name: "Algo Pro", desc: "Trading Platform", icon: TrendingUp, href: "/softwares", action: "Launch", external: false },
        { name: "Marketplace", desc: "Browse & Download", icon: Store, href: "https://marketplace.uvicon.in", action: "Visit", external: true },
        { name: "Websites", desc: "Web Solutions", icon: Globe, href: "/websites", action: "Explore", external: false },
        { name: "Mobile Apps", desc: "iOS & Android", icon: Smartphone, href: "/applications", action: "View", external: false },
        { name: "Game Dev", desc: "Gaming Studio", icon: Gamepad2, href: "/games", action: "Play", external: false },
    ];

    return (
        <main className="w-full relative" style={{ background: "var(--page-bg)" }}>
            {/* ===== Unified Page Background Canvas ===== */}
            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --page-bg: linear-gradient(to bottom,
                        #E6F9F8 0px,
                        #EBF8F7 50vh,
                        #F0FAF9 100vh,
                        #F5FCFC 150vh,
                        #FDFBF7 220vh
                    );
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(to bottom,
                            #001214 0px,
                            #001618 50vh,
                            #001A1C 100vh,
                            #001618 150vh,
                            #021213 220vh
                        );
                    }
                }
            `}} />

            {/* Decorative Radial Glow — Bleeds seamlessly across Hero & Expertise boundaries */}
            <div
                className="absolute top-0 left-0 w-full h-[180vh] pointer-events-none z-0"
                style={{ 
                    background: "var(--hero-glow)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"
                }}
            />
            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --hero-glow: radial-gradient(circle at 85% 40%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.8) 30%, rgba(184, 230, 226, 0.4) 60%, transparent 100%);
                }
                @media (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 70% 60%, rgba(255, 255, 255, 0.98) 0%, rgba(213, 245, 242, 0.85) 25%, rgba(184, 230, 226, 0.45) 50%, transparent 70%);
                    }
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --hero-glow: radial-gradient(circle at 85% 40%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 30%, rgba(0, 85, 80, 0.2) 60%, transparent 100%);
                    }
                }
                @media (prefers-color-scheme: dark) and (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 70% 60%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 25%, rgba(0, 85, 80, 0.2) 50%, transparent 70%);
                    }
                }
            `}} />
            {/* Organization Schema (JSON-LD) for GEO/SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Uvicon Technologies",
                        "url": "https://uvicon.in",
                        "logo": "https://uvicon.in/assets/icons/uvicon-logo.webp",
                        "description": "Uvicon Technologies builds custom websites, mobile apps, games, and algorithmic trading software with premium design for businesses across India.",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "contact@uvicon.in",
                            "contactType": "customer service"
                        },
                        "sameAs": []
                    })
                }}
            />

            {/* Hero Section — Transparent bg */}
            <section
                className="w-full relative overflow-hidden pt-20 sm:pt-24 pb-0 px-5 sm:px-10 lg:px-16 min-h-[100dvh] flex flex-col font-[family-name:var(--font-body)] transition-colors duration-300 z-10"
            >
                {/* Utility CSS */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}} />

                {/* 3D Glass Accent 1 (Top Right Background - Static) */}
                <div className="absolute -top-10 sm:-top-14 lg:-top-16 -right-6 sm:-right-10 lg:-right-14 w-48 sm:w-64 lg:w-80 pointer-events-none z-10 opacity-70 dark:opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="Uvicon 3D glass lightning bolt accent"
                        width={320}
                        height={320}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                {/* 3D Glass Accent 2 (Bottom Left Background - Static) */}
                <div className="absolute bottom-4 -left-10 w-44 sm:w-60 lg:w-72 pointer-events-none z-10 opacity-65 dark:opacity-85 drop-shadow-[0_20px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="Uvicon 3D glass accent element"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain transform -rotate-45"
                    />
                </div>

                {/* === Hero Content Wrapper — flex-1 fills viewport, relative anchors character to dock boundary === */}
                <div className="relative flex-1 z-10">

                {/* Hero Main Content Grid — Stacking context z-30 so buttons & cards render ABOVE character and orbits */}
                <div className="max-w-7xl mx-auto w-full relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 pt-2 sm:pt-4 pb-4 lg:pb-12">

                    {/* Left Column: CTA & Info */}
                    <div className="lg:col-span-6 flex flex-col items-start gap-5 sm:gap-6 text-left relative z-30">

                        {/* Subtitle Badge — Premium glassmorphism pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003D3F]/8 dark:bg-white/8 backdrop-blur-md border border-[#FFC050]/30 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
                            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#003D3F]/80 dark:text-white/80 font-[family-name:var(--font-body)]">
                                India&apos;s Premium Tech Studio
                            </span>
                        </div>

                        {/* H1 Main Headline — SEO keyword-rich, answer-first */}
                        <h1 className="text-[28px] sm:text-[40px] lg:text-[54px] xl:text-[58px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] leading-[1.15] lg:leading-[1.1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:drop-shadow-md">
                            Custom Websites, Apps & Algo Trading Software
                        </h1>

                        {/* GEO Answer-First Description */}
                        <p className="text-[#003D3F]/75 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.6] max-w-xl font-[family-name:var(--font-body)]">
                            Uvicon Technologies builds high-performance custom websites, mobile apps, games, and algorithmic trading tools for businesses across India. From design to deployment — we deliver production-ready solutions with premium aesthetics.
                        </p>

                        {/* Action Buttons — High Transparency Glassmorphism CTAs floating over revolving background orbits */}
                        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4 pt-1 w-[60%] sm:w-[52%] lg:w-auto relative z-30">
                            <Link
                                href="/softwares"
                                className="w-full lg:w-auto justify-center px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[#FFC050]/10 hover:bg-[#FFC050]/25 dark:bg-[#FFC050]/12 dark:hover:bg-[#FFC050]/30 backdrop-blur-md border-2 border-[#FFC050]/60 hover:border-[#FFC050] text-[#003D3F] dark:text-[#FFC050] font-semibold text-[13px] sm:text-base tracking-wide transition-all shadow-[0_8px_25px_rgba(255,192,80,0.1)] hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2"
                            >
                                <span className="truncate">Explore Our Products</span>
                                <ChevronRight className="w-4 h-4 text-[#FFC050] shrink-0" />
                            </Link>

                            <a
                                href="mailto:contact@uvicon.in"
                                className="w-full lg:w-auto justify-center px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-[#003D3F]/4 hover:bg-[#003D3F]/10 dark:bg-white/4 dark:hover:bg-white/10 backdrop-blur-md border-2 border-[#003D3F]/20 dark:border-white/20 hover:border-[#003D3F]/40 dark:hover:border-white/40 text-[#003D3F] dark:text-white font-semibold text-[13px] sm:text-base tracking-wide transition-all hover:scale-105 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2"
                            >
                                <Mail className="w-4 h-4 shrink-0" />
                                <span className="truncate">Book a Free Consultation</span>
                            </a>
                        </div>

                        {/* Mobile & Tablet (< lg): Marketplace Glassmorphism Card */}
                        <div className="mt-4 w-full flex flex-row items-end justify-between gap-3 lg:hidden relative z-30">
                            {/* Left: Marketplace Card */}
                            <Link
                                href="/softwares"
                                className="w-[58%] sm:w-[52%] max-w-sm bg-[#003D3F]/6 hover:bg-[#003D3F]/12 dark:bg-white/6 dark:hover:bg-white/12 backdrop-blur-xl border border-[#003D3F]/15 dark:border-white/20 hover:border-[#FFC050]/60 rounded-2xl p-3 sm:p-4 shadow-[0_15px_35px_rgba(0,61,63,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#FFC050]/20 border border-[#FFC050]/40 flex items-center justify-center text-[#FFC050] shrink-0">
                                        <Store className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <div className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#FFC050]">
                                            <span>Marketplace</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC050] animate-ping"></span>
                                        </div>
                                        <h4 className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white leading-tight font-[family-name:var(--font-heading-section)] truncate">
                                            Explore Apps & Algo Tools
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-[#003D3F]/60 dark:text-white/70 line-clamp-1 mt-0.5">
                                            Software & bots.
                                        </p>
                                    </div>
                                </div>
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#003D3F]/10 dark:bg-white/10 text-[#003D3F] dark:text-white flex items-center justify-center shrink-0">
                                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop (lg:): Glassmorphism Marketplace Card */}
                        <Link
                            href="/softwares"
                            className="mt-4 w-full max-w-md bg-[#003D3F]/6 hover:bg-[#003D3F]/12 dark:bg-white/6 dark:hover:bg-white/12 backdrop-blur-xl border border-[#003D3F]/15 dark:border-white/20 hover:border-[#FFC050]/60 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,61,63,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all hidden lg:flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FFC050]/20 border border-[#FFC050]/40 flex items-center justify-center text-[#FFC050] shrink-0 group-hover:scale-110 transition-transform">
                                    <Store className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FFC050]">
                                        <span>Uvicon Marketplace</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC050] animate-ping"></span>
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white leading-tight font-[family-name:var(--font-heading-section)]">
                                        Explore Apps & Algo Tools
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-[#003D3F]/60 dark:text-white/70 line-clamp-1 mt-0.5">
                                        Browse ready-to-use software, scripts & trading bots.
                                    </p>
                                </div>
                            </div>

                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#003D3F]/10 dark:bg-white/10 group-hover:bg-[#FFC050] text-[#003D3F] dark:text-white group-hover:text-[#002829] flex items-center justify-center shrink-0 transition-colors shadow-md">
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </Link>

                    </div>

                    {/* Right Column Reservation for Desktop Layout */}
                    <div className="hidden lg:block lg:col-span-6 pointer-events-none min-h-[480px]"></div>

                </div>

                {/* Mobile & Tablet (< lg): 3D Character & Background Revolving Orbit System (z-10 layer UNDER z-30 buttons & cards) */}
                <div className="absolute bottom-0 -right-2 sm:right-4 z-10 pointer-events-none lg:hidden flex flex-col items-center justify-end w-[200px] sm:w-[300px]">

                    {/* Inner Orbit Ring (Gold) — Scaled for mobile behind buttons */}
                    <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] sm:w-[360px] h-[210px] sm:h-[360px] rounded-full border border-[#FFC050]/35 dark:border-[#FFC050]/45 shadow-[0_0_20px_rgba(255,192,80,0.15)] animate-spin-slow flex items-center justify-center z-10">
                        {innerIcons.map((item, idx) => {
                            const rad = (item.angle * Math.PI) / 180;
                            const xPercent = Math.sin(rad) * 50;
                            const yPercent = -Math.cos(rad) * 50;
                            return (
                                <div key={idx} className="absolute" style={{ top: `${50 + yPercent}%`, left: `${50 + xPercent}%`, transform: 'translate(-50%, -50%)' }}>
                                    <div className="animate-spin-reverse">
                                        <div className="w-5 h-5 sm:w-7.5 sm:h-7.5 bg-white/85 dark:bg-[#002829]/85 backdrop-blur-md border border-[#FFC050]/50 rounded-lg p-0.5 sm:p-1 flex items-center justify-center shadow-md">
                                            <Image src={item.src} alt={item.alt} width={16} height={16} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Outer Orbit Ring (Teal) — Scaled for mobile behind buttons */}
                    <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full border border-teal-400/25 dark:border-teal-400/35 animate-spin-reverse flex items-center justify-center z-10">
                        {outerIcons.map((item, idx) => {
                            const rad = (item.angle * Math.PI) / 180;
                            const xPercent = Math.sin(rad) * 50;
                            const yPercent = -Math.cos(rad) * 50;
                            return (
                                <div key={idx} className="absolute" style={{ top: `${50 + yPercent}%`, left: `${50 + xPercent}%`, transform: 'translate(-50%, -50%)' }}>
                                    <div className="animate-spin-slow">
                                        <div className="w-4.5 h-4.5 sm:w-6.5 sm:h-6.5 bg-white/85 dark:bg-[#002829]/85 backdrop-blur-md border border-teal-400/35 rounded-lg p-0.5 sm:p-1 flex items-center justify-center shadow-md">
                                            <Image src={item.src} alt={item.alt} width={14} height={14} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 3D Mascot Character — Touching bottom-0 edge */}
                    <Image
                        src="/assets/icons/uvicon-hero-character.webp"
                        alt="Uvicon Mascot"
                        width={520}
                        height={520}
                        className="w-full h-auto object-contain object-bottom drop-shadow-xl relative z-20 block -mb-1"
                        priority
                    />
                </div>

                {/* Desktop (lg:): Original 3D Character & Orbit Visual Block */}
                <div className="max-w-7xl mx-auto w-full absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-5 sm:px-10 lg:px-16 hidden lg:flex flex-col items-center justify-end">
                    <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
                        <div className="hidden lg:block lg:col-span-6 pointer-events-none"></div>
                        <div className="lg:col-span-6 relative flex flex-col items-center justify-end">

                            {/* Round Radial Gradient Glow behind character */}
                            <div
                                className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] pointer-events-none rounded-full blur-[70px] opacity-50 dark:opacity-90 z-0"
                                style={{
                                    background: "radial-gradient(circle, rgba(0, 205, 192, 0.55) 0%, rgba(0, 150, 142, 0.38) 25%, rgba(0, 80, 83, 0.22) 50%, rgba(0, 40, 43, 0.1) 75%, transparent 100%)"
                                }}
                            ></div>

                            {/* Inner Ring (Gold Orbit) */}
                            <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-[#FFC050]/30 dark:border-[#FFC050]/40 shadow-[0_0_25px_rgba(255,192,80,0.1)] dark:shadow-[0_0_25px_rgba(255,192,80,0.15)] animate-spin-slow flex items-center justify-center z-10">
                                {innerIcons.map((item, idx) => {
                                    const rad = (item.angle * Math.PI) / 180;
                                    const xPercent = Math.sin(rad) * 50;
                                    const yPercent = -Math.cos(rad) * 50;
                                    return (
                                        <div
                                            key={idx}
                                            className="absolute pointer-events-auto"
                                            style={{
                                                top: `${50 + yPercent}%`,
                                                left: `${50 + xPercent}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <div className="animate-spin-reverse">
                                                <div className="w-9.5 h-9.5 bg-white/85 dark:bg-[#002829]/85 backdrop-blur-md border border-[#FFC050]/40 dark:border-[#FFC050]/60 rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_12px_rgba(255,192,80,0.15)] dark:shadow-[0_0_12px_rgba(255,192,80,0.3)]">
                                                    <Image src={item.src} alt={item.alt} width={22} height={22} className="w-full h-full object-contain" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Outer Ring (Teal Orbit) */}
                            <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-teal-400/20 dark:border-teal-400/30 shadow-[0_0_25px_rgba(45,212,191,0.08)] dark:shadow-[0_0_25px_rgba(45,212,191,0.12)] animate-spin-reverse flex items-center justify-center z-10">
                                {outerIcons.map((item, idx) => {
                                    const rad = (item.angle * Math.PI) / 180;
                                    const xPercent = Math.sin(rad) * 50;
                                    const yPercent = -Math.cos(rad) * 50;
                                    return (
                                        <div
                                            key={idx}
                                            className="absolute pointer-events-auto"
                                            style={{
                                                top: `${50 + yPercent}%`,
                                                left: `${50 + xPercent}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <div className="animate-spin-slow">
                                                <div className="w-9 h-9 bg-white/85 dark:bg-[#002829]/85 backdrop-blur-md border border-teal-400/30 dark:border-teal-400/50 rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_12px_rgba(45,212,191,0.15)] dark:shadow-[0_0_12px_rgba(45,212,191,0.3)]">
                                                    <Image src={item.src} alt={item.alt} width={20} height={20} className="w-full h-full object-contain" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 3D Main Character */}
                            <Image
                                src="/assets/icons/uvicon-hero-character.webp"
                                alt="Uvicon Technologies 3D mascot character"
                                width={720}
                                height={720}
                                className="w-[460px] xl:w-[520px] h-auto object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_35px_50px_rgba(0,0,0,0.8)] relative z-20 leading-none block -mb-1"
                                priority
                            />

                        </div>
                    </div>
                </div>
                {/* === End Hero Content Wrapper === */}
                </div>

                {/* ===== Quick Apps Dock — Floating app launcher at hero bottom ===== */}
                <div className="relative z-30 w-full pb-6 sm:pb-8 lg:pb-10 pt-2 sm:pt-3 lg:pt-4 -mt-2 sm:-mt-3 lg:-mt-4">
                    <div className="max-w-7xl mx-auto bg-white/12 dark:bg-white/5 backdrop-blur-[16px] backdrop-saturate-[180%] rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg">
                        {/* Dock Label */}
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC050] fill-[#FFC050]" />
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-[#003D3F]/80 dark:text-white/80 font-[family-name:var(--font-body)]">
                                Quick Launch
                            </span>
                        </div>

                        {/* Dock Cards — Horizontal scrollable row */}
                        <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-1">
                            {quickApps.map((app) => {
                                const Icon = app.icon;
                                const cardClasses = "flex-shrink-0 group flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-[16px] backdrop-saturate-[180%] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFC050]";
                                const cardContent = (
                                    <>
                                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/15 dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Icon className="w-5 h-5 text-[#003D3F] dark:text-white group-hover:text-[#FFC050] transition-colors" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[13px] sm:text-sm font-bold text-[#003D3F] dark:text-white whitespace-nowrap font-[family-name:var(--font-heading-section)]">
                                                {app.name}
                                            </span>
                                            <span className="text-[10px] sm:text-[11px] font-medium text-[#003D3F]/70 dark:text-white/70 whitespace-nowrap font-[family-name:var(--font-body)]">
                                                {app.desc}
                                            </span>
                                        </div>
                                        <span className="ml-1 text-[9px] sm:text-[10px] font-bold uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] whitespace-nowrap group-hover:bg-[#FFC050] group-hover:text-[#002829] transition-colors shrink-0">
                                            {app.action}
                                        </span>
                                    </>
                                );
                                return app.external ? (
                                    <a key={app.name} href={app.href} target="_blank" rel="noopener noreferrer" className={cardClasses}>
                                        {cardContent}
                                    </a>
                                ) : (
                                    <Link key={app.name} href={app.href} className={cardClasses}>
                                        {cardContent}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </section>

            {/* ===== Core Expertise Section Wrapper (Allows glow to bleed into Hero) ===== */}
            <div className="relative w-full">
                {/* Decorative Top Right Glow / Gradient Spread */}
                <div
                    className="absolute -top-[400px] right-0 w-full h-[1200px] pointer-events-none z-0 opacity-80"
                    style={{ 
                        background: "var(--expertise-glow)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 80%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 80%, transparent 100%)"
                    }}
                />
                <style dangerouslySetInnerHTML={{ __html: `
                    :root {
                        /* Darkish soft teal glow spreading from top right in Light Mode */
                        --expertise-glow: radial-gradient(circle at 100% 35%, rgba(61, 145, 141, 0.2) 0%, rgba(93, 171, 167, 0.08) 50%, transparent 100%);
                    }
                    @media (prefers-color-scheme: dark) {
                        :root {
                            /* Bright cyan light glow spreading from top right in Dark Mode */
                            --expertise-glow: radial-gradient(circle at 100% 35%, rgba(0, 180, 170, 0.25) 0%, rgba(0, 120, 115, 0.1) 50%, transparent 100%);
                        }
                    }
                `}} />

                <CoreExpertiseSection />
                <WhyChooseUsSection />
                <TechStackSection />
            </div>
        </main>
    );
}
