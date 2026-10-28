"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Sparkles,
    ShieldCheck,
    Zap,
    Award,
    CheckCircle2,
    ArrowUpRight,
    ChevronRight,
    Users,
    Target,
    Compass,
    Code2,
    Globe,
    Smartphone,
    Cpu,
    Layers,
    Lock,
    Server,
    Clock,
    HeartHandshake,
    Lightbulb,
    TrendingUp,
    Terminal,
    Check,
    Flame,
    Radio,
    Shield,
    Database,
    Binary,
    Network,
    BookOpen,
    Eye,
    Rocket,
    Workflow,
    Activity,
    FolderGit2,
    FileCheck2,
    CalendarCheck2,
    HelpCircle,
    Star,
    BadgeCheck,
    Mail,
    Infinity,
    CheckCheck,
    Atom,
    Boxes,
    ScanEye,
    Scale
} from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";

/* ==========================================================================
   FRAMER MOTION ANIMATION VARIANTS
   ========================================================================== */

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
};

/* ==========================================================================
   DATA STRUCTURES: CORE VALUES, ROADMAP, MANIFESTO
   ========================================================================== */

interface CoreValue {
    id: string;
    number: string;
    title: string;
    tagline: string;
    desc: string;
    icon: React.ElementType;
    badge: string;
    commitments: string[];
    span: string;
}

