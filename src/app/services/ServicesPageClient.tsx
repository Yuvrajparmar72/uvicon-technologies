"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
    Code2,
    Globe,
    Smartphone,
    Cpu,
    Zap,
    ShieldCheck,
    CheckCircle2,
    Sparkles,
    ArrowUpRight,
    ChevronRight,
    ChevronDown,
    Layers,
    Terminal,
    Database,
    Server,
    Lock,
    Clock,
    FileCode2,
    Bot,
    Gamepad2,
    Rocket,
    Mail,
    Image as ImageIcon,
    Activity,
    LineChart,
    Search,
    Award,
    Headphones
} from "lucide-react";

/* ==========================================================================
   FRAMER MOTION SCROLL ANIMATION VARIANTS
   ========================================================================== */

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05
        }
    }
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

/* ==========================================================================
   DATA STRUCTURES FOR SPECIALIZATIONS, CAPABILITIES, ENGAGEMENT & FAQ
   ========================================================================== */

interface SpecializationCard {
    id: string;
    title: string;
    tagline: string;
    description: string;
    href: string;
    icon: React.ElementType;
    badge: string;
    latencyOrMetric: string;
    keyFeatures: string[];
    techStack: string[];
    complianceNote?: string;
    imagePlaceholderTitle: string;
}

const specializations: SpecializationCard[] = [
    {
        id: "software",
        title: "Custom Software & Algo Trading Systems",
        tagline: "High-Frequency Backend Architecture & Quant Engines",
        description:
            "We engineer robust, fault-tolerant custom software, algorithmic trading engines, and enterprise backend architectures. Designed for quantitative analysts and institutions requiring low-latency execution and multi-broker connectivity.",
        href: "/services/software",
        icon: Code2,
        badge: "Algo & Enterprise Backend",
        latencyOrMetric: "< 0.1ms Execution Latency",
        keyFeatures: [
            "Multi-Broker API & Automated Order Routing",
            "Real-time Quantitative Strategy Backtesting Engine",
            "ACID-Compliant Transaction Security & Audit Trails",
            "Distributed Microservices & Event-Driven Pipelines"
        ],
        techStack: ["Python", "C++", "Node.js", "PostgreSQL", "Redis", "WebSockets"],
        complianceNote:
            "Regulatory Notice: Our algo trading tools provide software architecture and backtesting execution only. We never claim guaranteed returns or assured profit.",
        imagePlaceholderTitle: "Algo Trading Dashboard & Chart Engine Visual"
    },
    {
        id: "web",
        title: "Web Development & Enterprise Portals",
        tagline: "Sub-Second LCP & Conversion-Engineered Web Applications",
        description:
            "We build high-speed, SEO-optimized web applications and SaaS platforms using Next.js App Router, React, and modern CSS design systems. Every portal is architected for 99+ Lighthouse performance and seamless conversion flows.",
        href: "/services/web",
        icon: Globe,
        badge: "Next.js Web Applications",
        latencyOrMetric: "< 100ms LCP Load Speed",
        keyFeatures: [
            "Server-Side Rendering (SSR) & Static Site Generation",
            "Glassmorphism Design Systems & Micro-Animations",
            "Core Web Vitals Optimized (100/100 Lighthouse Score)",
            "Automated SEO & GEO Structured Schema Markups"
        ],
        techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL"],
        imagePlaceholderTitle: "Enterprise SaaS Web Portal & Scorecard Preview"
    },
    {
        id: "mobile",
        title: "Native & Cross-Platform Mobile Apps",
        tagline: "60fps Fluid iOS & Android Mobile Experiences",
        description:
            "From native iOS and Android apps to high-performance cross-platform Flutter codebases, we deliver intuitive, retina-ready mobile apps. Engineered with offline-first caching, biometric auth, and smooth hardware interactions.",
        href: "/services/mobile",
        icon: Smartphone,
        badge: "iOS, Android & Flutter",
        latencyOrMetric: "60fps Native Rendering",
        keyFeatures: [
            "Single Codebase Cross-Platform Deployment (Flutter)",
            "Native Apple Hardware & Jetpack Compose Performance",
            "Biometric Authentication & Offline Data Caching",
            "Automated App Store & Google Play CI/CD Releases"
        ],
        techStack: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
        imagePlaceholderTitle: "iOS & Android Mobile Screen Showcase"
    },
    {
        id: "games-ai",
        title: "Game Development & AI Agents",
        tagline: "Interactive Gaming Studios & Intelligent LLM Workflows",
        description:
            "Bring immersive interactive entertainment and artificial intelligence to life. We specialize in 2D/3D game engines, multiplayer networking, custom LLM agents, and RAG pipelines that automate complex business workflows.",
        href: "/services/games-ai",
        icon: Cpu,
        badge: "Gaming Studio & AI Agents",
        latencyOrMetric: "Autonomous RAG Pipelines",
        keyFeatures: [
            "2D/3D Game Mechanics & Cross-Platform Engine Builds",
            "Custom LLM Agent Training & RAG Knowledge Pipelines",
            "Real-Time Multiplayer Networking Architecture",
            "Predictive Analytics & Autonomous Business Automation"
        ],
        techStack: ["Python", "Unity", "Unreal Engine", "PyTorch", "FastAPI"],
        imagePlaceholderTitle: "3D Game Environment & AI Agent Workflow Visual"
    }
];

interface CapabilityItem {
    name: string;
    category: "web" | "backend" | "mobile" | "ai";
    desc: string;
    icon: React.ElementType;
    overview: string;
    uviconImplementation: string;
    highlights: string[];
}

const capabilityItems: CapabilityItem[] = [
    {
        name: "Next.js & React App Router",
        category: "web",
        desc: "Enterprise Frontend",
        icon: Globe,
        overview:
            "Next.js App Router provides Server-Side Rendering, edge caching, and dynamic code splitting for high-throughput portals.",
        uviconImplementation:
            "We use Next.js across all marketing and SaaS client apps to guarantee instant first-paint speeds and GEO compliance.",
        highlights: ["100/100 Lighthouse Vitals", "Server Actions & Edge API Routes", "Zero-Bundle Bloat Architecture"]
    },
    {
        name: "Python AI & Algo Engines",
        category: "ai",
        desc: "Quant & LLM Scripting",
        icon: Terminal,
        overview:
            "Python serves as our foundational engine for quantitative strategy scripting, data processing, and AI model orchestration.",
        uviconImplementation:
            "We build low-latency risk calculators, automated multi-broker execution hooks, and custom RAG AI agents in Python.",
        highlights: ["High-Speed Quant Calculations", "Custom LLM RAG Pipelines", "Multi-Broker API Connectors"]
    },
    {
        name: "Node.js & Realtime WebSockets",
        category: "backend",
        desc: "High-Concurrency APIs",
        icon: Server,
        overview:
            "Event-driven Node.js runtime powers real-time bi-directional streaming, WebSocket order books, and microservice APIs.",
        uviconImplementation:
            "We architect high-concurrency Node.js gateways that process thousands of concurrent client connections smoothly.",
        highlights: ["Real-Time Order Book Streaming", "Non-Blocking Asynchronous I/O", "Horizontal Cluster Auto-Scaling"]
    },
    {
        name: "PostgreSQL & Relational ACID SQL",
        category: "backend",
        desc: "Zero-Loss Transaction SQL",
        icon: Database,
        overview:
            "Enterprise relational SQL database guaranteeing ACID transaction integrity, strict data typing, and high-volume indexing.",
        uviconImplementation:
            "We implement PostgreSQL with pgvector for secure financial ledgers, user balances, and AI embedding queries.",
        highlights: ["ACID Transaction Governance", "pgVector AI Embeddings", "Automated Point-in-Time Backups"]
    },
    {
        name: "Flutter & Apple Swift Native",
        category: "mobile",
        desc: "60fps Native Mobile UI",
        icon: Smartphone,
        overview:
            "Modern mobile engineering frameworks that compile directly to native ARM hardware instructions for fluid animations.",
        uviconImplementation:
            "We build cross-platform Flutter and native SwiftUI apps with offline-first data caching and biometric security.",
        highlights: ["60fps Impeller Graphic Engine", "Biometric Touch/Face ID Security", "Native Bluetooth & Camera Access"]
    },
    {
        name: "Docker Containerization & CI/CD",
        category: "backend",
        desc: "Zero-Downtime DevOps",
        icon: Layers,
        overview:
            "Containerized application bundles that eliminate environment discrepancies between local development and cloud production.",
        uviconImplementation:
            "We containerize all client software in lightweight Docker multi-stage images deployed on scalable cloud clusters.",
        highlights: ["100% Staging to Prod Parity", "Zero-Downtime Rolling Updates", "Automated Vulnerability Scanning"]
    }
];

