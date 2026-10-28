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
    Cable,
    Gamepad2,
    BrainCircuit,
    Wand2,
    Joystick,
    Glasses
} from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";

/* ==========================================================================
   FRAMER MOTION ANIMATION VARIANTS
   ========================================================================== */

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
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
        id: "ai-llm",
        value: "AGI",
        title: "Large Language Models",
        tagline: "Custom AI Agents",
        desc: "We fine-tune Llama 3, OpenAI, and Claude models on your proprietary data to create highly specialized autonomous AI agents.",
        badge: "AI & ML",
        icon: BrainCircuit
    },
    {
        id: "game-3d",
        value: "60 FPS",
        title: "3D Game Engines",
        tagline: "Unity & Unreal 5",
        desc: "Immersive 3D worlds and multiplayer game architectures engineered for maximum framerates across PC, Console, and Mobile.",
        badge: "Game Dev",
        icon: Gamepad2
    },
    {
        id: "ai-auto",
        value: "10x",
        title: "Process Automation",
        tagline: "RPA & Workflows",
        desc: "Replace manual data entry and customer support with intelligent robotic process automation (RPA) that runs 24/7.",
        badge: "Automation",
        icon: Bot
    },
    {
        id: "game-arvr",
        value: "XR",
        title: "Spatial Computing",
        tagline: "AR / VR Experiences",
        desc: "Next-generation mixed reality applications for Meta Quest and Apple Vision Pro, bridging the gap between digital and physical.",
        badge: "Spatial",
        icon: Glasses
    }
];

interface PortfolioProject {
    id: string;
    category: string;
    title: string;
    description: string;
    metrics: string[];
    tech: string[];
    badge: string;
    imageSrc: string;
}

