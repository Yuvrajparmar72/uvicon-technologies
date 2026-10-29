"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Code2,
    Globe,
    Zap,
    ShieldCheck,
    CheckCircle2,
    ArrowUpRight,
    ChevronDown,
    Layers,
    Terminal,
    Database,
    Server,
    Lock,
    Clock,
    Cpu,
    Network,
    Workflow,
    Activity,
    FolderGit2,
    Rocket,
    Award,
    Users,
    Check,
    BadgeCheck,
    Compass,
    HelpCircle,
    Gauge,
    FileCode2,
    Sliders,
    Bot,
    Boxes,
    Plug,
    Cog,
    BarChart3,
    GitBranch,
    Container,
    Braces,
    Cable
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
   DATA STRUCTURES
   ========================================================================== */

interface HeroCommandCard {
    id: string;
    value: string;
    title: string;
    tagline: string;
    desc: string;
    badge: string;
    icon: React.ElementType;
}

const heroCommandCards: HeroCommandCard[] = [
    {
        id: "sw-latency",
        value: "< 0.1ms",
        title: "Execution Latency",
        tagline: "Deterministic Order Routing",
        desc: "Sub-millisecond algo trading engines with direct broker API hooks, zero-bloat memory buffers, and optimized WebSocket streaming.",
        badge: "Low-Latency Core",
        icon: Zap
    },
    {
        id: "sw-ip",
        value: "100%",
        title: "IP & Code Transfer",
        tagline: "Your Git Repo From Day 1",
        desc: "Full source code, database schemas, deployment scripts, and architecture docs legally transferred under NDA with zero vendor lock-in.",
        badge: "Legal NDA Transfer",
        icon: ShieldCheck
    },
    {
        id: "sw-broker",
        value: "Multi",
        title: "Broker API Ready",
        tagline: "Unified Order Gateway",
        desc: "Pre-integrated connectors for Zerodha, Angel One, Upstox, IBKR, and custom FIX protocol brokers with automated failover.",
        badge: "Multi-Broker",
        icon: Network
    },
    {
        id: "sw-sla",
        value: "90 Days",
        title: "Post-Launch SLA",
        tagline: "Guaranteed Bug-Free Code",
        desc: "Contractual 90-day post-launch warranty covering proactive cloud monitoring, priority bug fixes, and performance regression checks.",
        badge: "Guaranteed SLA",
        icon: Award
    }
];

interface CapabilityCard {
    id: string;
    title: string;
    tagline: string;
    desc: string;
    icon: React.ElementType;
    badge: string;
    highlights: string[];
    span: string;
}

