"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Code2, Cloud, Globe, Terminal, Database, Cpu, Zap, Smartphone, Shield, Server,
    Wifi, Lock, Network, Key, Blocks, HardDrive, Compass, Focus, CircuitBoard,
    Activity, Bluetooth, Fingerprint, Layers, CreditCard, Sparkles, TrendingUp,
    Gamepad2, Store, Monitor, Binary, CheckCircle2, DollarSign, IndianRupee, Mail,
    UserPlus, LogIn, ShoppingCart, Home, BookOpen, Grid, Settings, Share2,
    Infinity as InfinityIcon, Code, BarChart3, HelpCircle, Laptop, Radio,
    MonitorSmartphone, MousePointer, Hash, Filter, Eye, Layers3, Flame, Award,
    Tag, Bell, Sliders, Play, ArrowUpRight
} from "lucide-react";

const availableIcons = [
    Code2, Cloud, Globe, Terminal, Database, Cpu, Zap, Smartphone, Shield, Server,
    Wifi, Lock, Network, Key, Blocks, HardDrive, Compass, Focus, CircuitBoard,
    Activity, Bluetooth, Fingerprint, Layers, CreditCard, Sparkles, TrendingUp,
    Gamepad2, Store, Monitor, Binary, CheckCircle2, DollarSign, IndianRupee, Mail,
    UserPlus, LogIn, ShoppingCart, Home, BookOpen, Grid, Settings, Share2,
    InfinityIcon, Code, BarChart3, HelpCircle, Laptop, Radio,
    MonitorSmartphone, MousePointer, Hash, Filter, Eye, Layers3, Flame, Award,
    Tag, Bell, Sliders, Play
];

/* ==========================================================================
   MAIN PRICING PAGE CLIENT COMPONENT
   (FIXED ICONS + FIXED CENTER LOGO + LIGHT & DARK MODE SUPPORTED)
   ========================================================================== */

