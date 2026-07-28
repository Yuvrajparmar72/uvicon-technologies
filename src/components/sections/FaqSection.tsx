"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    ChevronDown, 
    ArrowRight, 
    Sparkles, 
    Zap, 
    Code, 
    ShieldCheck, 
    Clock, 
    Headphones,
    Layers
} from "lucide-react";
import { homeFaqs, generateFAQSchema } from "@/data/faqData";

// Icon mapping for visual engagement
const faqIcons: Record<string, React.ElementType> = {
    "faq-1": Zap,
    "faq-2": Code,
    "faq-3": ShieldCheck,
    "faq-4": Clock,
    "faq-5": Headphones,
    "faq-6": Sparkles,
};

export default function FaqSection() {
    // All FAQs closed by default
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    const faqSchema = generateFAQSchema(homeFaqs);

    return (
        <>
            {/* GEO / SEO JSON-LD FAQPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema)
                }}
            />

            <section className="w-full relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 px-5 sm:px-10 lg:px-16 overflow-hidden font-[family-name:var(--font-body)] transition-colors duration-500">
                
                {/* Watermark & Glow CSS Variables */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .stroke-watermark-faq {
                        -webkit-text-stroke: 2px rgba(0, 61, 63, 0.14);
                    }
                    @media (prefers-color-scheme: dark) {
                        .stroke-watermark-faq {
                            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.12);
                        }
                    }
                    :root {
                        --faq-glow: radial-gradient(circle at 80% 50%, rgba(0, 180, 170, 0.22) 0%, rgba(255, 192, 80, 0.12) 40%, transparent 80%);
                    }
                    @media (prefers-color-scheme: dark) {
                        :root {
                            --faq-glow: radial-gradient(circle at 80% 50%, rgba(0, 180, 170, 0.25) 0%, rgba(0, 120, 115, 0.1) 45%, rgba(0, 60, 55, 0.03) 70%, transparent 100%);
                        }
                    }
                `}} />

                {/* ===== DESKTOP BALLS (lg+ only) ===== */}
                
                {/* D1. Big Golden Yellow — Heading Starting Left */}
                <div className="absolute top-[18%] left-[6%] w-36 h-36 rounded-full border border-yellow-200/50 dark:border-[#FFC050]/50 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.35),0_15px_30px_rgba(255,192,80,0.35)] backdrop-blur-md overflow-hidden items-center justify-center opacity-85 dark:opacity-95 z-0 pointer-events-none hidden lg:flex">
                    <div className="absolute inset-0 bg-[#FFC050]/35 dark:bg-[#FFC050]/50 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/90 to-transparent transform -rotate-45"></div>
                </div>

                {/* D2. Big Electric Cyan — Section Bottom Left */}
                <div className="absolute bottom-[6%] left-[4%] w-36 h-36 rounded-full border border-cyan-300/40 dark:border-cyan-400/50 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.35),0_15px_30px_rgba(0,180,216,0.35)] backdrop-blur-md overflow-hidden items-center justify-center opacity-85 dark:opacity-95 z-0 pointer-events-none hidden lg:flex">
                    <div className="absolute inset-0 bg-[#00B4D8]/30 dark:bg-[#00B4D8]/45 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/80 to-transparent transform -rotate-45"></div>
                </div>

                {/* D3. Small Emerald — Behind 6th FAQ Card (Bottom Right Column) */}
                <div className="absolute bottom-[26%] right-[5%] w-20 h-20 rounded-full border border-emerald-300/40 dark:border-emerald-400/50 shadow-[inset_0_-5px_12px_rgba(0,0,0,0.3),0_10px_20px_rgba(16,185,129,0.3)] backdrop-blur-md overflow-hidden items-center justify-center opacity-85 dark:opacity-95 z-0 pointer-events-none hidden lg:flex">
                    <div className="absolute inset-0 bg-[#10B981]/30 dark:bg-[#10B981]/45 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/85 to-transparent transform -rotate-45"></div>
                </div>

                {/* ===== MOBILE BALLS (below lg only) ===== */}
                
                {/* M1. Big Golden Yellow — Near Heading (Top Left) */}
                <div className="absolute top-[1%] left-[2px] sm:left-[3%] w-16 sm:w-24 h-16 sm:h-24 rounded-full border border-yellow-200/50 dark:border-[#FFC050]/50 shadow-[inset_0_-6px_16px_rgba(0,0,0,0.35),0_12px_25px_rgba(255,192,80,0.35)] backdrop-blur-md overflow-hidden items-center justify-center opacity-85 dark:opacity-95 z-0 pointer-events-none flex lg:hidden">
                    <div className="absolute inset-0 bg-[#FFC050]/35 dark:bg-[#FFC050]/50 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/90 to-transparent transform -rotate-45"></div>
                </div>

                {/* M2. Big Electric Cyan — Center Right of Section */}
                <div className="absolute top-[42%] right-[2px] sm:right-[3%] w-16 sm:w-24 h-16 sm:h-24 rounded-full border border-cyan-300/40 dark:border-cyan-400/50 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.35),0_15px_30px_rgba(0,180,216,0.35)] backdrop-blur-md overflow-hidden items-center justify-center opacity-85 dark:opacity-95 z-0 pointer-events-none flex lg:hidden">
                    <div className="absolute inset-0 bg-[#00B4D8]/30 dark:bg-[#00B4D8]/45 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/80 to-transparent transform -rotate-45"></div>
                </div>

                {/* M3. Small Emerald — Bottom Left */}
                <div className="absolute bottom-[2%] left-[2px] sm:left-[4%] w-10 sm:w-14 h-10 sm:h-14 rounded-full border border-emerald-300/40 dark:border-emerald-400/50 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.3),0_8px_18px_rgba(16,185,129,0.3)] backdrop-blur-md overflow-hidden items-center justify-center opacity-80 dark:opacity-90 z-0 pointer-events-none flex lg:hidden">
                    <div className="absolute inset-0 bg-[#10B981]/30 dark:bg-[#10B981]/45 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/85 to-transparent transform -rotate-45"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start">
                    <div className="relative text-left w-full max-w-5xl mb-6 sm:mb-8 flex flex-col items-start justify-start">
                        
                        {/* Watermark + H2 */}
                        <div className="relative w-full flex justify-start items-center">
                            <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[36px] sm:text-[90px] lg:text-[130px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-faq whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0">
                                FAQ
                            </span>

                            <h2 className="text-[24px] sm:text-[38px] lg:text-[46px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        {/* Subtitle */}
                        <p className="text-[#003D3F]/85 dark:text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl text-left font-medium font-[family-name:var(--font-body)] mt-2 sm:mt-3 relative z-10">
                            Clear, direct answers regarding custom web development, sub-0.1ms algo latency, 100% IP ownership, and 24/7 support.
                        </p>
                    </div>

                    {/* Compact 2-Column Accordions Grid (Desktop/Tablet 2 Cols, Mobile 1 Col) */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4.5">
                        {homeFaqs.map((faq) => {
                            const isOpen = openId === faq.id;
                            const IconComponent = faqIcons[faq.id] || Layers;

                            return (
                                <div
                                    key={faq.id}
                                    className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                                        isOpen
                                            ? "bg-white/85 dark:bg-[#001D1F]/90 border-[#00595C]/35 dark:border-[#FFC050]/40 shadow-md"
                                            : "bg-white/60 dark:bg-[#001719]/75 border-[#003D3F]/10 dark:border-white/[0.07] hover:border-[#00595C]/25 dark:hover:border-white/20"
                                    } backdrop-blur-md self-start`}
                                >
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#FFC050]/50"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-3 min-w-0 pr-1">
                                            {/* Visual Icon Badge */}
                                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                                isOpen
                                                    ? "bg-[#00595C] text-[#FFC050] dark:bg-[#FFC050] dark:text-[#002829]"
                                                    : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-[#FFC050]"
                                            } transition-colors duration-300`}>
                                                <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </div>

                                            <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>

                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                            isOpen
                                                ? "bg-[#00595C]/15 text-[#00595C] dark:bg-[#FFC050]/20 dark:text-[#FFC050] rotate-180"
                                                : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/60 dark:text-white/60"
                                        }`}>
                                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                    </button>

                                    {/* Expandable Content */}
                                    {isOpen && (
                                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] border-t border-[#003D3F]/8 dark:border-white/8">
                                            <p className="pt-2.5">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Compact Banner Linking to Full FAQs & Tutorials Page */}
                    <div className="w-full mt-8 sm:mt-10 bg-white/50 dark:bg-white/[0.04] backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#003D3F]/10 dark:border-white/[0.08] shadow-none flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4AA]/15 dark:bg-[#00B4AA]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col items-start gap-1 text-left relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/20 text-[#00595C] dark:text-[#FFC050] border border-[#00595C]/20 dark:border-[#FFC050]/30 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" />
                                <span>30+ Tutorials & Full Knowledge Base</span>
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                Looking for Step-by-Step Video Guides & Technical Docs?
                            </h3>
                        </div>

                        <Link
                            href="/faqs-tutorials"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:scale-105 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2 relative z-10"
                        >
                            <span>Explore All FAQs & Video Guides</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>
        </>
    );
}

