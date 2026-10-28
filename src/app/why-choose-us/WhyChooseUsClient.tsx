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
    Eye,
    XCircle,
    Sliders,
    Rocket,
    Workflow,
    Activity,
    FolderGit2,
    FileCheck2,
    CalendarCheck2,
    HelpCircle,
    CheckCircle,
    Star,
    BadgeCheck,
    Headphones,
    Code,
    Gauge,
    FileSignature,
    CheckCheck
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
   DATA STRUCTURES: HERO PILLARS, COMPARISON, PILLARS, TIMELINE & ESTIMATOR
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
        id: "hero-ip",
        value: "100%",
        title: "IP & Code Transfer",
        tagline: "Your Git Repo From Day 1",
        desc: "Full source code, database architectures, and assets legally transferred with zero vendor lock-in.",
        badge: "Legal NDA Transfer",
        icon: ShieldCheck
    },
    {
        id: "hero-speed",
        value: "< 0.1ms",
        title: "Engine Latency",
        tagline: "Sub-Millisecond Execution",
        desc: "Deterministic quant speed, Next.js SSR vitals, and zero bloated template libraries.",
        badge: "High-Throughput",
        icon: Zap
    },
    {
        id: "hero-squad",
        value: "Direct",
        title: "Senior Tech Leads",
        tagline: "Zero Middlemen Overhead",
        desc: "Collaborate directly with Lead Architects and engineering squads via Slack and weekly demos.",
        badge: "Zero Bureaucracy",
        icon: Users
    },
    {
        id: "hero-warranty",
        value: "90 Days",
        title: "Post-Launch SLA",
        tagline: "Guaranteed Bug-Free Code",
        desc: "Contractual 90-day post-launch warranty covering proactive monitoring and priority fixes.",
        badge: "Guaranteed SLA",
        icon: Award
    }
];

interface ComparisonCategory {
    id: string;
    name: string;
    icon: React.ElementType;
    uviconAdvantages: string[];
    agencyDisadvantages: string[];
    freelancerDisadvantages: string[];
    uviconMetric: string;
    uviconMetricLabel: string;
}

const comparisonTabs: ComparisonCategory[] = [
    {
        id: "speed-tech",
        name: "Speed & Tech Stack",
        icon: Zap,
        uviconAdvantages: [
            "Next.js App Router & Sub-100ms LCP optimization",
            "Deterministic low-latency Python/C++ algo engines",
            "Zero bloated templates — 100% custom engineered",
            "Automated CI/CD testing & instant deployments"
        ],
        agencyDisadvantages: [
            "Outdated WordPress or legacy PHP frameworks",
            "Slow bureaucratic sprint reviews taking months",
            "Bloated client overheads & hidden dev fees",
            "Generic code templates with high technical debt"
        ],
        freelancerDisadvantages: [
            "Inconsistent code standards & lack of static typing",
            "No dedicated architecture reviews or QA engineering",
            "Prone to single-point-of-failure delays",
            "No performance benchmarking or SLA guarantees"
        ],
        uviconMetric: "2x–3x",
        uviconMetricLabel: "Faster Production Time to Market"
    },
    {
        id: "ip-ownership",
        name: "Code Ownership & IP",
        icon: ShieldCheck,
        uviconAdvantages: [
            "100% legal IP & source code transfer from Day 1",
            "Full Git repository ownership & database schema files",
            "Strict Non-Disclosure Agreement (NDA) compliance",
            "Zero proprietary vendor lock-in or recurring license fees"
        ],
        agencyDisadvantages: [
            "Proprietary CMS lock-in or hostage codebases",
            "High recurring licensing or maintenance retainers",
            "Ambiguous IP rights in contract fine print",
            "Extra fees charged for source code export"
        ],
        freelancerDisadvantages: [
            "Unclear copyright transfer or reuse of client code",
            "Risk of abandoned repositories without docs",
            "No formal NDA legal enforcement guarantees",
            "Vulnerable credential and API key management"
        ],
        uviconMetric: "100%",
        uviconMetricLabel: "Client IP Ownership Guaranteed"
    },
    {
        id: "agile-communication",
        name: "Agility & Communication",
        icon: HeartHandshake,
        uviconAdvantages: [
            "Direct access to Lead Architect & Engineers",
            "Bi-weekly live staging URL demos with transparent feedback",
            "Real-time Slack / WhatsApp / Discord tech channels",
            "Predictable fixed-scope milestone deliverables"
        ],
        agencyDisadvantages: [
            "Layers of non-technical account managers & delays",
            "Infrequent monthly check-ins without live code demos",
            "Slow ticket turnaround and rigid change fees",
            "Miscommunication between client and offshored devs"
        ],
        freelancerDisadvantages: [
            "Frequent ghosting and unpredictable availability",
            "No formal sprint planning or roadmap visibility",
            "Disorganized ad-hoc updates without demos",
            "Timezone bottlenecks and lack of structured cadence"
        ],
        uviconMetric: "< 15 Mins",
        uviconMetricLabel: "Tech Lead Direct Response SLA"
    },
    {
        id: "post-launch-sla",
        name: "Post-Launch & SLAs",
        icon: Clock,
        uviconAdvantages: [
            "Comprehensive 90-Day Post-Launch SLA Warranty",
            "Proactive cloud monitoring & error alerting",
            "Zero-downtime database migrations & backups",
            "Turnkey documentation & engineering handoff video"
        ],
        agencyDisadvantages: [
            "Exorbitant monthly retainer required for simple bug fixes",
            "Slow response times after final invoice payment",
            "Poor or non-existent documentation for your team",
            "No performance guarantees post-deployment"
        ],
        freelancerDisadvantages: [
            "Unavailable for urgent bug fixes after project close",
            "No monitoring setup or disaster recovery protocols",
            "New freelancers must spend weeks deciphering code",
            "Zero contractual SLA warranty or accountability"
        ],
        uviconMetric: "90 Days",
        uviconMetricLabel: "Included Post-Launch Warranty"
    }
];