interface EngagementModel {
    id: string;
    title: string;
    badge: string;
    summary: string;
    idealFor: string;
    deliverables: string[];
    timeline: string;
}

const engagementModels: EngagementModel[] = [
    {
        id: "full-cycle",
        title: "End-to-End Product Development",
        badge: "Turnkey Agency Solution",
        summary:
            "From initial requirement discovery and UI/UX design to full-stack agile sprints and production deployment. We take 100% technical ownership of building your digital product.",
        idealFor: "Enterprises, startups, and founders launching a new SaaS platform, web app, or trading portal.",
        deliverables: [
            "Full System Architecture & Figma UI/UX Design",
            "Production-Ready Codebase with Automated CI/CD",
            "100% IP & Source Code Transfer upon Completion",
            "90-Day Post-Launch SLA Warranty & Technical Support"
        ],
        timeline: "4 to 12 Weeks"
    },
    {
        id: "team-augmentation",
        title: "Dedicated Tech Pods & Augmentation",
        badge: "Embedded Senior Engineers",
        summary:
            "Scale your existing engineering velocity. Embed Uvicon's senior React, Next.js, Python, mobile, or quant engineers directly into your product teams.",
        idealFor: "Established tech teams needing specialized domain skills in quant trading, AI, or Next.js optimization.",
        deliverables: [
            "Dedicated Senior Engineers aligned to your time zone",
            "Strict NDA & Enterprise Intellectual Property Protection",
            "Continuous Agile Sprint Delivery & Code Review Governance",
            "Flexibility to scale engineering resources up or down"
        ],
        timeline: "Monthly Retainer"
    },
    {
        id: "quant-consulting",
        title: "Algo & Quant Architecture Consulting",
        badge: "Specialized Financial Tech",
        summary:
            "Custom quantitative trading software architecture, multi-broker connectivity audits, and high-frequency execution optimization for proprietary desks and fintechs.",
        idealFor: "Fintech companies, quantitative analysts, and institutions building algorithmic trading infrastructure.",
        deliverables: [
            "Low-Latency Execution & Broker API Architecture Review",
            "Custom Strategy Backtesting Engine Blueprint",
            "Security & Compliance Code Audits (No-hype, factual tech)",
            "Serverless & Redis Order Routing Optimization"
        ],
        timeline: "2 to 6 Weeks"
    }
];

interface FaqItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FaqItem[] = [
    {
        category: "Pricing & Scope",
        question: "How do you estimate timelines and pricing for custom software or web applications?",
        answer:
            "We use an agile milestone-based pricing model. After a comprehensive discovery session where we map out your functional requirements, technical architecture, and UI/UX scope, we provide a fixed-price proposal with clear sprint milestones. Small-to-medium web portals typically ship in 4 to 6 weeks, while enterprise trading engines or custom SaaS systems range from 8 to 12+ weeks."
    },
    {
        category: "IP & Legal",
        question: "Do we receive 100% intellectual property (IP) and source code ownership?",
        answer:
            "Yes, absolutely. Upon final project delivery and milestone completion, 100% of the intellectual property, custom source code, design assets, and deployment scripts are legally transferred to your company. We work under strict non-disclosure agreements (NDAs) from day one."
    },
    {
        category: "Algo & Trading",
        question: "What technologies do you use for algorithmic trading software, and do you guarantee returns?",
        answer:
            "We architect algo trading systems using Python, C++, Node.js, PostgreSQL, Redis, and WebSockets for low-latency broker connectivity and backtesting execution. In strict accordance with financial regulations and our company compliance policy, we provide software architecture and backtesting tools only. We never guarantee returns, assure profit, or make risk-free claims."
    },
    {
        category: "Security & Performance",
        question: "How do you ensure our application is secure and performs fast under heavy traffic?",
        answer:
            "We build zero-vulnerability cloud architectures with end-to-end SSL encryption, strict WCAG accessibility compliance, SQL injection prevention, and automated vulnerability scanning. On the frontend, our Next.js web applications are optimized for sub-100ms Largest Contentful Paint (LCP) and 99+ Google Lighthouse performance scores."
    },
    {
        category: "Support & Maintenance",
        question: "Do you provide post-launch hosting, maintenance, and 24/7 technical support?",
        answer:
            "Yes. Every turnkey product delivery includes a 90-day post-launch SLA warranty covering bug fixes and performance monitoring. Beyond that, we offer continuous 24/7 proactive health monitoring, server maintenance, cloud backup management, and dedicated SLA response times under our managed support retainers."
    },
    {
        category: "Process",
        question: "Can we start with a Proof-of-Concept (PoC) or prototype before full development?",
        answer:
            "Yes. For complex enterprise applications or new quant trading concepts, we recommend starting with a 2-week Architecture & Interactive Figma Prototype sprint. This gives your stakeholders a clickable high-fidelity mockup and technical blueprint before committing to full-scale engineering."
    }
];

interface CaseStudyPreview {
    id: string;
    title: string;
    category: string;
    description: string;
    metrics: string[];
    tech: string[];
    href: string;
    badge: string;
    imagePlaceholderTitle: string;
}

const caseStudies: CaseStudyPreview[] = [
    {
        id: "uvicon-connect",
        title: "Uvicon Connect — Intelligent Lead & Sales CRM",
        category: "Enterprise SaaS & CRM",
        description:
            "A high-throughput CRM platform engineered for automated lead distribution, real-time sales pipeline Kanban boards, and multi-team productivity tracking.",
        metrics: ["10,000+ Active Leads", "< 50ms Real-Time Sync", "99.99% Cloud Uptime"],
        tech: ["Next.js", "Node.js", "PostgreSQL", "WebSockets"],
        href: "/softwares",
        badge: "Featured CRM Portal",
        imagePlaceholderTitle: "Uvicon Connect CRM Kanban & Analytics Preview"
    },
    {
        id: "uvicon-pro",
        title: "Uvicon Pro — Algo Software & Backtesting Engine",
        category: "Fintech & Quant Trading",
        description:
            "Institutional-grade algorithmic trading software and backtesting platform featuring automated multi-broker order routing and low-latency quantitative analysis.",
        metrics: ["< 0.1ms Execution Speed", "Multi-Broker API Ready", "Strategy Backtest Engine"],
        tech: ["Python", "C++", "React", "Redis", "WebSockets"],
        href: "/softwares",
        badge: "Algo & Backtesting",
        imagePlaceholderTitle: "Uvicon Pro Algo Strategy Tester & Multi-Broker Visual"
    },
    {
        id: "uhmb-services",
        title: "UHMB Services — Patient Care & Telemedicine Web Platform",
        category: "Healthcare Web Application",
        description:
            "A modern digital healthcare portal offering instant doctor appointments, electronic health records (EHR) management, and telemedicine video consultations.",
        metrics: ["HIPAA Security Standard", "Instant Appointment Booking", "100/100 Core Web Vitals"],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
        href: "/websites",
        badge: "Healthcare Platform",
        imagePlaceholderTitle: "UHMB Patient Portal & Telemedicine Dashboard Preview"
    }
];

