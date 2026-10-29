"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { supabase } from "@/lib/supabase";
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
    TrendingUp,
    Calendar,
    User
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
   DATA STRUCTURES: BLOG ARTICLES
   ========================================================================== */

interface BlogPost {
    id: string;
    title: string;
    summary: string;
    category: string;
    author: string;
    authorRole: string;
    readTime: string;
    date: string;
    badge: string;
    tags: string[];
    featured?: boolean;
}

const blogPosts: BlogPost[] = [
    {
        id: "post-1",
        title: "Mastering Sub-Millisecond Order Routing: Building Low-Latency C++ & Python WebSockets",
        summary:
            "A deep technical breakdown of how we eliminated packet queue bottlenecks and optimized tick-by-tick order execution across Angel One, Zerodha, and Dhan APIs.",
        category: "Algo & Quant",
        author: "Kunwar Yuvraj",
        authorRole: "Head Quant Systems Architect",
        readTime: "10 Mins Read",
        date: "August 2026",
        badge: "Featured Paper",
        tags: ["C++", "Python", "Low Latency", "WebSockets", "Algo Trading"],
        featured: true
    },
    {
        id: "post-2",
        title: "Why We Swapped Monolithic CMSs For Next.js 15 App Router & Strict TypeScript",
        summary:
            "How eliminating bloated WordPress plugins and legacy PHP frameworks in favor of React Server Components resulted in 100/100 Core Web Vitals and zero security vulnerabilities.",
        category: "Web & SaaS",
        author: "Lead Frontend Architect",
        authorRole: "UI/UX & Systems Engineer",
        readTime: "7 Mins Read",
        date: "August 2026",
        badge: "Web Performance",
        tags: ["Next.js 15", "TypeScript", "RSC", "Core Web Vitals"]
    },
    {
        id: "post-3",
        title: "The Legal & Technical Blueprint For 100% Client IP Code Sovereignty",
        summary:
            "Why traditional agency code lock-in hurts founders, and how our strict NDA and direct GitHub repository handover protocol protects your enterprise valuation.",
        category: "Security & IP",
        author: "Engineering Operations Lead",
        authorRole: "Compliance & Architecture Lead",
        readTime: "5 Mins Read",
        date: "July 2026",
        badge: "IP Sovereignty",
        tags: ["IP Ownership", "NDA", "Git Governance", "Security"]
    },
    {
        id: "post-4",
        title: "Autonomous Multi-Agent AI Systems: RAG Architecture Without Hallucinations",
        summary:
            "Architecting reliable vector embeddings, semantic search caches, and structured JSON output guards for enterprise compliance and document processing.",
        category: "AI & Agents",
        author: "Senior AI Engineer",
        authorRole: "Machine Learning Lead",
        readTime: "8 Mins Read",
        date: "July 2026",
        badge: "AI Systems",
        tags: ["AI Agents", "LangChain", "Vector DB", "RAG"]
    },
    {
        id: "post-5",
        title: "Zero-Downtime Database Migrations With PostgreSQL & Docker Multi-Stage Builds",
        summary:
            "A practical guide to non-blocking schema alterations, backward-compatible migrations, and automated health checks in high-throughput production environments.",
        category: "DevOps & Cloud",
        author: "DevOps Lead",
        authorRole: "Distributed Systems Lead",
        readTime: "6 Mins Read",
        date: "June 2026",
        badge: "DevOps Core",
        tags: ["PostgreSQL", "Docker", "AWS", "Zero Downtime"]
    }
];

