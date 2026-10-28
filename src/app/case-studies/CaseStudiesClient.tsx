"use client";

import React, { useState, useMemo } from "react";
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
    ChevronDown,
    ChevronUp,
    Users,
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Check,
    Globe,
    Lock,
    CalendarCheck2,
    HelpCircle,
    BadgeCheck,
    Headphones,
    FileSignature,
    CheckCheck,
    Building2,
    Compass,
    Radio,
    BookOpen,
    Code2,
    Search,
    PlayCircle,
    FileText,
    Terminal,
    Layers,
    Server,
    Smartphone,
    Cpu,
    ExternalLink,
    Briefcase,
    TrendingUp
} from "lucide-react";

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
   DATA STRUCTURES: CASE STUDIES DATA
   ========================================================================== */

interface CaseStudy {
    id: string;
    title: string;
    clientType: string;
    category: string;
    timeline: string;
    metrics: { label: string; value: string }[];
    problem: string;
    solution: string;
    techStack: string[];
    image: string;
    badge: string;
}

const caseStudiesData: CaseStudy[] = [
    {
        id: "case-1",
        title: "Uvicon Pro: Deterministic Sub-0.1ms Multi-Broker Algo Gateway",
        clientType: "Proprietary Trading Firm & 10,000+ Active Quant Traders",
        category: "Algo & Quant",
        timeline: "4 Weeks Delivery",
        metrics: [
            { label: "Execution Latency", value: "< 0.1ms" },
            { label: "Broker APIs Connected", value: "5+ Brokers" },
            { label: "System Uptime", value: "99.99%" }
        ],
        problem:
            "The client struggled with third-party charting lag, order slippage during high-volatility market opening minutes, and broker API rate limits.",
        solution:
            "Engineered a zero-allocation C++ and Python algo engine with asynchronous WebSocket streaming buffers and automated multi-broker order routing.",
        techStack: ["C++", "Python", "WebSockets", "Redis", "Next.js App Router", "PostgreSQL"],
        image: "/assets/images/uvicon-pro-preview.png",
        badge: "Quant Architecture"
    },
    {
        id: "case-2",
        title: "UHMB Enterprise Healthcare & Telemedicine Operations Portal",
        clientType: "Hospital Network & Medical Staff",
        category: "Web & SaaS",
        timeline: "5 Weeks Delivery",
        metrics: [
            { label: "Google Lighthouse", value: "100 / 100" },
            { label: "Check-in Velocity", value: "3.5x Faster" },
            { label: "Data Encryption", value: "HIPAA Grade" }
        ],
        problem:
            "Legacy hospital software caused long patient wait times, fragmented doctor schedules, and unreliable appointment synchronization across branches.",
        solution:
            "Designed a Next.js 15 SSR healthcare portal with real-time room booking, encrypted patient records, and automated SMS/WhatsApp alerts.",
        techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Docker"],
        image: "/assets/images/uhmb-services-preview.png",
        badge: "Enterprise SaaS"
    },
    {
        id: "case-3",
        title: "Next-Gen Fintech & Crypto Trading Mobile Application",
        clientType: "Fintech Startup & Crypto Investors",
        category: "Mobile Apps",
        timeline: "6 Weeks Delivery",
        metrics: [
            { label: "App UI Frame Rate", value: "60 FPS Retina" },
            { label: "App Store Rating", value: "4.9 ★" },
            { label: "Cold Start Time", value: "< 0.8s" },
        ],
        problem:
            "Slow hybrid mobile apps with sluggish charts and frequent authentication disconnects caused high user drop-offs.",
        solution:
            "Built a high-performance cross-platform application with native biometrics, offline SQLite state caching, and live WebSockets candlestick charts.",
        techStack: ["Flutter", "Dart", "WebSockets", "SQLite", "Firebase", "Node.js"],
        image: "/assets/images/FinTech-Apps.avif",
        badge: "Mobile Fintech"
    },
    {
        id: "case-4",
        title: "Autonomous AI Agent Orchestration & Document Extraction",
        clientType: "Corporate Compliance & Financial Auditing",
        category: "AI & Agents",
        timeline: "3 Weeks Delivery",
        metrics: [
            { label: "Manual Effort Reduction", value: "85%" },
            { label: "Extraction Accuracy", value: "99.4%" },
            { label: "Processing Speed", value: "< 2.5s / Doc" },
        ],
        problem:
            "Manual auditing of multi-page invoices and financial balance sheets was creating severe operational bottlenecks and human data entry errors.",
        solution:
            "Deployed an autonomous multi-agent RAG workflow with vector database embedding search and structured JSON schema validations.",
        techStack: ["Python", "FastAPI", "Vector DB", "LangChain", "Next.js", "Docker"],
        image: "/assets/images/Ai-Agents.avif",
        badge: "AI Automation"
    }
];