const portfolioProjects: PortfolioProject[] = [
    {
        id: "uvicon-ai-agent",
        title: "Enterprise Sales AI Agent",
        category: "AI & Machine Learning",
        description: "An autonomous RAG (Retrieval-Augmented Generation) agent that reads 10,000+ pages of company documentation to answer technical sales queries instantly.",
        metrics: ["Sub-1s Token Gen", "Custom RAG Pipeline", "GPT-4 / Claude"],
        tech: ["Python", "LangChain", "Pinecone", "Next.js"],
        badge: "AI Agent",
        imageSrc: "/assets/images/uvicon-connect-preview.png" // Reusing as placeholder
    },
    {
        id: "multiplayer-rpg",
        title: "Project: Aethelgard — 3D MMORPG",
        category: "Game Development",
        description: "A cross-platform multiplayer RPG featuring authoritative servers, custom netcode, and high-fidelity 3D rendering.",
        metrics: ["60 Tick Rate Server", "100k Concurrent", "Unreal Engine 5"],
        tech: ["C++", "Unreal Engine", "AWS GameLift", "Redis"],
        badge: "Multiplayer",
        imageSrc: "/assets/images/Software-tools.avif" // Reusing as placeholder
    },
    {
        id: "vision-pro-training",
        title: "Surgical Training Simulator",
        category: "Spatial Computing (XR)",
        description: "A mixed-reality training application for medical students, utilizing precise hand-tracking and spatial audio for realistic surgical simulations.",
        metrics: ["Millimeter Precision", "90 FPS Native", "Spatial Audio"],
        tech: ["Unity", "C#", "ARKit", "VisionOS"],
        badge: "AR / VR",
        imageSrc: "/assets/images/uhmb-services-preview.png" // Reusing as placeholder
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
        id: "cap-ai",
        title: "Generative AI & LLMs",
        tagline: "Intelligent Systems",
        desc: "We build custom LLM pipelines, autonomous agents, and RAG architectures that allow AI to safely interact with your private enterprise data.",
        icon: BrainCircuit,
        badge: "AI Engineering",
        highlights: [
            "RAG Vector Databases",
            "Custom LLM Fine-Tuning",
            "LangChain Agent Workflows",
            "Computer Vision & NLP"
        ],
        span: "lg:col-span-7"
    },
    {
        id: "cap-game",
        title: "3D Multiplayer Games",
        tagline: "Authoritative Networking",
        desc: "From hyper-casual mobile to AAA-quality PC games, we architect scalable game loops and robust netcode for massive multiplayer environments.",
        icon: Joystick,
        badge: "Game Engines",
        highlights: [
            "Unity 3D / Unreal Engine 5",
            "Authoritative Server Logic",
            "Matchmaking & Lobbies",
            "Anti-Cheat Implementation"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "cap-auto",
        title: "Robotic Process Automation",
        tagline: "Zero-Touch Operations",
        desc: "Automate repetitive data tasks, invoice processing, and customer support with intelligent scripts that connect disparate legacy APIs.",
        icon: Bot,
        badge: "Automation",
        highlights: [
            "Python Data Pipelines",
            "OCR & Document Parsing",
            "Automated QA Testing",
            "24/7 Serverless Cron Jobs"
        ],
        span: "lg:col-span-5"
    },
    {
        id: "cap-xr",
        title: "Spatial Computing & XR",
        tagline: "Augmented & Virtual Reality",
        desc: "We pioneer mixed reality experiences for industrial training, real estate visualization, and interactive marketing on the latest XR headsets.",
        icon: Glasses,
        badge: "Mixed Reality",
        highlights: [
            "Apple Vision Pro (VisionOS)",
            "Meta Quest 3 Optimizations",
            "LiDAR Room Scanning",
            "Precise Hand & Eye Tracking"
        ],
        span: "lg:col-span-7"
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
        title: "GDD & Architecture Design",
        timeline: "Days 1 – 10",
        summary: "For games, we write a Game Design Document (GDD). For AI, we map the data pipeline, model selection, and vector database architecture.",
        deliverables: [
            "Game Design Document (GDD)",
            "AI Data Pipeline Architecture",
            "3D Asset & Concept Art Boards",
            "Technical Stack Selection"
        ],
        guarantee: "100% technical alignment before development begins.",
        icon: Compass
    },
    {
        stepNumber: "02",
        title: "Core Mechanics & Model Training",
        timeline: "Sprint Cycles (4–12 Weeks)",
        summary: "Our game devs build the core game loop and physics, while our AI engineers scrape data, fine-tune models, and setup RAG indices.",
        deliverables: [
            "Playable Core Loop Prototype",
            "Custom LLM Sandbox Access",
            "Multiplayer Netcode Staging",
            "Bi-Weekly Playtests / Demos"
        ],
        guarantee: "Hands-on playable builds every two weeks.",
        icon: Code2
    },
    {
        stepNumber: "03",
        title: "QA, Red-Teaming & Optimization",
        timeline: "Pre-Launch Sprint",
        summary: "For games, rigorous frame-profiling and stress testing. For AI, 'Red-Teaming' to ensure the model doesn't hallucinate or leak data.",
        deliverables: [
            "Game Memory & FPS Profiling",
            "AI Hallucination Red-Teaming",
            "Multiplayer Server Load Test",
            "Security Vulnerability Scan"
        ],
        guarantee: "Optimized framerates and secure AI guardrails.",
        icon: ShieldCheck
    },
    {
        stepNumber: "04",
        title: "Deployment & Scale SLA",
        timeline: "Launch & 90 Days Beyond",
        summary: "We launch game servers globally via AWS GameLift, deploy AI agents to scalable endpoints, and monitor real-time latency.",
        deliverables: [
            "Production Cloud Deployment",
            "Full Git Repository Transfer under NDA",
            "Admin & Operations Training",
            "90-Day Post-Launch SLA Warranty"
        ],
        guarantee: "Guaranteed uptime and bug fixes for 90 days.",
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
    { name: "Unreal Engine 5", category: "games", desc: "AAA 3D Game Engine", icon: Gamepad2 },
    { name: "Unity 3D", category: "games", desc: "Cross-Platform Engine", icon: Joystick },
    { name: "C++", category: "games", desc: "High-Performance Core", icon: FileCode2 },
    { name: "C#", category: "games", desc: "Unity Scripting", icon: Code2 },
    { name: "Python", category: "ai", desc: "AI & ML Processing", icon: Terminal },
    { name: "PyTorch", category: "ai", desc: "Deep Learning Tensor", icon: BrainCircuit },
    { name: "LangChain", category: "ai", desc: "LLM Orchestration", icon: Workflow },
    { name: "Pinecone", category: "ai", desc: "Vector Database", icon: Database },
    { name: "AWS GameLift", category: "devops", desc: "Multiplayer Hosting", icon: Server },
    { name: "Docker", category: "devops", desc: "Containerized Agents", icon: Boxes },
    { name: "NVIDIA CUDA", category: "devops", desc: "GPU Compute", icon: Cpu }
];

const techCategories = [
    { id: "all", label: "All Technologies", icon: Layers },
    { id: "games", label: "Game Engines", icon: Gamepad2 },
    { id: "ai", label: "AI & Machine Learning", icon: BrainCircuit },
    { id: "devops", label: "Infrastructure & GPU", icon: Server }
];

interface FaqItem {
    id: string;
    question: string;
    answer: string;
    icon: React.ElementType;
}

const gamesAiFaqs: FaqItem[] = [
    {
        id: "gai-faq-1",
        question: "Is AI secure for our proprietary enterprise data?",
        answer: "Yes. We deploy custom LLMs and RAG architectures within your own private cloud VPC (Virtual Private Cloud). This ensures that your proprietary data is never sent to public endpoints (like ChatGPT) to train third-party models.",
        icon: ShieldCheck
    },
    {
        id: "gai-faq-2",
        question: "Do you develop for mobile, PC, or console games?",
        answer: "We develop for all major platforms. Using Unity, we efficiently target iOS, Android, and PC. For high-fidelity AAA experiences, we utilize Unreal Engine 5 targeting PC and next-gen consoles.",
        icon: Gamepad2
    },
    {
        id: "gai-faq-3",
        question: "Who owns the code and trained AI models?",
        answer: "You do. Upon milestone completion, 100% of the game source code, 3D assets, custom AI model weights, and data pipelines are legally transferred to you under NDA.",
        icon: Code2
    },
    {
        id: "gai-faq-4",
        question: "Can you automate my specific business process?",
        answer: "Almost certainly. Through a combination of OCR, NLP, and Python scripting, we can build custom RPA bots that interact with web interfaces, parse PDFs, and update databases 24/7 without human intervention.",
        icon: Bot
    },
    {
        id: "gai-faq-5",
        question: "How long does it take to build a game or AI agent?",
        answer: "A targeted internal AI agent or automation script can take 3-6 weeks. A fully playable 3D multiplayer game can take 4-12+ months depending on the scope of 3D asset generation and netcode complexity.",
        icon: Clock
    }
];

/* ==========================================================================
   MAIN CLIENT COMPONENT
   ========================================================================== */

export default function GamesAiPageClient() {
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
                                <BrainCircuit className="w-4 h-4 text-[#FFC050]" />
                                <span>GAMES & APPLIED A.I.</span>
                            </div>

                            {/* H1 — Left Aligned, Bold */}
                            <h1 className="text-[30px] sm:text-[44px] lg:text-[50px] xl:text-[56px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] leading-[1.1] drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:drop-shadow-md">
                                Game Engines & Autonomous AI
                                <span className="text-[#00595C] dark:text-[#FFC050]"> Development</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-[#003D3F]/75 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[17px] leading-[1.65] max-w-xl font-[family-name:var(--font-body)]">
                                We architect high-fidelity 3D multiplayer environments in Unreal Engine, and deploy secure, private LLM agents tailored to your enterprise data.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pt-1">
                                <Link
                                    href="/contact?category=games-ai"
                                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-[0_8px_22px_rgba(255,192,80,0.35)] hover:shadow-[0_12px_28px_rgba(255,192,80,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                >
                                    <span>Schedule Free Consultation</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href="#portfolio"
                                    className="px-7 py-3.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 backdrop-blur-xl border border-[#003D3F]/20 dark:border-white/20 text-[#003D3F] dark:text-white font-bold text-sm tracking-wide transition-all hover:scale-105 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00595C] shadow-sm"
                                >
                                    <Gamepad2 className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                    <span>View AI & Game Portfolio ↓</span>
                                </a>
                            </div>

                            {/* Proof Pills — Compact 2x2 Grid */}
                            <div className="grid grid-cols-2 gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm font-bold text-[#003D3F]/85 dark:text-white/85">
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    Private Enterprise AI
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    100% IP & Asset Ownership
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    Multiplayer Netcode
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
                                    animationPath="/assets/lottie/rocket-launch.json"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Live Terminal Status Widget (AI / Game Server style) */}
                            <div className="w-full max-w-md rounded-2xl bg-[#001214] p-4 sm:p-5 border border-white/15 text-white shadow-2xl font-mono text-xs relative overflow-hidden z-10">
                                {/* Terminal Header */}
                                <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    <span className="text-[10px] text-white/40 ml-2 font-sans">uvicon-ai ~ agent-core</span>
                                    <div className="ml-auto flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                        <span className="text-[9px] font-sans font-bold text-emerald-400 uppercase tracking-wider">Inference</span>
                                    </div>
                                </div>
                                {/* Terminal Lines */}
                                <div className="space-y-1.5 text-[11px]">
                                    <p className="text-white/40">Loading model weights: Llama-3-8B-Instruct...</p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> CUDA GPU Accel: <span className="text-emerald-400 font-bold">ACTIVE</span></p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> RAG Vector Index: <span className="text-[#FFC050] font-bold">14.2M embeddings</span></p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> Context Guardrails: <span className="text-emerald-400 font-bold">SECURE</span></p>
                                    <p className="text-white/40 mt-1">Starting game authoritative server (Tickrate: 60)...</p>
                                    <p className="text-[#3FC1B8]"><span className="text-emerald-400">✓</span> WebSocket Mesh: <span className="text-emerald-400 font-bold">LISTENING ON PORT 8080</span></p>
                                    <div className="mt-2.5 p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-[10px] font-sans">
                                        <span className="text-white/70">LLM Latency: 120ms • Game Ping: 18ms</span>
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
               SECTION 2: PORTFOLIO — RECENT PROJECTS (MOVED UP)
               ===================================================================== */}
            <motion.section
                id="portfolio"
                className="w-full relative pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                {/* 3D Accent */}
                <div className="absolute top-1/4 -left-8 sm:-left-4 w-36 sm:w-56 lg:w-64 opacity-30 dark:opacity-50 pointer-events-none z-0 animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-4.webp"
                        alt="Accent"
                        width={260}
                        height={260}
                        className="w-full h-auto object-contain transform -rotate-12 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Left) */}
                    <div className="relative text-left w-full max-w-6xl mx-auto mb-10 sm:mb-14 flex flex-col items-start">
                        <div className="relative w-full flex flex-col items-start justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-left">
                                PORTFOLIO
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left">
                                Featured Games & AI Agents
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Explore our recent spatial computing applications, autonomous LLM agents, and 3D multiplayer games.
                        </p>
                    </div>

                    {/* Projects List */}
                    <div className="flex flex-col gap-8 sm:gap-10">
                        {portfolioProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariant}
                                className="w-full bg-white/80 dark:bg-[#001D1F]/70 backdrop-blur-xl rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/60 dark:border-white/10 shadow-[0_15px_40px_rgba(0,61,63,0.06)] dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00595C]/5 dark:bg-[#FFC050]/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform" />

                                {/* Project Info */}
                                <div className={`flex flex-col items-start ${idx % 2 === 0 ? "lg:order-1 lg:col-span-6" : "lg:order-2 lg:col-span-6"}`}>
                                    <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30 mb-3 sm:mb-4">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2 sm:mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#003D3F]/75 dark:text-white/80 leading-relaxed font-[family-name:var(--font-body)] mb-4 sm:mb-5">
                                        {project.description}
                                    </p>

                                    {/* Metrics */}
                                    <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                                        {project.metrics.map((metric, mIdx) => (
                                            <div key={mIdx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#003D3F]/5 dark:bg-white/5 text-[#003D3F]/90 dark:text-white/90 border border-[#003D3F]/10 dark:border-white/10">
                                                <CheckCircle2 className="w-3 h-3 text-[#FFC050] shrink-0" />
                                                <span>{metric}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech */}
                                    <div className="flex items-center flex-wrap gap-2 mt-auto">
                                        <span className="text-xs font-bold text-[#003D3F]/60 dark:text-white/50 mr-1">Stack:</span>
                                        {project.tech.map((tech, tIdx) => (
                                            <span key={tIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded bg-[#00595C]/10 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Image */}
                                <div className={`relative w-full h-[220px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 ${idx % 2 === 0 ? "lg:order-2 lg:col-span-6" : "lg:order-1 lg:col-span-6"}`}>
                                    <Image
                                        src={project.imageSrc}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none" />
                                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#FFC050]" />
                                        <span>Production Deployed</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 3: CAPABILITIES — BENTO GRID
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Right) */}
                    <div className="relative text-right w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col items-end justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-right">
                                EXPERTISE
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right">
                                Games & AI Capabilities
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Pushing the boundaries of spatial computing and artificial intelligence.
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
               SECTION 4: HOW IT WORKS — 4-PHASE DELIVERY ENGINE
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Left) */}
                    <div className="relative text-left w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col items-start justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-left">
                                PROCESS
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left">
                                Agile Delivery Engine
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            From GDD and data gathering to global scaling.
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative z-10">
                        {/* Process List */}
                        <div className="flex flex-col gap-4 sm:gap-6 order-2 lg:order-1">
                            {deliveryPhases.map((phase, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={fadeInUp}
                                    onClick={() => setActivePhaseIndex(idx)}
                                    className={`w-full rounded-2xl p-5 sm:p-6 cursor-pointer transition-all border ${activePhaseIndex === idx
                                        ? "bg-white/95 dark:bg-[#002829]/90 backdrop-blur-xl border-[#00595C]/30 dark:border-[#FFC050]/40 shadow-[0_12px_30px_rgba(0,61,63,0.12)] dark:shadow-[0_12px_30px_rgba(255,192,80,0.05)] scale-[1.02]"
                                        : "bg-white/50 dark:bg-white/5 backdrop-blur-md border-[#003D3F]/10 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10"
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`text-4xl sm:text-5xl font-black font-[family-name:var(--font-heading-main)] leading-none ${activePhaseIndex === idx ? "text-[#00595C] dark:text-[#FFC050]" : "text-[#003D3F]/20 dark:text-white/20"}`}>
                                            {phase.stepNumber}
                                        </div>
                                        <div className="flex flex-col flex-1">
                                            <h3 className={`text-base sm:text-lg font-bold font-[family-name:var(--font-heading-section)] mb-1 ${activePhaseIndex === idx ? "text-[#003D3F] dark:text-white" : "text-[#003D3F]/70 dark:text-white/70"}`}>
                                                {phase.title}
                                            </h3>
                                            <span className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${activePhaseIndex === idx ? "text-[#00595C] dark:text-[#3FC1B8]" : "text-[#003D3F]/50 dark:text-white/50"}`}>
                                                {phase.timeline}
                                            </span>
                                            {activePhaseIndex === idx && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed font-[family-name:var(--font-body)] mb-4">
                                                        {phase.summary}
                                                    </p>
                                                    <div className="space-y-2 mb-4">
                                                        {phase.deliverables.map((item, i) => (
                                                            <div key={i} className="flex items-start gap-2 text-xs sm:text-[13px] font-semibold text-[#003D3F]/90 dark:text-white/90">
                                                                <CheckCircle2 className="w-4 h-4 text-[#FFC050] shrink-0 mt-0.5" />
                                                                <span>{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="p-3 bg-[#00595C]/10 dark:bg-black/30 rounded-xl border border-[#00595C]/20 dark:border-white/10 flex items-start gap-2.5">
                                                        <ShieldCheck className="w-4 h-4 text-[#00595C] dark:text-[#FFC050] shrink-0 mt-0.5" />
                                                        <p className="text-[11px] sm:text-xs font-bold text-[#00595C] dark:text-white/90">
                                                            <span className="text-[#003D3F] dark:text-[#FFC050]">Guarantee:</span> {phase.guarantee}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Interactive Visual Block */}
                        <div className="order-1 lg:order-2 w-full lg:sticky lg:top-32 h-[300px] sm:h-[400px] lg:h-[480px] bg-white/80 dark:bg-[#001214]/80 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/15 shadow-[0_20px_50px_rgba(0,61,63,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative flex flex-col">
                            {/* Window Header */}
                            <div className="w-full h-12 border-b border-[#003D3F]/10 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 text-[10px] font-bold text-[#003D3F]/70 dark:text-white/70">
                                    <Lock className="w-3 h-3" />
                                    <span>uvicon.in/process/{deliveryPhases[activePhaseIndex].stepNumber}</span>
                                </div>
                            </div>

                            {/* Dynamic Content Body */}
                            <div className="flex-1 w-full relative bg-[#F8FAFC] dark:bg-transparent flex items-center justify-center p-6 sm:p-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activePhaseIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full max-w-sm flex flex-col items-center text-center"
                                    >
                                        {activePhaseIndex === 0 && (
                                            <div className="w-full aspect-square max-w-[240px] relative">
                                                <div className="absolute inset-0 border-2 border-dashed border-[#00595C]/30 dark:border-[#3FC1B8]/30 rounded-2xl animate-[spin_20s_linear_infinite]" />
                                                <div className="absolute inset-4 bg-white dark:bg-[#002829] rounded-xl shadow-lg border border-[#003D3F]/10 dark:border-white/10 flex flex-col items-center justify-center p-4">
                                                    <Compass className="w-12 h-12 text-[#FFC050] mb-3" />
                                                    <div className="w-3/4 h-2 bg-[#003D3F]/10 dark:bg-white/10 rounded-full mb-2" />
                                                    <div className="w-1/2 h-2 bg-[#003D3F]/10 dark:bg-white/10 rounded-full" />
                                                </div>
                                            </div>
                                        )}
                                        {activePhaseIndex === 1 && (
                                            <div className="w-full bg-[#001214] rounded-xl p-4 border border-white/20 text-left font-mono text-xs shadow-2xl relative overflow-hidden">
                                                <div className="text-emerald-400 mb-1">$ python train.py --model llama3</div>
                                                <div className="text-white/60 mb-2">Epoch 1/5: loss 0.431</div>
                                                <div className="text-emerald-400 mb-1">$ uebuild ProjectAethelgard</div>
                                                <div className="text-white/60">Compiling shaders (4,231 / 10,000)...</div>
                                                <div className="text-[#FFC050] mt-1">✓ Playable Build Ready</div>
                                                <div className="absolute -right-4 -bottom-4 opacity-10">
                                                    <BrainCircuit className="w-24 h-24 text-white" />
                                                </div>
                                            </div>
                                        )}
                                        {activePhaseIndex === 2 && (
                                            <div className="w-full flex flex-col gap-3">
                                                <div className="w-full bg-white dark:bg-[#001D1F] rounded-xl p-4 border border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <Gauge className="w-5 h-5 text-emerald-500" />
                                                        <span className="text-sm font-bold text-[#003D3F] dark:text-white">Frame Time</span>
                                                    </div>
                                                    <span className="text-emerald-500 font-black">16.6ms (60FPS)</span>
                                                </div>
                                                <div className="w-full bg-white dark:bg-[#001D1F] rounded-xl p-4 border border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <Activity className="w-5 h-5 text-emerald-500" />
                                                        <span className="text-sm font-bold text-[#003D3F] dark:text-white">Tick Rate</span>
                                                    </div>
                                                    <span className="text-emerald-500 font-black">64 Hz</span>
                                                </div>
                                                <div className="w-full bg-white dark:bg-[#001D1F] rounded-xl p-4 border border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                                        <span className="text-sm font-bold text-[#003D3F] dark:text-white">AI Red-Team</span>
                                                    </div>
                                                    <span className="text-emerald-500 font-black">PASS</span>
                                                </div>
                                            </div>
                                        )}
                                        {activePhaseIndex === 3 && (
                                            <div className="w-full max-w-[200px] aspect-[3/4] bg-gradient-to-br from-[#00595C] to-[#002829] rounded-2xl p-6 border-2 border-[#FFC050]/50 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                                <Award className="w-14 h-14 text-[#FFC050] mb-4" />
                                                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Global Deploy</h4>
                                                <span className="text-[#3FC1B8] font-bold text-xs">Live Servers</span>
                                                <div className="w-full h-[1px] bg-white/20 my-4" />
                                                <span className="text-white/60 text-[10px] uppercase">90-Day SLA Active</span>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 5: TECH STACK — CATEGORIZED GRID
               ===================================================================== */}
            <motion.section
                id="tech-stack"
                className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Header Block (Right) */}
                    <div className="relative text-right w-full max-w-6xl mx-auto mb-8 sm:mb-10 flex flex-col items-end">
                        <div className="relative w-full flex flex-col items-end justify-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-right">
                                TECHNOLOGIES
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-right">
                                Games & AI Tech Stack
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            High-performance C++ game engines and scalable Python AI pipelines.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 mb-8 sm:mb-10 relative z-10">
                        {techCategories.map((cat) => {
                            const TabIcon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTechTab(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-md ${activeTechTab === cat.id
                                        ? "bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] shadow-md scale-105"
                                        : "bg-white/60 dark:bg-white/5 text-[#003D3F]/70 dark:text-white/70 hover:bg-white hover:text-[#003D3F] dark:hover:bg-white/10 dark:hover:text-white border border-[#003D3F]/10 dark:border-white/10"
                                        }`}
                                >
                                    <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Tech Grid */}
                    <motion.div layout className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
                        <AnimatePresence>
                            {filteredTech.map((tech) => {
                                const TechIcon = tech.icon;
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        key={tech.name}
                                        className="bg-white/70 dark:bg-[#001719]/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-[#003D3F]/10 dark:border-white/10 hover:border-[#FFC050]/50 hover:bg-white dark:hover:bg-[#001D1F] transition-all flex flex-col items-center text-center group"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#003D3F]/5 dark:bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#FFC050]/10 transition-all">
                                            <TechIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#00595C] dark:text-[#3FC1B8] group-hover:text-[#FFC050]" />
                                        </div>
                                        <h4 className="text-[13px] sm:text-sm font-bold text-[#003D3F] dark:text-white mb-1">
                                            {tech.name}
                                        </h4>
                                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#003D3F]/60 dark:text-white/60">
                                            {tech.desc}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 6: PRICING BAND
               ===================================================================== */}
            <section className="w-full relative py-8 sm:py-12 z-10 mt-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    <div className="w-full bg-gradient-to-r from-[#003D3F] to-[#002829] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC050]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col items-start text-left z-10 max-w-xl">
                            <span className="text-[#FFC050] text-xs font-black uppercase tracking-widest mb-2">Transparent Pricing</span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-heading-section)] mb-3">
                                Fixed-Price Sprints. No Surprises.
                            </h3>
                            <p className="text-white/80 text-sm font-[family-name:var(--font-body)]">
                                We don't bill by the hour. We price by the milestone. Get a definitive technical blueprint and a fixed-price statement of work before writing any code.
                            </p>
                        </div>

                        <Link
                            href="/pricing"
                            className="shrink-0 px-8 py-3.5 rounded-full bg-[#FFC050] hover:bg-[#e0a840] text-[#002829] font-bold text-sm tracking-wide transition-all shadow-[0_5px_15px_rgba(255,192,80,0.3)] hover:scale-105 flex items-center justify-center gap-2 z-10 w-full md:w-auto"
                        >
                            <span>View Pricing Models</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================================
               SECTION 7: FAQ (ACCORDION)
               ===================================================================== */}
            <motion.section
                className="w-full relative pt-10 sm:pt-14 lg:pt-20 pb-10 sm:pb-14 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={staggerContainer}
            >
                <div className="max-w-4xl mx-auto">
                    {/* Header Block (Left) */}
                    <div className="relative text-left w-full mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col items-start justify-center min-h-[0px] lg:min-h-[100px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[110px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap text-left">
                                FAQ
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left">
                                Games & AI FAQs
                            </h2>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3 sm:gap-4 relative z-10">
                        {gamesAiFaqs.map((faq) => {
                            const FaqIcon = faq.icon;
                            const isOpen = openFaqId === faq.id;

                            return (
                                <div
                                    key={faq.id}
                                    className={`w-full rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen
                                        ? "bg-white dark:bg-[#001D1F] border-[#00595C]/30 dark:border-[#FFC050]/40 shadow-lg"
                                        : "bg-white/50 dark:bg-[#001214]/50 border-[#003D3F]/10 dark:border-white/10 hover:border-[#00595C]/30 dark:hover:border-white/30"
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 lg:p-6 focus:outline-none"
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4 text-left">
                                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-[#00595C]/10 dark:bg-[#FFC050]/10 text-[#00595C] dark:text-[#FFC050]" : "bg-[#003D3F]/5 dark:bg-white/5 text-[#003D3F]/60 dark:text-white/60"}`}>
                                                <FaqIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <h3 className={`text-[13px] sm:text-sm lg:text-base font-bold font-[family-name:var(--font-heading-section)] ${isOpen ? "text-[#00595C] dark:text-[#FFC050]" : "text-[#003D3F] dark:text-white"}`}>
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform duration-300 ${isOpen ? "text-[#FFC050] rotate-180" : "text-[#003D3F]/40 dark:text-white/40"}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 sm:p-5 lg:p-6 pt-0 sm:pt-0 lg:pt-0 pl-15 sm:pl-19 lg:pl-20 text-xs sm:text-sm lg:text-[15px] text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* =====================================================================
               SECTION 8: FINAL CTA BAND
               ===================================================================== */}
            <section className="w-full relative z-10">
                <div className="w-full bg-[#001214] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center relative overflow-hidden border-t border-white/10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-[#00595C]/20 to-transparent blur-3xl pointer-events-none" />

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white/80 mb-6 relative z-10">
                        <Rocket className="w-4 h-4 text-[#FFC050]" />
                        <span>Ready to build?</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-[family-name:var(--font-heading-main)] leading-tight max-w-3xl mb-6 relative z-10">
                        Pioneer the <span className="text-[#FFC050]">Future.</span>
                    </h2>

                    <p className="text-sm sm:text-base text-white/70 max-w-xl font-[family-name:var(--font-body)] mb-8 relative z-10">
                        Schedule a free technical discovery session with our lead architects. We'll map out your game mechanics, AI model selection, and sprint timeline.
                    </p>

                    <Link
                        href="/contact?category=games-ai"
                        className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#FFC050] hover:bg-[#e0a840] text-[#002829] font-black text-sm sm:text-base tracking-wide transition-all shadow-[0_0_30px_rgba(255,192,80,0.3)] hover:shadow-[0_0_40px_rgba(255,192,80,0.5)] hover:scale-105 flex items-center justify-center gap-2 relative z-10"
                    >
                        <span>Book Tech Discovery</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>

                    {/* Disclaimer */}
                    <p className="mt-8 text-[10px] sm:text-xs text-white/40 max-w-2xl font-[family-name:var(--font-body)] text-center relative z-10">
                        100% NDA Protected. Your proprietary data and IP remain strictly confidential.
                    </p>
                </div>
            </section>

        </main>
    );
}