export default function PricingPageClient() {
    // Responsive screen detection to prevent mobile/tablet aspect-ratio squeezing and overlapping
    const [screenType, setScreenType] = useState<"mobile" | "tablet" | "desktop">("desktop");
    const [mounted, setMounted] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setMounted(true);
        const updateScreen = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScreenType("mobile");
            } else if (width < 1024) {
                setScreenType("tablet");
            } else {
                setScreenType("desktop");
            }
        };
        updateScreen();
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    // 1) Generate icons with exact ratio: 20% Big, 30% Medium, 50% Small
    // 2) Generate hollow glowing balls/rings in all remaining empty gaps
    // 3) Use screenType aspect ratio so ZERO overlap on mobile, tablet, or desktop
    const { denseIcons, dots } = useMemo(() => {
        const items: Array<{
            id: string;
            IconComponent: any;
            posX: number;
            posY: number;
            rotate: string;
            opacity: number;
            size: number;
            category: "big" | "medium" | "small";
            radiusPx: number;
        }> = [];

        // Dynamic virtual resolution & grid density based on device aspect ratio
        let VIRTUAL_W = 1400;
        let VIRTUAL_H = 800;
        let cols = 46;
        let rows = 34;

        if (screenType === "mobile") {
            VIRTUAL_W = 390;
            VIRTUAL_H = 844;
            cols = 18;  // fewer columns for narrow portrait phone width
            rows = 38;  // more rows for tall portrait height
        } else if (screenType === "tablet") {
            VIRTUAL_W = 768;
            VIRTUAL_H = 1024;
            cols = 28;
            rows = 38;
        }

        const cellW = 100 / cols;
        const cellH = 100 / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const seed = Math.abs((c * 73 + r * 137) ^ (r * 31));

                const rowStagger = (r % 2 === 1) ? (cellW * 0.5) : 0;
                const jitterX = (((seed * 17) % 100) - 50) / 100 * (cellW * 0.58);
                const jitterY = (((seed * 23) % 100) - 50) / 100 * (cellH * 0.58);

                let posX = (c * cellW) + (cellW * 0.5) + rowStagger + jitterX;
                let posY = (r * cellH) + (cellH * 0.5) + jitterY;

                if (posX > 100) posX -= 100;
                if (posX < 0) posX += 100;

                const distFromCenter = Math.hypot(posX - 50, posY - 50);
                if (distFromCenter < 10.0) {
                    continue;
                }

                // EXACT USER RATIO: 20% BIG, 30% MEDIUM, 50% SMALL
                const sizeBucket = (seed * 19) % 100;
                let size = 20;
                let opacity = 0.2;
                let category: "big" | "medium" | "small" = "medium";

                if (sizeBucket < 20) {
                    // 20% BIG ICONS
                    size = screenType === "mobile"
                        ? 24 + ((seed * 3) % 4) // 24-27px on mobile
                        : 30 + ((seed * 3) % 5); // 30-34px on desktop/tablet
                    opacity = 0.14 + ((seed * 7) % 8) / 100;
                    category = "big";
                } else if (sizeBucket < 50) {
                    // 30% MEDIUM ICONS
                    size = screenType === "mobile"
                        ? 15 + ((seed * 5) % 4) // 15-18px on mobile
                        : 19 + ((seed * 5) % 5); // 19-23px on desktop/tablet
                    opacity = 0.18 + ((seed * 11) % 12) / 100;
                    category = "medium";
                } else {
                    // 50% SMALL ICONS
                    size = screenType === "mobile"
                        ? 10 + ((seed * 9) % 3) // 10-12px on mobile
                        : 11 + ((seed * 9) % 4); // 11-14px on desktop/tablet
                    opacity = 0.16 + ((seed * 13) % 14) / 100;
                    category = "small";
                }

                const px = (posX / 100) * VIRTUAL_W;
                const py = (posY / 100) * VIRTUAL_H;

                // Safe diagonal radius in device pixels accounting for 45-degree rotation + safety margin
                const radiusPx = (size * 0.5 * 1.42) + (screenType === "mobile" ? 2.5 : 3.5);
                let hasCollision = false;

                for (let i = 0; i < items.length; i++) {
                    const other = items[i];
                    const minRequiredDistPx = radiusPx + other.radiusPx;
                    
                    const otherPx = (other.posX / 100) * VIRTUAL_W;
                    const otherPy = (other.posY / 100) * VIRTUAL_H;

                    const dxPx = px - otherPx;
                    const dyPx = py - otherPy;
                    const distPxSq = dxPx * dxPx + dyPx * dyPx;

                    if (distPxSq < minRequiredDistPx * minRequiredDistPx) {
                        hasCollision = true;
                        break;
                    }
                }

                if (hasCollision) {
                    continue;
                }

                const iconIdx = (c * 3 + r * 7 + seed) % availableIcons.length;
                const rotate = (((seed * 41) % 90) - 45);

                items.push({
                    id: `${r}-${c}`,
                    IconComponent: availableIcons[iconIdx],
                    posX,
                    posY,
                    rotate: `${rotate}deg`,
                    opacity,
                    size,
                    category,
                    radiusPx
                });
            }
        }

        // 2) GENERATE HOLLOW BALLS/RINGS IN ALL REMAINING GAPS (0% overlaps on all devices)
        const dotItems: Array<{
            id: string;
            posX: number;
            posY: number;
            size: number;
            opacity: number;
            isLarge: boolean;
            radiusPx: number;
        }> = [];

        const dotCols = screenType === "mobile" ? 24 : screenType === "tablet" ? 36 : 54;
        const dotRows = screenType === "mobile" ? 44 : screenType === "tablet" ? 44 : 40;
        const dotCellW = 100 / dotCols;
        const dotCellH = 100 / dotRows;

        for (let r = 0; r < dotRows; r++) {
            for (let c = 0; c < dotCols; c++) {
                const dotSeed = Math.abs((c * 97 + r * 163) ^ (r * 47));

                const dotJitterX = (((dotSeed * 29) % 100) - 50) / 100 * (dotCellW * 0.85);
                const dotJitterY = (((dotSeed * 43) % 100) - 50) / 100 * (dotCellH * 0.85);

                let dotX = (c * dotCellW) + (dotCellW * 0.5) + dotJitterX;
                let dotY = (r * dotCellH) + (dotCellH * 0.5) + dotJitterY;

                if (dotX > 100) dotX -= 100;
                if (dotX < 0) dotX += 100;

                const distFromCenter = Math.hypot(dotX - 50, dotY - 50);
                if (distFromCenter < 9.5) {
                    continue;
                }

                const dotSizeBucket = (dotSeed * 19) % 100;
                let dotSize = 4;
                let dotOpacity = 0.25;
                let isLarge = false;

                if (dotSizeBucket < 16) {
                    dotSize = screenType === "mobile" ? 6 + (dotSeed % 3) : 8 + (dotSeed % 5);
                    dotOpacity = 0.28 + ((dotSeed * 7) % 15) / 100;
                    isLarge = true;
                } else if (dotSizeBucket < 55) {
                    dotSize = screenType === "mobile" ? 4 + (dotSeed % 2) : 5 + (dotSeed % 3);
                    dotOpacity = 0.22 + ((dotSeed * 11) % 15) / 100;
                } else {
                    dotSize = screenType === "mobile" ? 2.5 + (dotSeed % 2) : 3 + (dotSeed % 2);
                    dotOpacity = 0.18 + ((dotSeed * 13) % 15) / 100;
                }

                const dotPx = (dotX / 100) * VIRTUAL_W;
                const dotPy = (dotY / 100) * VIRTUAL_H;
                const dotRadiusPx = (dotSize * 0.5) + (screenType === "mobile" ? 2.0 : 3.0);

                let hasCollision = false;

                for (let i = 0; i < items.length; i++) {
                    const icon = items[i];
                    const minRequiredDistPx = dotRadiusPx + icon.radiusPx;
                    
                    const iconPx = (icon.posX / 100) * VIRTUAL_W;
                    const iconPy = (icon.posY / 100) * VIRTUAL_H;
                    const dxPx = dotPx - iconPx;
                    const dyPx = dotPy - iconPy;

                    if (dxPx * dxPx + dyPx * dyPx < minRequiredDistPx * minRequiredDistPx) {
                        hasCollision = true;
                        break;
                    }
                }

                if (!hasCollision) {
                    for (let j = 0; j < dotItems.length; j++) {
                        const otherDot = dotItems[j];
                        const minRequiredDistPx = dotRadiusPx + otherDot.radiusPx;
                        
                        const otherDotPx = (otherDot.posX / 100) * VIRTUAL_W;
                        const otherDotPy = (otherDot.posY / 100) * VIRTUAL_H;
                        const dxPx = dotPx - otherDotPx;
                        const dyPx = dotPy - otherDotPy;

                        if (dxPx * dxPx + dyPx * dyPx < minRequiredDistPx * minRequiredDistPx) {
                            hasCollision = true;
                            break;
                        }
                    }
                }

                if (!hasCollision) {
                    dotItems.push({
                        id: `dot-${r}-${c}`,
                        posX: dotX,
                        posY: dotY,
                        size: dotSize,
                        opacity: dotOpacity,
                        isLarge,
                        radiusPx: dotRadiusPx
                    });
                }
            }
        }

        return { denseIcons: items, dots: dotItems };
    }, [screenType]);

    return (
        <main
            className="w-full min-h-screen relative overflow-x-clip font-[family-name:var(--font-body)] transition-colors duration-300"
            style={{ background: "var(--page-bg)" }}
        >
            {/* Light Mode & Dark Mode Support for Background, Icons, and Hollow Rings */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                :root {
                    --page-bg: linear-gradient(180deg,
                        #E6F9F8 0%,
                        #EBF8F7 35%,
                        #F0FAF9 70%,
                        #F5FCFC 100%
                    );
                    --center-rounded-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.28) 0%, rgba(0, 120, 115, 0.12) 40%, transparent 75%);
                    --icon-tint: #002D32;
                    --ring-large-border: rgba(0, 120, 115, 0.55);
                    --ring-small-border: rgba(0, 77, 83, 0.38);
                    --ring-large-shadow: 0 0 8px rgba(0, 180, 170, 0.25);
                    --glass-layer-bg: linear-gradient(135deg, rgba(0, 35, 40, 0.18) 0%, rgba(0, 18, 22, 0.28) 50%, rgba(0, 35, 40, 0.15) 100%);
                    --glass-layer-border: rgba(255, 255, 255, 0.35);
                    --glass-layer-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.15);
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(180deg,
                            #001214 0%,
                            #001A1C 35%,
                            #001618 70%,
                            #021213 100%
                        );
                        --center-rounded-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.48) 0%, rgba(0, 120, 115, 0.25) 40%, transparent 75%);
                        --icon-tint: #FFFFFF;
                        --ring-large-border: rgba(167, 243, 208, 0.65);
                        --ring-small-border: rgba(255, 255, 255, 0.42);
                        --ring-large-shadow: 0 0 8px rgba(167, 243, 208, 0.38);
                        --glass-layer-bg: linear-gradient(135deg, rgba(0, 8, 10, 0.45) 0%, rgba(0, 15, 18, 0.60) 50%, rgba(0, 8, 10, 0.40) 100%);
                        --glass-layer-border: rgba(255, 255, 255, 0.15);
                        --glass-layer-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.5);
                    }
                }
                .dark {
                    --page-bg: linear-gradient(180deg,
                        #001214 0%,
                        #001A1C 35%,
                        #001618 70%,
                        #021213 100%
                    );
                    --center-rounded-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.48) 0%, rgba(0, 120, 115, 0.25) 40%, transparent 75%);
                    --icon-tint: #FFFFFF;
                    --ring-large-border: rgba(167, 243, 208, 0.65);
                    --ring-small-border: rgba(255, 255, 255, 0.42);
                    --ring-large-shadow: 0 0 8px rgba(167, 243, 208, 0.38);
                    --glass-layer-bg: linear-gradient(135deg, rgba(0, 8, 10, 0.45) 0%, rgba(0, 15, 18, 0.60) 50%, rgba(0, 8, 10, 0.40) 100%);
                    --glass-layer-border: rgba(255, 255, 255, 0.15);
                    --glass-layer-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.5);
                }
                .stroke-watermark-pricing {
                    -webkit-text-stroke: 2.5px rgba(0, 50, 55, 0.40);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-pricing {
                        -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.28);
                    }
                }
                .dark .stroke-watermark-pricing {
                    -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.28);
                }
            `
                }}
            />

            {/* FIXED BACKGROUND WRAPPER ("icons ke sath hi logo bhi fix hona chahiie") */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                {/* Center Rounded Teal Gradient Glow */}
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ background: "var(--center-rounded-glow)" }}
                />

                {/* Hollow Balls/Rings in Empty Gaps (Light & Dark Mode Supported) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {dots.map((dot) => (
                        <div
                            key={dot.id}
                            className="absolute rounded-full bg-transparent pointer-events-none"
                            style={{
                                top: `${dot.posY}%`,
                                left: `${dot.posX}%`,
                                width: `${dot.size}px`,
                                height: `${dot.size}px`,
                                opacity: dot.opacity,
                                borderWidth: dot.isLarge ? "1.5px" : "1px",
                                borderStyle: "solid",
                                borderColor: dot.isLarge ? "var(--ring-large-border)" : "var(--ring-small-border)",
                                transform: "translate(-50%, -50%)",
                                boxShadow: dot.isLarge ? "var(--ring-large-shadow)" : "none"
                            }}
                        />
                    ))}
                </div>

                {/* 20% Big, 30% Medium, 50% Small Icons (Light & Dark Mode Supported) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {denseIcons.map((item) => {
                        const IconComp = item.IconComponent;
                        return (
                            <IconComp
                                key={item.id}
                                className="absolute pointer-events-none drop-shadow-sm"
                                style={{
                                    top: `${item.posY}%`,
                                    left: `${item.posX}%`,
                                    width: `${item.size}px`,
                                    height: `${item.size}px`,
                                    opacity: item.opacity,
                                    color: "var(--icon-tint)",
                                    transform: `rotate(${item.rotate}) translate(-50%, -50%)`
                                }}
                            />
                        );
                    })}
                </div>

                {/* FIXED CENTER UVICON LOGO (Stays fixed right in the center along with the icons!) */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20">
                    <Image
                        src="/assets/icons/uvicon-technologies-logo.webp"
                        alt="Uvicon Technologies Logo"
                        width={130}
                        height={130}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
                        priority
                    />
                </div>

                {/* TRANSPARENT DARK GLASS LAYER (Part of Sticky Section, subtle blur & smoky glass tint with high z-index) */}
                <div
                    className="fixed inset-0 w-full h-full pointer-events-none z-30 backdrop-blur-[2px] backdrop-saturate-[135%] transition-all duration-300"
                    style={{
                        background: "var(--glass-layer-bg)",
                        borderBottom: "1px solid var(--glass-layer-border)",
                        boxShadow: "var(--glass-layer-shadow)",
                        WebkitBackdropFilter: "blur(2px) saturate(135%)",
                        backdropFilter: "blur(2px) saturate(135%)"
                    }}
                />

                {/* SOLID DARK TEAL INTRODUCTORY CURTAIN LAYER (Disappears from center in soft blurry circle after 1 second, finishes in next 1 second) */}
                <AnimatePresence>
                    {showSplash && (
                        <motion.svg
                            key="splash-curtain"
                            className="fixed inset-0 w-full h-full pointer-events-none z-50"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }}
                            transition={{ duration: 1.0 }}
                        >
                            <defs>
                                {/* Soft feathering/blur filter for the expanding circle edge so it's not sharp */}
                                <filter id="curtain-circle-blur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="35" />
                                </filter>
                                <mask id="pricing-curtain-hole-mask">
                                    {/* White rect keeps the solid teal curtain 100% visible initially */}
                                    <rect width="100%" height="100%" fill="white" />
                                    {/* Black circle with gaussian blur expands immediately on mount to cut a soft-edged circular hole */}
                                    <motion.circle
                                        cx="50%"
                                        cy="50%"
                                        initial={{ r: "0%" }}
                                        animate={{ r: "160%" }}
                                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                        onAnimationComplete={() => setShowSplash(false)}
                                        style={{ willChange: "transform" }}
                                        fill="black"
                                        filter="url(#curtain-circle-blur)"
                                    />
                                </mask>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                mask="url(#pricing-curtain-hole-mask)"
                                className="fill-[#E0F7F5] dark:fill-[#00080A]"
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>

            {/* HERO SECTION (CENTERED HUGE TRANSPARENT OUTLINE HEADING -> SUBHEADING -> CONTENT -> 2 BUTTONS) */}
            <section className="w-full relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 pt-32 sm:pt-36 md:pt-40 pb-20 z-40 pointer-events-none overflow-hidden">
                <div className="relative flex flex-col lg:inline-flex items-center justify-center select-none w-full max-w-full">
                    {/* Background Huge Outline Stroke Watermark Heading ("TRANSPARENT") */}
                    <motion.span
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[48px] sm:text-[88px] md:text-[120px] lg:text-[152px] xl:text-[176px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-pricing whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95 leading-none text-center"
                    >
                        TRANSPARENT
                    </motion.span>

                    {/* Subheading ("Pricing from Uvicon"): Below on mobile/tab with equal width spacing, Center overlay on desktop */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="-mt-1 sm:-mt-2 lg:mt-0 lg:absolute lg:inset-0 flex items-center justify-center z-10 pointer-events-none w-full"
                    >
                        <h2 className="text-[27.5px] sm:text-[48px] md:text-[64px] lg:text-[84px] xl:text-[96px] font-black text-[#00595C] dark:text-[#3FC1B8] tracking-[0.16em] sm:tracking-[0.20em] md:tracking-[0.22em] lg:tracking-tight uppercase lg:normal-case font-[family-name:var(--font-heading-main)] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] whitespace-nowrap text-center">
                            Pricing from Uvicon
                        </h2>
                    </motion.div>
                </div>

                {/* Description Content Paragraph below heading/subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[#003D3F]/70 dark:text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mt-2.5 sm:mt-3.5 font-[family-name:var(--font-body)] relative z-10 pointer-events-auto"
                >
                    We architect high-performance digital ecosystems in India with transparent sprint milestones, zero vendor lock-in, and 100% intellectual property ownership.
                </motion.p>

                {/* Two Action CTA Buttons (Single row on mobile & tablet, combined width matching main heading) */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 mt-8 relative z-10 pointer-events-auto w-full max-w-[340px] sm:max-w-[580px] md:max-w-[760px] lg:max-w-xl px-1"
                >
                    <Link
                        href="/contact"
                        className="flex-1 w-1/2 py-3.5 sm:py-4 px-2 sm:px-5 rounded-xl sm:rounded-2xl bg-[#004A4D]/85 dark:bg-white/12 hover:bg-[#004A4D] dark:hover:bg-white/20 text-white/90 dark:text-white/85 border border-transparent dark:border-white/15 font-bold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap text-center"
                    >
                        <span>
                            <span className="hidden sm:inline">Book Architecture Discovery</span>
                            <span className="sm:hidden">Book Discovery</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    </Link>
                    <Link
                        href="/services"
                        className="flex-1 w-1/2 py-3.5 sm:py-4 px-2 sm:px-5 rounded-xl sm:rounded-2xl bg-[#003D3F]/10 dark:bg-white/5 hover:bg-[#003D3F]/15 dark:hover:bg-white/10 text-[#003D3F]/80 dark:text-white/65 border border-[#003D3F]/20 dark:border-white/15 font-semibold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap text-center"
                    >
                        <span>
                            <span className="hidden sm:inline">Explore Service Tiers</span>
                            <span className="sm:hidden">Explore Tiers</span>
                        </span>
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}
