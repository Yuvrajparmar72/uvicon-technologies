"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
    Zap, 
    ShieldCheck, 
    Cpu, 
    Clock, 
    Sparkles, 
    CheckCircle2, 
    ArrowUpRight,
    Search,
    Layout,
    Code,
    Rocket,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

export default function WhyChooseUsSection() {
    const processSectionRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: processSectionRef,
        offset: ["start 65%", "start -20%"]
    });

    // Sync active step status & dots with scroll position threshold
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (isTablet) {
                // Tablet View (2 cards visible): 3 Phases (0: Cards 1&2, 1: Cards 2&3, 2: Cards 3&4)
                if (latest < 0.45) {
                    setActiveStep(0);
                } else if (latest < 0.70) {
                    setActiveStep(1);
                } else {
                    setActiveStep(2);
                }
            } else {
                // Mobile View (1 card visible): 4 Steps (0: Card 1, 1: Card 2, 2: Card 3, 3: Card 4)
                if (latest < 0.36) {
                    setActiveStep(0);
                } else if (latest < 0.53) {
                    setActiveStep(1);
                } else if (latest < 0.69) {
                    setActiveStep(2);
                } else {
                    setActiveStep(3);
                }
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, isTablet]);

    const bentoCards = [
        {
            id: "card-1",
            title: "AI-Powered & High-Speed Execution",
            desc: "We leverage modern AI tools and automated pipelines to cut development cycles in half without compromising code quality.",
            badge: "2x Faster Delivery",
            icon: Zap,
            highlight: "Automated Workflows",
            span: "lg:col-span-7",
            visual: (
                <div className="w-full flex flex-wrap items-center gap-2 mt-4 relative z-10">
                    {["Requirement Analysis", "Architecture Blueprint", "AI Sprints", "Zero-Bug QA"].map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#003D3F]/8 dark:bg-white/10 text-[#003D3F] dark:text-white border border-[#003D3F]/15 dark:border-white/20 backdrop-blur-md">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC050]" />
                            {tag}
                        </span>
                    ))}
                </div>
            )
        },
        {
            id: "card-2",
            title: "Enterprise-Grade Security",
            desc: "Zero-vulnerability architecture with strict WCAG compliance, end-to-end encryption, and automated testing.",
            badge: "99.9% Secure",
            icon: ShieldCheck,
            highlight: "Bank-Grade Encryption",
            span: "lg:col-span-5",
            visual: (
                <div className="w-full mt-4 p-3 rounded-2xl bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 backdrop-blur-md flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-[#003D3F] dark:text-white">Active SSL & Compliance Protection</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">Verified</span>
                </div>
            )
        },
        {
            id: "card-3",
            title: "High-Performance Cloud Architecture",
            desc: "Built on Next.js, Vercel, and AWS cloud native platforms guaranteeing sub-second page loading speeds.",
            badge: "< 100ms LCP Speed",
            icon: Cpu,
            highlight: "Core Web Vitals Optimized",
            span: "lg:col-span-5",
            visual: (
                <div className="w-full mt-4 flex items-center gap-3 relative z-10">
                    <div className="flex-1 bg-[#003D3F]/5 dark:bg-white/5 rounded-xl p-2.5 border border-[#003D3F]/10 dark:border-white/10 text-center">
                        <span className="block text-lg font-black text-[#003D3F] dark:text-[#FFC050]">99+</span>
                        <span className="text-[10px] text-[#003D3F]/70 dark:text-white/70 font-semibold">Google Lighthouse Score</span>
                    </div>
                    <div className="flex-1 bg-[#003D3F]/5 dark:bg-white/5 rounded-xl p-2.5 border border-[#003D3F]/10 dark:border-white/10 text-center">
                        <span className="block text-lg font-black text-[#003D3F] dark:text-emerald-400">0.0ms</span>
                        <span className="text-[10px] text-[#003D3F]/70 dark:text-white/70 font-semibold">CLS Layout Shift</span>
                    </div>
                </div>
            )
        },
        {
            id: "card-4",
            title: "24/7 Dedicated Technical Support",
            desc: "Continuous health monitoring, proactive maintenance, and guaranteed SLA response times for peace of mind.",
            badge: "< 15 Min SLA Response",
            icon: Clock,
            highlight: "Always Online",
            span: "lg:col-span-7",
            visual: (
                <div className="w-full mt-4 flex items-center justify-between gap-4 p-3 rounded-2xl bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/30 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-300">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-[#003D3F] dark:text-white">Proactive Health Monitor</span>
                            <span className="text-[10px] text-[#003D3F]/70 dark:text-white/70">Continuous Uptime Assurance</span>
                        </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#00595C] dark:text-[#FFC050]">24 / 7 Live</span>
                </div>
            )
        }
    ];

    const processSteps = [
        {
            step: "01",
            title: "Discovery & Strategy",
            desc: "We analyze your business goals, target audience, and system requirements to build a bulletproof roadmap.",
            icon: Search
        },
        {
            step: "02",
            title: "UI/UX & Architecture",
            desc: "Creating high-fidelity glassmorphism designs, user flows, and modern technical blueprints for client approval.",
            icon: Layout
        },
        {
            step: "03",
            title: "Agile Build & Sprints",
            desc: "Rapid development in clean, modular code with continuous staging previews and rigorous QA testing.",
            icon: Code
        },
        {
            step: "04",
            title: "Deployment & Scale",
            desc: "Zero-downtime production deployment backed by performance optimization and long-term tech support.",
            icon: Rocket
        }
    ];

    return (
        <section className="w-full relative pt-10 sm:pt-14 lg:pt-20 pb-0 sm:pb-0 lg:pb-16 px-5 sm:px-10 lg:px-16 overflow-hidden font-[family-name:var(--font-body)] transition-colors duration-500">
            {/* 3D Glass Marbles & Bolts Background System */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* 1. Electric Cyan Marble */}
                <div className="absolute top-[6%] sm:top-[5%] left-3 sm:left-[4%] w-16 sm:w-24 h-16 sm:h-24 rounded-full border border-cyan-300/40 dark:border-cyan-400/50 shadow-[inset_0_-5px_12px_rgba(0,0,0,0.35),0_12px_25px_rgba(0,180,216,0.35)] backdrop-blur-md relative overflow-hidden flex items-center justify-center opacity-85 dark:opacity-90">
                    <div className="absolute inset-0 bg-[#00B4D8]/30 dark:bg-[#00B4D8]/45 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/80 to-transparent transform -rotate-45"></div>
                </div>

                {/* 2. Golden Yellow Marble */}
                <div className="absolute top-[8%] sm:top-[12%] right-4 sm:right-[16%] w-20 sm:w-36 h-20 sm:h-36 rounded-full border border-yellow-200/50 dark:border-[#FFC050]/50 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.35),0_15px_30px_rgba(255,192,80,0.4)] backdrop-blur-md relative overflow-hidden flex items-center justify-center opacity-90">
                    <div className="absolute inset-0 bg-[#FFC050]/35 dark:bg-[#FFC050]/50 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/90 to-transparent transform -rotate-45"></div>
                </div>

                {/* 3. Emerald Green Marble */}
                <div className="absolute top-[32%] left-[4%] sm:left-[8%] w-28 sm:w-40 h-28 sm:h-40 rounded-full border border-emerald-300/40 dark:border-emerald-400/50 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.35),0_15px_30px_rgba(16,185,129,0.35)] backdrop-blur-md relative overflow-hidden flex items-center justify-center opacity-80 dark:opacity-90">
                    <div className="absolute inset-0 bg-[#10B981]/30 dark:bg-[#10B981]/45 rounded-full"></div>
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/80 to-transparent transform -rotate-45"></div>
                </div>

                {/* 3D Glass Bolt Accent */}
                <div className="absolute top-[18%] -right-12 sm:-right-20 lg:-right-24 w-56 sm:w-72 lg:w-[22rem] opacity-55 dark:opacity-80 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] z-10">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Bolt Accent"
                        width={352}
                        height={352}
                        className="w-full h-auto object-contain transform -rotate-12"
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start">
                
                {/* Header Container */}
                <div className="relative text-left w-full max-w-5xl mb-12 sm:mb-16 flex flex-col items-start justify-start">
                    <div className="relative w-full flex justify-start items-center">
                        <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[42px] sm:text-[120px] lg:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0">
                            WHY UVICON
                        </span>
                        <h2 className="text-[25px] sm:text-[44px] lg:text-[54px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left">
                            Engineered For Precision
                        </h2>
                    </div>

                    <p className="text-[#003D3F]/85 dark:text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl text-left font-medium mt-2.5 sm:mt-4 relative z-10">
                        We don&apos;t just write code — we architect high-performance digital ecosystems using modern tech stacks, glassmorphism aesthetics, and agile methodologies.
                    </p>
                </div>

                {/* ===== PART 1: BENTO GRID ===== */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 sm:mb-16 relative">
                    {bentoCards.map((card) => {
                        const CardIcon = card.icon;
                        return (
                            <div
                                key={card.id}
                                className={`${card.span} bg-transparent backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/20 dark:border-white/15 shadow-[0_15px_35px_rgba(0,61,63,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-[#00595C]/40 dark:hover:border-[#FFC050]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform shrink-0">
                                            <CardIcon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFC050]/15 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30 tracking-wide">
                                            {card.badge}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#003D3F]/80 dark:text-white/80 leading-relaxed mt-2.5 font-[family-name:var(--font-body)]">
                                        {card.desc}
                                    </p>
                                </div>

                                {card.visual}
                            </div>
                        );
                    })}
                </div>

                {/* ===== PART 2: 4-STEP DEVELOPMENT PROCESS ===== */}

                {/* Mobile & Tablet (< lg): 4-Phase Calibrated Card Progression */}
                <div 
                    ref={processSectionRef} 
                    className="-mx-5 sm:-mx-10 lg:mx-0 w-screen lg:w-full relative lg:hidden py-4 my-2 overflow-hidden"
                >
                    <div className="w-full flex flex-col justify-between overflow-hidden py-3 bg-transparent">
                        
                        {/* Process Section Title */}
                        <div className="text-left sm:text-center w-full max-w-3xl mx-auto mb-3 sm:mb-4 shrink-0 relative z-10 px-5">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003D3F]/8 dark:bg-white/8 backdrop-blur-md border border-[#FFC050]/30 shadow-sm mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80">
                                    How We Build
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Our 4-Step Agile Process
                            </h3>
                        </div>

                        {/* Horizontal Cards Motion Track Driven by Active Step State & Responsive Widths */}
                        <div className="flex-1 flex items-center overflow-hidden w-full relative pt-3 pb-6 px-5 sm:px-10">
                            <motion.div 
                                animate={{ 
                                    x: isTablet 
                                        ? `calc(-${Math.min(activeStep, 2)} * (50% + 12px))` 
                                        : `calc(-${activeStep} * (84vw + 16px))` 
                                }}
                                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                                className="flex gap-6 w-full py-2"
                            >
                                {processSteps.map((stepItem, idx) => {
                                    const StepIcon = stepItem.icon;
                                    return (
                                        <div
                                            key={stepItem.step}
                                            className="w-[84vw] sm:w-[calc(50%-12px)] shrink-0 bg-white dark:bg-[#002628] rounded-3xl p-6 sm:p-7 border border-black/5 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.4)] flex flex-col justify-between relative group overflow-hidden"
                                        >
                                            <div className="relative z-10">
                                                {/* Step Counter Badge */}
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                                        {stepItem.step}
                                                    </span>
                                                    <div className="w-10 h-10 rounded-xl bg-[#003D3F]/6 dark:bg-white/8 flex items-center justify-center text-[#003D3F] dark:text-white shrink-0">
                                                        <StepIcon className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                <h4 className="text-lg font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                                    {stepItem.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 leading-relaxed mt-2">
                                                    {stepItem.desc}
                                                </p>
                                            </div>

                                            <div className="w-full mt-6 pt-4 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#00595C] dark:text-[#FFC050] relative z-10">
                                                <span>Phase {idx + 1} of 4</span>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* Interactive Navigation Bar: Left/Right Chevrons + Step Indicators */}
                        <div className="w-full flex items-center justify-between px-5 sm:px-10 pt-3 shrink-0">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                {isTablet 
                                    ? `PHASE ${activeStep + 1} OF 3 — ${activeStep === 0 ? "CARDS 01 & 02" : activeStep === 1 ? "CARDS 02 & 03" : "CARDS 03 & 04"}`
                                    : `${activeStep + 1} OF 4 — ${processSteps[activeStep].title.toUpperCase()}`
                                }
                            </span>
                            
                            <div className="flex items-center gap-3">
                                {/* Chevron Buttons */}
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                                        disabled={activeStep === 0}
                                        aria-label="Previous step card"
                                        className="w-7 h-7 rounded-full bg-[#003D3F]/10 dark:bg-white/10 flex items-center justify-center text-[#003D3F] dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFC050]/30 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => setActiveStep(prev => Math.min(isTablet ? 2 : 3, prev + 1))}
                                        disabled={activeStep === (isTablet ? 2 : 3)}
                                        aria-label="Next step card"
                                        className="w-7 h-7 rounded-full bg-[#003D3F]/10 dark:bg-white/10 flex items-center justify-center text-[#003D3F] dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFC050]/30 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Step Indicator Pills */}
                                <div className="flex items-center gap-1.5">
                                    {(isTablet ? [0, 1, 2] : [0, 1, 2, 3]).map((stepIdx) => (
                                        <button 
                                            key={stepIdx} 
                                            onClick={() => setActiveStep(stepIdx)}
                                            aria-label={`Jump to phase ${stepIdx + 1}`}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                                activeStep === stepIdx
                                                    ? "w-7 bg-[#00595C] dark:bg-[#FFC050]"
                                                    : "w-2.5 bg-[#00595C]/30 dark:bg-white/30 hover:bg-[#00595C]/60"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Desktop (lg:): Classic Grid Layout */}
                <div className="hidden lg:block w-full relative">
                    <div className="text-center w-full max-w-3xl mx-auto mb-16 relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#003D3F]/8 dark:bg-white/8 backdrop-blur-md border border-[#FFC050]/30 shadow-sm mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
                            <span className="text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80">
                                How We Build
                            </span>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                            Our 4-Step Agile Process
                        </h3>
                    </div>

                    <div className="w-full grid grid-cols-4 gap-6 relative">
                        {processSteps.map((stepItem, idx) => {
                            const StepIcon = stepItem.icon;
                            return (
                                <div
                                    key={stepItem.step}
                                    className="bg-transparent backdrop-blur-xl rounded-3xl p-6 border border-[#003D3F]/20 dark:border-white/15 shadow-md flex flex-col justify-between relative group hover:border-[#00595C]/40 dark:hover:border-[#FFC050]/40 transition-all overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                                {stepItem.step}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-[#003D3F]/6 dark:bg-white/8 flex items-center justify-center text-[#003D3F] dark:text-white group-hover:scale-110 transition-transform">
                                                <StepIcon className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            {stepItem.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 leading-relaxed mt-2">
                                            {stepItem.desc}
                                        </p>
                                    </div>

                                    <div className="w-full mt-6 pt-4 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#00595C] dark:text-[#FFC050] relative z-10">
                                        <span>Phase {idx + 1}</span>
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
