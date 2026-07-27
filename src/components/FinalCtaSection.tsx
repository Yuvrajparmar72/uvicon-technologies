"use me";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, ShieldCheck, Zap, Headphones, CheckCircle2 } from "lucide-react";

export default function FinalCtaSection() {
    return (
        <section className="w-full relative pt-6 sm:pt-10 lg:pt-12 pb-24 sm:pb-32 lg:pb-40 px-5 sm:px-10 lg:px-16 overflow-hidden font-[family-name:var(--font-body)] transition-colors duration-500">
            {/* Watermark & Glow Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                .stroke-watermark-cta {
                    -webkit-text-stroke: 2px rgba(0, 61, 63, 0.08);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-cta {
                        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.06);
                    }
                }
                :root {
                    --cta-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.22) 0%, rgba(255, 192, 80, 0.12) 45%, transparent 75%);
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --cta-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.28) 0%, rgba(0, 120, 115, 0.12) 45%, rgba(0, 40, 45, 0.02) 75%, transparent 100%);
                    }
                }
            `}} />

            {/* Ambient Background Accents — Radial Glow */}
            <div
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                style={{
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)"
                }}
            >
                {/* Center Ambient Radial Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full blur-[90px] sm:blur-[120px] opacity-75 dark:opacity-85 pointer-events-none z-0"
                    style={{ background: "var(--cta-glow)" }}
                />

                {/* ===== 3D GLASS LIGHTNING BOLTS ===== */}
                {/* 1. 3D Glass Bolt 4 (Top Left Background) */}
                <div className="absolute top-[4%] -left-6 sm:-left-12 lg:-left-16 w-36 sm:w-52 lg:w-64 opacity-50 dark:opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Bolt 4 Accent"
                        width={280}
                        height={280}
                        className="w-full h-auto object-contain transform -rotate-12"
                    />
                </div>

                {/* 2. 3D Glass Bolt 2 (Bottom Right Background) */}
                <div className="absolute bottom-[4%] -right-6 sm:-right-12 lg:-right-16 w-36 sm:w-52 lg:w-64 opacity-50 dark:opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Bolt 2 Accent"
                        width={280}
                        height={280}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                </div>

            {/* Main Content Container */}
            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* Background Giant Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40px] sm:text-[110px] lg:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-cta whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0">
                    BUILD WITH UVICON
                </div>

                {/* Glassmorphic Conversion Hero Card */}
                <div className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 border border-[#003D3F]/15 dark:border-white/[0.12] backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.45)] p-5 sm:p-8 lg:p-10 overflow-hidden z-10">
                    
                    {/* Glowing Top Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFC050] to-transparent opacity-80" />

                    {/* Corner Ambient Glows */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#00B4D8]/10 dark:bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFC050]/10 dark:bg-[#FFC050]/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                        
                        {/* Header Badge */}
                        <div className="w-max px-3.5 py-1 rounded-full bg-[#003D3F]/10 dark:bg-[#FFC050]/15 border border-[#003D3F]/20 dark:border-[#FFC050]/30 flex items-center gap-2 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3 sm:mb-4">
                            <Zap className="w-3.5 h-3.5 text-[#00595C] dark:text-[#FFC050] animate-pulse" />
                            <span>READY TO ACCELERATE YOUR GROWTH</span>
                        </div>

                        {/* H2 Title */}
                        <h2 className="text-[22px] sm:text-[34px] lg:text-[42px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-[1.15] tracking-tight mb-3">
                            Architect Your <br className="hidden sm:inline" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003D3F] via-[#00595C] to-[#3FC1B8] dark:from-[#FFC050] dark:via-[#F3D082] dark:to-white">
                                High-Performance Digital Solution
                            </span>
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[#003D3F]/85 dark:text-white/85 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-5 sm:mb-6 font-[family-name:var(--font-body)]">
                            From sub-0.1ms algorithmic trading systems to bespoke glassmorphic web apps and mobile applications — get 100% full source code ownership with zero long-term licensing overhead.
                        </p>

                        {/* Dual Action Buttons Group */}
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                            {/* Primary Button: Get Free Consultation */}
                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002224] font-extrabold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-[0_8px_20px_rgba(255,192,80,0.3)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 group"
                            >
                                <span>Get Free Consultation</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>

                            {/* Secondary Button: Explore Solutions & Pricing */}
                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto bg-white/80 dark:bg-white/5 text-[#003D3F] dark:text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border border-[#003D3F]/20 dark:border-white/15 hover:border-[#00595C]/40 dark:hover:border-white/30 hover:bg-white dark:hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5"
                            >
                                <Sparkles className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                <span>Explore Solutions & Pricing</span>
                            </Link>
                        </div>

                        {/* Trust Pillars Grid */}
                        <div className="w-full border-t border-[#003D3F]/10 dark:border-white/10 pt-5 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                            
                            {/* Pillar 1 */}
                            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-[#003D3F]/5 dark:border-white/5">
                                <div className="w-8 h-8 rounded-lg bg-[#003D3F]/10 dark:bg-[#FFC050]/15 flex items-center justify-center text-[#003D3F] dark:text-[#FFC050] mb-1.5">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <h3 className="text-xs font-bold text-[#003D3F] dark:text-white mb-0.5">
                                    100% IP & Source Ownership
                                </h3>
                                <p className="text-[10px] sm:text-[11px] text-[#003D3F]/70 dark:text-white/70 font-medium">
                                    Full NDA Protection & Zero Lock-In
                                </p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-[#003D3F]/5 dark:border-white/5">
                                <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-cyan-400/15 flex items-center justify-center text-teal-600 dark:text-cyan-300 mb-1.5">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <h3 className="text-xs font-bold text-[#003D3F] dark:text-white mb-0.5">
                                    Sub-0.1ms Engine Latency
                                </h3>
                                <p className="text-[10px] sm:text-[11px] text-[#003D3F]/70 dark:text-white/70 font-medium">
                                    High-Frequency Algo & Cloud Precision
                                </p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="flex flex-col items-center p-2.5 rounded-xl bg-white/40 dark:bg-white/[0.03] border border-[#003D3F]/5 dark:border-white/5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/15 flex items-center justify-center text-emerald-600 dark:text-emerald-300 mb-1.5">
                                    <Headphones className="w-4 h-4" />
                                </div>
                                <h3 className="text-xs font-bold text-[#003D3F] dark:text-white mb-0.5">
                                    24/7 Priority SLA Support
                                </h3>
                                <p className="text-[10px] sm:text-[11px] text-[#003D3F]/70 dark:text-white/70 font-medium">
                                    Continuous Proactive Maintenance
                                </p>
                            </div>
                        </div>

                        {/* Live Engineering Status Badge */}
                        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#003D3F]/80 dark:text-white/80 bg-[#003D3F]/5 dark:bg-white/5 px-3.5 py-1.5 rounded-full border border-[#003D3F]/10 dark:border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Active Engineers Online • Guaranteed SLA Response &lt; 15 Mins</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