export default function BlogClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeError, setSubscribeError] = useState<string | null>(null);

    const categories = ["All", "Algo & Quant", "Web & SaaS", "Security & IP", "AI & Agents", "DevOps & Cloud"];

    const filteredPosts = useMemo(() => {
        return blogPosts.filter((post) => {
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail.trim() || subscribing) return;
        setSubscribing(true);
        setSubscribeError(null);

        try {
            const { error } = await supabase.from("newsletter_subscribers").insert([
                {
                    email: newsletterEmail.trim().toLowerCase(),
                    source: "blog_weekly_dispatch"
                }
            ]);

            if (error) {
                // If duplicate email, still show success message gracefully
                if (error.code === "23505") {
                    setIsSubscribed(true);
                } else {
                    setSubscribeError(error.message || "Failed to subscribe. Please try again.");
                }
            } else {
                setIsSubscribed(true);
            }
        } catch {
            setSubscribeError("Network error. Please try again.");
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* Unified Page Background Canvas */}
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
               SECTION 1: HERO SECTION — EDITORIAL MAGAZINE & FEATURED SPOTLIGHT
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
                    {/* Editorial Header Block */}
                    <div className="max-w-4xl mx-auto text-center mb-8">
                        <motion.div
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl mb-4 shadow-xs"
                        >
                            <FileText className="w-4 h-4 text-[#FFC050]" />
                            <span>THE UVICON ENGINEERING LEDGER • ARCHITECTURAL PAPERS</span>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="relative w-full mb-4">
                            <span className="text-[36px] sm:text-[64px] lg:text-[110px] xl:text-[130px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-hero leading-none font-[family-name:var(--font-heading-main)] block -mb-2 sm:-mb-4 opacity-80 whitespace-nowrap">
                                LEDGER
                            </span>
                            <h1 className="text-[28px] sm:text-[42px] lg:text-[50px] xl:text-[56px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] drop-shadow-sm">
                                Deep Technical Insights For Builders & Quant Traders
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.65] max-w-3xl mx-auto font-[family-name:var(--font-body)] mb-6"
                        >
                            Practical engineering articles, quant architecture papers, and system design insights written directly by Uvicon Lead Architects.
                        </motion.p>

                        {/* Search & Category Filter */}
                        <motion.div variants={fadeInUp} className="w-full max-w-2xl mx-auto relative mb-6">
                            <div className="relative flex items-center">
                                <Search className="w-5 h-5 text-[#00595C] dark:text-[#FFC050] absolute left-4 pointer-events-none" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles, quant latency, Next.js 15, AI agents..."
                                    className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 dark:bg-[#001D1F]/90 border border-[#003D3F]/20 dark:border-white/20 text-sm font-semibold text-[#003D3F] dark:text-white placeholder-[#003D3F]/40 dark:placeholder-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-2">
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

                    {/* Magazine Split Spotlight: Lead Article (7 Cols) + Trending Dispatches (5 Cols) */}
                    {selectedCategory === "All" && !searchQuery && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
                            {/* Lead Paper (7 Cols) */}
                            <div className="lg:col-span-7 bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-8 border-2 border-[#FFC050] shadow-xl flex flex-col justify-between group relative overflow-hidden">
                                <div>
                                    <div className="aspect-[16/9] relative rounded-2xl overflow-hidden border border-[#003D3F]/15 dark:border-white/15 shadow-sm mb-5">
                                        <Image
                                            src="/assets/images/uvicon-pro-preview.png"
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 1024px) 100vw, 60vw"
                                        />
                                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FFC050] text-[10px] font-black uppercase tracking-wider">
                                            {featuredPost.badge}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-[#00595C] dark:text-[#3FC1B8]">
                                            {featuredPost.category}
                                        </span>
                                        <span className="text-xs text-[#003D3F]/50 dark:text-white/50">•</span>
                                        <span className="text-xs font-semibold text-[#003D3F]/70 dark:text-white/70">
                                            {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)] mb-4">
                                        {featuredPost.summary}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-[#00595C] dark:text-[#FFC050]" />
                                        <span className="text-xs font-bold text-[#003D3F] dark:text-white">
                                            {featuredPost.author}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-[#00595C] dark:text-[#FFC050] flex items-center gap-1">
                                        <span>Read Lead Paper</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>

                            {/* Trending Dispatches List (5 Cols) */}
                            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                                <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                    <span className="text-xs font-black uppercase text-[#00595C] dark:text-[#3FC1B8]">
                                        🔥 Trending Architectural Dispatches
                                    </span>
                                    <span className="text-[10px] font-bold text-[#003D3F]/60 dark:text-white/60">
                                        Recent Releases
                                    </span>
                                </div>

                                {blogPosts.slice(1, 4).map((trendPost) => (
                                    <div
                                        key={trendPost.id}
                                        className="p-5 rounded-3xl bg-white/85 dark:bg-[#001D1F]/85 backdrop-blur-xl border border-[#003D3F]/15 dark:border-white/10 shadow-sm flex flex-col justify-between grow group hover:border-[#FFC050]/50 transition-all text-left"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-1.5">
                                                <span className="text-[11px] font-bold text-[#00595C] dark:text-[#3FC1B8]">
                                                    {trendPost.category}
                                                </span>
                                                <span className="text-[10px] text-[#003D3F]/50 dark:text-white/50">
                                                    {trendPost.readTime}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-bold text-[#003D3F] dark:text-white leading-snug group-hover:text-[#00595C] dark:group-hover:text-[#FFC050] transition-colors mb-1">
                                                {trendPost.title}
                                            </h3>
                                            <p className="text-xs text-[#003D3F]/70 dark:text-white/70 line-clamp-2">
                                                {trendPost.summary}
                                            </p>
                                        </div>

                                        <div className="pt-2.5 mt-2 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between text-[11px]">
                                            <span className="font-semibold text-[#003D3F]/60 dark:text-white/60">
                                                {trendPost.date}
                                            </span>
                                            <span className="font-bold text-[#00595C] dark:text-[#FFC050] flex items-center gap-1">
                                                <span>Read</span>
                                                <ArrowUpRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* =====================================================================
               SECTION 3: ARTICLES GRID
               ===================================================================== */}
            <section className="w-full relative pb-16 sm:pb-20 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-6 flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                            All Articles & Technical Papers ({filteredPosts.length})
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                        {filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                variants={cardVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                className="bg-white/90 dark:bg-[#001D1F]/85 backdrop-blur-xl rounded-3xl p-6 border border-[#003D3F]/15 dark:border-white/10 shadow-lg flex flex-col justify-between group hover:border-[#FFC050]/50 transition-all"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 text-[#00595C] dark:text-[#FFC050]">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-[#003D3F]/60 dark:text-white/60">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2 group-hover:text-[#00595C] dark:group-hover:text-[#FFC050] transition-colors">
                                        {post.title}
                                    </h4>

                                    <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)] mb-4">
                                        {post.summary}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-[#003D3F]/10 dark:border-white/10 flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-[#003D3F]/60 dark:text-white/60">
                                        {post.date}
                                    </span>
                                    <span className="text-xs font-bold text-[#00595C] dark:text-[#FFC050] flex items-center gap-1">
                                        <span>Read Paper</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================================
               SECTION 4: NEWSLETTER / ARCHITECTURE DISPATCH
               ===================================================================== */}
            <section className="w-full relative pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-b from-white/95 via-white/85 to-white/75 dark:from-[#001D1F]/90 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-xl shadow-xl text-center relative overflow-hidden">
                        <div className="max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                                <Mail className="w-3.5 h-3.5 text-[#FFC050]" />
                                <span>WEEKLY ARCHITECTURAL DISPATCH</span>
                            </div>
                            <h3 className="text-xl sm:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Join 5,000+ Engineers & Quant Founders
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 mt-2 mb-6 font-[family-name:var(--font-body)]">
                                Receive deep dives into low-latency algo routing, Next.js optimization, and software architecture directly from our studio. No spam.
                            </p>

                            {isSubscribed ? (
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                                    <CheckCheck className="w-5 h-5" />
                                    <span>You&apos;re on the list! Welcome to the Uvicon Architecture Dispatch.</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-md mx-auto">
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <input
                                            type="email"
                                            required
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            placeholder="Enter your work email..."
                                            className="px-4 py-3 rounded-full bg-white/90 dark:bg-white/10 border border-[#003D3F]/20 dark:border-white/20 text-xs sm:text-sm text-[#003D3F] dark:text-white placeholder-[#003D3F]/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFC050] grow"
                                        />
                                        <button
                                            type="submit"
                                            disabled={subscribing}
                                            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            <span>{subscribing ? "Subscribing..." : "Subscribe"}</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {subscribeError && (
                                        <span className="text-xs text-red-500 dark:text-red-400 font-medium text-center">
                                            {subscribeError}
                                        </span>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