interface PillarCard {
    id: string;
    title: string;
    tagline: string;
    desc: string;
    icon: React.ElementType;
    badge: string;
    highlights: string[];
    span: string;
}

const differentiatorPillars: PillarCard[] = [
    {
        id: "pillar-1",
        title: "Sub-Millisecond Speed & Zero Tech Debt",
        tagline: "High-Throughput Engineering",
        desc: "We write clean, strictly-typed code engineered for extreme throughput. From sub-0.1ms quant order routing to sub-100ms Largest Contentful Paint web applications, speed is built into our DNA.",
        icon: Zap,
        badge: "Sub-0.1ms Core",
        highlights: [
            "Strict TypeScript & Static Typing",
            "100/100 Google Lighthouse Standards",
            "Zero Bloated Third-Party Libraries",
            "Automated Memory Leak Profiling"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "pillar-2",
        title: "100% IP Handover & Full Code Rights",
        tagline: "Your Code, Your Company",
        desc: "You own every single line of code, database schema, design token, and deployment script legally under NDA. No vendor lock-in, no hidden royalties, and zero licensing fees.",
        icon: ShieldCheck,
        badge: "100% IP Transfer",
        highlights: [
            "Direct GitHub Repo Ownership",
            "Comprehensive Architecture Docs",
            "Strict NDA From Day One",
            "Zero Proprietary Lock-In"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "pillar-3",
        title: "Direct Access To Dedicated Tech Leads",
        tagline: "Zero Middlemen Overhead",
        desc: "You collaborate directly with senior systems architects and full-stack engineers via Slack, WhatsApp, and weekly staging calls. No junior account managers filtering your requirements.",
        icon: Users,
        badge: "Zero Middlemen",
        highlights: [
            "Dedicated Solutions Architect",
            "Real-Time Slack Collaboration",
            "Transparent Engineering Roadmaps",
            "Direct Code Review Walkthroughs"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "pillar-4",
        title: "Predictable Fixed-Scope Sprints & Staging Previews",
        tagline: "Zero Surprise Billing",
        desc: "Every sprint deliverable is pre-defined with clear technical milestones. You test live interactive staging previews every 2 weeks before approving production deployments.",
        icon: CalendarCheck2,
        badge: "Agile Sprints",
        highlights: [
            "Bi-Weekly Live Staging Demos",
            "Fixed-Price Milestone Commitments",
            "Transparent Jira/Linear Backlogs",
            "Continuous Feature Deployments"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "pillar-5",
        title: "Bank-Grade Security & Automated QA",
        tagline: "Zero-Vulnerability Standard",
        desc: "We enforce end-to-end encryption, automated unit/integration test suites, ACID SQL transactions, and strict role-based access control across all custom software and fintech backends.",
        icon: Lock,
        badge: "SOC2 & ACID Compliant",
        highlights: [
            "Automated CI/CD Test Pipelines",
            "SQL Injection & CSRF Immunity",
            "End-to-End SSL & Token Security",
            "Zero-Data Leakage Standards"
        ],
        span: "lg:col-span-6"
    },
    {
        id: "pillar-6",
        title: "90-Day Unconditional Post-Launch SLA Warranty",
        tagline: "Long-Term Accountability",
        desc: "We back our engineering with a comprehensive 90-day post-launch warranty. If a bug surfaces within the project scope, our core engineering squad fixes it immediately with priority SLA.",
        icon: Award,
        badge: "90-Day SLA Included",
        highlights: [
            "Priority Bug Fix Response",
            "Cloud Health & Uptime Monitoring",
            "Turnkey Video Training Walkthrough",
            "Dedicated Post-Launch Engineering"
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
    visualType: "blueprint" | "terminal" | "security" | "handover";
}

const deliveryPhases: DeliveryPhase[] = [
    {
        stepNumber: "01",
        title: "Architecture & Scope Blueprint",
        timeline: "Days 1 – 3",
        summary: "We dissect your business logic, design the technical schema, select optimal tech stacks, and lock in milestone deliverables.",
        deliverables: [
            "System Architecture Blueprint & Data Models",
            "Figma Wireframes & Interactive Prototypes",
            "Fixed Milestone SOW & Delivery Schedule",
            "Git Repository Initialization & Secrets Setup"
        ],
        guarantee: "100% scope alignment before writing a single line of production code.",
        icon: Compass,
        visualType: "blueprint"
    },
    {
        stepNumber: "02",
        title: "Rapid AI-Augmented Sprints",
        timeline: "Sprint Cycles (1–4 Weeks)",
        summary: "Our dedicated engineering squad writes modular, strictly-typed code with continuous bi-weekly staging deployments.",
        deliverables: [
            "Interactive Live Staging URL Demos",
            "Bi-Weekly Sprint Video Walkthroughs",
            "Direct Slack / GitHub PR Collaboration",
            "Continuous Integration & Build Verifications"
        ],
        guarantee: "Live working software demonstrated every two weeks with zero ghosting.",
        icon: Code2,
        visualType: "terminal"
    },
    {
        stepNumber: "03",
        title: "Automated QA & Security Hardening",
        timeline: "Pre-Launch Sprint",
        summary: "Rigorous load testing, security vulnerability scans, cross-browser audits, and algorithmic latency benchmarking.",
        deliverables: [
            "100/100 Core Web Vitals Audit Report",
            "Automated End-to-End Test Suite",
            "SQL & API Security Vulnerability Clean Bill",
            "High-Throughput Concurrency Benchmarks"
        ],
        guarantee: "Zero-vulnerability sign-off prior to production deployment.",
        icon: ShieldCheck,
        visualType: "security"
    },
    {
        stepNumber: "04",
        title: "Production Handover & 90-Day SLA",
        timeline: "Launch & 90 Days Beyond",
        summary: "Seamless production DNS cutover, 100% IP legal transfer, full documentation handover, and active SLA monitoring.",
        deliverables: [
            "100% Source Code & Git Transfer Under NDA",
            "Production Cloud Deployment & Domain Config",
            "Turnkey Video Training & Tech Documentation",
            "90-Day Post-Launch SLA Bug Warranty"
        ],
        guarantee: "Guaranteed rapid-response SLA support for 90 days post-launch.",
        icon: Rocket,
        visualType: "handover"
    }
];

interface ProjectFitOption {
    id: string;
    name: string;
    category: string;
    icon: React.ElementType;
    estDuration: string;
    squadStructure: string[];
    includedHighlights: string[];
    previewImage: string;
    previewBadge: string;
    ctaUrl: string;
}

const projectFitOptions: ProjectFitOption[] = [
    {
        id: "custom-saas",
        name: "Custom Software & Web SaaS",
        category: "Software & Web Platforms",
        icon: Globe,
        estDuration: "2 – 6 Weeks",
        squadStructure: [
            "1 Lead Solutions Architect",
            "2 Full-Stack Next.js Developers",
            "1 UI/UX & Design Systems Engineer",
            "1 Automated QA & Cloud Specialist"
        ],
        includedHighlights: [
            "Next.js App Router + TypeScript SSR",
            "PostgreSQL / Redis / Vector Database",
            "Stripe / Razorpay Billing Integration",
            "90-Day Post-Launch SLA Warranty"
        ],
        previewImage: "/assets/images/Web-Development.avif",
        previewBadge: "Next.js SSR • 100/100 Vitals",
        ctaUrl: "/contact?category=software"
    },
    {
        id: "mobile-app",
        name: "Native & Cross-Platform Mobile",
        category: "iOS & Android Applications",
        icon: Smartphone,
        estDuration: "3 – 8 Weeks",
        squadStructure: [
            "1 Lead Mobile Architect",
            "2 Native / Flutter Developers",
            "1 Backend API Engineer",
            "1 App Store Deployment Specialist"
        ],
        includedHighlights: [
            "60fps Retina UI & Biometrics",
            "Offline-First SQLite / Firebase Sync",
            "Automated App Store CI/CD",
            "Push Notification Infrastructure"
        ],
        previewImage: "/assets/images/FinTech-Apps.avif",
        previewBadge: "60fps Native • Biometrics Ready",
        ctaUrl: "/contact?category=application"
    },
    {
        id: "algo-quant",
        name: "Algo Trading & Quant Systems",
        category: "Fintech & Algorithmic Engines",
        icon: Zap,
        estDuration: "1 – 4 Weeks",
        squadStructure: [
            "1 Head Quant Software Architect",
            "1 Low-Latency Backend Engineer",
            "1 Multi-Broker API Integrator",
            "1 Strategy Backtester Specialist"
        ],
        includedHighlights: [
            "Sub-0.1ms Multi-Broker API Hook",
            "Deterministic Historical Backtesting",
            "Real-Time WebSockets Streamer",
            "Zero-Hype Compliance Architecture"
        ],
        previewImage: "/assets/images/uvicon-pro-preview.png",
        previewBadge: "Sub-0.1ms Engine • Multi-Broker",
        ctaUrl: "/contact?category=algo"
    },
    {
        id: "cloud-enterprise",
        name: "Enterprise Cloud & Microservices",
        category: "Distributed Architecture",
        icon: Server,
        estDuration: "4 – 10 Weeks",
        squadStructure: [
            "1 Enterprise Cloud Architect",
            "2 Distributed Systems Engineers",
            "1 DevOps & Kubernetes Lead",
            "1 Security & Compliance Auditor"
        ],
        includedHighlights: [
            "High-Throughput Microservices",
            "Automated CI/CD & Docker Setup",
            "Role-Based Access Control (RBAC)",
            "24/7 Monitoring & Disaster Recovery"
        ],
        previewImage: "/assets/images/Software-tools.avif",
        previewBadge: "Docker & AWS • 99.99% SLA",
        ctaUrl: "/contact?category=software"
    }
];

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ElementType;
}

const whyChooseUsFaqs: FaqItem[] = [
    {
        id: "why-faq-1",
        question: "How does Uvicon guarantee 100% intellectual property (IP) ownership?",
        answer: "Every client relationship begins with a legally binding Non-Disclosure Agreement (NDA) and Master Services Agreement (MSA). Upon milestone completion, 100% of all source code, database architectures, graphics, and deployment scripts are transferred directly to your organization with zero vendor lock-in.",
        icon: ShieldCheck
    },
    {
        id: "why-faq-2",
        question: "How does working with Uvicon differ from traditional agencies and freelancers?",
        answer: "Unlike traditional agencies that add bloated layers of non-technical account managers, you collaborate directly with Lead Architects and dedicated engineering squads. Unlike freelancers who lack accountability, we back every project with fixed-scope agile milestones, live bi-weekly staging demos, and a 90-Day Post-Launch SLA Warranty.",
        icon: Users
    },
    {
        id: "why-faq-3",
        question: "What does the 90-Day Post-Launch SLA Warranty cover?",
        answer: "We include a comprehensive 90-day post-launch SLA warranty with every turnkey project. If any bug or performance regression occurs within the agreed scope, our team investigates and patches it with priority turnaround at zero additional charge.",
        icon: Award
    },
    {
        id: "why-faq-4",
        question: "How do you ensure sub-millisecond latency in algorithmic systems?",
        answer: "Our quant engines are engineered in Python, C++, and optimized WebSockets with zero-bloat modularity. We connect directly to official broker APIs, optimize memory buffers, and run automated backtesting against multi-year tick data to guarantee deterministic, low-latency order execution.",
        icon: Zap
    },
    {
        id: "why-faq-5",
        question: "Can Uvicon build my custom project within a fixed timeline and budget?",
        answer: "Yes. In Phase 1 (Architecture & Scope Blueprint), we define every technical deliverable, wireframe, and timeline milestone before initiating code. This eliminates scope creep and ensures guaranteed fixed-cost delivery without surprise invoices.",
        icon: CalendarCheck2
    },
    {
        id: "why-faq-6",
        question: "What security, encryption, and NDA standards do you enforce?",
        answer: "We enforce bank-grade security protocols including end-to-end SSL/TLS encryption, automated CI/CD security vulnerability scanners, ACID database compliance, and strict role-based access control (RBAC). All developer access is governed by enterprise NDAs.",
        icon: Lock
    }
];

/* ==========================================================================
   MAIN CLIENT COMPONENT
   ========================================================================== */

export default function WhyChooseUsClient() {
    // Interactive state for Comparison Tabs
    const [activeCompareTab, setActiveCompareTab] = useState<string>("speed-tech");

    // Interactive state for Delivery Lifecycle Phase selection
    const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

    // Interactive state for Project Fit Estimator
    const [selectedProjectFit, setSelectedProjectFit] = useState<string>("custom-saas");

    // Interactive state for FAQs accordion (all closed by default)
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenFaqId((prev) => (prev === id ? null : id));
    };

    const currentTabDetails =
        comparisonTabs.find((tab) => tab.id === activeCompareTab) || comparisonTabs[0];

    const currentFitDetails =
        projectFitOptions.find((opt) => opt.id === selectedProjectFit) || projectFitOptions[0];

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
               SECTION 1: HERO SECTION — IMMERSIVE ENGINEERING COMMAND CENTER
               ===================================================================== */}
            <section className="w-full relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10">
                {/* 3D Glass Bolt Accents with Floating Animation */}
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
                    className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* Top Glow Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl mb-4 shadow-xs"
                    >
                        <ShieldCheck className="w-4 h-4 text-[#FFC050]" />
                        <span>THE UVICON ENGINEERING STANDARD</span>
                    </motion.div>

                    {/* Centered Watermark + Giant Heading Block */}
                    <motion.div variants={fadeInUp} className="relative w-full flex flex-col items-center text-center mb-5">
                        <div className="relative w-full flex flex-col items-center justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Centered Watermark */}
                            <span className="text-[36px] sm:text-[64px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-hero leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                WHY CHOOSE US
                            </span>

                            {/* Centered Heading (H1) */}
                            <h1 className="text-[28px] sm:text-[42px] lg:text-[50px] xl:text-[58px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] lg:leading-[1.1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:drop-shadow-md text-center max-w-4xl">
                                Why High-Growth Companies & Traders Build With Uvicon
                            </h1>
                        </div>

                        {/* Centered Subtitle */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.65] max-w-3xl font-[family-name:var(--font-body)] mt-3 sm:mt-4 lg:mt-2 relative z-10 text-center">
                            We replace sluggish agency bureaucracy and unpredictable freelancers with dedicated, high-velocity engineering squads. 100% IP ownership, sub-millisecond precision, and guaranteed 90-day post-launch SLAs.
                        </p>
                    </motion.div>

                    {/* Centered CTA Buttons */}
                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 relative z-10 mb-8 w-full sm:w-auto">
                        <Link
                            href="/contact"
                            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-[0_8px_22px_rgba(255,192,80,0.35)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                        >
                            <span>Schedule Free Tech Consultation</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="#comparison-matrix"
                            className="px-8 py-3.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-xl border border-[#003D3F]/20 dark:border-white/20 text-[#003D3F] dark:text-white font-bold text-sm tracking-wide transition-all hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00595C] shadow-sm"
                        >
                            <Sliders className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                            <span>Compare With Agencies ↓</span>
                        </a>
                    </motion.div>

                    {/* Quick Proof Pills Bar */}
                    <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-[#003D3F]/85 dark:text-white/85 mb-8">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            100% IP & Git Ownership
                        </span>
                        <span className="hidden sm:inline-block text-[#003D3F]/30 dark:text-white/30">•</span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            90-Day Post-Launch SLA
                        </span>
                        <span className="hidden sm:inline-block text-[#003D3F]/30 dark:text-white/30">•</span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Sub-0.1ms Quant Latency
                        </span>
                        <span className="hidden sm:inline-block text-[#003D3F]/30 dark:text-white/30">•</span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Bi-Weekly Staging Demos
                        </span>
                    </motion.div>

                    {/* Hero Interactive Lottie Engineering Showcase Capsule */}
                    <motion.div
                        variants={fadeInUp}
                        className="w-full max-w-5xl mb-8 bg-gradient-to-r from-white/95 via-white/85 to-white/95 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-5 sm:p-7 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left"
                    >
                        <div className="flex flex-col items-start gap-2.5 max-w-lg z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 text-xs font-black uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] border border-[#00595C]/20 dark:border-[#FFC050]/30">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                <span>High-Velocity Engineering Squad Active</span>
                            </div>
                            <h3 className="text-lg sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                Engineered For Extreme Throughput & Zero Tech Debt
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
                                From deterministic sub-millisecond algorithmic routers to Next.js 15 SSR platforms, our squads ship production-grade software with automated CI/CD and 100% legal IP handover.
                            </p>
                            <div className="flex items-center gap-3 mt-1 text-xs font-bold text-[#00595C] dark:text-[#3FC1B8]">
                                <span>⚡ Sub-0.1ms Engine</span>
                                <span>•</span>
                                <span>🛡️ 100% IP NDA Transfer</span>
                                <span>•</span>
                                <span>🏆 90-Day SLA</span>
                            </div>
                        </div>

                        {/* Lottie Animation Hub */}
                        <div className="w-full md:w-72 sm:h-56 h-48 flex items-center justify-center relative shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#00595C]/25 via-[#3FC1B8]/20 to-[#FFC050]/15 rounded-full blur-2xl pointer-events-none" />
                            <LottiePlayer
                                animationPath="/assets/lottie/uvicon-teal-computer.json"
                                className="w-full h-full object-contain relative z-10"
                            />
                        </div>
                    </motion.div>

                    {/* Full-Width 4-Column Hero Command Showcase Cards */}
                    <motion.div variants={fadeInUp} className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 text-left">

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
               SECTION 2: TABBED COMPARISON MATRIX (RIGHT-ALIGNED)
               ===================================================================== */}
            <motion.section
                id="comparison-matrix"
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10 scroll-mt-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 3 Accent on Right with Float Animation */}
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
                    {/* Header Block - CENTER-ALIGNED */}
                    <div className="relative text-center w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-center">
                        <div className="relative w-full flex flex-col items-center justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                COMPARISON
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-center whitespace-normal lg:whitespace-nowrap">
                                Why The Best Choose The Uvicon Route
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mx-auto text-center font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            See how our engineering studio model compares against traditional legacy agencies and unpredictable freelancer networks.
                        </p>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="w-full flex items-center justify-start lg:justify-end gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 relative z-10">
                        {comparisonTabs.map((tab) => {
                            const TabIcon = tab.icon;
                            const isActive = activeCompareTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveCompareTab(tab.id)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
                                        isActive
                                            ? "bg-[#00595C] dark:bg-[#FFC050] text-white dark:text-[#002829] shadow-md scale-105"
                                            : "bg-white/80 dark:bg-white/10 text-[#003D3F] dark:text-white hover:bg-white dark:hover:bg-white/20 border border-[#003D3F]/15 dark:border-white/10"
                                    }`}
                                >
                                    <TabIcon className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Side-by-Side 3-Column Comparative Cards */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                        {/* COLUMN 1: UVICON TECHNOLOGIES (THE WINNER SPOTLIGHT) */}
                        <div className="lg:col-span-6 bg-gradient-to-b from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001D1F]/85 dark:to-[#001416]/90 rounded-3xl p-6 sm:p-7 border-2 border-[#FFC050] dark:border-[#FFC050] shadow-[0_12px_35px_rgba(255,192,80,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden text-left group">
                            {/* Top Badge */}
                            <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                                <Award className="w-3.5 h-3.5" />
                                <span>Gold Standard</span>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-11 h-11 rounded-2xl bg-[#00595C]/15 dark:bg-[#FFC050]/20 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#00595C]/20 dark:border-[#FFC050]/30 shadow-inner">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            The Uvicon Model
                                        </h3>
                                        <span className="text-xs font-semibold text-[#00595C] dark:text-[#3FC1B8]">
                                            Dedicated Engineering Studio
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 mb-4 font-[family-name:var(--font-body)]">
                                    Engineered for builders who refuse to compromise on code quality, speed, security, and intellectual property protection.
                                </p>

                                {/* Feature Advantages List */}
                                <div className="flex flex-col gap-2.5">
                                    {currentTabDetails.uviconAdvantages.map((adv, aIdx) => (
                                        <div key={aIdx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#00595C]/6 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span>{adv}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Metric Pillar */}
                            <div className="mt-5 pt-4 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                <span className="text-xs font-bold text-[#003D3F]/75 dark:text-white/75">
                                    {currentTabDetails.uviconMetricLabel}
                                </span>
                                <span className="text-lg sm:text-xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                    {currentTabDetails.uviconMetric}
                                </span>
                            </div>
                        </div>

                        {/* COLUMN 2: TRADITIONAL AGENCIES */}
                        <div className="lg:col-span-3 bg-white/75 dark:bg-[#001D1F]/60 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#003D3F]/15 dark:border-white/10 shadow-sm flex flex-col justify-between text-left opacity-90 hover:opacity-100 transition-opacity">
                            <div>
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                                        <XCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            Traditional Agencies
                                        </h3>
                                        <span className="text-[11px] text-[#003D3F]/60 dark:text-white/60">
                                            Bloated Overhead Model
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs text-[#003D3F]/70 dark:text-white/70 mb-3.5">
                                    Layers of non-technical managers and high recurring retainers.
                                </p>

                                <div className="flex flex-col gap-2">
                                    {currentTabDetails.agencyDisadvantages.map((dis, dIdx) => (
                                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#003D3F]/75 dark:text-white/70">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                            <span>{dis}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#003D3F]/10 dark:border-white/10">
                                <span className="text-[11px] font-bold text-red-500 block">
                                    High Markup & Slow Velocity
                                </span>
                            </div>
                        </div>

                        {/* COLUMN 3: FREELANCERS & GIG NETWORKS */}
                        <div className="lg:col-span-3 bg-white/75 dark:bg-[#001D1F]/60 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#003D3F]/15 dark:border-white/10 shadow-sm flex flex-col justify-between text-left opacity-90 hover:opacity-100 transition-opacity">
                            <div>
                                <div className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                                        <XCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            Freelancers
                                        </h3>
                                        <span className="text-[11px] text-[#003D3F]/60 dark:text-white/60">
                                            Gig Worker Networks
                                        </span>
                                    </div>
                                </div>

                                <p className="text-xs text-[#003D3F]/70 dark:text-white/70 mb-3.5">
                                    Single point of failure with unpredictable availability.
                                </p>

                                <div className="flex flex-col gap-2">
                                    {currentTabDetails.freelancerDisadvantages.map((fDis, fIdx) => (
                                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#003D3F]/75 dark:text-white/70">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                            <span>{fDis}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#003D3F]/10 dark:border-white/10">
                                <span className="text-[11px] font-bold text-amber-500 block">
                                    No Formal SLA or Security Audit
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 3: 6 CORE DIFFERENTIATORS (LEFT-ALIGNED BENTO GRID)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 4 Accent Bottom Left with Float Animation */}
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
                    {/* Header Block - CENTER-ALIGNED */}
                    <div className="relative text-center w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-center">
                        <div className="relative w-full flex flex-col items-center justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                PILLARS
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-center whitespace-normal lg:whitespace-nowrap">
                                Six Pillars That Set Our Work Apart
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mx-auto text-center font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our studio operates under six unbending engineering commitments designed to give you unfair market advantage.
                        </p>
                    </div>

                    {/* Bento Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                        {differentiatorPillars.map((pillar) => {
                            const PillarIcon = pillar.icon;
                            return (
                                <motion.div
                                    key={pillar.id}
                                    variants={cardVariant}
                                    className={`${pillar.span} bg-white/90 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 lg:p-8 border border-white/60 border-t-white/80 dark:border-white/10 dark:border-t-white/20 shadow-[0_10px_30px_rgba(0,61,63,0.06)] dark:shadow-none hover:border-[#FFC050]/50 transition-all flex flex-col justify-between group relative overflow-hidden text-left`}
                                >
                                    {/* Corner Glow */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-2xl pointer-events-none" />

                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-3">
                                            <div className="w-11 h-11 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-110 transition-transform shrink-0">
                                                <PillarIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/40 tracking-wide">
                                                {pillar.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs font-semibold text-[#00595C] dark:text-[#3FC1B8] uppercase tracking-wider mt-0.5">
                                            {pillar.tagline}
                                        </p>
                                        <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed mt-2 font-[family-name:var(--font-body)]">
                                            {pillar.desc}
                                        </p>
                                    </div>

                                    {/* Highlights Checklist */}
                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5 pt-3.5 border-t border-[#003D3F]/10 dark:border-white/10">
                                        {pillar.highlights.map((high, hIdx) => (
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
               SECTION 4: 4-PHASE DELIVERY ENGINE & DYNAMIC VISUAL ARTIFACTS (RIGHT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 1 Accent Top Right with Float Animation */}
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
                    {/* Header Block - CENTER-ALIGNED */}
                    <div className="relative text-center w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-center">
                        <div className="relative w-full flex flex-col items-center justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                PROCESS
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-center whitespace-normal lg:whitespace-nowrap">
                                From Architecture Spec To Production Launch
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mx-auto text-center font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our battle-tested 4-phase delivery engine guarantees zero surprise billing, live bi-weekly demos, and strict milestone governance.
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

                    {/* Active Phase Deep Dive Detail Showcase with Dynamic Interactive Visuals */}
                    <div className="w-full bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/20 dark:border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden text-left">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left: Phase Narrative & Deliverables */}
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

                                {/* Deliverables List */}
                                <div className="w-full mt-2 flex flex-col gap-2">
                                    {deliveryPhases[activePhaseIndex].deliverables.map((del, dIdx) => (
                                        <div key={dIdx} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-xs sm:text-sm font-semibold text-[#003D3F] dark:text-white shadow-2xs">
                                            <Check className="w-4 h-4 text-[#FFC050] shrink-0" />
                                            <span>{del}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Guarantee Pill */}
                                <div className="w-full p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mt-1">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong>Phase Guarantee:</strong> {deliveryPhases[activePhaseIndex].guarantee}
                                    </span>
                                </div>
                            </div>

                            {/* Right: Dynamic Interactive Visual Artifact per Phase */}
                            <div className="lg:col-span-6 flex flex-col items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {/* PHASE 1: BLUEPRINT VISUAL ARTIFACT */}
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
                                                    <span className="text-[#3FC1B8] block font-bold">Frontend Pod:</span>
                                                    <span className="text-white/80">Next.js 15 App Router</span>
                                                </div>
                                                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                                                    <span className="text-[#3FC1B8] block font-bold">Backend Logic:</span>
                                                    <span className="text-white/80">Microservices + Redis</span>
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
                                                <span>Figma Tokens & Milestone SOW</span>
                                                <BadgeCheck className="w-4 h-4 text-[#FFC050]" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* PHASE 2: CODE TERMINAL ARTIFACT */}
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
                                                <p className="text-white/50">$ git commit -m "feat(core): sub-0.1ms algo router"</p>
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

                                    {/* PHASE 3: QA & SECURITY RADAR ARTIFACT */}
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
                                                    <span>Google Lighthouse Performance</span>
                                                    <span className="text-emerald-400 font-bold">100 / 100</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>SQL Injection & CSRF Vulnerabilities</span>
                                                    <span className="text-emerald-400 font-bold">0 Detected</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>Cross-Browser Compatibility</span>
                                                    <span className="text-emerald-400 font-bold">Chrome, Safari, Firefox</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                                                    <span>Memory Heap Leakage Check</span>
                                                    <span className="text-emerald-400 font-bold">Clean / Zero Leaks</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* PHASE 4: HANDOVER & SLA CERTIFICATE ARTIFACT */}
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
                                                <CheckCheck className="w-4 h-4 text-emerald-400" />
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
               SECTION 5: PROJECT FIT ESTIMATOR WIDGET WITH LIVE PRODUCT PREVIEWS (LEFT-ALIGNED)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 2 Accent Bottom Right with Float Animation */}
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
                    {/* Header Block - CENTER-ALIGNED */}
                    <div className="relative text-center w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-center">
                        <div className="relative w-full flex flex-col items-center justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            {/* Main Heading (Watermark) */}
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                ESTIMATOR
                            </span>

                            {/* Subheading (H2) */}
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-center whitespace-normal lg:whitespace-nowrap">
                                Estimate Your Project Fit & Delivery Cadence
                            </h2>
                        </div>

                        {/* Paragraph Below Subheading */}
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mx-auto text-center font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Select your engineering initiative to see estimated team squad structure, sprint duration, and real finished product previews.
                        </p>
                    </div>

                    {/* Project Type Selectors */}
                    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
                        {projectFitOptions.map((opt) => {
                            const OptIcon = opt.icon;
                            const isSelected = selectedProjectFit === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => setSelectedProjectFit(opt.id)}
                                    className={`p-4 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left transition-all cursor-pointer focus:outline-none ${
                                        isSelected
                                            ? "bg-[#00595C] dark:bg-[#FFC050] text-white dark:text-[#002829] shadow-lg scale-105"
                                            : "bg-white/80 dark:bg-white/10 text-[#003D3F] dark:text-white hover:bg-white dark:hover:bg-white/20 border border-[#003D3F]/15 dark:border-white/10"
                                    }`}
                                >
                                    <OptIcon className="w-6 h-6 mb-2" />
                                    <h4 className="text-xs sm:text-sm font-bold leading-tight">
                                        {opt.name}
                                    </h4>
                                </button>
                            );
                        })}
                    </div>

                    {/* Estimator Dynamic Dashboard Output Card with Real Product Visual Thumbnail */}
                    <div className="w-full bg-gradient-to-br from-white/95 via-white/85 to-white/75 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/20 dark:border-white/15 backdrop-blur-2xl shadow-xl text-left relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Left: Squad & Duration */}
                            <div className="lg:col-span-6 flex flex-col gap-4">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8]">
                                        {currentFitDetails.category}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mt-1">
                                        {currentFitDetails.name}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                    <Clock className="w-5 h-5 text-[#FFC050] shrink-0" />
                                    <div>
                                        <span className="text-xs font-semibold text-[#003D3F]/75 dark:text-white/75 block">
                                            Estimated Delivery Cadence:
                                        </span>
                                        <span className="text-base sm:text-lg font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                            {currentFitDetails.estDuration}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#003D3F] dark:text-white mb-2 flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5 text-[#00595C] dark:text-[#FFC050]" />
                                        <span>Dedicated Engineering Squad:</span>
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {currentFitDetails.squadStructure.map((role, rIdx) => (
                                            <div key={rIdx} className="text-xs font-semibold p-2 rounded-xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-[#003D3F] dark:text-white">
                                                {role}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Real Visual Image Preview + Standard Guarantees + CTA */}
                            <div className="lg:col-span-6 bg-white/80 dark:bg-white/5 rounded-2xl p-5 sm:p-6 border border-[#003D3F]/10 dark:border-white/10 flex flex-col justify-between h-full">
                                {/* Visual Preview Thumbnail with Badge */}
                                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#003D3F]/15 dark:border-white/15 shadow-md mb-4 group">
                                    <Image
                                        src={currentFitDetails.previewImage}
                                        alt={currentFitDetails.name}
                                        fill
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#FFC050] text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                        {currentFitDetails.previewBadge}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8] mb-2 flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Guaranteed In Scope:</span>
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
                                        {currentFitDetails.includedHighlights.map((feat, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-1.5 text-xs font-semibold text-[#003D3F] dark:text-white">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                <span className="truncate">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Link
                                    href={currentFitDetails.ctaUrl}
                                    className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                >
                                    <span>Lock In This Sprint Scope</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 6: 2-COLUMN ACCORDION FAQS & 5-POINT QUALITY COMMITMENT
               ===================================================================== */}
            <section className="w-full relative pt-4 sm:pt-6 lg:pt-8 pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header Block - Centered */}
                    <div className="max-w-4xl mx-auto text-left sm:text-center mb-8 sm:mb-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                            <HelpCircle className="w-3.5 h-3.5 text-[#FFC050]" />
                            <span>RISK REVERSAL & FAQS</span>
                        </div>
                        <h2 className="text-[24px] sm:text-[34px] lg:text-[40px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                            Frequently Asked Questions & Guarantees
                        </h2>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[16px] mt-2 font-[family-name:var(--font-body)] leading-relaxed">
                            Clear, transparent answers regarding code ownership, milestone governance, sub-0.1ms latency, and post-launch SLAs.
                        </p>
                    </div>

                    {/* 2-Column Accordion FAQs Grid */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4.5 mb-12">
                        {whyChooseUsFaqs.map((faq) => {
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
                                            {/* Visual Icon Badge */}
                                            <div
                                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                                    isOpen
                                                        ? "bg-[#00595C] text-[#FFC050] dark:bg-[#FFC050] dark:text-[#002829]"
                                                        : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-[#FFC050]"
                                                } transition-colors duration-300`}
                                            >
                                                <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </div>

                                            {/* Question Text */}
                                            <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>

                                        {/* Chevron Toggle Button */}
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

                                    {/* Expandable Answer Content */}
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
                                                    <p className="pt-2.5">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* 5-Point Quality & Compliance Commitment Banner */}
                    <div className="bg-gradient-to-b from-white/95 via-white/85 to-white/75 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-xl shadow-xl relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFC050] to-transparent opacity-80" />

                        <div className="max-w-3xl mx-auto mb-8">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span>UNCOMPROMISING STANDARDS</span>
                            </div>
                            <h3 className="text-xl sm:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Partner With Uvicon & Build Without Compromise
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 mt-2 font-[family-name:var(--font-body)]">
                                Experience predictable agile execution, sub-millisecond precision, and 100% intellectual property ownership.
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