const coreValues: CoreValue[] = [
    {
        id: "value-1",
        number: "01",
        title: "Sub-Millisecond Obsession",
        tagline: "Speed Is A Core Feature",
        desc: "We treat latency and performance not as post-launch optimizations, but as fundamental architectural constraints. Every API route, database query, and UI render is engineered for extreme throughput.",
        icon: Zap,
        badge: "Sub-0.1ms Standard",
        commitments: [
            "Sub-100ms Largest Contentful Paint (LCP)",
            "Deterministic Low-Latency Algo Routing",
            "Zero Bloated Legacy Dependencies",
            "Continuous Memory & Heap Profiling"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "value-2",
        number: "02",
        title: "Unconditional 100% IP Ownership",
        tagline: "Your Code, Your Company",
        desc: "We believe clients should own every single line of code, schema, design token, and deployment script legally under NDA. No proprietary CMS lock-in, no hostage codebases, and zero hidden royalties.",
        icon: ShieldCheck,
        badge: "100% Legal Transfer",
        commitments: [
            "Direct GitHub Repository Handover",
            "Strict Non-Disclosure Agreement (NDA)",
            "Comprehensive Architecture Docs",
            "Zero Vendor Dependency"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "value-3",
        number: "03",
        title: "Architectural Purity & Zero Debt",
        tagline: "Clean, Typed, Proven Code",
        desc: "We write strictly typed, modular TypeScript, Next.js, Python, and C++ that your in-house team can easily scale. We never cut corners with fragile hacks or undocumented spaghetti code.",
        icon: Boxes,
        badge: "100% Type-Checked",
        commitments: [
            "Strict TypeScript & Static Typing",
            "100/100 Lighthouse & Core Web Vitals",
            "Automated CI/CD Test Suites",
            "Modular Clean Architecture Patterns"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "value-4",
        number: "04",
        title: "Radical Direct Transparency",
        tagline: "Direct Lead Architect Access",
        desc: "We eliminate layers of non-technical account managers. You collaborate directly with senior systems architects and full-stack engineers via real-time Slack/WhatsApp channels and bi-weekly live staging demos.",
        icon: Users,
        badge: "Zero Middlemen",
        commitments: [
            "Bi-Weekly Live Staging URL Demos",
            "Real-Time Slack/Discord Channels",
            "Transparent Jira/Linear Sprint Boards",
            "Direct Pull Request Code Reviews"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "value-5",
        number: "05",
        title: "Bank-Grade Security By Default",
        tagline: "Zero-Vulnerability Foundation",
        desc: "Security is non-negotiable. From algorithmic trading backends to consumer SaaS platforms, we enforce end-to-end SSL/TLS, ACID SQL transactions, automated vulnerability scans, and strict role-based access control.",
        icon: Lock,
        badge: "SOC2 & ACID Compliant",
        commitments: [
            "Automated CI/CD Vulnerability Scans",
            "End-to-End SSL/TLS Encryption",
            "SQL Injection & CSRF Immunity",
            "Strict Role-Based Access Control (RBAC)"
        ],
        span: "lg:col-span-6"
    },
    {
        id: "value-6",
        number: "06",
        title: "Long-Term Accountability & SLAs",
        tagline: "Backed By Warranty",
        desc: "Our partnership doesn't end at deployment. We back every project with an unconditional 90-Day Post-Launch SLA Warranty and proactive cloud monitoring to guarantee seamless operational excellence.",
        icon: Award,
        badge: "90-Day SLA Included",
        commitments: [
            "Guaranteed Priority Bug Resolution",
            "Proactive Cloud Health Monitoring",
            "Turnkey Video Training Walkthrough",
            "Zero-Downtime Migration Support"
        ],
        span: "lg:col-span-6"
    }
];

interface RoadmapEpoch {
    epoch: string;
    year: string;
    title: string;
    tagline: string;
    summary: string;
    milestones: string[];
    badge: string;
    icon: React.ElementType;
}

const roadmapEpochs: RoadmapEpoch[] = [
    {
        epoch: "Epoch 01",
        year: "2026",
        title: "Precision Quant Engines & High-Velocity Web Studio",
        tagline: "Foundational Engineering Excellence",
        summary: "Establishing the gold standard in sub-0.1ms algorithmic order execution, Next.js 15 SSR platforms, and fixed-scope agile sprints with 100% IP ownership.",
        milestones: [
            "Next-Gen Python/C++ Multi-Broker Algo Gateway",
            "Sub-100ms Core Web Vitals SaaS Frameworks",
            "Automated CI/CD Architecture Deployment Kits",
            "Turnkey 90-Day Post-Launch SLA Guarantees"
        ],
        badge: "Active Production",
        icon: Zap
    },
    {
        epoch: "Epoch 02",
        year: "2027",
        title: "Autonomous AI Agent Orchestration & Real-Time Cloud",
        tagline: "Intelligent Systems Integration",
        summary: "Pioneering deterministic multi-agent AI workflows, vector database indexing, and automated high-throughput cloud microservices for enterprise scale.",
        milestones: [
            "Autonomous Multi-Agent Enterprise Workflows",
            "Distributed Vector DB & LLM Inference Pipelines",
            "Zero-Latency WebSocket Streaming Mesh",
            "Cross-Platform Native & Flutter Studio Core"
        ],
        badge: "In Development",
        icon: Atom
    },
    {
        epoch: "Epoch 03",
        year: "2028",
        title: "Global Low-Latency Decentralized Mesh & Quant Cloud",
        tagline: "The Next-Generation Infrastructure",
        summary: "Expanding global edge computing capabilities, institutional-grade quant strategy execution mesh, and decentralized secure infrastructure.",
        milestones: [
            "Worldwide Sub-Millisecond Edge Trading Mesh",
            "Zero-Knowledge (ZK) Cryptographic Data Proofs",
            "Institutional High-Frequency Quant Hosting Hub",
            "Autonomous DevOps & Self-Healing Cloud Clusters"
        ],
        badge: "Horizon Target",
        icon: Globe
    }
];

interface ManifestoItem {
    quote: string;
    subtext: string;
    icon: React.ElementType;
}

const manifestoPillars: ManifestoItem[] = [
    {
        quote: "Code Speaks Louder Than Slides",
        subtext: "We deliver interactive staging software every two weeks rather than burying clients in 50-page PowerPoint decks.",
        icon: Code2
    },
    {
        quote: "Every Architect Writes Production Code",
        subtext: "Our leadership consists of senior software engineers and systems architects who actively write and review every pull request.",
        icon: Terminal
    },
    {
        quote: "Zero Bureaucracy, Pure Craftsmanship",
        subtext: "We eliminate layers of junior middlemen so ambitious founders can build alongside the engineers actually writing their software.",
        icon: HeartHandshake
    },
    {
        quote: "Accountability Over Excuses",
        subtext: "We back our engineering with guaranteed milestone deliverables and an unconditional 90-Day Post-Launch SLA Warranty.",
        icon: ShieldCheck
    }
];

/* ==========================================================================
   MAIN CLIENT COMPONENT
   ========================================================================== */

export default function VisionValuesClient() {
    const [activeEpochIndex, setActiveEpochIndex] = useState<number>(0);

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* =====================================================================
               UNIFIED RESPONSIVE PAGE BACKGROUND CANVAS (LIGHT & DARK THEMES)
               ===================================================================== */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                /* -------------------------------------------------------------
                   LIGHT MODE GRADIENTS & RESPONSIVE RADIAL GLOW
                   ------------------------------------------------------------- */
                :root {
                    --page-bg: linear-gradient(to bottom,
                        #E6F9F8 0px,
                        #EBF8F7 50vh,
                        #F0FAF9 100vh,
                        #F5FCFC 150vh,
                        #FDFBF7 220vh
                    );
                    --hero-glow: radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.8) 35%, rgba(184, 230, 226, 0.4) 65%, transparent 100%);
                }
                @media (min-width: 768px) {
                    :root {
                        --hero-glow: radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.85) 30%, rgba(184, 230, 226, 0.4) 60%, transparent 100%);
                    }
                }
                @media (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(213, 245, 242, 0.85) 25%, rgba(184, 230, 226, 0.45) 50%, transparent 70%);
                    }
                }

                /* -------------------------------------------------------------
                   DARK MODE GRADIENTS & RESPONSIVE RADIAL GLOW
                   ------------------------------------------------------------- */
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(to bottom,
                            #001214 0px,
                            #001618 50vh,
                            #001A1C 100vh,
                            #001618 150vh,
                            #021213 220vh
                        );
                        --hero-glow: radial-gradient(circle at 50% 20%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 35%, rgba(0, 85, 80, 0.2) 65%, transparent 100%);
                    }
                }
                @media (prefers-color-scheme: dark) and (min-width: 768px) {
                    :root {
                        --hero-glow: radial-gradient(circle at 50% 25%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 30%, rgba(0, 85, 80, 0.2) 60%, transparent 100%);
                    }
                }
                @media (prefers-color-scheme: dark) and (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 50% 30%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 25%, rgba(0, 85, 80, 0.2) 50%, transparent 70%);
                    }
                }

                html.dark {
                    --page-bg: linear-gradient(to bottom,
                        #001214 0px,
                        #001618 50vh,
                        #001A1C 100vh,
                        #001618 150vh,
                        #021213 220vh
                    );
                    --hero-glow: radial-gradient(ellipse at 50% 30%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 25%, rgba(0, 85, 80, 0.2) 50%, transparent 70%);
                }

                /* -------------------------------------------------------------
                   WATERMARK STROKE TAILORED FOR LIGHT & DARK THEMES
                   ------------------------------------------------------------- */
                .stroke-watermark-hero {
                    -webkit-text-stroke: 2px rgba(0, 61, 63, 0.22);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-hero {
                        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
                    }
                }
                html.dark .stroke-watermark-hero {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
                }

                .stroke-watermark-section {
                    -webkit-text-stroke: 1.5px rgba(0, 61, 63, 0.2);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-section {
                        -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
                    }
                }
                html.dark .stroke-watermark-section {
                    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
                }

                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `
                }}
            />

            {/* Continuous Seamless Radial Glow Canvas */}
            <div
                className="absolute top-0 left-0 w-full h-[180vh] pointer-events-none z-0"
                style={{
                    background: "var(--hero-glow)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"
                }}
            />

            {/* =====================================================================
               SECTION 1: HERO SECTION — DUAL-HORIZON SPLIT COCKPIT
               ===================================================================== */}
            <section className="w-full relative pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-16 z-10">
                {/* 3D Glass Bolt Accents with Floating Animation */}
                <div className="absolute top-12 right-4 sm:right-10 w-28 sm:w-40 lg:w-48 pointer-events-none z-0 opacity-45 dark:opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={220}
                        height={220}
                        className="w-full h-auto object-contain transform rotate-15"
                    />
                </div>
                <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 lg:w-40 pointer-events-none z-0 opacity-40 dark:opacity-65 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={180}
                        height={180}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                <motion.div
                    className="max-w-7xl mx-auto relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* Asymmetric 2-Column Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
                        {/* LEFT COLUMN: NORTH STAR NARRATIVE & STATS (7 Cols) */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl mb-4 shadow-xs"
                            >
                                <Compass className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span>FOUNDATIONAL PHILOSOPHY • PURPOSE & CODE</span>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="relative w-full mb-4">
                                {/* Left-Aligned Watermark */}
                                <span className="text-[38px] sm:text-[60px] lg:text-[100px] xl:text-[120px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] block -mb-2 sm:-mb-4 opacity-80 whitespace-nowrap">
                                    NORTH STAR
                                </span>

                                <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] xl:text-[54px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] lg:leading-[1.1] drop-shadow-sm">
                                    Engineering The Next Era of Algorithmic Velocity
                                </h1>
                            </motion.div>

                            <motion.p
                                variants={fadeInUp}
                                className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[17px] leading-[1.65] font-[family-name:var(--font-body)] mb-6 max-w-2xl"
                            >
                                We don&apos;t just build software; we engineer deterministic algorithms, high-throughput cloud systems, and autonomous AI infrastructure with 100% intellectual property ownership and zero technical compromise.
                            </motion.p>

                            {/* 3 Quick Highlight Metrics */}
                            <motion.div variants={fadeInUp} className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 mb-7">
                                <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-left">
                                    <span className="text-base sm:text-xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        &lt; 0.1ms
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        Execution Latency
                                    </span>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-left">
                                    <span className="text-base sm:text-xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        100% IP
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        NDA Transfer
                                    </span>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-left">
                                    <span className="text-base sm:text-xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        90 Days
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        SLA Guarantee
                                    </span>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                                <Link
                                    href="/contact"
                                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Build Your Vision With Us</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#core-values"
                                    className="px-7 py-3.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-[#003D3F]/15 dark:border-white/15 text-[#003D3F] dark:text-white font-bold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Scale className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                    <span>Our 6 Core Values ↓</span>
                                </a>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: HOLOGRAPHIC LOTTIE HORIZON POD (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center">
                            <motion.div
                                variants={fadeInUp}
                                className="w-full bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-7 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-center relative overflow-hidden text-center"
                            >
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 text-[#00595C] dark:text-[#FFC050] text-[10px] font-black uppercase tracking-wider">
                                    Horizon Mesh
                                </div>
                                <div className="w-full h-56 sm:h-64 flex items-center justify-center relative my-2">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00595C]/25 via-[#3FC1B8]/20 to-[#FFC050]/15 rounded-full blur-2xl pointer-events-none" />
                                    <LottiePlayer
                                        animationPath="/assets/lottie/vision-horizon.json"
                                        className="w-full h-full object-contain relative z-10"
                                    />
                                </div>

                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 text-left">
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#003D3F] dark:text-white">
                                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>Zero Agency Retainer Bloat</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-[#003D3F] dark:text-white">
                                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                        <span>Direct Lead Architect Access</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Bottom Ticker Strip */}
                    <motion.div
                        variants={fadeInUp}
                        className="w-full py-3 px-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 flex flex-wrap items-center justify-around gap-3 text-xs font-bold text-[#00595C] dark:text-[#3FC1B8] uppercase tracking-wider"
                    >
                        <span>⚡ CRAFT OVER COMMODITY</span>
                        <span>•</span>
                        <span>🛡️ PURE CLIENT CODE SOVEREIGNTY</span>
                        <span>•</span>
                        <span>🔒 BANK-GRADE ZERO VULNERABILITY</span>
                        <span>•</span>
                        <span>🏆 90-DAY POST-LAUNCH SLA</span>
                    </motion.div>
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 2: THE CORE DUAL MANDATE (LEFT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 3 Accent on Right */}
                <div className="absolute top-1/4 -right-8 sm:-right-4 w-36 sm:w-56 lg:w-64 opacity-50 dark:opacity-80 pointer-events-none z-0 animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-12 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - LEFT-ALIGNED */}
                    <div className="relative text-left w-full max-w-6xl mr-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                MANDATE
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left whitespace-normal lg:whitespace-nowrap">
                                Two Guiding Forces Shaping Everything We Build
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mr-auto text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our long-term global vision and our day-to-day engineering mission work in total synchrony to deliver unfair market advantages for our partners.
                        </p>
                    </div>

                    {/* Dual Split Cards */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                        {/* CARD 1: OUR LONG-TERM VISION 2030 */}
                        <div className="bg-gradient-to-b from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001D1F]/85 dark:to-[#001416]/90 rounded-3xl p-7 sm:p-9 border-2 border-[#FFC050] dark:border-[#FFC050] shadow-[0_12px_35px_rgba(255,192,80,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                                <Target className="w-3.5 h-3.5" />
                                <span>The North Star</span>
                            </div>

                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-[#00595C]/15 dark:bg-[#FFC050]/20 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#00595C]/20 dark:border-[#FFC050]/30 shadow-inner mb-4">
                                    <Globe className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mb-2">
                                    Our Vision: The Global Standard For Precision Engineering
                                </h3>

                                <p className="text-xs sm:text-sm text-[#003D3F]/85 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] mb-6">
                                    To establish Uvicon Technologies as the world&apos;s foremost engineering studio for ultra-low-latency algorithmic systems, autonomous AI agents, and high-throughput web platforms — setting a universal benchmark where software is shipped with 100% intellectual property rights, zero technical debt, and extreme performance.
                                </p>

                                <div className="space-y-2.5 pt-4 border-t border-[#003D3F]/10 dark:border-white/10">
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>Pioneering sub-0.1ms quant order routing globally</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>100% client code sovereignty with legal NDA guarantees</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>Autonomous AI systems with deterministic reliability</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                <span className="text-xs font-bold text-[#00595C] dark:text-[#3FC1B8]">
                                    Horizon Milestone Target
                                </span>
                                <span className="text-base sm:text-lg font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                    Vision 2030
                                </span>
                            </div>
                        </div>

                        {/* CARD 2: OUR DAILY MISSION */}
                        <div className="bg-white/85 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-[#003D3F]/15 dark:border-white/10 shadow-lg flex flex-col justify-between text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-[#003D3F]/10 dark:bg-white/10 text-[#00595C] dark:text-[#FFC050] font-black text-[10px] sm:text-xs uppercase tracking-wider">
                                Daily Execution
                            </div>

                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 mb-4">
                                    <Rocket className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mb-2">
                                    Our Mission: High-Velocity Software Without Agency Overhead
                                </h3>

                                <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed font-[family-name:var(--font-body)] mb-6">
                                    To eliminate the frustration of sluggish agency retainers and unpredictable freelancer networks by providing ambitious founders and enterprises with dedicated, elite engineering squads. We turn complex technical blueprints into live, production-grade software within 2 to 6 weeks.
                                </p>

                                <div className="space-y-2.5 pt-4 border-t border-[#003D3F]/10 dark:border-white/10">
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                        <Check className="w-4 h-4 text-[#FFC050] shrink-0" />
                                        <span>Direct collaboration with Lead Architects & Senior Devs</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                        <Check className="w-4 h-4 text-[#FFC050] shrink-0" />
                                        <span>Bi-weekly live staging demos with full milestone governance</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                        <Check className="w-4 h-4 text-[#FFC050] shrink-0" />
                                        <span>Standard 90-Day Post-Launch SLA Warranty included</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                <span className="text-xs font-bold text-[#003D3F]/70 dark:text-white/70">
                                    Daily Delivery Cadence
                                </span>
                                <span className="text-base sm:text-lg font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                    Sprint-Driven
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 3: 6 UNCOMPROMISING CORE VALUES (BENTO GRID - RIGHT-ALIGNED)
               ===================================================================== */}
            <motion.section
                id="core-values"
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10 scroll-mt-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 4 Accent Bottom Left */}
                <div className="absolute -bottom-8 -left-8 sm:-left-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0 animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - RIGHT-ALIGNED */}
                    <div className="relative text-right w-full max-w-6xl ml-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col lg:flex-row justify-end items-end lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                VALUES
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right whitespace-normal lg:whitespace-nowrap">
                                The Six Principles We Will Never Violate
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl ml-auto text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our engineering culture is governed by six foundational pillars designed to eliminate technical debt, safeguard client IP, and guarantee extreme velocity.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                        {coreValues.map((val) => {
                            const ValIcon = val.icon;
                            return (
                                <motion.div
                                    key={val.id}
                                    variants={cardVariant}
                                    className={`${val.span} bg-white/90 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 lg:p-8 border border-white/60 border-t-white/80 dark:border-white/10 dark:border-t-white/20 shadow-[0_10px_30px_rgba(0,61,63,0.06)] dark:shadow-none hover:border-[#FFC050]/50 transition-all flex flex-col justify-between group relative overflow-hidden text-left`}
                                >
                                    {/* Corner Glow */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-2xl pointer-events-none" />

                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <div className="w-11 h-11 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform shrink-0">
                                                <ValIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/40 tracking-wide">
                                                {val.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            {val.title}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#00595C] dark:text-[#3FC1B8] uppercase tracking-wider mt-0.5">
                                            {val.tagline}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed mt-2 font-[family-name:var(--font-body)]">
                                            {val.desc}
                                        </p>
                                    </div>

                                    {/* Commitments Checklist */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 pt-3.5 border-t border-[#003D3F]/10 dark:border-white/10">
                                        {val.commitments.map((com, cIdx) => (
                                            <div key={cIdx} className="flex items-center gap-2 text-xs font-semibold text-[#003D3F]/90 dark:text-white/90">
                                                <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                                <span className="truncate">{com}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 4: 2026–2028 INNOVATION ROADMAP & HORIZONS (LEFT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 1 Accent Top Right */}
                <div className="absolute top-4 -right-8 sm:-right-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0 animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent Right"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - LEFT-ALIGNED */}
                    <div className="relative text-left w-full max-w-6xl mr-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                HORIZONS
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left whitespace-normal lg:whitespace-nowrap">
                                Where We Are Headed: The 3-Epoch Roadmap
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mr-auto text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our innovation strategy stretches across three progressive epochs, constantly pushing the boundaries of algorithmic execution, autonomous AI, and distributed systems.
                        </p>
                    </div>

                    {/* 3 Interactive Epoch Cards */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {roadmapEpochs.map((ep, eIdx) => {
                            const EpIcon = ep.icon;
                            const isSelected = activeEpochIndex === eIdx;
                            return (
                                <button
                                    key={ep.epoch}
                                    onClick={() => setActiveEpochIndex(eIdx)}
                                    className={`p-6 sm:p-7 rounded-3xl text-left transition-all cursor-pointer focus:outline-none flex flex-col justify-between ${
                                        isSelected
                                            ? "bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001719]/90 dark:to-[#001214]/90 border-2 border-[#FFC050] shadow-[0_12px_35px_rgba(255,192,80,0.25)] scale-[1.02]"
                                            : "bg-white/75 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 hover:border-[#00595C]/30 dark:hover:border-white/20"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl sm:text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                                    {ep.year}
                                                </span>
                                                <span className="text-xs font-bold text-[#003D3F]/60 dark:text-white/60">
                                                    {ep.epoch}
                                                </span>
                                            </div>
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? "bg-[#FFC050] text-[#002829]" : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-white"}`}>
                                                <EpIcon className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug mb-1">
                                            {ep.title}
                                        </h3>
                                        <span className="text-xs font-semibold text-[#00595C] dark:text-[#3FC1B8] block mb-3">
                                            {ep.tagline}
                                        </span>
                                        <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed mb-4">
                                            {ep.summary}
                                        </p>

                                        <div className="space-y-1.5 pt-3 border-t border-[#003D3F]/10 dark:border-white/10">
                                            {ep.milestones.map((m, mIdx) => (
                                                <div key={mIdx} className="flex items-center gap-2 text-xs font-semibold text-[#003D3F] dark:text-white">
                                                    <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                                    <span className="truncate">{m}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8]">
                                            {ep.badge}
                                        </span>
                                        <ArrowUpRight className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 5: LEADERSHIP & CULTURE MANIFESTO (RIGHT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 2 Accent Bottom Right */}
                <div className="absolute -bottom-8 -right-6 sm:right-4 w-32 sm:w-48 lg:w-60 opacity-45 dark:opacity-75 pointer-events-none z-0 animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Right"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-18 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - RIGHT-ALIGNED */}
                    <div className="relative text-right w-full max-w-6xl ml-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col lg:flex-row justify-end items-end lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                CULTURE
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right whitespace-normal lg:whitespace-nowrap">
                                The Philosophy That Powers Our Studios
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl ml-auto text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our team culture is built on direct accountability, deep technical craftsmanship, and an allergic reaction to corporate bureaucracy.
                        </p>
                    </div>

                    {/* Manifesto 4 Pillars Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                        {manifestoPillars.map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white/85 dark:bg-[#001D1F]/80 backdrop-blur-2xl rounded-3xl p-6 border border-white/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,61,63,0.06)] dark:shadow-none hover:border-[#FFC050]/50 transition-all flex flex-col justify-between text-left group relative overflow-hidden"
                                >
                                    <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] mb-4 group-hover:scale-110 transition-transform">
                                            <ItemIcon className="w-5 h-5" />
                                        </div>

                                        <h3 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2">
                                            &ldquo;{item.quote}&rdquo;
                                        </h3>
                                        <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
                                            {item.subtext}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8]">
                                            Principle 0{idx + 1}
                                        </span>
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 6: CALL TO ACTION BANNER
               ===================================================================== */}
            <section className="w-full relative pt-4 sm:pt-6 lg:pt-8 pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-b from-white/95 via-white/85 to-white/75 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-xl shadow-xl relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFC050] to-transparent opacity-80" />

                        <div className="max-w-3xl mx-auto mb-8">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span>BUILD WITHOUT LIMITS</span>
                            </div>
                            <h3 className="text-xl sm:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Bring Your Technical Vision To Reality With Uvicon
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 mt-2 font-[family-name:var(--font-body)]">
                                Experience guaranteed fixed-scope delivery, 100% intellectual property ownership, and sub-millisecond precision.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                            >
                                <Mail className="w-4 h-4" />
                                <span>Schedule Free Technical Consultation</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-8 py-3.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-[#003D3F]/20 dark:border-white/20 text-[#003D3F] dark:text-white font-bold text-sm tracking-wide transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm"
                            >
                                <span>View Transparent Pricing</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
