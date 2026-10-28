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
    ExternalLink
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

/* ==========================================================================
   DATA STRUCTURES: TUTORIALS & EXPANDED FAQS
   ========================================================================== */

interface TutorialItem {
    id: string;
    category: string;
    title: string;
    duration: string;
    level: string;
    summary: string;
    steps: string[];
    icon: React.ElementType;
}

const tutorialsData: TutorialItem[] = [
    {
        id: "tut-1",
        category: "Algo & Quant",
        title: "Connecting Broker APIs With Sub-0.1ms WebSockets",
        duration: "6 Mins Read",
        level: "Intermediate",
        summary: "Step-by-step architectural guide on establishing low-latency order routing with Angel One, Zerodha, and Dhan APIs.",
        steps: [
            "Initialize high-speed WebSocket streamer in C++ / Python",
            "Configure memory-buffer ring queues to prevent tick dropping",
            "Implement automated risk-check before order dispatch",
            "Deploy with sub-millisecond execution logs verification"
        ],
        icon: Zap
    },
    {
        id: "tut-2",
        category: "Web & SaaS",
        title: "Optimizing Next.js 15 App Router For 100/100 Vitals",
        duration: "8 Mins Read",
        level: "Advanced",
        summary: "How our squads engineer sub-100ms Largest Contentful Paint (LCP) and zero layout shifts on enterprise SaaS applications.",
        steps: [
            "Leverage React Server Components (RSC) to minimize JS bundle",
            "Preload critical fonts with modern CSS variable tokens",
            "Implement edge-cached dynamic database queries",
            "Continuous automated Core Web Vitals profiling"
        ],
        icon: Globe
    },
    {
        id: "tut-3",
        category: "Security & IP",
        title: "100% IP Handover & NDA Legal Transfer Protocol",
        duration: "4 Mins Read",
        level: "Overview",
        summary: "A transparent walkthrough of how legal ownership, Git repositories, and architecture documentation are transferred on Day 1.",
        steps: [
            "Mutual NDA & Master Services Agreement execution",
            "Direct GitHub repository transfer to your organization",
            "Database schema scripts and secrets key rotation",
            "Turnkey documentation and engineering handoff video"
        ],
        icon: ShieldCheck
    },
    {
        id: "tut-4",
        category: "Cloud & DevOps",
        title: "Zero-Downtime PostgreSQL Migrations on AWS Docker",
        duration: "7 Mins Read",
        level: "Advanced",
        summary: "Architecting automated CI/CD deployment pipelines with zero downtime and automatic database rollbacks.",
        steps: [
            "Dual-write schema migrations using Prisma / Drizzle ORM",
            "Docker multi-stage builds with ultra-lean image footprints",
            "Automated health checks and graceful container shutdowns",
            "CloudWatch & Sentry proactive error alerting"
        ],
        icon: Server
    }
];

interface FAQCategoryItem {
    id: string;
    category: string;
    question: string;
    answer: string;
    icon: React.ElementType;
}

const allFaqsData: FAQCategoryItem[] = [
    {
        id: "faq-algo-1",
        category: "Algo & Quant",
        question: "How does Uvicon achieve sub-0.1ms execution latency in algo systems?",
        answer: "Our quant engines are engineered in high-performance C++ and Python with asynchronous memory buffers, zero-allocation serialization, and direct WebSocket hooks to official Indian broker APIs (Angel One, Zerodha, Dhan, Fyers, Alice Blue).",
        icon: Zap
    },
    {
        id: "faq-algo-2",
        category: "Algo & Quant",
        question: "Can you build custom backtesting engines against multi-year tick data?",
        answer: "Yes. We build deterministic backtesting engines capable of processing multi-gigabyte tick-by-tick historical datasets, generating detailed slippage analytics, drawdown curves, and Sharpe ratios.",
        icon: Cpu
    },
    {
        id: "faq-web-1",
        category: "Web & SaaS",
        question: "What is your primary technology stack for web applications?",
        answer: "We specialize in Next.js 15 App Router, TypeScript, React 19, Tailwind CSS, PostgreSQL, Redis, and Cloudflare edge networks. Every platform is custom-built without bloated generic templates.",
        icon: Globe
    },
    {
        id: "faq-web-2",
        category: "Web & SaaS",
        question: "How do you ensure 100/100 Google Lighthouse scores on web apps?",
        answer: "We utilize Server-Side Rendering (SSR), asset compression (AVIF/WebP), responsive image srcset, font display swaps, and zero unused CSS/JS to guarantee sub-100ms LCP and zero Cumulative Layout Shift (CLS).",
        icon: Sparkles
    },
    {
        id: "faq-ip-1",
        category: "Security & IP",
        question: "Do clients receive 100% full source code ownership legally?",
        answer: "Yes. 100% of all intellectual property, source code, database architectures, graphics, and deployment scripts are transferred directly to your organization under a legally binding Non-Disclosure Agreement (NDA).",
        icon: ShieldCheck
    },
    {
        id: "faq-ip-2",
        category: "Security & IP",
        question: "What security and compliance standards do you enforce?",
        answer: "We enforce end-to-end SSL/TLS encryption, automated CI/CD security vulnerability scanners, ACID database compliance, and strict role-based access control across all custom software and fintech backends.",
        icon: Lock
    },
    {
        id: "faq-sla-1",
        category: "SLA & Delivery",
        question: "What is covered under the 90-Day Post-Launch SLA Warranty?",
        answer: "The 90-day warranty covers proactive server monitoring, priority bug fixes, security patches, and performance optimizations within the agreed project scope at zero additional cost.",
        icon: Award
    },
    {
        id: "faq-sla-2",
        category: "SLA & Delivery",
        question: "How do you structure sprint milestones and billing?",
        answer: "We work on fixed-scope agile sprints with bi-weekly live staging demos. You only approve payments upon milestone completion and live code verification, eliminating surprise billing.",
        icon: CalendarCheck2
    }
];