export default function CaseStudiesClient() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [activeStudyId, setActiveStudyId] = useState<string | null>(null);

    const categories = ["All", "Algo & Quant", "Web & SaaS", "Mobile Apps", "AI & Agents"];

    const filteredStudies = useMemo(() => {
        if (selectedCategory === "All") return caseStudiesData;
        return caseStudiesData.filter((cs) => cs.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* Unified Background Canvas */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
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
               SECTION 1: HERO SECTION — ASYMMETRIC BENCHMARK HUD COCKPIT
               ===================================================================== */}
            <section className="w-full relative pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-16 z-10">
                {/* 3D Glass Bolt Accents */}
                <div className="absolute top-10 right-4 sm:right-12 w-28 sm:w-44 lg:w-56 pointer-events-none z-0 opacity-45 dark:opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={240}
                        height={240}
                        className="w-full h-auto object-contain transform rotate-15"
                    />
                </div>
                <div className="absolute top-16 left-4 sm:left-12 w-24 sm:w-36 lg:w-48 pointer-events-none z-0 opacity-40 dark:opacity-65 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={200}
                        height={200}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                <motion.div
                    className="max-w-7xl mx-auto relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* LEFT COLUMN: BENCHMARK NARRATIVE & FILTERS (7 Cols) */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl mb-4 shadow-xs"
                            >
                                <Award className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span>VERIFIED PRODUCTION BENCHMARKS & PROOF</span>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="relative w-full mb-4">
                                <span className="text-[38px] sm:text-[60px] lg:text-[100px] xl:text-[120px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] block -mb-2 sm:-mb-4 opacity-80 whitespace-nowrap">
                                    METRICS
                                </span>
                                <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] xl:text-[54px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] lg:leading-[1.1] drop-shadow-sm">
                                    Real Systems Engineered For High-Growth Leaders
                                </h1>
                            </motion.div>

                            <motion.p
                                variants={fadeInUp}
                                className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[17px] leading-[1.65] font-[family-name:var(--font-body)] mb-6 max-w-2xl"
                            >
                                We judge our code by raw production benchmarks — sub-0.1ms latency, 100/100 Core Web Vitals, and 99.99% uptime with 100% intellectual property ownership transferred under NDA.
                            </motion.p>

                            {/* Category Filter Tabs */}
                            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2">
                                {categories.map((cat) => {
                                    const isSelected = selectedCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer focus:outline-none ${
                                                isSelected
                                                    ? "bg-[#00595C] dark:bg-[#FFC050] text-white dark:text-[#002829] shadow-md scale-105"
                                                    : "bg-white/80 dark:bg-white/10 text-[#003D3F] dark:text-white hover:bg-white dark:hover:bg-white/20 border border-[#003D3F]/15 dark:border-white/10"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: 4-QUADRANT BENCHMARK HUD (5 Cols) */}
                        <div className="lg:col-span-5">
                            <motion.div
                                variants={fadeInUp}
                                className="grid grid-cols-2 gap-3.5 sm:gap-4 p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-[#001D1F]/90 backdrop-blur-2xl border border-[#003D3F]/15 dark:border-white/15 shadow-xl text-left"
                            >
                                <div className="p-4 rounded-2xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <Zap className="w-5 h-5 text-[#00595C] dark:text-[#FFC050]" />
                                        <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">Verified</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        &lt; 0.1ms
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        Algo Order Latency
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <Globe className="w-5 h-5 text-[#00595C] dark:text-[#FFC050]" />
                                        <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">100% Score</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        100 / 100
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        Google Lighthouse
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <Server className="w-5 h-5 text-[#00595C] dark:text-[#FFC050]" />
                                        <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">SLA Active</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        99.99%
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        Production Uptime
                                    </span>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                    <div className="flex items-center justify-between mb-2">
                                        <ShieldCheck className="w-5 h-5 text-[#00595C] dark:text-[#FFC050]" />
                                        <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400">NDA Legal</span>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                        100% IP
                                    </span>
                                    <span className="text-[11px] font-semibold text-[#003D3F]/70 dark:text-white/70">
                                        Direct Git Handover
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 2: CASE STUDIES SPOTLIGHT CARDS
               ===================================================================== */}
            <section className="w-full relative pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">
                    {filteredStudies.map((study) => (
                        <motion.div
                            key={study.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={cardVariant}
                            className="w-full bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/20 dark:border-white/15 backdrop-blur-2xl shadow-xl flex flex-col lg:flex-row gap-8 items-center text-left relative overflow-hidden group"
                        >
                            {/* Left: Real Project Image Preview */}
                            <div className="w-full lg:w-1/2 aspect-[16/10] relative rounded-2xl overflow-hidden border border-[#003D3F]/15 dark:border-white/15 shadow-md group-hover:scale-[1.02] transition-transform duration-500 shrink-0">
                                <Image
                                    src={study.image}
                                    alt={study.title}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#FFC050] text-[11px] font-extrabold uppercase tracking-wider border border-white/20">
                                    {study.badge}
                                </div>
                                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#00595C]/80 backdrop-blur-md text-white text-[10px] font-bold">
                                    {study.timeline}
                                </div>
                            </div>

                            {/* Right: Narrative, Problem, Solution & Metrics */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-[#00595C] dark:text-[#3FC1B8]">
                                            {study.clientType}
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-3">
                                        {study.title}
                                    </h3>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#00595C]/6 dark:bg-white/5 border border-[#00595C]/10 dark:border-white/10 mb-4">
                                        {study.metrics.map((m, mIdx) => (
                                            <div key={mIdx} className="text-center">
                                                <span className="text-base sm:text-lg font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)] block">
                                                    {m.value}
                                                </span>
                                                <span className="text-[10px] sm:text-[11px] font-semibold text-[#003D3F]/70 dark:text-white/70">
                                                    {m.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 mb-4">
                                        <p>
                                            <strong className="text-[#003D3F] dark:text-white">Challenge:</strong> {study.problem}
                                        </p>
                                        <p>
                                            <strong className="text-[#003D3F] dark:text-white">Solution:</strong> {study.solution}
                                        </p>
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 mb-5">
                                        {study.techStack.map((tech, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/10 text-[11px] font-semibold text-[#003D3F] dark:text-white border border-[#003D3F]/10 dark:border-white/10"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href="/contact"
                                    className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Build Similar Architecture</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
