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
    ChevronDown,
    ChevronUp,
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
    Image as ImageIcon,
    Mail,
    FileCode2,
    Check,
    Flame,
    Radio,
    Shield,
    Database,
    Binary,
    Network,
    BookOpen,
    Eye
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
   DATA STRUCTURES
   ========================================================================== */

interface MetricItem {
    value: string;
    label: string;
    sublabel: string;
    icon: React.ElementType;
}

const keyMetrics: MetricItem[] = [
    {
        value: "4+",
        label: "Core Specializations",
        sublabel: "Web, Mobile, Custom Software & Algo",
        icon: Layers
    },
    {
        value: "< 0.1ms",
        label: "Engine Latency",
        sublabel: "Quant algorithmic speed",
        icon: Zap
    },
    {
        value: "100%",
        label: "IP & Code Transfer",
        sublabel: "Zero vendor lock-in",
        icon: ShieldCheck
    },
    {
        value: "99.99%",
        label: "Cloud Reliability",
        sublabel: "High-throughput uptime",
        icon: Server
    }
];

interface CoreValue {
    id: string;
    title: string;
    tagline: string;
    description: string;
    badge: string;
    icon: React.ElementType;
    highlights: string[];
    span: string;
}

const coreValues: CoreValue[] = [
    {
        id: "engineering-precision",
        title: "Engineering Without Compromise",
        tagline: "Sub-second speed & zero tech debt",
        description:
            "Software craftsmanship as an exacting discipline. Every line of TypeScript, Python, or Swift is engineered for maximum throughput and clean modularity.",
        badge: "Clean Architecture",
        icon: Cpu,
        highlights: [
            "Strict TypeScript & Static Typing",
            "100/100 Lighthouse Performance Vitals",
            "Automated CI/CD Test Coverage",
            "Zero-Bundle Bloat Standards"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "ip-ownership",
        title: "100% IP & Client Ownership",
        tagline: "Your product, your code, your assets",
        description:
            "100% source code, database architectures, and design tokens legally transferred upon milestone completion with zero lock-in.",
        badge: "Zero Lock-in",
        icon: ShieldCheck,
        highlights: [
            "Strict NDA From Day One",
            "Full Git Repository Handover",
            "Comprehensive Architecture Docs",
            "No Hidden Licensing Fees"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "quant-innovation",
        title: "Low-Latency & Quant Innovation",
        tagline: "Institutional-grade financial tech",
        description:
            "From multi-broker algorithmic execution engines to real-time WebSockets, we engineer robust trading software for extreme speed.",
        badge: "Fintech Precision",
        icon: TrendingUp,
        highlights: [
            "Multi-Broker API Connectivity",
            "Automated Strategy Backtesting",
            "ACID SQL Transaction Integrity",
            "Strict Compliance & Zero-Hype Logic"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "agile-partnership",
        title: "Transparent Agile Partnership",
        tagline: "Predictable delivery with zero surprises",
        description:
            "Collaborating as technical co-founders with bi-weekly staging demos, sprint reviews, and guaranteed post-launch SLA warranties.",
        badge: "Agile Sprints",
        icon: HeartHandshake,
        highlights: [
            "Bi-Weekly Staging Demos",
            "Fixed-Scope Milestone Deliverables",
            "90-Day Post-Launch SLA Warranty",
            "Direct Slack/WhatsApp Tech Lead Access"
        ],
        span: "lg:col-span-7"
    }
];

interface Discipline {
    id: string;
    name: string;
    shortDesc: string;
    icon: React.ElementType;
    stack: string[];
    capabilities: string[];
}

const engineeringDisciplines: Discipline[] = [
    {
        id: "software",
        name: "Custom Software & Backends",
        shortDesc: "High-concurrency microservices, distributed systems, and custom internal SaaS tooling.",
        icon: Code2,
        stack: ["Python", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
        capabilities: [
            "Microservices Architecture",
            "Event-Driven Message Queues",
            "Automated ETL Data Pipelines",
            "Role-Based Access Control (RBAC)"
        ]
    },
    {
        id: "web",
        name: "Next.js Web Applications",
        shortDesc: "Lightning-fast, conversion-engineered SSR applications and interactive SaaS dashboards.",
        icon: Globe,
        stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL"],
        capabilities: [
            "Server-Side Rendering (SSR)",
            "Glassmorphism Design Systems",
            "GEO & SEO Schema Automation",
            "Sub-100ms Largest Contentful Paint"
        ]
    },
    {
        id: "mobile",
        name: "Native & Mobile Apps",
        shortDesc: "60fps retina mobile applications engineered for iOS and Android with offline caching.",
        icon: Smartphone,
        stack: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
        capabilities: [
            "Native Apple & Android Hardware Access",
            "Biometric Authentication",
            "Offline-First SQLite Sync",
            "Automated App Store CI/CD"
        ]
    },
    {
        id: "quant",
        name: "Algo Trading Systems",
        shortDesc: "Low-latency order routing hooks, strategy backtesters, and real-time market data streaming.",
        icon: Zap,
        stack: ["Python", "C++", "WebSockets", "FastAPI", "Pandas", "TimescaleDB"],
        capabilities: [
            "Multi-Broker API Connectors",
            "Historical Strategy Backtesting",
            "Sub-Millisecond Order Routing",
            "Real-Time Risk Monitoring Dashboards"
        ]
    }
];

interface TeamMember {
    id: string;
    name: string;
    role: string;
    tag: string;
    shortSummary: string;
    fullBio: string;
    skills: string[];
    imageSrc?: string;
}

const leadershipTeam: TeamMember[] = [
    {
        id: "lead-arch",
        name: "Executive Leadership & Architecture",
        role: "Chief Technology & Solutions Architecture",
        tag: "System Architecture",
        shortSummary: "Directing distributed system scalability, cloud pipelines, and low-latency architectural frameworks.",
        fullBio: "Leading engineering roadmap, distributed system scalability, and low-latency architectural frameworks across enterprise software and fintech client engagements with strict focus on zero tech debt.",
        skills: ["System Design", "Cloud Infra", "Full-Stack Tech", "Agile Roadmap"]
    },
    {
        id: "lead-quant",
        name: "Quantitative Systems & Algo Engineering",
        role: "Head of Quantitative Software & Backend",
        tag: "Fintech & Quant",
        shortSummary: "Specializing in high-throughput broker integrations and deterministic backtesting engines.",
        fullBio: "Specializing in multi-broker API connectivity, multi-threaded execution pipelines, WebSockets data streaming, and deterministic strategy backtesting infrastructure for algorithmic traders.",
        skills: ["Python AI", "C++ Engines", "WebSockets", "Risk Controls"]
    },
    {
        id: "lead-product",
        name: "UI/UX & Product Design Engineering",
        role: "Head of Digital Experience & Frontend",
        tag: "Design & UX",
        shortSummary: "Championing glassmorphism design systems, micro-interactions, and conversion-optimized UX.",
        fullBio: "Crafting modern glassmorphic design systems, responsive ergonomics, micro-interactions, and high-conversion user interfaces for enterprise web portals and consumer SaaS applications.",
        skills: ["Design Systems", "Next.js UI", "Glassmorphism", "Micro-Motion"]
    },
    {
        id: "lead-mobile",
        name: "Mobile Solutions Engineering",
        role: "Lead Mobile Solutions Architect",
        tag: "Mobile Apps",
        shortSummary: "Building fluid 60fps native iOS, Android, and Flutter experiences with biometric security.",
        fullBio: "Building high-performance 60fps native iOS, Android, and Flutter mobile applications with hardware-level biometric authentication, offline SQLite data synchronization, and automated CI/CD.",
        skills: ["Flutter", "SwiftUI", "Jetpack Compose", "App Store CI/CD"]
    }
];

/* ==========================================================================
   IMAGE PLACEHOLDER COMPONENT (CLEAN, MODULAR & REUSABLE)
   ========================================================================== */

interface ImagePlaceholderProps {
    title: string;
    subtitle: string;
    aspectRatio?: string;
    className?: string;
    badgeText?: string;
    imageSrc?: string;
}

function ImagePlaceholder({
    title,
    subtitle,
    aspectRatio = "aspect-[16/10]",
    className = "",
    badgeText = "Media Showcase",
    imageSrc
}: ImagePlaceholderProps) {
    if (imageSrc) {
        return (
            <div className={`relative w-full overflow-hidden rounded-3xl border border-[#003D3F]/15 dark:border-white/10 shadow-lg ${aspectRatio} ${className}`}>
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            </div>
        );
    }

    return (
        <div
            className={`relative w-full ${aspectRatio} rounded-3xl bg-gradient-to-br from-white/90 via-white/75 to-white/60 dark:from-[#001D1F]/70 dark:via-[#001719]/60 dark:to-[#001214]/70 border-2 border-dashed border-[#003D3F]/20 dark:border-white/20 backdrop-blur-xl flex flex-col items-center justify-center p-6 sm:p-8 text-center group hover:border-[#FFC050]/60 transition-all duration-300 overflow-hidden ${className}`}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00595C]/15 dark:bg-[#FFC050]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/10 border border-[#003D3F]/15 dark:border-white/15 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badgeText}</span>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform duration-300 mb-3 sm:mb-4 shadow-sm">
                    <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] max-w-xs">
                    {title}
                </h4>
                <p className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/70 max-w-sm mt-1 font-[family-name:var(--font-body)]">
                    {subtitle}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#00595C] dark:text-[#3FC1B8] bg-[#00595C]/10 dark:bg-[#3FC1B8]/15 px-3 py-1 rounded-lg border border-[#00595C]/20 dark:border-[#3FC1B8]/25">
                    <span>Drop Image Later • Next.js Ready</span>
                </span>
            </div>
        </div>
    );
}

/* ==========================================================================
   MAIN ABOUT US CLIENT COMPONENT
   ========================================================================== */

export default function AboutUsClient() {
    // Interactive states for expandable content
    const [isStoryExpanded, setIsStoryExpanded] = useState(false);
    const [expandedTeamBio, setExpandedTeamBio] = useState<Record<string, boolean>>({});

    const toggleTeamBio = (id: string) => {
        setExpandedTeamBio((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* =====================================================================
               RESPONSIVE LIGHT & DARK THEME BACKGROUND SYSTEM (HOME & SERVICES EQUIVALENT)
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
                        --hero-glow: radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.85) 30%, rgba(184, 230, 226, 0.4) 60%, transparent 100%);
                    }
                }
                @media (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 70% 40%, rgba(255, 255, 255, 0.98) 0%, rgba(213, 245, 242, 0.85) 25%, rgba(184, 230, 226, 0.45) 50%, transparent 70%);
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
                        --hero-glow: radial-gradient(circle at 75% 25%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 30%, rgba(0, 85, 80, 0.2) 60%, transparent 100%);
                    }
                }
                @media (prefers-color-scheme: dark) and (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 70% 40%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 25%, rgba(0, 85, 80, 0.2) 50%, transparent 70%);
                    }
                }

                /* Explicit .dark class overrides (for manual dark theme toggle support) */
                html.dark {
                    --page-bg: linear-gradient(to bottom,
                        #001214 0px,
                        #001618 50vh,
                        #001A1C 100vh,
                        #001618 150vh,
                        #021213 220vh
                    );
                    --hero-glow: radial-gradient(ellipse at 70% 40%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 25%, rgba(0, 85, 80, 0.2) 50%, transparent 70%);
                }

                /* -------------------------------------------------------------
                   WATERMARK STROKE TAILORED FOR LIGHT & DARK THEMES
                   ------------------------------------------------------------- */
                .stroke-watermark-hero {
                    -webkit-text-stroke: 2px rgba(0, 61, 63, 0.24);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-hero {
                        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.22);
                    }
                }
                html.dark .stroke-watermark-hero {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.22);
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

            {/* Continuous Radial Glow Canvas (Responsive & Seamless in Light & Dark Mode) */}
            <div
                className="absolute top-0 left-0 w-full h-[180vh] pointer-events-none z-0 transition-opacity duration-700"
                style={{
                    background: "var(--hero-glow)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"
                }}
            />

            {/* =====================================================================
               SECTION 1: HERO SECTION
               ===================================================================== */}
            <section className="w-full relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10">
                {/* 3D Glass Bolt 1 Accent Top Right */}
                <div className="absolute top-10 right-0 sm:right-6 lg:right-12 w-32 sm:w-48 lg:w-64 pointer-events-none z-0 opacity-65 dark:opacity-85 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={280}
                        height={280}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                {/* 3D Glass Bolt 2 Accent Bottom Left (Reduced Compact Size) */}
                <div className="absolute bottom-2 -left-2 sm:left-4 w-16 sm:w-24 lg:w-32 pointer-events-none z-0 opacity-45 dark:opacity-70 drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={180}
                        height={180}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                {/* Hero 2-Column Grid Container */}
                <motion.div
                    className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* LEFT COLUMN: Narrative & Info */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        {/* Header Block */}
                        <motion.div variants={fadeInUp} className="relative w-full flex flex-col items-start text-left mb-6">
                            <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center min-h-[0px] lg:min-h-[110px] xl:min-h-[130px]">
                                {/* Main Heading (Watermark) */}
                                <span className="text-[36px] sm:text-[58px] lg:text-[120px] xl:text-[150px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-hero leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-95 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                    ABOUT US
                                </span>

                                {/* Subheading (H1) */}
                                <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] xl:text-[56px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] lg:leading-[1.1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:drop-shadow-md text-left whitespace-normal lg:whitespace-nowrap">
                                    Next-Gen Software & Systems
                                </h1>
                            </div>

                            {/* Paragraph Below Subheading */}
                            <p className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.6] max-w-xl font-[family-name:var(--font-body)] mt-3 sm:mt-4 lg:mt-2 relative z-10 text-left">
                                Engineering custom software, high-conversion web portals, mobile apps, and low-latency algorithmic trading systems with zero compromise.
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 relative z-10 mb-8 w-full sm:w-auto">
                            <Link
                                href="/services"
                                className="px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-[0_8px_20px_rgba(255,192,80,0.3)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.45)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                            >
                                <span>Explore Our Capabilities</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-6 sm:px-7 py-3 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-xl border border-[#003D3F]/20 dark:border-white/20 text-[#003D3F] dark:text-white font-bold text-sm tracking-wide transition-all hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00595C] shadow-sm"
                            >
                                <Mail className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                <span>Schedule Consultation</span>
                            </Link>
                        </motion.div>

                        {/* Key Metrics Strip */}
                        <motion.div variants={fadeInUp} className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 relative z-10">
                            {keyMetrics.map((metric, idx) => {
                                const MetricIcon = metric.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white/85 dark:bg-[#001D1F]/70 backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border border-[#003D3F]/15 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-sm flex flex-col justify-between hover:border-[#00595C]/30 dark:hover:border-[#FFC050]/40 transition-all group"
                                    >
                                        <div className="flex items-center justify-between gap-1.5 mb-1.5">
                                            <span className="text-lg sm:text-xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                                {metric.value}
                                            </span>
                                            <div className="w-6 h-6 rounded-lg bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] group-hover:scale-110 transition-transform">
                                                <MetricIcon className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] sm:text-xs font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                                {metric.label}
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: TEAM GOALS SVG ILLUSTRATION */}
                    <motion.div variants={fadeInUp} className="lg:col-span-5 flex items-center justify-center relative">
                        <div className="relative w-full max-w-[540px] aspect-[750/500] flex items-center justify-center">
                            {/* Ambient Glow behind SVG */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#00595C]/25 via-[#3FC1B8]/20 to-[#FFC050]/20 dark:from-[#00595C]/55 dark:via-[#3FC1B8]/35 dark:to-[#FFC050]/20 rounded-full blur-[70px] pointer-events-none" />

                            {/* SVG Illustration Container */}
                            <div className="relative z-10 w-full h-full p-2 drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/assets/icons/Team goals-bro.svg"
                                    alt="Uvicon Team Goals & Vision"
                                    width={750}
                                    height={500}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 2: OUR ORIGIN & FOUNDATION STORY (RIGHT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 3 Accent on Right */}
                <div className="absolute top-1/4 -right-8 sm:-right-4 w-36 sm:w-56 lg:w-64 opacity-50 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-12 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                {/* 3D Glass Bolt 4 Accent Bottom Left */}
                <div className="absolute -bottom-6 -left-6 sm:left-2 w-32 sm:w-48 lg:w-56 opacity-45 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={240}
                        height={240}
                        className="w-full h-auto object-contain transform -rotate-15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - RIGHT-ALIGNED */}
                    <div className="relative text-right w-full max-w-6xl ml-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col lg:flex-row justify-end items-end lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                OUR STORY
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right whitespace-normal lg:whitespace-nowrap">
                                Built On Engineering Rigor & Modern Design
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl ml-auto text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Bridging the gap between complex algorithmic computational logic and delightful, consumer-grade digital user experiences.
                        </p>
                    </div>

                    {/* 2-Column Story Grid: Left Narrative (Interactive Read More) + Right Media Showcase */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Column: Narrative Content with Read More Toggle */}
                        <div className="lg:col-span-6 flex flex-col items-start gap-3.5 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#3FC1B8]/15 border border-[#00595C]/20 dark:border-[#3FC1B8]/25 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8]">
                                <Target className="w-3.5 h-3.5" />
                                <span>The Uvicon Genesis</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                Why We Founded Uvicon Technologies
                            </h3>

                            {/* Core Punchy Summary */}
                            <p className="text-sm sm:text-base text-[#003D3F]/85 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)]">
                                In modern software development, businesses often choose between pretty interfaces without backend scalability, or fast code with antiquated design. <strong>Uvicon was built to eliminate that compromise.</strong>
                            </p>

                            {/* Expandable Extended Paragraph */}
                            <AnimatePresence>
                                {isStoryExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm sm:text-base text-[#003D3F]/85 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] pt-1">
                                            We assembled a tight-knit collective of quantitative software architects, full-stack Next.js developers, and UI/UX designers dedicated to building mission-critical digital products. Whether engineering sub-0.1ms order routing engines or consumer web apps, we uphold the same unbending standards of performance, security, and beauty.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Read More / Read Less Toggle Button */}
                            <button
                                onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#003D3F]/6 dark:bg-white/10 hover:bg-[#003D3F]/12 dark:hover:bg-white/15 text-xs sm:text-sm font-bold text-[#00595C] dark:text-[#FFC050] transition-colors focus:outline-none cursor-pointer"
                                aria-expanded={isStoryExpanded}
                            >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{isStoryExpanded ? "Show Less" : "Read Full Story"}</span>
                                {isStoryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {/* Visual Bullet Pillars */}
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                                {[
                                    "Zero Technical Debt Architecture",
                                    "100% IP & Codebase Transfer",
                                    "Agile Sprints & Staging Demos",
                                    "Transparent Milestone Governance"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white shadow-xs">
                                        <CheckCircle2 className="w-4 h-4 text-[#FFC050] shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Studio Media Showcase */}
                        <div className="lg:col-span-6 flex flex-col items-center">
                            <ImagePlaceholder
                                title="Uvicon Tech Studio & Engineering Hub"
                                subtitle="Where custom software, algorithmic engines, and Next.js applications are crafted with precision."
                                badgeText="Studio & Culture"
                                aspectRatio="aspect-[4/3]"
                                className="shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 3: CORE VALUES & PHILOSOPHY (LEFT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 1 Accent Top Left */}
                <div className="absolute -top-10 -left-6 sm:left-4 w-32 sm:w-48 lg:w-60 opacity-45 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-12 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                {/* 3D Glass Bolt 2 Accent Bottom Right */}
                <div className="absolute -bottom-8 -right-6 sm:right-4 w-32 sm:w-48 lg:w-60 opacity-45 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Right"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-18 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - LEFT-ALIGNED */}
                    <div className="relative text-left w-full max-w-6xl mr-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                OUR VALUES
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left whitespace-normal lg:whitespace-nowrap">
                                Four Pillars Guiding Every Line of Code
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mr-auto text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our philosophy is rooted in long-term technical value, radical client transparency, and relentless focus on end-user impact.
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
                                    {/* Corner Radial Glow */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-2xl pointer-events-none" />

                                    <div>
                                        {/* Card Header Badge & Icon */}
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
                                            {val.description}
                                        </p>
                                    </div>

                                    {/* Highlights Pills */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 pt-3.5 border-t border-[#003D3F]/10 dark:border-white/10">
                                        {val.highlights.map((high, hIdx) => (
                                            <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-[#003D3F]/90 dark:text-white/90">
                                                <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                                <span className="truncate">{high}</span>
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
               SECTION 4: ENGINEERING DISCIPLINES (RIGHT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 4 Accent Top Right */}
                <div className="absolute top-4 -right-8 sm:-right-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                {/* 3D Glass Bolt 3 Accent Bottom Left */}
                <div className="absolute -bottom-8 -left-8 sm:-left-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-20 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block - RIGHT-ALIGNED */}
                    <div className="relative text-right w-full max-w-6xl ml-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col lg:flex-row justify-end items-end lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                DISCIPLINES
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right whitespace-normal lg:whitespace-nowrap">
                                Our 4 Core Engineering Practices
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl ml-auto text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            From frontend micro-animations to bare-metal financial order routing, our multidisciplinary pods work in harmony.
                        </p>
                    </div>

                    {/* Discipline Cards Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {engineeringDisciplines.map((disc) => {
                            const DiscIcon = disc.icon;
                            return (
                                <motion.div
                                    key={disc.id}
                                    variants={cardVariant}
                                    className="bg-white/85 dark:bg-[#001D1F]/75 backdrop-blur-xl rounded-3xl p-6 border border-[#003D3F]/15 dark:border-white/10 shadow-[0_10px_25px_rgba(0,61,63,0.05)] dark:shadow-none hover:border-[#00595C]/40 dark:hover:border-[#FFC050]/40 transition-all flex flex-col justify-between group relative overflow-hidden text-left"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform mb-4">
                                            <DiscIcon className="w-6 h-6" />
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-1.5">
                                            {disc.name}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)] mb-4">
                                            {disc.shortDesc}
                                        </p>

                                        {/* Capabilities List */}
                                        <div className="flex flex-col gap-1.5 mb-4">
                                            {disc.capabilities.map((cap, cIdx) => (
                                                <div key={cIdx} className="flex items-start gap-1.5 text-xs text-[#003D3F]/85 dark:text-white/85 font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC050] mt-1.5 shrink-0" />
                                                    <span>{cap}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div className="pt-4 border-t border-[#003D3F]/10 dark:border-white/10">
                                        <div className="flex flex-wrap gap-1.5">
                                            {disc.stack.map((st) => (
                                                <span key={st} className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-[#00595C]/10 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8]">
                                                    {st}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 5: LEADERSHIP (LEFT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 4 Accent Bottom Left */}
                <div className="absolute bottom-6 -left-10 sm:-left-6 w-36 sm:w-56 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-12 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                {/* 3D Glass Bolt 1 Accent Top Right */}
                <div className="absolute top-4 -right-8 sm:-right-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0">
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
                                LEADERSHIP
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left whitespace-normal lg:whitespace-nowrap">
                                Built By Engineers & Systems Architects
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mr-auto text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Meet the specialized minds driving Uvicon&apos;s architectural innovation, quant execution, and digital craft.
                        </p>
                    </div>

                    {/* Team Grid with Photo/Avatar Placeholders & Read Bio Toggle */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {leadershipTeam.map((member) => {
                            const isBioOpen = !!expandedTeamBio[member.id];
                            return (
                                <motion.div
                                    key={member.id}
                                    variants={cardVariant}
                                    className="bg-white/85 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#003D3F]/15 dark:border-white/10 shadow-[0_10px_25px_rgba(0,61,63,0.05)] dark:shadow-none hover:border-[#FFC050]/50 transition-all flex flex-col justify-between group relative overflow-hidden text-left"
                                >
                                    <div>
                                        {/* Avatar / Portrait Placeholder */}
                                        <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-[#003D3F]/8 via-[#00595C]/12 to-[#FFC050]/15 dark:from-white/10 dark:via-white/5 dark:to-[#FFC050]/10 border-2 border-dashed border-[#003D3F]/20 dark:border-white/15 flex flex-col items-center justify-center p-4 text-center group-hover:border-[#FFC050]/60 transition-all mb-4 overflow-hidden">
                                            {member.imageSrc ? (
                                                <Image
                                                    src={member.imageSrc}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover object-center"
                                                />
                                            ) : (
                                                <>
                                                    <div className="w-14 h-14 rounded-full bg-[#00595C]/15 dark:bg-[#FFC050]/20 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] mb-2 shadow-inner">
                                                        <Users className="w-7 h-7" />
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                                        {member.tag}
                                                    </span>
                                                    <span className="text-[9px] text-[#003D3F]/60 dark:text-white/60 mt-0.5">
                                                        Photo Ready
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Name & Role */}
                                        <h3 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#00595C] dark:text-[#3FC1B8] mt-0.5 mb-2">
                                            {member.role}
                                        </p>
                                        
                                        {/* Short Summary (Snappy 1-2 lines) */}
                                        <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
                                            {isBioOpen ? member.fullBio : member.shortSummary}
                                        </p>

                                        {/* Read Bio Toggle */}
                                        <button
                                            onClick={() => toggleTeamBio(member.id)}
                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00595C] dark:text-[#FFC050] hover:underline mt-2 focus:outline-none cursor-pointer"
                                        >
                                            <span>{isBioOpen ? "Show Less" : "Read Bio"}</span>
                                            {isBioOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                        </button>
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="mt-4 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex flex-wrap gap-1">
                                        {member.skills.map((skill) => (
                                            <span key={skill} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-[#003D3F]/8 dark:bg-white/10 text-[#003D3F] dark:text-white">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 6: OUR 5-POINT QUALITY & COMPLIANCE COMMITMENT
               ===================================================================== */}
            <section className="w-full relative pt-4 sm:pt-6 lg:pt-8 pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                {/* 3D Glass Bolt 2 Accent Top Right */}
                <div className="absolute -top-8 -right-8 sm:-right-4 w-36 sm:w-52 lg:w-64 opacity-50 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-25 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                {/* 3D Glass Bolt 3 Accent Bottom Left */}
                <div className="absolute -bottom-10 -left-8 sm:-left-4 w-36 sm:w-52 lg:w-64 opacity-50 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-20 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-b from-white/95 via-white/85 to-white/75 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-xl shadow-xl relative overflow-hidden">
                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFC050] to-transparent opacity-80" />

                        <div className="max-w-4xl mx-auto text-left sm:text-center mb-8 sm:mb-10">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span>UNCOMPROMISING STANDARDS</span>
                            </div>
                            <h2 className="text-[24px] sm:text-[34px] lg:text-[40px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                Our 5-Point Quality & Compliance Pledge
                            </h2>
                            <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[16px] mt-2 font-[family-name:var(--font-body)] leading-relaxed">
                                Every client relationship and line of code is governed by explicit engineering principles.
                            </p>
                        </div>

                        {/* 5 Pillars Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {[
                                {
                                    title: "100% IP Handover",
                                    desc: "All source code, assets, and database schemas are transferred to you legally under NDA.",
                                    icon: Shield
                                },
                                {
                                    title: "Zero-Hype Compliance",
                                    desc: "Our quant tools offer deterministic backtesting only; we never make assured return claims.",
                                    icon: Radio
                                },
                                {
                                    title: "Core Web Vitals",
                                    desc: "Sub-100ms Largest Contentful Paint with 99+ Google Lighthouse performance scoring.",
                                    icon: Flame
                                },
                                {
                                    title: "Bank-Grade Security",
                                    desc: "Zero-vulnerability cloud deployments with end-to-end SSL and SQL injection immunity.",
                                    icon: Lock
                                },
                                {
                                    title: "90-Day Warranty",
                                    desc: "Every turnkey deployment includes a comprehensive 90-day post-launch SLA bug warranty.",
                                    icon: Clock
                                }
                            ].map((pledge, idx) => {
                                const PledgeIcon = pledge.icon;
                                return (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 flex flex-col justify-between shadow-xs"
                                    >
                                        <div>
                                            <div className="w-9 h-9 rounded-xl bg-[#00595C]/10 dark:bg-[#FFC050]/15 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] mb-3">
                                                <PledgeIcon className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mb-1">
                                                {pledge.title}
                                            </h3>
                                            <p className="text-xs text-[#003D3F]/75 dark:text-white/70 leading-relaxed font-[family-name:var(--font-body)]">
                                                {pledge.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