export default function FaqsClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const categories = ["All", "Algo & Quant", "Web & SaaS", "Security & IP", "SLA & Delivery"];

    const filteredFaqs = useMemo(() => {
        return allFaqsData.filter((faq) => {
            const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
            const matchesSearch =
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    const filteredTutorials = useMemo(() => {
        if (selectedCategory === "All") return tutorialsData;
        return tutorialsData.filter((tut) => tut.category === selectedCategory);
    }, [selectedCategory]);

    const toggleFaq = (id: string) => {
        setOpenFaqId((prev) => (prev === id ? null : id));
    };

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
               SECTION 1: HERO SECTION — DEVELOPER ACADEMY & KNOWLEDGE ENGINE
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
                    <div className="max-w-4xl mx-auto text-center mb-8">
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl mb-4 shadow-xs"
                        >
                            <BookOpen className="w-4 h-4 text-[#FFC050]" />
                            <span>DEVELOPER KNOWLEDGE BASE & VIDEO GUIDES</span>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="relative w-full mb-4">
                            <span className="text-[36px] sm:text-[64px] lg:text-[110px] xl:text-[130px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-hero leading-none font-[family-name:var(--font-heading-main)] block -mb-2 sm:-mb-4 opacity-80 whitespace-nowrap">
                                ACADEMY
                            </span>
                            <h1 className="text-[28px] sm:text-[42px] lg:text-[50px] xl:text-[56px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] drop-shadow-sm">
                                Developer Documentation, Broker APIs & FAQs
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.65] max-w-3xl mx-auto font-[family-name:var(--font-body)] mb-7"
                        >
                            Instant answers to questions on broker latency, Next.js architecture, 100% IP rights, and SLAs.
                        </motion.p>

                        {/* Interactive Search Bar */}
                        <motion.div variants={fadeInUp} className="w-full max-w-2xl mx-auto relative mb-4">
                            <div className="relative flex items-center">
                                <Search className="w-5 h-5 text-[#00595C] dark:text-[#FFC050] absolute left-4 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search tutorials, broker APIs, sub-0.1ms latency, 100% IP rights..."
                                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/90 dark:bg-[#001D1F]/90 border border-[#003D3F]/20 dark:border-white/20 text-sm font-semibold text-[#003D3F] dark:text-white placeholder-[#003D3F]/40 dark:placeholder-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                />
                            </div>
                        </motion.div>

                        {/* Clickable Quick Query Chips */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
                            <span className="font-bold text-[#003D3F]/60 dark:text-white/60 mr-1">Quick Search:</span>
                            {[
                                "Sub-0.1ms",
                                "Next.js",
                                "100% IP",
                                "Security",
                                "90-Day SLA",
                                "WebSockets"
                            ].map((chip) => (
                                <button
                                    key={chip}
                                    onClick={() => setSearchQuery(chip)}
                                    className="px-2.5 py-1 rounded-lg bg-white/70 dark:bg-white/10 hover:bg-[#FFC050]/20 text-[#00595C] dark:text-[#3FC1B8] font-bold border border-[#00595C]/15 dark:border-white/10 transition-colors cursor-pointer"
                                >
                                    #{chip}
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    {/* 3 Quick-Start Guide Cards in Hero */}
                    <motion.div variants={fadeInUp} className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[
                            {
                                icon: Zap,
                                tag: "High-Frequency Algo",
                                title: "Connecting Broker APIs With Sub-0.1ms WebSockets",
                                time: "6 Mins Read"
                            },
                            {
                                icon: Globe,
                                tag: "Web & SaaS",
                                title: "Optimizing Next.js 15 App Router For 100/100 Vitals",
                                time: "8 Mins Read"
                            },
                            {
                                icon: ShieldCheck,
                                tag: "Legal & IP",
                                title: "100% IP Handover & NDA Legal Transfer Protocol",
                                time: "4 Mins Read"
                            }
                        ].map((guide, gIdx) => {
                            const GuideIcon = guide.icon;
                            return (
                                <div
                                    key={gIdx}
                                    className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#001D1F]/80 backdrop-blur-xl border border-[#003D3F]/15 dark:border-white/10 shadow-sm flex items-start gap-3.5 text-left group hover:border-[#FFC050]/60 transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#00595C]/10 dark:bg-[#FFC050]/15 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] group-hover:scale-110 transition-transform shrink-0">
                                        <GuideIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase text-[#00595C] dark:text-[#3FC1B8]">
                                                {guide.tag}
                                            </span>
                                            <span className="text-[10px] font-bold text-[#003D3F]/50 dark:text-white/50">
                                                {guide.time}
                                            </span>
                                        </div>
                                        <h3 className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white leading-snug group-hover:text-[#00595C] dark:group-hover:text-[#FFC050] transition-colors">
                                            {guide.title}
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 2: INTERACTIVE STEP-BY-STEP TUTORIALS GRID
               ===================================================================== */}
            {filteredTutorials.length > 0 && (
                <section className="w-full relative pt-4 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-16 z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-left mb-6 flex items-center justify-between">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Featured Developer Guides & Walkthroughs
                            </h2>
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 text-[#00595C] dark:text-[#FFC050]">
                                {filteredTutorials.length} Guides Available
                            </span>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            {filteredTutorials.map((tut) => {
                                const TutIcon = tut.icon;
                                return (
                                    <div
                                        key={tut.id}
                                        className="bg-white/90 dark:bg-[#001D1F]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 border border-[#003D3F]/15 dark:border-white/10 shadow-lg flex flex-col justify-between group hover:border-[#FFC050]/50 transition-all"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 text-[#00595C] dark:text-[#FFC050]">
                                                    {tut.category}
                                                </span>
                                                <div className="flex items-center gap-2 text-xs font-semibold text-[#003D3F]/60 dark:text-white/60">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{tut.duration}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2">
                                                {tut.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)] mb-4">
                                                {tut.summary}
                                            </p>

                                            <div className="space-y-1.5 pt-3 border-t border-[#003D3F]/10 dark:border-white/10">
                                                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8] mb-2">
                                                    Key Implementation Steps:
                                                </h4>
                                                {tut.steps.map((st, sIdx) => (
                                                    <div key={sIdx} className="flex items-start gap-2 text-xs font-semibold text-[#003D3F] dark:text-white">
                                                        <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0 mt-0.5" />
                                                        <span>{st}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                            <span className="text-xs font-bold text-[#00595C] dark:text-[#3FC1B8]">
                                                {tut.level} Level
                                            </span>
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00595C] dark:text-[#FFC050] hover:underline"
                                            >
                                                <span>Request Implementation</span>
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* =====================================================================
               SECTION 3: 2-COLUMN DYNAMIC ACCORDION FAQS
               ===================================================================== */}
            <section className="w-full relative pt-4 pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                            Frequently Asked Questions ({filteredFaqs.length})
                        </h2>
                    </div>

                    {filteredFaqs.length === 0 ? (
                        <div className="p-8 rounded-3xl bg-white/70 dark:bg-white/5 text-center text-sm font-semibold">
                            No matching FAQs found for &ldquo;{searchQuery}&rdquo;. Try another search term.
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4.5 mb-12">
                            {filteredFaqs.map((faq) => {
                                const isOpen = openFaqId === faq.id;
                                const IconComponent = faq.icon || HelpCircle;

                                return (
                                    <div
                                        key={faq.id}
                                        className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                                            isOpen
                                                ? "bg-white/90 dark:bg-[#001D1F]/90 border-[#00595C]/35 dark:border-[#FFC050]/40 shadow-md"
                                                : "bg-white/70 dark:bg-[#001719]/75 border-[#003D3F]/10 dark:border-white/[0.07] hover:border-[#00595C]/25 dark:hover:border-white/20"
                                        } backdrop-blur-md self-start text-left`}
                                    >
                                        <button
                                            onClick={() => toggleFaq(faq.id)}
                                            className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#FFC050]/50 cursor-pointer"
                                            aria-expanded={isOpen}
                                        >
                                            <div className="flex items-center gap-3 min-w-0 pr-1">
                                                <div
                                                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                                        isOpen
                                                            ? "bg-[#00595C] text-[#FFC050] dark:bg-[#FFC050] dark:text-[#002829]"
                                                            : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-[#FFC050]"
                                                    } transition-colors duration-300`}
                                                >
                                                    <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                                </div>
                                                <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                                    {faq.question}
                                                </h3>
                                            </div>
                                            <div
                                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                                    isOpen
                                                        ? "bg-[#00595C]/15 text-[#00595C] dark:bg-[#FFC050]/20 dark:text-[#FFC050] rotate-180"
                                                        : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/60 dark:text-white/60"
                                                }`}
                                            >
                                                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] border-t border-[#003D3F]/8 dark:border-white/8">
                                                        <p className="pt-2.5">{faq.answer}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Direct Consultation Help Desk */}
                    <div className="bg-gradient-to-b from-white/95 via-white/85 to-white/75 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-10 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8]">
                                Dedicated Architecture Support
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mt-1">
                                Still Have Unanswered Technical Questions?
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 mt-1 font-[family-name:var(--font-body)]">
                                Speak directly with our Lead Architects. Guaranteed response within 15 minutes during market hours.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 shrink-0"
                        >
                            <Mail className="w-4 h-4" />
                            <span>Schedule Consultation</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