const capabilityCards: CapabilityCard[] = [
    {
        id: "cap-algo",
        title: "Algorithmic Trading Engines",
        tagline: "Sub-Millisecond Execution Architecture",
        desc: "We build deterministic, low-latency order routing engines connected to multiple broker APIs. Automated strategy execution, real-time WebSocket tick streaming, and historical backtesting with multi-year data granularity.",
        icon: Zap,
        badge: "< 0.1ms Engine",
        highlights: [
            "Multi-Broker API Order Routing",
            "Deterministic Strategy Backtesting",
            "Real-Time WebSocket Tick Streaming",
            "Automated Risk Management Guards"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "cap-saas",
        title: "Enterprise SaaS Platforms",
        tagline: "Custom CRM, ERP & Dashboard Systems",
        desc: "Full-stack enterprise web applications with role-based access control, real-time analytics dashboards, automated workflow engines, and multi-tenant data isolation for scaling businesses.",
        icon: Globe,
        badge: "Full-Stack SaaS",
        highlights: [
            "Multi-Tenant Data Isolation",
            "Real-Time Analytics Dashboards",
            "Role-Based Access Control (RBAC)",
            "Automated Workflow Engines"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "cap-pipeline",
        title: "Real-Time Data Pipelines",
        tagline: "Event-Driven Streaming Architecture",
        desc: "High-throughput data pipelines using WebSockets, Redis pub/sub, and event-driven microservices for real-time order books, notification systems, and live analytics feeds.",
        icon: Activity,
        badge: "Event-Driven",
        highlights: [
            "WebSocket Bi-Directional Streaming",
            "Redis Pub/Sub Message Queues",
            "Event Sourcing & CQRS Patterns",
            "Real-Time Notification Infrastructure"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "cap-cloud",
        title: "Cloud Microservices Architecture",
        tagline: "Docker, Kubernetes & Distributed Systems",
        desc: "We architect horizontally scalable microservices with containerized deployments, automated CI/CD pipelines, service mesh networking, and zero-downtime rolling updates across AWS and GCP.",
        icon: Server,
        badge: "Cloud-Native",
        highlights: [
            "Docker Multi-Stage Container Builds",
            "Kubernetes Auto-Scaling Clusters",
            "Automated CI/CD Build Pipelines",
            "Zero-Downtime Rolling Deployments"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "cap-db",
        title: "Database Architecture & Security",
        tagline: "ACID-Compliant Transaction Governance",
        desc: "Enterprise-grade PostgreSQL database design with strict ACID compliance, pgVector AI embeddings, automated point-in-time backups, and end-to-end SSL encryption for financial-grade data integrity.",
        icon: Database,
        badge: "ACID Compliant",
        highlights: [
            "PostgreSQL Strict Schema Design",
            "pgVector AI Embedding Queries",
            "Automated Point-in-Time Backups",
            "End-to-End SSL/TLS Encryption"
        ],
        span: "lg:col-span-6"
    },
    {
        id: "cap-api",
        title: "API Gateway & Third-Party Integrations",
        tagline: "REST, GraphQL & Custom Connectors",
        desc: "Unified API gateways with rate limiting, authentication middleware, payment processor integrations (Stripe, Razorpay), and custom webhook orchestration for seamless system interoperability.",
        icon: Cable,
        badge: "API-First",
        highlights: [
            "REST & GraphQL Unified Endpoints",
            "Stripe & Razorpay Payment Hooks",
            "OAuth2 & JWT Auth Middleware",
            "Custom Webhook Orchestration"
        ],
        span: "lg:col-span-6"
    }
];

interface DeliveryPhase {
    stepNumber: string;
    title: string;
    timeline: string;
    summary: string;
    deliverables: string[];
    guarantee: string;
    icon: React.ElementType;
}

const deliveryPhases: DeliveryPhase[] = [
    {
        stepNumber: "01",
        title: "Discovery & Architecture Blueprint",
        timeline: "Days 1 – 3",
        summary: "We dissect your business logic, map data flows, design the technical schema, select optimal tech stacks, and lock in milestone deliverables before writing a single line of production code.",
        deliverables: [
            "System Architecture & Data Model Blueprint",
            "Figma Wireframes & Interactive Prototypes",
            "Fixed-Price Milestone SOW & Sprint Schedule",
            "Git Repository Init & Secrets Vault Setup"
        ],
        guarantee: "100% scope alignment before any production code is written.",
        icon: Compass
    },
    {
        stepNumber: "02",
        title: "Agile Engineering Sprints",
        timeline: "Sprint Cycles (1–4 Weeks)",
        summary: "Our dedicated engineering squad writes modular, strictly-typed code with continuous bi-weekly staging deployments. You see live working software every two weeks.",
        deliverables: [
            "Interactive Live Staging URL Demos",
            "Bi-Weekly Sprint Video Walkthroughs",
            "Direct Slack / GitHub PR Collaboration",
            "Continuous Integration & Build Verifications"
        ],
        guarantee: "Live working software demonstrated every two weeks with zero ghosting.",
        icon: Code2
    },
    {
        stepNumber: "03",
        title: "QA, Security & Load Testing",
        timeline: "Pre-Launch Sprint",
        summary: "Rigorous automated test suites, security vulnerability scans, cross-browser audits, algorithmic latency benchmarking, and memory leak profiling before production deployment.",
        deliverables: [
            "100/100 Core Web Vitals Audit Report",
            "Automated End-to-End Test Suite",
            "SQL & API Security Vulnerability Clean Bill",
            "High-Throughput Concurrency Benchmarks"
        ],
        guarantee: "Zero-vulnerability sign-off prior to production deployment.",
        icon: ShieldCheck
    },
    {
        stepNumber: "04",
        title: "Deployment, IP Transfer & 90-Day SLA",
        timeline: "Launch & 90 Days Beyond",
        summary: "Seamless production cloud deployment, 100% IP legal transfer under NDA, full documentation handover, and active SLA monitoring for 90 days post-launch.",
        deliverables: [
            "100% Source Code & Git Transfer Under NDA",
            "Production Cloud Deployment & Domain Config",
            "Turnkey Video Training & Tech Documentation",
            "90-Day Post-Launch SLA Bug Warranty"
        ],
        guarantee: "Guaranteed rapid-response SLA support for 90 days post-launch.",
        icon: Rocket
    }
];

interface TechItem {
    name: string;
    category: string;
    desc: string;
    icon: React.ElementType;
}

const techStackItems: TechItem[] = [
    { name: "Python", category: "backend", desc: "Algo Engines & AI Scripting", icon: Terminal },
    { name: "C++", category: "backend", desc: "Low-Latency Execution Core", icon: Cpu },
    { name: "Node.js", category: "backend", desc: "Real-Time WebSocket APIs", icon: Server },
    { name: "Next.js", category: "frontend", desc: "SSR Web Applications", icon: Globe },
    { name: "React", category: "frontend", desc: "Interactive UI Components", icon: Code2 },
    { name: "TypeScript", category: "frontend", desc: "Strict Static Type Safety", icon: Braces },
    { name: "PostgreSQL", category: "database", desc: "ACID Transaction Database", icon: Database },
    { name: "Redis", category: "database", desc: "In-Memory Cache & Pub/Sub", icon: Zap },
    { name: "MongoDB", category: "database", desc: "Flexible Document Store", icon: Database },
    { name: "Docker", category: "devops", desc: "Container Orchestration", icon: Boxes },
    { name: "AWS", category: "devops", desc: "Cloud Infrastructure", icon: Server },
    { name: "GitHub Actions", category: "devops", desc: "Automated CI/CD Pipelines", icon: GitBranch },
    { name: "PyTorch", category: "ai", desc: "Deep Learning Models", icon: Bot },
    { name: "FastAPI", category: "ai", desc: "High-Performance ML APIs", icon: Zap },
    { name: "LangChain", category: "ai", desc: "LLM Agent Orchestration", icon: Workflow }
];

const techCategories = [
    { id: "all", label: "All Technologies", icon: Layers },
    { id: "backend", label: "Backend", icon: Server },
    { id: "frontend", label: "Frontend", icon: Globe },
    { id: "database", label: "Database", icon: Database },
    { id: "devops", label: "DevOps", icon: Boxes },
    { id: "ai", label: "AI / ML", icon: Bot }
];

interface PortfolioProject {
    id: string;
    title: string;
    category: string;
    description: string;
    metrics: string[];
    tech: string[];
    badge: string;
    imageSrc: string;
}

const portfolioProjects: PortfolioProject[] = [
    {
        id: "uvicon-pro",
        title: "Uvicon Pro — Algo Trading & Backtesting Engine",
        category: "Fintech & Quantitative Trading",
        description: "Institutional-grade algorithmic trading software featuring automated multi-broker order routing, deterministic strategy backtesting with multi-year tick data, and real-time WebSocket portfolio streaming.",
        metrics: ["< 0.1ms Execution", "Multi-Broker API", "Strategy Backtester"],
        tech: ["Python", "C++", "React", "Redis", "WebSockets"],
        badge: "Algo Engine",
        imageSrc: "/assets/images/uvicon-pro-desktop-screenshot.avif"
    },
    {
        id: "uvicon-connect",
        title: "Uvicon Connect — Intelligent Lead & Sales CRM",
        category: "Enterprise SaaS & CRM",
        description: "A high-throughput CRM platform engineered for automated lead distribution, real-time sales pipeline Kanban boards, multi-team productivity tracking, and automated follow-up workflows.",
        metrics: ["10,000+ Active Leads", "< 50ms Real-Time Sync", "99.99% Cloud Uptime"],
        tech: ["Next.js", "Node.js", "PostgreSQL", "WebSockets"],
        badge: "Enterprise CRM",
        imageSrc: "/assets/images/uvicon-connect-screenshot.avif"
    },
    {
        id: "uvicon-hms",
        title: "Uvicon HMS — All-in-One Hotel Management System",
        category: "Hospitality & Enterprise SaaS",
        description: "A comprehensive hotel management platform designed to automate staff management, room allocation, guest check-ins, billing, inventory tracking, and real-time income analytics.",
        metrics: ["Staff & Shift Manager", "Real-Time Room Booking", "Income & Revenue Analytics"],
        tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
        badge: "Hotel SaaS Platform",
        imageSrc: "/assets/images/uvicon-hotel-management-software-screenshot.avif"
    }
];

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ElementType;
}

const softwareFaqs: FaqItem[] = [
    {
        id: "sw-faq-1",
        question: "What types of custom software does Uvicon build?",
        answer: "We build enterprise SaaS platforms, algorithmic trading engines, CRM/ERP systems, real-time data pipelines, cloud microservices architectures, and custom API gateways. Every solution is architected from scratch — no templates, no WordPress, no pre-built frameworks repurposed. Each codebase is strictly typed, rigorously tested, and legally transferred to you under NDA.",
        icon: Code2
    },
    {
        id: "sw-faq-2",
        question: "How do you ensure sub-millisecond latency in algo trading systems?",
        answer: "Our quant engines are engineered in Python and C++ with optimized memory buffers, direct broker API hooks (Zerodha, Angel One, Upstox, IBKR), and zero-bloat modular architecture. We run automated backtesting against multi-year tick data and benchmark every order routing path for deterministic low-latency execution. We provide software architecture and backtesting tools only — we never guarantee returns or assure profit.",
        icon: Zap
    },
    {
        id: "sw-faq-3",
        question: "Do we receive 100% source code and intellectual property ownership?",
        answer: "Yes, absolutely. Every engagement begins with a legally binding NDA and Master Services Agreement. Upon milestone completion, 100% of all source code, database schemas, API keys, deployment scripts, and architecture documentation are transferred directly to your organization. Zero vendor lock-in, zero recurring license fees.",
        icon: ShieldCheck
    },
    {
        id: "sw-faq-4",
        question: "How do you estimate timelines and pricing for custom software projects?",
        answer: "We use an agile milestone-based pricing model. After a comprehensive architecture discovery session, we provide a fixed-price proposal with clear sprint milestones. Small-to-medium SaaS platforms typically ship in 4–6 weeks. Enterprise trading engines or distributed systems range from 8–12+ weeks. No surprise invoices — every deliverable is pre-defined.",
        icon: Clock
    },
    {
        id: "sw-faq-5",
        question: "What security standards do you enforce for enterprise software?",
        answer: "We enforce bank-grade security: end-to-end SSL/TLS encryption, automated CI/CD vulnerability scanning, ACID database compliance, SQL injection and CSRF immunity, strict role-based access control (RBAC), and containerized secret management. All developer access is governed by enterprise NDAs with zero-data-leakage standards.",
        icon: Lock
    },
    {
        id: "sw-faq-6",
        question: "What does the 90-day post-launch SLA warranty cover?",
        answer: "Our 90-day SLA warranty covers all bugs and performance regressions within the agreed project scope. We provide proactive cloud health monitoring, priority bug-fix response times, database backup verification, and dedicated engineering support. If a bug surfaces, our core squad patches it at zero additional charge.",
        icon: Award
    }
];

/* ==========================================================================
   MAIN CLIENT COMPONENT
   ========================================================================== */

export default function SoftwarePageClient() {
    const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
    const [activeTechTab, setActiveTechTab] = useState<string>("all");
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenFaqId((prev) => (prev === id ? null : id));
    };

    const filteredTech = techStackItems.filter((item) => {
        if (activeTechTab === "all") return true;
        return item.category === activeTechTab;
    });

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* =====================================================================
               UNIFIED PAGE BACKGROUND CSS — LIGHT & DARK THEME GRADIENTS
               ===================================================================== */}
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
               SECTION 1: HERO — SPLIT LAYOUT COMMAND CENTER
               ===================================================================== */}
            <section className="w-full relative pt-28 sm:pt-32 lg:pt-36 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-8 lg:px-16 z-10 overflow-hidden">
                {/* 3D Glass Bolt Accents with Floating Animation */}
                <div className="absolute -top-6 -right-6 sm:right-4 w-32 sm:w-48 lg:w-60 pointer-events-none z-0 opacity-45 dark:opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={240}
                        height={240}
                        className="w-full h-auto object-contain transform rotate-15"
                    />
                </div>
                <div className="absolute bottom-10 -left-10 sm:left-2 w-24 sm:w-36 lg:w-44 pointer-events-none z-0 opacity-35 dark:opacity-60 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={200}
                        height={200}
                        className="w-full h-auto object-contain transform -rotate-25"
                    />
                </div>

                <motion.div
                    className="max-w-7xl mx-auto relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* 2-Column Split Layout: Text Left + Visual Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* ===== LEFT COLUMN: Text & CTAs ===== */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 flex flex-col items-start text-left gap-4 sm:gap-5 relative z-20">
                            {/* Top Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl shadow-xs">
                                <Code2 className="w-4 h-4 text-[#FFC050]" />
                                <span>CUSTOM SOFTWARE & ALGO ENGINEERING</span>
                            </div>

                            {/* H1 — Left Aligned, Bold */}
                            <h1 className="text-[30px] sm:text-[44px] lg:text-[50px] xl:text-[56px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] leading-[1.1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:drop-shadow-md">
                                Custom Software Development & Algo Trading Systems
                                <span className="text-[#00595C] dark:text-[#FFC050]"> in India</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-[#003D3F]/75 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[17px] leading-[1.65] max-w-xl font-[family-name:var(--font-body)]">
                                We engineer enterprise-grade custom software, high-frequency algo trading engines, SaaS platforms, and cloud microservices — built for sub-millisecond precision, strict ACID compliance, and 100% IP transfer under NDA.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1">
                                <Link
                                    href="/contact?category=software"
                                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-[0_8px_22px_rgba(255,192,80,0.35)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                >
                                    <span>Schedule Free Consultation</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#tech-stack"
                                    className="px-7 py-3.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-xl border border-[#003D3F]/20 dark:border-white/20 text-[#003D3F] dark:text-white font-bold text-sm tracking-wide transition-all hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00595C] shadow-sm"
                                >
                                    <Sliders className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                    <span>View Tech Stack ↓</span>
                                </a>
                            </div>

                            {/* Proof Pills — Compact 2x2 Grid */}
                            <div className="grid grid-cols-2 gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm font-bold text-[#003D3F]/85 dark:text-white/85">
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    100% IP & Git Ownership
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    Sub-0.1ms Algo Latency
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    ACID-Compliant Backends
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    90-Day Post-Launch SLA
                                </span>
                            </div>
                        </motion.div>

                        {/* ===== RIGHT COLUMN: Lottie + Terminal Widget ===== */}
                        <motion.div variants={fadeInUp} className="lg:col-span-6 flex flex-col items-center gap-5 relative">
                            {/* Radial Glow Behind Visual */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-[#00595C]/30 via-[#3FC1B8]/20 to-[#FFC050]/15 rounded-full blur-[80px] pointer-events-none" />

                            {/* Lottie Animation Container */}
                            <div className="w-full max-w-md h-56 sm:h-72 lg:h-80 flex items-center justify-center relative z-10">
                                <LottiePlayer
                                    animationPath="/assets/lottie/teal-tech-3.json"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Live Terminal Status Widget */}
                            <div className="w-full max-w-md rounded-2xl bg-[#001214] p-4 sm:p-5 border border-white/15 text-white shadow-2xl font-mono text-xs relative overflow-hidden z-10">
                                {/* Terminal Header */}
                                <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    <span className="text-[10px] text-white/40 ml-2 font-sans">uvicon-engine ~ status</span>
                                    <div className="ml-auto flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                        <span className="text-[9px] font-sans font-bold text-emerald-400 uppercase tracking-wider">Live</span>
                                    </div>
                                </div>
                                {/* Terminal Lines */}
                                <div className="space-y-1.5 text-[11px]">
                                    <p className="text-white/40">$ uvicon status --engine=algo-core</p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> Execution Latency: <span className="text-[#FFC050] font-bold">&lt; 0.1ms</span></p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> Broker API Status: <span className="text-emerald-400 font-bold">ALL CONNECTED</span></p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> ACID Compliance: <span className="text-emerald-400 font-bold">ENFORCED</span></p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> Security Scan: <span className="text-emerald-400 font-bold">0 VULNERABILITIES</span></p>
                                    <div className="mt-2.5 p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[10px] font-sans">
                                        <span className="text-white/70">IP Transfer: 100% • SLA: Active 90 Days</span>
                                        <BadgeCheck className="w-3.5 h-3.5 text-[#FFC050]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 4-Column Hero Command Showcase Cards — Full Width Below Split */}
                    <motion.div
                        variants={fadeInUp}
                        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 text-left mt-10 sm:mt-12 lg:mt-14"
                    >
                        {heroCommandCards.map((card) => {
                            const CardIcon = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className="bg-white/85 dark:bg-[#001D1F]/80 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-white/80 dark:border-white/10 shadow-[0_10px_30px_rgba(0,61,63,0.06)] dark:shadow-none hover:border-[#FFC050]/50 transition-all flex flex-col justify-between group relative overflow-hidden"
                                >
                                    <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-2xl sm:text-3xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                                {card.value}
                                            </span>
                                            <div className="w-9 h-9 rounded-xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] group-hover:scale-110 transition-transform">
                                                <CardIcon className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <h3 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                            {card.title}
                                        </h3>
                                        <span className="text-[11px] font-semibold text-[#00595C] dark:text-[#3FC1B8] block mt-0.5 mb-2">
                                            {card.tagline}
                                        </span>
                                        <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
                                            {card.desc}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#003D3F]/70 dark:text-white/70">
                                            {card.badge}
                                        </span>
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 2: CAPABILITIES — WHAT WE BUILD BENTO GRID
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
                    {/* Header Block (Right) */}
                    <div className="relative text-right w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col items-end justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-right">
                                EXPERTISE
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right">
                                Core Capabilities
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            We solve complex business problems with scalable, modern architectures.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                        {capabilityCards.map((cap) => {
                            const CapIcon = cap.icon;
                            return (
                                <motion.div
                                    key={cap.id}
                                    variants={cardVariant}
                                    className={`${cap.span} bg-white/90 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 lg:p-8 border border-white/60 border-t-white/80 dark:border-white/10 dark:border-t-white/20 shadow-[0_10px_30px_rgba(0,61,63,0.06)] dark:shadow-none hover:border-[#FFC050]/50 transition-all flex flex-col justify-between group relative overflow-hidden text-left`}
                                >
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-2xl pointer-events-none" />

                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <div className="w-11 h-11 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform shrink-0">
                                                <CapIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/40 tracking-wide">
                                                {cap.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            {cap.title}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#00595C] dark:text-[#3FC1B8] uppercase tracking-wider mt-0.5">
                                            {cap.tagline}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed mt-2 font-[family-name:var(--font-body)]">
                                            {cap.desc}
                                        </p>
                                    </div>

                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 pt-3.5 border-t border-[#003D3F]/10 dark:border-white/10">
                                        {cap.highlights.map((high, hIdx) => (
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
               SECTION 3: HOW IT WORKS — 4-PHASE DELIVERY ENGINE
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="absolute top-4 -right-8 sm:-right-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0 animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Lightning Bolt Accent Right"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Left) */}
                    <div className="relative text-left w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col items-start justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-left">
                                PROCESS
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left">
                                Software Delivery Engine
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Predictable, transparent, and milestone-driven software development.
                        </p>
                    </div>

                    {/* 4 Interactive Phase Selector Cards */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
                        {deliveryPhases.map((phase, idx) => {
                            const PhaseIcon = phase.icon;
                            const isSelected = activePhaseIndex === idx;
                            return (
                                <button
                                    key={phase.stepNumber}
                                    onClick={() => setActivePhaseIndex(idx)}
                                    className={`p-5 rounded-3xl text-left transition-all cursor-pointer focus:outline-none flex flex-col justify-between ${
                                        isSelected
                                            ? "bg-gradient-to-br from-white/95 to-white/85 dark:from-[#001D1F]/90 dark:to-[#001719]/90 border-2 border-[#FFC050] shadow-[0_8px_25px_rgba(255,192,80,0.2)] scale-[1.02]"
                                            : "bg-white/70 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 hover:border-[#00595C]/30 dark:hover:border-white/20"
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xl sm:text-2xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                            {phase.stepNumber}
                                        </span>
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? "bg-[#FFC050] text-[#002829]" : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-white"}`}>
                                            <PhaseIcon className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-1">
                                            {phase.title}
                                        </h3>
                                        <span className="text-[11px] font-semibold text-[#00595C] dark:text-[#3FC1B8]">
                                            {phase.timeline}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Phase Detail Showcase */}
                    <div className="w-full bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/20 dark:border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden text-left">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left: Phase Narrative */}
                            <div className="lg:col-span-6 flex flex-col items-start gap-3.5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                    <span>Phase {deliveryPhases[activePhaseIndex].stepNumber} Deep Dive</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                    {deliveryPhases[activePhaseIndex].title}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed font-[family-name:var(--font-body)]">
                                    {deliveryPhases[activePhaseIndex].summary}
                                </p>
                                <div className="w-full mt-2 flex flex-col gap-2">
                                    {deliveryPhases[activePhaseIndex].deliverables.map((del, dIdx) => (
                                        <div key={dIdx} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white shadow-2xs">
                                            <Check className="w-4 h-4 text-[#FFC050] shrink-0" />
                                            <span>{del}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-1">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong>Phase Guarantee:</strong> {deliveryPhases[activePhaseIndex].guarantee}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Dynamic Visual Artifact per Phase */}
                            <div className="lg:col-span-6 flex flex-col items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {activePhaseIndex === 0 && (
                                        <motion.div
                                            key="blueprint-visual"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full rounded-2xl bg-[#001618] p-5 border border-white/15 text-white shadow-2xl relative overflow-hidden"
                                        >
                                            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <Compass className="w-4 h-4 text-[#FFC050]" />
                                                    <span className="font-bold">system_architecture.spec.json</span>
                                                </div>
                                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                                                    APPROVED
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3">
                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="text-[#3FC1B8] block font-bold">Backend Engine:</span>
                                                    <span className="text-white/80">Python + C++ Core</span>
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="text-[#3FC1B8] block font-bold">API Layer:</span>
                                                    <span className="text-white/80">Node.js + WebSockets</span>
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="text-[#3FC1B8] block font-bold">Database:</span>
                                                    <span className="text-white/80">PostgreSQL ACID Schema</span>
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="text-[#3FC1B8] block font-bold">Deployment:</span>
                                                    <span className="text-white/80">Docker & AWS CI/CD</span>
                                                </div>
                                            </div>
                                            <div className="p-2.5 rounded-xl bg-[#00595C]/20 border border-[#00595C]/40 text-[11px] text-white/90 flex items-center justify-between">
                                                <span>Figma Wireframes & Milestone SOW</span>
                                                <BadgeCheck className="w-4 h-4 text-[#FFC050]" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {activePhaseIndex === 1 && (
                                        <motion.div
                                            key="terminal-visual"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full rounded-2xl bg-[#000E10] p-5 border border-white/15 text-white shadow-2xl font-mono text-xs relative overflow-hidden"
                                        >
                                            <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-3">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                                <span className="text-[10px] text-white/50 ml-2">uvicon-sprint-runner ~ bash</span>
                                            </div>
                                            <div className="space-y-1.5 text-[11px]">
                                                <p className="text-white/50">$ git commit -m &quot;feat(core): sub-0.1ms algo router&quot;</p>
                                                <p className="text-emerald-400">✓ build: 48 modules compiled (0.34s)</p>
                                                <p className="text-emerald-400">✓ tests: 142/142 passing strictly (100% type-checked)</p>
                                                <p className="text-[#FFC050]">$ staging deploy: https://preview-sprint2.uvicon.in</p>
                                                <div className="mt-3 p-2 rounded bg-white/5 border border-white/10 flex items-center justify-between text-[10px] font-sans">
                                                    <span className="text-white/80">Staging URL Ready for Client Demo</span>
                                                    <span className="text-emerald-400 font-bold">ACTIVE DEMO</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activePhaseIndex === 2 && (
                                        <motion.div
                                            key="security-visual"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full rounded-2xl bg-[#001D1F] p-5 border border-white/15 text-white shadow-2xl relative overflow-hidden"
                                        >
                                            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                                    <span className="font-bold text-sm">Security & Vitals Audit Clean Bill</span>
                                                </div>
                                                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black">
                                                    100 / 100
                                                </span>
                                            </div>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>SQL Injection & CSRF Vulnerabilities</span>
                                                    <span className="text-emerald-400 font-bold">0 Detected</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>ACID Transaction Integrity</span>
                                                    <span className="text-emerald-400 font-bold">100% Compliant</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>Concurrency Load Test (10K req/s)</span>
                                                    <span className="text-emerald-400 font-bold">Passed</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>Memory Heap Leakage Check</span>
                                                    <span className="text-emerald-400 font-bold">Clean / Zero Leaks</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activePhaseIndex === 3 && (
                                        <motion.div
                                            key="handover-visual"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full rounded-2xl bg-gradient-to-br from-[#001D1F] to-[#002D30] p-6 border-2 border-[#FFC050] text-white shadow-2xl relative overflow-hidden text-center"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-[#FFC050]/20 flex items-center justify-center text-[#FFC050] mx-auto mb-3 border border-[#FFC050]/30 shadow-inner">
                                                <Award className="w-7 h-7" />
                                            </div>
                                            <h4 className="font-bold text-base text-[#FFC050] font-[family-name:var(--font-heading-section)]">
                                                100% IP & SLA Legal Transfer
                                            </h4>
                                            <p className="text-xs text-white/80 mt-1 mb-4">
                                                Direct GitHub Repository Ownership + NDA Warranty Certificate Transferred.
                                            </p>
                                            <div className="p-2.5 rounded-xl bg-black/40 border border-white/15 text-xs font-semibold flex items-center justify-center gap-2">
                                                <Check className="w-4 h-4 text-emerald-400" />
                                                <span>90-Day Post-Launch SLA Warranty Active</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 4: TECH STACK ARSENAL — INTERACTIVE CATEGORY TABS
               ===================================================================== */}
            <motion.section
                id="tech-stack"
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10 scroll-mt-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="absolute -bottom-8 -left-8 sm:-left-4 w-36 sm:w-52 lg:w-64 opacity-45 dark:opacity-75 pointer-events-none z-0 animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-15 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Right) */}
                    <div className="relative text-right w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col items-end justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-right">
                                TECHNOLOGIES
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right">
                                Engineering Tech Stack
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Production-proven frameworks, languages, and tools powering our systems.
                        </p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="w-full flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 relative z-10">
                        {techCategories.map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = activeTechTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTechTab(cat.id)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
                                        isActive
                                            ? "bg-[#00595C] dark:bg-[#FFC050] text-white dark:text-[#002829] shadow-md scale-105"
                                            : "bg-white/80 dark:bg-white/10 text-[#003D3F] dark:text-white hover:bg-white dark:hover:bg-white/20 border border-[#003D3F]/15 dark:border-white/10"
                                    }`}
                                >
                                    <CatIcon className="w-4 h-4" />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Tech Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                        {filteredTech.map((tech) => {
                            const TechIcon = tech.icon;
                            return (
                                <motion.div
                                    key={tech.name}
                                    variants={cardVariant}
                                    className="bg-white/85 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/60 dark:border-white/10 shadow-[0_8px_24px_rgba(0,61,63,0.05)] dark:shadow-none hover:border-[#FFC050]/50 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform shrink-0">
                                            <TechIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                                {tech.name}
                                            </h4>
                                            <span className="text-[11px] font-semibold text-[#00595C] dark:text-[#3FC1B8]">
                                                {tech.desc}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 5: PORTFOLIO — SHIPPED SOFTWARE SHOWCASE
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="absolute top-1/4 -right-8 sm:-right-4 w-36 sm:w-56 lg:w-64 opacity-50 dark:opacity-80 pointer-events-none z-0 animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-12 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Left) */}
                    <div className="relative text-left w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col items-start justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-left">
                                PORTFOLIO
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left">
                                Featured Deployments
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Explore our recent mission-critical enterprise systems and platforms.
                        </p>
                    </div>

                    {/* Portfolio Cards Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                        {portfolioProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariant}
                                className="bg-white/90 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-white/10 shadow-[0_10px_30px_rgba(0,61,63,0.06)] dark:shadow-none hover:border-[#FFC050]/50 transition-all group relative overflow-hidden text-left flex flex-col"
                            >
                                {/* Image Preview */}
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-3xl">
                                    <Image
                                        src={project.imageSrc}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                    <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#FFC050] text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                        {project.badge}
                                    </div>
                                </div>

                                <div className="p-5 sm:p-6 flex flex-col flex-1">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-1">
                                        {project.category}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)] mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    {/* Metrics */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {project.metrics.map((metric, mIdx) => (
                                            <span key={mIdx} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00595C]/10 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8] border border-[#00595C]/20 dark:border-white/15">
                                                {metric}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-[#003D3F]/10 dark:border-white/10">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/80 dark:text-white/80">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 6: PRICING PREVIEW BAND
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
            >
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-white/90 via-white/80 to-white/90 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-8 sm:p-10 lg:p-12 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-2xl shadow-xl text-center relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFC050]/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-3">
                            <Gauge className="w-3.5 h-3.5" />
                            <span>Transparent Fixed-Scope Pricing</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mb-2">
                            Predictable Sprint Pricing, Zero Surprise Invoices
                        </h3>
                        <p className="text-sm sm:text-base text-[#003D3F]/80 dark:text-white/80 max-w-2xl mx-auto font-[family-name:var(--font-body)] mb-6">
                            Every project is scoped with clear milestone deliverables and fixed-price sprints. See our full pricing structure and engagement models.
                        </p>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-[0_8px_22px_rgba(255,192,80,0.35)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.5)] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                        >
                            <span>View Pricing & Engagement Models</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 7: FAQ SECTION WITH FAQPAGE SCHEMA
               ===================================================================== */}
            <section className="w-full relative pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-4xl mx-auto text-left sm:text-center mb-8 sm:mb-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                            <HelpCircle className="w-3.5 h-3.5 text-[#FFC050]" />
                            <span>CUSTOM SOFTWARE DEVELOPMENT FAQS</span>
                        </div>
                        <h2 className="text-[24px] sm:text-[34px] lg:text-[40px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[16px] mt-2 font-[family-name:var(--font-body)] leading-relaxed">
                            Clear answers on custom software timelines, algo trading architecture, IP ownership, and post-launch SLA guarantees.
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4.5 mb-12">
                        {softwareFaqs.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            const IconComponent = faq.icon;

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
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 text-[#003D3F]/60 dark:text-white/60 shrink-0 transition-transform duration-300 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="content"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                                                    <div className="pl-11 sm:pl-12">
                                                        <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed font-[family-name:var(--font-body)]">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =====================================================================
               SECTION 8: FINAL CTA BAND
               ===================================================================== */}
            <section className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-24 sm:pb-28 lg:pb-32 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#001D1F] via-[#001719] to-[#001214] rounded-3xl p-8 sm:p-10 lg:p-14 border border-white/15 shadow-2xl text-center relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-[#00595C]/40 via-[#3FC1B8]/30 to-[#FFC050]/25 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC050]/15 border border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#FFC050] mb-4">
                            <Rocket className="w-3.5 h-3.5" />
                            <span>Start Building Today</span>
                        </div>

                        <h2 className="text-[24px] sm:text-[34px] lg:text-[44px] font-bold text-white font-[family-name:var(--font-heading-section)] leading-tight mb-3">
                            Ready To Engineer Your Custom Software?
                        </h2>
                        <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-[family-name:var(--font-body)] mb-8">
                            Book a free architecture session with our Lead Solutions Architect. We will scope your project, map the tech stack, and deliver a fixed-price milestone proposal within 48 hours.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
                            <Link
                                href="/contact?category=software"
                                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-[0_8px_22px_rgba(255,192,80,0.35)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                            >
                                <span>Book Free Architecture Session</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white font-bold text-sm tracking-wide transition-all hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/40"
                            >
                                <span>View Pricing</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Algo Compliance Notice */}
            <div className="w-full px-4 sm:px-8 lg:px-16 pb-8 z-10 relative">
                <div className="max-w-5xl mx-auto">
                    <p className="text-[10px] sm:text-[11px] text-[#003D3F]/50 dark:text-white/40 leading-relaxed text-center font-[family-name:var(--font-body)]">
                        <strong>Regulatory Notice:</strong> Uvicon Technologies provides custom software architecture, algorithmic trading engine development, and backtesting execution tools only. We do not guarantee returns, assure profit, or make risk-free claims. Past performance of any software or strategy does not guarantee future results. All trading involves risk. Please consult a qualified financial advisor before making investment decisions.
                    </p>
                </div>
            </div>
        </main>
    );
}