/* ==========================================================================
   MAIN INTERACTIVE CLIENT COMPONENT FOR SERVICES PAGE
   ========================================================================== */

export default function ServicesPageClient() {
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // State for Mobile Expand / Collapse of cards (Progressive Disclosure)
    const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});
    const [expandedCases, setExpandedCases] = useState<Record<string, boolean>>({});

    const toggleSpec = (id: string) => {
        setExpandedSpecs((prev) => (prev[id] ? {} : { [id]: true }));
    };

    const toggleCase = (id: string) => {
        setExpandedCases((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Filter specializations based on category pill
    const filteredSpecializations = specializations.filter((item) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "software") return item.id === "software";
        if (activeFilter === "web") return item.id === "web";
        if (activeFilter === "mobile") return item.id === "mobile";
        if (activeFilter === "games-ai") return item.id === "games-ai";
        return true;
    });

    // Filter capabilities based on category tab
    const filteredCapabilities = capabilityItems.filter((item) => {
        if (activeTab === "all") return true;
        return item.category === activeTab;
    });

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* =====================================================================
               UNIFIED PAGE BACKGROUND CSS, GRADIENTS & ZERO BORDER OVERRIDES
               ===================================================================== */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                :root {
                    --page-bg: linear-gradient(180deg,
                        #E6F9F8 0%,
                        #EBF8F7 25%,
                        #F0FAF9 50%,
                        #F5FCFC 75%,
                        #FDFBF7 100%
                    );
                    --hero-glow: radial-gradient(circle at 85% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.8) 35%, rgba(184, 230, 226, 0.3) 65%, transparent 100%);
                    --spec-glow: radial-gradient(circle at 15% 45%, rgba(0, 180, 170, 0.18) 0%, rgba(255, 192, 80, 0.12) 45%, transparent 80%);
                    --tech-glow: radial-gradient(circle at 85% 55%, rgba(255, 192, 80, 0.18) 0%, rgba(0, 180, 170, 0.15) 45%, transparent 80%);
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(180deg,
                            #001214 0%,
                            #001618 25%,
                            #001A1C 50%,
                            #001618 75%,
                            #021213 100%
                        );
                        --hero-glow: radial-gradient(circle at 85% 25%, rgba(0, 180, 170, 0.6) 0%, rgba(0, 135, 128, 0.4) 35%, rgba(0, 85, 80, 0.15) 65%, transparent 100%);
                        --spec-glow: radial-gradient(circle at 15% 45%, rgba(0, 180, 170, 0.22) 0%, rgba(255, 192, 80, 0.14) 45%, transparent 85%);
                        --tech-glow: radial-gradient(circle at 85% 55%, rgba(255, 192, 80, 0.2) 0%, rgba(0, 180, 170, 0.18) 45%, transparent 85%);
                    }
                }
                .stroke-watermark-services {
                    -webkit-text-stroke: 2.5px rgba(0, 61, 63, 0.35);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-services {
                        -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.32);
                    }
                }
                /* Hide scrollbar for category pills on mobile */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                /* Override inline top for relative cards on mobile */
                @media (max-width: 1023px) {
                    .card-deck-relative {
                        top: auto !important;
                    }
                }
            `
                }}
            />

            {/* =====================================================================
               SECTION 1: HERO SECTION (ANSWER-FIRST + SERVICE LAUNCHPAD)
               ===================================================================== */}
            <section className="w-full relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 px-4 sm:px-8 lg:px-16 overflow-hidden z-10">
                {/* Decorative Hero Radial Glow */}
                <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                    style={{
                        background: "var(--hero-glow)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)"
                    }}
                />

                {/* 3D Glass Bolt Accents — Responsive Positioning */}
                <div className="absolute top-12 right-0 sm:right-6 lg:right-12 w-32 sm:w-48 lg:w-64 pointer-events-none z-0 opacity-65 dark:opacity-85 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={280}
                        height={280}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>
                <div className="absolute bottom-2 -left-6 sm:left-4 w-28 sm:w-44 lg:w-56 pointer-events-none z-0 opacity-55 dark:opacity-80 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={240}
                        height={240}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                {/* Ambient 3D CSS Glass Marble Balls */}
                <div className="absolute top-[25%] right-[14%] w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-yellow-200/50 dark:border-[#FFC050]/50 shadow-[inset_0_-6px_15px_rgba(0,0,0,0.35),0_12px_25px_rgba(255,192,80,0.4)] backdrop-blur-md pointer-events-none z-0 opacity-85 hidden md:flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#FFC050]/35 dark:bg-[#FFC050]/50 rounded-full" />
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/90 to-transparent transform -rotate-45" />
                </div>
                <div className="absolute bottom-[16%] left-[10%] w-12 h-12 sm:w-20 sm:h-20 rounded-full border border-cyan-300/40 dark:border-cyan-400/50 shadow-[inset_0_-6px_15px_rgba(0,0,0,0.35),0_12px_25px_rgba(0,180,216,0.35)] backdrop-blur-md pointer-events-none z-0 opacity-80 hidden sm:flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#00B4D8]/30 dark:bg-[#00B4D8]/45 rounded-full" />
                    <div className="absolute top-[12%] left-[18%] w-[45%] h-[35%] rounded-full bg-gradient-to-b from-white/80 to-transparent transform -rotate-45" />
                </div>

                {/* Hero Content Wrapper - Framer Motion */}
                <motion.div
                    className="max-w-7xl mx-auto relative z-10 flex flex-col items-start"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* Subtitle Badge */}
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 backdrop-blur-md border border-[#FFC050]/30 shadow-sm mb-3"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
                        <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#003D3F]/80 dark:text-white/80 font-[family-name:var(--font-body)]">
                            Proven Technical Excellence • B2B Tech Agency
                        </span>
                    </motion.div>

                    {/* Watermark + H1 Wrapper */}
                    <motion.div variants={fadeInUp} className="relative w-full flex items-center justify-start mb-4 pt-10 sm:pt-16 md:pt-22 lg:pt-28">
                        <span className="absolute top-0 left-0 text-[36px] sm:text-[72px] md:text-[96px] lg:text-[128px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-services whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95 leading-none">
                            SERVICES
                        </span>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003D3F] dark:text-white tracking-tight font-[family-name:var(--font-heading-main)] leading-[1.14] relative z-10 max-w-4xl drop-shadow-sm">
                            Enterprise Custom Software, Web, Mobile & AI Agency in India
                        </h1>
                    </motion.div>

                    {/* GEO Answer-First Intro Paragraph */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-[#003D3F]/85 dark:text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-[family-name:var(--font-body)] relative z-10 mb-6"
                    >
                        Uvicon Technologies builds high-performance custom software, conversion-engineered web applications, native iOS & Android mobile apps, and algorithmic trading systems for enterprises across India. From architecture design to production deployment, we deliver secure, scalable digital ecosystems with zero compromise on aesthetics or execution speed.
                    </motion.p>
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 2: CORE SPECIALIZATIONS BENTO GRID WITH MOBILE EXPAND/COLLAPSE
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 pb-2 sm:pb-4 lg:pb-4 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* Glowing Light Colour Gradient on Page Background Behind Cards (Center-Left) */}
                <div className="absolute top-1/2 -left-48 sm:-left-32 -translate-y-1/2 w-[600px] sm:w-[850px] lg:w-[1050px] h-[600px] sm:h-[850px] lg:h-[1050px] bg-gradient-to-tr from-[#00595C]/40 via-[#3FC1B8]/30 to-[#FFC050]/25 dark:from-[#00595C]/55 dark:via-[#3FC1B8]/40 dark:to-[#FFC050]/30 rounded-full blur-[130px] sm:blur-[160px] pointer-events-none z-0" />
                <div className="absolute top-1/3 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-[#FFC050]/25 via-[#48CAE4]/25 to-transparent dark:from-[#FFC050]/30 dark:via-[#48CAE4]/30 dark:to-transparent rounded-full blur-[110px] sm:blur-[140px] pointer-events-none z-0" />

                {/* 3D Glass Bolt 3 Accent on Right */}
                <div className="absolute top-1/4 -right-8 sm:-right-4 w-36 sm:w-56 lg:w-64 opacity-50 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header with SPECIALIZATIONS Watermark */}
                    <div className="relative text-right w-full max-w-4xl ml-auto mb-6 sm:mb-8">
                        <div className="relative w-full flex items-center justify-end">
                            <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[30px] sm:text-[68px] md:text-[90px] lg:text-[118px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-services whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95">
                                SPECIALIZATIONS
                            </span>
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                Our 4 Core Engineering Specializations
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed mt-2 relative z-10 max-w-2xl font-medium font-[family-name:var(--font-body)] ml-auto text-right">
                            We combine deep domain expertise in financial technology, scalable cloud systems, and modern UI/UX to solve complex business challenges.
                        </p>
                    </div>

                    {/* Interactive Quick-Filter Pills -> SINGLE HORIZONTAL SCROLLABLE ROW ON MOBILE */}
                    <div className="w-full flex flex-col items-start sm:items-end relative z-10 mb-8 sm:mb-10">
                        <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
                            {[
                                { id: "all", label: "All Specializations", icon: Layers },
                                { id: "software", label: "Custom Software & Algo", icon: Code2 },
                                { id: "web", label: "Web Applications", icon: Globe },
                                { id: "mobile", label: "Mobile Apps (iOS/Android)", icon: Smartphone },
                                { id: "games-ai", label: "Game Dev & AI Agents", icon: Cpu }
                            ].map((btn) => {
                                const BtnIcon = btn.icon;
                                const isActive = activeFilter === btn.id;
                                return (
                                    <button
                                        key={btn.id}
                                        onClick={() => setActiveFilter(btn.id)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-xl shrink-0 ${isActive
                                                ? "bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] shadow-md border border-[#00595C] dark:border-[#FFC050]"
                                                : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/80 dark:text-white/80 hover:bg-[#003D3F]/12 dark:hover:bg-white/15 border border-[#003D3F]/15 dark:border-white/15"
                                            }`}
                                    >
                                        <BtnIcon className={`w-3.5 h-3.5 ${isActive ? "text-white dark:text-[#002829]" : "text-[#FFC050]"}`} />
                                        <span>{btn.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sticky Stacking Cards (Scroll-Driven Deck Stack) */}
                    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-16 pb-2 sm:pb-4 lg:pb-8 relative drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]">
                        {(() => {
                            const activeIdx = filteredSpecializations.findIndex(
                                (s) => !!expandedSpecs[s.id]
                            );

                            const isAnyActive = activeIdx !== -1;

                            return filteredSpecializations.map((spec, idx) => {
                                const SpecIcon = spec.icon;
                                const isExpanded = !!expandedSpecs[spec.id];
                                // Deck card: idx > 0 AND idx <= activeIdx
                                // These get negative margins to collapse into 22px tabs
                                const isInDeck = isAnyActive && idx > 0 && idx <= activeIdx;

                                return (
                                    <div
                                        key={spec.id}
                                        className={`${
                                            isAnyActive
                                                ? "relative lg:sticky card-deck-relative"
                                                : "sticky"
                                        } ${
                                            isInDeck
                                                ? "-mt-[290px] sm:-mt-[330px] lg:mt-0"
                                                : "mt-0"
                                        } transition-all duration-500`}
                                        style={{
                                            top: `calc(6.5rem + ${idx * 22}px)`,
                                            zIndex: idx + 10,
                                        }}
                                    >
                                        <motion.div
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="w-full h-auto lg:h-[560px] xl:h-[550px] bg-white/85 dark:bg-[#001012]/80 backdrop-blur-[25px] backdrop-saturate-[180%] rounded-3xl p-6 sm:p-8 lg:p-9 border border-white/30 border-t-white/60 dark:border-white/20 dark:border-t-white/40 shadow-none dark:shadow-none hover:border-white/50 dark:hover:border-[#FFC050]/50 transition-all duration-300 relative overflow-hidden group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
                                    >
                                    {/* Subtle Radial Card Glow */}
                                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-3xl pointer-events-none" />

                                    {/* LEFT COLUMN: Technical Summary + Conditional Detailed View (lg:col-span-7) */}
                                    <div className="lg:col-span-7 flex flex-col items-start justify-between relative z-10 w-full h-auto lg:h-full">
                                        {/* ALWAYS VISIBLE CORE SUMMARY (Jitni jaruri chije hai) */}
                                        <div className="w-full flex items-center justify-between gap-3 mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-105 transition-transform shrink-0 shadow-sm">
                                                    <SpecIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                                        {spec.badge}
                                                    </span>
                                                    <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/40 w-fit mt-0.5">
                                                        {spec.latencyOrMetric}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Main Title & Tagline */}
                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                            {spec.title}
                                        </h3>
                                        <p className="text-sm sm:text-base font-semibold text-[#00595C] dark:text-[#FFC050] mt-1 tracking-wide uppercase">
                                            {spec.tagline}
                                        </p>

                                        {/* Concise Description */}
                                        <p className="text-sm sm:text-base lg:text-lg text-[#003D3F]/85 dark:text-white/85 leading-relaxed mt-3 font-[family-name:var(--font-body)]">
                                            {spec.description}
                                        </p>

                                        {/* MOBILE/TABLET TOGGLE BUTTON (<1024px only) */}
                                        <button
                                            type="button"
                                            onClick={() => toggleSpec(spec.id)}
                                            className="lg:hidden w-full mt-4 py-2.5 px-4 rounded-2xl bg-[#00595C]/10 dark:bg-white/10 hover:bg-[#00595C]/20 dark:hover:bg-white/15 border border-[#00595C]/30 dark:border-[#FFC050]/40 flex items-center justify-between text-sm font-extrabold text-[#00595C] dark:text-[#FFC050] transition-all shadow-sm"
                                        >
                                            <span>
                                                {isExpanded
                                                    ? "Hide Deep Architecture & Visual Specs (-)"
                                                    : "View Full Specs, Stack & Architecture Blueprint (+)"}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* DETAILED CONTENT: Always visible on Desktop (lg:block), expandable on Mobile/Tablet */}
                                        <div
                                            className={`w-full transition-all duration-300 ${isExpanded ? "block mt-3" : "hidden lg:block lg:mt-3"
                                                }`}
                                        >
                                            {/* Key Features List - 2 columns */}
                                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                                {spec.keyFeatures.map((feat, fIdx) => (
                                                    <div
                                                        key={fIdx}
                                                        className="flex items-start gap-2 p-2 rounded-xl bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-sm sm:text-base font-semibold text-[#003D3F]/90 dark:text-white/90"
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC050] shrink-0 mt-0.5" />
                                                        <span>{feat}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tech Stack Pills */}
                                            <div className="flex items-center gap-1.5 mt-4 flex-wrap">
                                                <span className="text-sm font-bold text-[#003D3F]/60 dark:text-white/60 mr-1">
                                                    Stack:
                                                </span>
                                                {spec.techStack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-lg bg-[#00595C]/12 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8] border border-[#00595C]/20 dark:border-white/15"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Algo Compliance Note (Section 7 rule) */}
                                            {spec.complianceNote && (
                                                <div className="w-full mt-3 p-2 rounded-xl bg-[#FFC050]/15 dark:bg-[#FFC050]/10 border border-[#FFC050]/30 text-xs sm:text-sm text-[#003D3F]/90 dark:text-white/90 font-medium leading-relaxed">
                                                    <strong className="text-[#00595C] dark:text-[#FFC050]">Important: </strong>
                                                    {spec.complianceNote}
                                                </div>
                                            )}

                                            {/* Explore Service Button */}
                                            <Link
                                                href={spec.href}
                                                className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:scale-105 mt-4 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                            >
                                                <span>Explore {spec.title.split("&")[0].trim()}</span>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* RIGHT COLUMN: Visual Container + Dedicated Empty Image Box (lg:col-span-5) */}
                                    {/* On Desktop always visible; On Mobile/Tablet shown only when card isExpanded! */}
                                    <div
                                        className={`lg:col-span-5 w-full flex-col justify-between gap-3 relative z-10 h-auto lg:h-full ${isExpanded ? "flex" : "hidden lg:flex"
                                            }`}
                                    >
                                        {/* Functional Engineering Scorecard Banner */}
                                        <div className="w-full p-3 sm:p-4 rounded-2xl bg-[#003D3F]/8 dark:bg-black/40 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-xl flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-xs font-bold text-[#003D3F] dark:text-white">
                                                    Live Blueprint • {spec.badge}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                                                    Production Grade
                                                </span>
                                                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050]">
                                                    WCAG AA
                                                </span>
                                            </div>
                                        </div>

                                        {/* DEDICATED VISUAL CONTAINER / EMPTY IMAGE PLACEHOLDER FOR USER */}
                                        <div className="w-full flex-1 min-h-[140px] sm:min-h-[180px] lg:min-h-[190px] rounded-2xl border-2 border-dashed border-[#003D3F]/25 dark:border-white/25 bg-[#003D3F]/4 dark:bg-white/[0.03] hover:bg-[#003D3F]/8 dark:hover:bg-white/[0.06] transition-all flex flex-col items-center justify-center p-5 text-center relative overflow-hidden group/box">
                                            {/* Decorative Background Grid Pattern */}
                                            <div
                                                className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
                                                style={{
                                                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                                                    backgroundSize: `20px 20px`
                                                }}
                                            />

                                            {/* Empty Image Container Badge */}
                                            <div className="w-12 h-12 rounded-2xl bg-[#FFC050]/20 border border-[#FFC050]/40 flex items-center justify-center text-[#FFC050] mb-3 group-hover/box:scale-110 transition-transform shadow-md">
                                                <ImageIcon className="w-6 h-6" />
                                            </div>

                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-1">
                                                Visual Container Placeholder
                                            </span>
                                            <h4 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] max-w-sm">
                                                {spec.imagePlaceholderTitle}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/70 max-w-xs mt-1 leading-relaxed">
                                                Drop your live product screenshot, architecture diagram, or UI preview mockup here.
                                            </p>

                                            {/* Corner Decorative Dimensions Badge */}
                                            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-[#003D3F]/10 dark:bg-white/10 text-[9px] font-mono font-bold text-[#003D3F]/70 dark:text-white/70">
                                                16:9 Aspect Ratio
                                            </div>
                                        </div>

                                        {/* Bottom Metric Bar */}
                                        <div className="w-full grid grid-cols-3 gap-2">
                                            <div className="p-2.5 rounded-xl bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-center">
                                                <span className="block text-sm sm:text-base font-black text-[#003D3F] dark:text-[#FFC050]">
                                                    100%
                                                </span>
                                                <span className="text-xs text-[#003D3F]/70 dark:text-white/70 font-semibold">
                                                    Custom Code
                                                </span>
                                            </div>
                                            <div className="p-2.5 rounded-xl bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-center">
                                                <span className="block text-sm sm:text-base font-black text-[#003D3F] dark:text-emerald-400">
                                                    99.99%
                                                </span>
                                                <span className="text-xs text-[#003D3F]/70 dark:text-white/70 font-semibold">
                                                    SLA Uptime
                                                </span>
                                            </div>
                                            <div className="p-2.5 rounded-xl bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-center">
                                                <span className="block text-sm sm:text-base font-black text-[#003D3F] dark:text-white">
                                                    24 / 7
                                                </span>
                                                <span className="text-xs text-[#003D3F]/70 dark:text-white/70 font-semibold">
                                                    Live Support
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    </motion.div>
                                </div>
                                );
                            });
                        })()}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 3: CAPABILITY & TECH-STACK MATRIX (WHY OUR ARCHITECTURE WINS)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-0 sm:pt-2 lg:pt-2 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt Accent Behind Tech Section */}
                <div className="absolute top-1/3 -left-10 sm:-left-6 w-40 sm:w-56 lg:w-64 opacity-50 dark:opacity-75 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="3D Glass Bolt Accent Tech"
                        width={280}
                        height={280}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Sticky Section Header & Filter Bar (No Background Container) */}
                    <div className="lg:sticky lg:top-[8rem] z-20 mb-4 sm:mb-6 lg:mb-20 transition-all duration-300">
                        {/* Watermark + Header */}
                        <div className="relative text-left w-full max-w-4xl mb-3 sm:mb-4">
                            <div className="relative w-full flex items-center justify-start">
                                <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[30px] sm:text-[68px] md:text-[90px] lg:text-[118px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-services whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95">
                                    CAPABILITIES
                                </span>
                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                    Architected For Speed, Scalability & Security
                                </h2>
                            </div>
                            <p className="text-[#003D3F]/80 dark:text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed mt-1.5 relative z-10 max-w-2xl font-medium font-[family-name:var(--font-body)]">
                                We select battle-tested frameworks, typed APIs, and modern cloud infrastructures to ensure zero technical debt.
                            </p>
                        </div>

                        {/* Interactive Category Tabs -> SINGLE HORIZONTAL SCROLLABLE ROW ON MOBILE */}
                        <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                            {[
                                { id: "all", label: "All Stack", icon: Layers },
                                { id: "web", label: "Frontend & Next.js", icon: Globe },
                                { id: "backend", label: "Backend & SQL", icon: Database },
                                { id: "mobile", label: "Mobile (iOS/Flutter)", icon: Smartphone },
                                { id: "ai", label: "AI & Quant Scripting", icon: Terminal }
                            ].map((tab) => {
                                const TabIcon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-xl shrink-0 ${isActive
                                                ? "bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] shadow-md border border-[#00595C] dark:border-[#FFC050]"
                                                : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/80 dark:text-white/80 hover:bg-[#003D3F]/12 dark:hover:bg-white/15 border border-[#003D3F]/15 dark:border-white/15"
                                            }`}
                                    >
                                        <TabIcon className="w-3.5 h-3.5" />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Zero-height spacer so Heading and Deck scroll away together — only needed on desktop where sticky is active */}
                        <div className="hidden lg:block w-full h-0 pb-[300px] mb-[-300px] pointer-events-none invisible" aria-hidden="true" />
                    </div>

                    {/* Capability Cards Sticky Stacking Deck (Scroll-Driven) */}
                    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 pb-12 sm:pb-16 lg:pb-24 relative drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]">
                        {filteredCapabilities.map((item, idx) => {
                            const CapIcon = item.icon;
                            return (
                                <div
                                    key={item.name}
                                    className="sticky mt-0 transition-all duration-500 top-[calc(6rem+var(--offset))] sm:top-[calc(7.5rem+var(--offset))] lg:top-[calc(20rem+var(--offset))]"
                                    style={{
                                        '--offset': `${idx * 16}px`,
                                        zIndex: idx + 10,
                                    } as React.CSSProperties}
                                >
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="w-full min-h-[380px] sm:min-h-[340px] lg:min-h-[256px] bg-white dark:bg-[#001012] lg:bg-white/85 lg:dark:bg-[#001012]/80 backdrop-blur-[25px] backdrop-saturate-[180%] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/30 border-t-white/60 dark:border-white/20 dark:border-t-white/40 shadow-none dark:shadow-none hover:border-white/50 dark:hover:border-[#FFC050]/50 transition-all duration-300 relative overflow-hidden group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
                                    >
                                        {/* Subtle Radial Card Glow */}
                                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-3xl pointer-events-none" />

                                        {/* LEFT COLUMN: Icon + Title + Overview + Implementation (lg:col-span-7) */}
                                        <div className="lg:col-span-7 flex flex-col items-start justify-between relative z-10 w-full">
                                            <div>
                                                {/* Icon Header + Badge */}
                                                <div className="w-full flex items-center justify-between gap-2 mb-1.5">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] border border-[#003D3F]/15 dark:border-white/20 group-hover:scale-105 transition-transform shrink-0 shadow-sm">
                                                            <CapIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                                                {item.desc}
                                                            </span>
                                                            <span className="text-sm sm:text-lg lg:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Overview Paragraph */}
                                                <p className="text-xs sm:text-sm text-[#003D3F]/85 dark:text-white/85 leading-snug my-1 font-[family-name:var(--font-body)]">
                                                    {item.overview}
                                                </p>
                                            </div>

                                            {/* Uvicon Implementation Detail */}
                                            <div className="mt-2 w-full p-2.5 sm:p-3 rounded-xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] block mb-0.5">
                                                    How We Use {item.name.split("&")[0].trim()}
                                                </span>
                                                <p className="text-[11px] sm:text-xs text-[#003D3F]/90 dark:text-white/90 leading-tight font-medium">
                                                    {item.uviconImplementation}
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT COLUMN: Highlights Checklist (lg:col-span-5) */}
                                        <div className="lg:col-span-5 w-full h-full flex flex-col justify-center bg-[#003D3F]/5 dark:bg-white/5 rounded-xl p-3.5 sm:p-4 border border-[#003D3F]/10 dark:border-white/10 relative z-10">
                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-2 block">
                                                Key Technical Benefits
                                            </span>
                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                {item.highlights.map((h, hIdx) => (
                                                    <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-[#003D3F]/90 dark:text-white/90">
                                                        <div className="w-4 h-4 rounded-full bg-[#00595C]/15 dark:bg-[#FFC050]/15 flex items-center justify-center shrink-0">
                                                            <CheckCircle2 className="w-3 h-3 text-[#00595C] dark:text-[#FFC050]" />
                                                        </div>
                                                        <span>{h}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 4: ENGAGEMENT MODELS & AGENCY SLAS (B2B TRUST BAND)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-2 sm:pt-4 lg:pt-8 pb-4 sm:pb-6 lg:pb-8 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt Accent Behind Engagement */}
                <div className="absolute top-1/4 -right-10 sm:-right-4 w-36 sm:w-52 lg:w-60 opacity-55 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Bolt Accent Engagement"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Sticky Section Header Bar (No Background Container) */}
                    <div className="lg:sticky lg:top-[8rem] z-20 mb-4 sm:mb-6 lg:mb-20 transition-all duration-300">
                        {/* Watermark + Header */}
                        <div className="relative text-right w-full max-w-4xl ml-auto">
                            <div className="relative w-full flex items-center justify-end">
                                <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[30px] sm:text-[68px] md:text-[90px] lg:text-[118px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-services whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95">
                                    ENGAGEMENT
                                </span>
                                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                    How You Can Work With Us
                                </h2>
                            </div>
                            <p className="text-[#003D3F]/80 dark:text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed mt-1.5 relative z-10 max-w-2xl font-medium font-[family-name:var(--font-body)] ml-auto text-right">
                                Flexible, transparent partnership models tailored to your company&apos;s growth stage and technical roadmap.
                            </p>
                        </div>

                        {/* Zero-height spacer so Heading and Deck scroll away together — only needed on desktop where sticky is active */}
                        <div className="hidden lg:block w-full h-0 pb-[370px] mb-[-370px] pointer-events-none invisible" aria-hidden="true" />
                    </div>

                    {/* Engagement Models Comparison Cards Sticky Stacking Deck (Scroll-Driven) */}
                    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 pb-2 sm:pb-4 lg:pb-6 relative drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]">
                        {engagementModels.map((model, idx) => (
                            <div
                                key={model.id}
                                className="sticky mt-0 transition-all duration-500 top-[calc(6rem+var(--offset))] sm:top-[calc(7.5rem+var(--offset))] lg:top-[calc(19rem+var(--offset))]"
                                style={{
                                    '--offset': `${idx * 16}px`,
                                    zIndex: idx + 10,
                                } as React.CSSProperties}
                            >
                                <motion.div
                                    variants={cardVariant}
                                    className="w-full min-h-[440px] sm:min-h-[400px] lg:min-h-[280px] bg-white dark:bg-[#001012] lg:bg-white/85 lg:dark:bg-[#001012]/80 backdrop-blur-[25px] backdrop-saturate-[180%] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-white/30 border-t-white/60 dark:border-white/20 dark:border-t-white/40 shadow-none dark:shadow-none hover:border-white/50 dark:hover:border-[#FFC050]/50 transition-all duration-300 relative overflow-hidden group grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
                                >
                                    {/* Subtle Radial Card Glow */}
                                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00595C]/10 dark:bg-[#FFC050]/10 rounded-full blur-3xl pointer-events-none" />

                                    {/* LEFT COLUMN: Badge, Title, Summary, Ideal For (lg:col-span-7) */}
                                    <div className="lg:col-span-7 flex flex-col items-start justify-between relative z-10 w-full">
                                        <div className="w-full">
                                            {/* Badge */}
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/40 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                                <Award className="w-3 h-3" />
                                                <span>{model.badge}</span>
                                            </span>

                                            {/* Title */}
                                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                                {model.title}
                                            </h3>

                                            {/* Summary */}
                                            <p className="text-xs sm:text-sm text-[#003D3F]/85 dark:text-white/85 leading-snug mt-1 font-[family-name:var(--font-body)]">
                                                {model.summary}
                                            </p>
                                        </div>

                                        {/* Ideal For Box */}
                                        <div className="mt-2.5 w-full p-2.5 sm:p-3 rounded-xl bg-[#00595C]/8 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] block mb-0.5">
                                                Ideal For:
                                            </span>
                                            <p className="text-[11px] sm:text-xs text-[#003D3F]/90 dark:text-white/90 leading-tight font-medium">
                                                {model.idealFor}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT COLUMN: Deliverables + Timeline + Action (lg:col-span-5) */}
                                    <div className="lg:col-span-5 w-full h-full flex flex-col justify-between bg-[#003D3F]/5 dark:bg-white/5 rounded-xl p-3.5 sm:p-4 border border-[#003D3F]/10 dark:border-white/10 relative z-10">
                                        <div>
                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-2 block">
                                                Key Deliverables:
                                            </span>
                                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                                {model.deliverables.map((deliv, dIdx) => (
                                                    <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold text-[#003D3F]/90 dark:text-white/90">
                                                        <div className="w-4 h-4 rounded-full bg-[#00595C]/15 dark:bg-[#FFC050]/15 flex items-center justify-center shrink-0">
                                                            <CheckCircle2 className="w-3 h-3 text-[#00595C] dark:text-[#FFC050]" />
                                                        </div>
                                                        <span>{deliv}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Timeline & Action */}
                                        <div className="mt-3 pt-2.5 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between gap-3">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold uppercase text-[#003D3F]/60 dark:text-white/60">
                                                    Typical Timeline
                                                </span>
                                                <span className="text-xs sm:text-sm font-bold text-[#00595C] dark:text-[#FFC050]">
                                                    {model.timeline}
                                                </span>
                                            </div>
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-xs tracking-wide transition-all shadow-md hover:scale-105 shrink-0"
                                            >
                                                <span>Consult Now</span>
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    {/* Agency SLA Trust Bar */}
                    <motion.div
                        variants={fadeInUp}
                        className="mt-2 sm:mt-4 p-4 sm:p-5 rounded-3xl bg-[#003D3F]/8 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 backdrop-blur-xl grid grid-cols-2 lg:grid-cols-4 gap-3 text-center"
                    >
                        <div className="flex flex-col items-center justify-center p-2">
                            <ShieldCheck className="w-5 h-5 text-[#FFC050] mb-1" />
                            <span className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white">
                                100% IP & Code Ownership
                            </span>
                            <span className="text-[11px] text-[#003D3F]/70 dark:text-white/70">
                                Full repository transfer
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2">
                            <Lock className="w-5 h-5 text-emerald-500 mb-1" />
                            <span className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white">
                                Strict NDA Protected
                            </span>
                            <span className="text-[11px] text-[#003D3F]/70 dark:text-white/70">
                                Your data & algorithms secure
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2">
                            <Clock className="w-5 h-5 text-[#00595C] dark:text-[#FFC050] mb-1" />
                            <span className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white">
                                &lt; 15 Min SLA Response
                            </span>
                            <span className="text-[11px] text-[#003D3F]/70 dark:text-white/70">
                                For critical live incidents
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2">
                            <CheckCircle2 className="w-5 h-5 text-[#FFC050] mb-1" />
                            <span className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white">
                                90-Day SLA Warranty
                            </span>
                            <span className="text-[11px] text-[#003D3F]/70 dark:text-white/70">
                                Post-deployment assurance
                            </span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 5: FEATURED SERVICES PORTFOLIO / PROOF-OF-WORK WITH MOBILE EXPAND
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-2 sm:pt-4 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* Glowing Light Colour Gradient on Page Background Behind Portfolio Cards (Right Side) */}
                <div className="absolute top-1/2 -right-48 sm:-right-32 -translate-y-1/2 w-[600px] sm:w-[850px] lg:w-[1050px] h-[600px] sm:h-[850px] lg:h-[1050px] bg-gradient-to-tl from-[#00595C]/40 via-[#3FC1B8]/30 to-[#FFC050]/25 dark:from-[#00595C]/55 dark:via-[#3FC1B8]/40 dark:to-[#FFC050]/30 rounded-full blur-[130px] sm:blur-[160px] pointer-events-none z-0" />
                <div className="absolute top-1/3 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-bl from-[#FFC050]/25 via-[#48CAE4]/25 to-transparent dark:from-[#FFC050]/30 dark:via-[#48CAE4]/30 dark:to-transparent rounded-full blur-[110px] sm:blur-[140px] pointer-events-none z-0" />

                {/* 3D Glass Bolt 2 Accent on Left */}
                <div className="absolute top-1/3 -left-8 sm:-left-4 w-36 sm:w-52 lg:w-60 opacity-55 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Bolt Accent Portfolio"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Watermark + Header */}
                    <div className="relative text-left w-full max-w-4xl mb-8 sm:mb-12">
                        <div className="relative w-full flex items-center justify-start">
                            <span className="absolute top-1/2 left-0 -translate-y-1/2 text-[30px] sm:text-[68px] md:text-[90px] lg:text-[118px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-services whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95">
                                PORTFOLIO
                            </span>
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                Delivered Production Systems
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed mt-1.5 relative z-10 max-w-2xl font-medium font-[family-name:var(--font-body)]">
                            Explore real-world enterprise CRM portals, quantitative trading engines, and healthcare web applications custom built by Uvicon Technologies.
                        </p>
                    </div>

                    {/* Case Studies Stack with Mobile Expand / Collapse */}
                    <motion.div variants={staggerContainer} className="flex flex-col gap-7 sm:gap-8">
                        {caseStudies.map((study, index) => {
                            const isEven = index % 2 === 0;
                            const isExpanded = !!expandedCases[study.id];

                            return (
                                <motion.div
                                    key={study.id}
                                    variants={cardVariant}
                                    className="w-full bg-white/15 dark:bg-white/5 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-3xl p-5 sm:p-7 lg:p-8 border border-white/25 border-t-white/45 dark:border-white/15 dark:border-t-white/30 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:bg-white/25 dark:hover:bg-white/10 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative overflow-hidden"
                                >
                                    {/* INFO SIDE (lg:col-span-7) */}
                                    <div className={`flex flex-col items-start justify-center w-full relative z-10 ${isEven ? "order-2 lg:order-1 lg:col-span-7" : "order-2 lg:order-2 lg:col-span-7"}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                                {study.category}
                                            </span>
                                            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30">
                                                {study.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                            {study.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#003D3F]/85 dark:text-white/85 leading-relaxed mt-2 font-[family-name:var(--font-body)]">
                                            {study.description}
                                        </p>

                                        {/* MOBILE/TABLET TOGGLE BUTTON (<1024px only) */}
                                        <button
                                            type="button"
                                            onClick={() => toggleCase(study.id)}
                                            className="lg:hidden w-full mt-3.5 py-2 px-4 rounded-xl bg-[#00595C]/10 dark:bg-white/10 hover:bg-[#00595C]/20 dark:hover:bg-white/15 border border-[#00595C]/30 dark:border-[#FFC050]/40 flex items-center justify-between text-xs font-extrabold text-[#00595C] dark:text-[#FFC050] transition-all"
                                        >
                                            <span>
                                                {isExpanded
                                                    ? "Hide Case Study Architecture & Visual (-)"
                                                    : "View Metrics, Stack & Visual Blueprint (+)"}
                                            </span>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* DETAILED CONTENT: Always visible on Desktop (lg:block), expandable on Mobile/Tablet */}
                                        <div
                                            className={`w-full transition-all duration-300 ${isExpanded ? "block mt-3" : "hidden lg:block lg:mt-3"
                                                }`}
                                        >
                                            {/* Metrics */}
                                            <div className="w-full flex flex-wrap gap-2 mt-2">
                                                {study.metrics.map((metric, mIdx) => (
                                                    <div
                                                        key={mIdx}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-[#003D3F]/8 dark:bg-white/8 text-[#003D3F] dark:text-white border border-[#003D3F]/15 dark:border-white/15"
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                                        <span>{metric}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="flex items-center gap-1.5 mt-3.5 flex-wrap">
                                                <span className="text-xs font-bold text-[#003D3F]/60 dark:text-white/60 mr-1">
                                                    Stack:
                                                </span>
                                                {study.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#00595C]/12 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Link */}
                                            <Link
                                                href={study.href}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:scale-105 mt-4 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                            >
                                                <span>Explore Case Study Details</span>
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* VISUAL PLACEHOLDER CONTAINER (lg:col-span-5) */}
                                    {/* On Desktop always visible; On Mobile/Tablet shown only when case study isExpanded! */}
                                    <div
                                        className={`w-full ${isEven ? "order-1 lg:order-2 lg:col-span-5" : "order-1 lg:order-1 lg:col-span-5"} ${isExpanded ? "block" : "hidden lg:block"
                                            }`}
                                    >
                                        <div className="w-full min-h-[180px] sm:min-h-[220px] lg:min-h-[240px] rounded-2xl border-2 border-dashed border-[#003D3F]/25 dark:border-white/25 bg-[#003D3F]/5 dark:bg-white/[0.04] hover:bg-[#003D3F]/10 dark:hover:bg-white/[0.07] transition-all flex flex-col items-center justify-center p-5 text-center relative overflow-hidden group/case">
                                            {/* Top Status Bar */}
                                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold">
                                                    <Sparkles className="w-3 h-3 text-[#FFC050]" />
                                                    <span>Production System</span>
                                                </span>
                                                <span className="text-[10px] font-mono text-[#003D3F]/70 dark:text-white/70">
                                                    CASE #0{index + 1}
                                                </span>
                                            </div>

                                            {/* Center Placeholder Icon */}
                                            <div className="w-12 h-12 rounded-2xl bg-[#FFC050]/20 border border-[#FFC050]/40 flex items-center justify-center text-[#FFC050] my-4 group-hover/case:scale-110 transition-transform shadow-md">
                                                <ImageIcon className="w-6 h-6" />
                                            </div>

                                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-0.5">
                                                Case Study Image Placeholder
                                            </span>
                                            <h4 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] max-w-sm">
                                                {study.imagePlaceholderTitle}
                                            </h4>
                                            <p className="text-[11px] text-[#003D3F]/70 dark:text-white/70 max-w-xs mt-1 leading-relaxed">
                                                Reserved for live screenshot or architecture diagram. Drop custom image here anytime.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 6: COMPREHENSIVE FAQ SECTION (GEO & SCHEMA-READY)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-8 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Glass Bolt 3 Accent Behind FAQ */}
                <div className="absolute top-1/4 -right-8 sm:-right-4 w-32 sm:w-48 lg:w-56 opacity-55 dark:opacity-80 pointer-events-none z-0">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="3D Glass Bolt Accent FAQ"
                        width={240}
                        height={240}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Watermark + Header */}
                    <div className="relative text-right w-full ml-auto mb-8 sm:mb-12">
                        <div className="relative w-full flex items-center justify-end">
                            <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[30px] sm:text-[68px] md:text-[90px] lg:text-[118px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-services whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95">
                                FAQ
                            </span>
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed mt-2 relative z-10 max-w-2xl font-medium font-[family-name:var(--font-body)] ml-auto text-right">
                            Everything you need to know about our engineering standards, pricing, security, intellectual property, and project delivery.
                        </p>
                        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-[#003D3F]/6 dark:bg-white/8 border border-[#003D3F]/15 dark:border-white/15 text-[11px] sm:text-xs font-semibold text-[#00595C] dark:text-[#FFC050]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Last Updated: Q3 2026 • Verified Engineering Standards</span>
                        </div>
                    </div>

                    {/* Progressive Disclosure FAQ Accordion — Home Page Style (2 Columns + Icon Badges) */}
                    <motion.div variants={staggerContainer} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4.5">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            const faqIconsList: React.ElementType[] = [Zap, ShieldCheck, Code2, Lock, Clock, Headphones];
                            const IconComponent = faqIconsList[idx % faqIconsList.length];

                            return (
                                <motion.div
                                    key={idx}
                                    variants={cardVariant}
                                    className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${isOpen
                                            ? "bg-white/25 dark:bg-white/10 border-white/40 border-t-white/60 dark:border-[#FFC050]/50 shadow-xl"
                                            : "bg-white/15 dark:bg-white/5 border-white/25 border-t-white/45 dark:border-white/15 dark:border-t-white/30 shadow-lg hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/35"
                                        } backdrop-blur-[20px] backdrop-saturate-[180%] h-full flex flex-col justify-between`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full h-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#FFC050]/50"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-3 min-w-0 pr-1">
                                            {/* Visual Icon Badge (Home Page Style) */}
                                            <div
                                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${isOpen
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
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen
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
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] border-t border-[#003D3F]/8 dark:border-white/8">
                                                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-1.5 pt-2">
                                                        Topic: {faq.category}
                                                    </span>
                                                    <p className="pt-1">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 7: HIGH-IMPACT FINAL CTA BAND
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-10 sm:pt-14 lg:pt-16 pb-28 sm:pb-36 lg:pb-48 px-4 sm:px-8 lg:px-16 z-10 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                {/* Ambient Background Glow Connecting to Footer Top (Like Home Page) */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)"
                    }}
                >
                    {/* Center Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full blur-[100px] sm:blur-[130px] opacity-75 dark:opacity-85 pointer-events-none z-0 bg-gradient-to-b from-[#00B4D8]/20 via-[#003D3F]/25 to-[#FFC050]/15 dark:from-[#00B4D8]/25 dark:via-[#003D3F]/30 dark:to-[#FFC050]/10" />

                    {/* Dedicated Bottom-Left Glowing Gradient */}
                    <div className="absolute -left-32 sm:-left-48 -bottom-10 sm:-bottom-16 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[100px] sm:blur-[140px] opacity-85 dark:opacity-95 pointer-events-none z-0 bg-gradient-to-tr from-[#003D3F]/40 via-[#00595C]/30 to-[#3FC1B8]/15 dark:from-[#00B4D8]/35 dark:via-[#003D3F]/30 dark:to-transparent" />
                </div>

                <motion.div
                    variants={cardVariant}
                    className="max-w-6xl mx-auto bg-gradient-to-br from-[#003D3F] via-[#00595C] to-[#002829] rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-12 lg:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-white/20 z-10"
                >
                    {/* Ambient Radial Glow */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC050]/25 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Watermark inside CTA */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[36px] sm:text-[90px] lg:text-[130px] font-black tracking-widest uppercase pointer-events-none select-none text-white/5 whitespace-nowrap font-[family-name:var(--font-heading-main)]">
                        GET STARTED
                    </span>

                    <div className="relative z-10 flex flex-col items-center">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#FFC050] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-white/20">
                            <Sparkles className="w-4 h-4" />
                            <span>Turn Your Architecture Vision Into Production Code</span>
                        </span>

                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading-main)] tracking-tight max-w-3xl leading-tight">
                            Ready To Build Your Next Digital Ecosystem?
                        </h2>
                        <p className="text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mt-3 font-[family-name:var(--font-body)]">
                            Schedule a free 30-minute technical consultation with our engineering architects. We will audit your technical scope, discuss timeline milestones, and provide a turnkey implementation roadmap.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-7 w-full sm:w-auto">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#FFC050] hover:bg-[#e0a840] text-[#002829] font-bold text-sm sm:text-base tracking-wide transition-all shadow-[0_10px_25px_rgba(255,192,80,0.3)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <Mail className="w-4.5 h-4.5" />
                                <span>Book a Free Consultation</span>
                            </Link>

                            <a
                                href="https://auth.uvicon.in/signup"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base tracking-wide transition-all border border-white/30 backdrop-blur-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span>Explore Trading Platform</span>
                                <ArrowUpRight className="w-4.5 h-4.5" />
                            </a>
                        </div>

                        {/* Guarantee Footer Note */}
                        <div className="mt-7 pt-5 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/75 font-medium">
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#FFC050]" />
                                100% Code Ownership
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#FFC050]" />
                                Strict NDA Protected
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#FFC050]" />
                                Fixed-Price Milestone Sprints
                            </span>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
        </main>
    );
}
