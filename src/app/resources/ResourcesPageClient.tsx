"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Search,
} from "lucide-react";

import { TextReveal } from "@/components/ui/TextReveal";
import { CardReveal } from "@/components/ui/CardReveal";

/* ==========================================================================
   DATA STRUCTURES FOR RESOURCE HUB ITEMS
   ========================================================================== */

interface ResourceItem {
  id: string;
  title: string;
  category: "case-studies" | "tutorials" | "blog" | "whitepapers";
  badge: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  techStack: string[];
  href: string;
  date: string;
  author?: string;
}

const resourceItems: ResourceItem[] = [
  {
    id: "case-study-connect",
    title: "Uvicon Connect — High-Throughput Lead & Sales CRM Portal",
    category: "case-studies",
    badge: "Enterprise Case Study",
    readTime: "8 min read",
    summary:
      "How we engineered an enterprise CRM platform handling 10,000+ daily active leads with sub-50ms WebSocket real-time synchronization and automated multi-team Kanban pipelines.",
    keyTakeaways: [
      "Sub-50ms Real-Time Data Synchronization via Node.js & WebSockets",
      "99.99% Enterprise Uptime with Distributed Docker Clusters",
      "Automated Round-Robin Lead Assignment & Audit Logging",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "WebSockets"],
    href: "/case-studies",
    date: "July 2026",
    author: "Uvicon Architecture Desk",
  },
  {
    id: "case-study-pro",
    title: "Uvicon Pro — Institutional Algo Software & Backtesting Architecture",
    category: "case-studies",
    badge: "Fintech Case Study",
    readTime: "11 min read",
    summary:
      "A technical case study on designing high-frequency algorithmic trading software, multi-broker order routing hooks, and historical strategy backtesting tools with Python & C++.",
    keyTakeaways: [
      "< 0.1ms Strategy Execution Latency on Local Engine Nodes",
      "Multi-Broker API Connectivity & Event-Driven Order Books",
      "Strict Financial Compliance (Software architecture only; no return claims)",
    ],
    techStack: ["Python", "C++", "React", "Redis", "WebSockets"],
    href: "/case-studies",
    date: "July 2026",
    author: "Quantitative Engineering Pod",
  },
  {
    id: "tutorial-nextjs",
    title: "Architecting Sub-100ms LCP Next.js Portals with App Router & Server Actions",
    category: "tutorials",
    badge: "Technical Guide",
    readTime: "9 min read",
    summary:
      "A step-by-step engineering tutorial on optimizing Core Web Vitals to a perfect 100/100 Lighthouse score using Next.js App Router, dynamic import boundaries, and server actions.",
    keyTakeaways: [
      "Zero-Bundle Bloat with React Server Components (RSC)",
      "Automated Next-Gen WebP/AVIF Image Caching & Sizing",
      "GEO & AI Search Structured JSON-LD Schema Integration",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    href: "/faqs",
    date: "June 2026",
    author: "Frontend Architecture Pod",
  },
  {
    id: "tutorial-algo",
    title: "Low-Latency Python & WebSockets Multi-Broker Order Routing Engine Design",
    category: "tutorials",
    badge: "Algo Engineering Guide",
    readTime: "12 min read",
    summary:
      "Learn the architectural patterns behind reliable multi-broker API connectivity, non-blocking asynchronous Python loops, and Redis in-memory pub/sub queues for backtesting.",
    keyTakeaways: [
      "AsyncIO Non-Blocking Socket Management in Python",
      "Redis Pub/Sub In-Memory Message Broker Queuing",
      "Defensive Error Recovery & Automatic WebSocket Reconnections",
    ],
    techStack: ["Python", "Redis", "WebSockets", "FastAPI"],
    href: "/faqs",
    date: "June 2026",
    author: "Quantitative Engineering Pod",
  },
  {
    id: "blog-migration",
    title: "Why We Migrated 100% of Our Enterprise Client Portals to Next.js App Router",
    category: "blog",
    badge: "Engineering Insight",
    readTime: "6 min read",
    summary:
      "An inside look at our engineering philosophy, benchmark benchmarks, and how Server-Side Rendering (SSR) transforms B2B portal conversion rates and SEO rankings.",
    keyTakeaways: [
      "3.4x Faster First Contentful Paint Across Client Platforms",
      "Simplified Authentication & Edge Middleware Security",
      "Why Server-First UI is the Standard for Enterprise B2B SaaS",
    ],
    techStack: ["Next.js", "React", "Vercel Edge", "TypeScript"],
    href: "/blog",
    date: "May 2026",
    author: "Yuvraj Parmar, Lead Architect",
  },
  {
    id: "blog-algo-reality",
    title: "The Reality of Quantitative Algo Backtesting: Avoiding Curve-Fitting & Slippage",
    category: "blog",
    badge: "Quant Research",
    readTime: "10 min read",
    summary:
      "A factual, no-hype breakdown of common algorithmic backtesting pitfalls, out-of-sample validation techniques, and why software execution infrastructure matters more than hype.",
    keyTakeaways: [
      "Out-of-Sample Walk-Forward Strategy Validation Protocols",
      "Modeling Real-World Order Execution Slippage & Broker Fees",
      "Strict Regulatory Compliance & Understated System Governance",
    ],
    techStack: ["Python", "C++", "PostgreSQL", "Pandas"],
    href: "/blog",
    date: "May 2026",
    author: "Quantitative Engineering Pod",
  },
  {
    id: "whitepaper-blueprint",
    title: "Uvicon Enterprise Digital Engineering Blueprint & Technical Stack Handbook",
    category: "whitepapers",
    badge: "Architecture Whitepaper",
    readTime: "PDF Guide",
    summary:
      "Our comprehensive 32-page technical reference covering enterprise system design, zero-vulnerability cloud security, accessibility compliance, and B2B deployment SLAs.",
    keyTakeaways: [
      "Complete Reference Architecture for Web, Mobile & Quant Systems",
      "Security Auditing Checklist (SQLi, XSS, End-to-End SSL)",
      "90-Day SLA Post-Launch Warranty & DevOps Lifecycle Protocols",
    ],
    techStack: ["Architecture", "DevOps", "Security", "Cloud"],
    href: "/contact",
    date: "April 2026",
    author: "Uvicon Architecture Desk",
  },
  {
    id: "case-study-uhmb",
    title: "UHMB Services — Patient Care & Telemedicine Web Platform",
    category: "case-studies",
    badge: "Healthcare Portal",
    readTime: "7 min read",
    summary:
      "Designing a HIPAA-compliant telemedicine video consultation platform with instant doctor appointment scheduling, EHR database security, and 100/100 Core Web Vitals.",
    keyTakeaways: [
      "End-to-End Encrypted Video Consultations & Patient EHRs",
      "WCAG 2.1 AA Accessibility Standards for Elderly Patient Accessibility",
      "Zero-Downtime Rolling Kubernetes Cloud Cluster Deployments",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    href: "/case-studies",
    date: "April 2026",
    author: "Uvicon Healthcare Pod",
  },
  {
    id: "tutorial-pgvector",
    title: "Designing Zero-Vulnerability Relational Database Schemas with PostgreSQL & pgvector",
    category: "tutorials",
    badge: "Database Guide",
    readTime: "10 min read",
    summary:
      "How to architect high-concurrency relational schemas with ACID transaction integrity, row-level security (RLS), and vector embeddings for modern AI search pipelines.",
    keyTakeaways: [
      "ACID Transaction Integrity for Mission-Critical Ledger Tables",
      "Vector Similarity Indexing with pgvector for AI RAG Queries",
      "Automated Point-in-Time Backup & Disaster Recovery Strategies",
    ],
    techStack: ["PostgreSQL", "pgvector", "SQL", "Docker"],
    href: "/faqs",
    date: "March 2026",
    author: "Backend Architecture Pod",
  },
];

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const resourcesFaqs: FaqItem[] = [
  {
    category: "Resources & Usage",
    question: "Are Uvicon's technical tutorials, case studies, and architecture blueprints free to use?",
    answer:
      "Yes. All technical tutorials, case study breakdowns, and architectural blueprints published on this Knowledge Hub are completely open and free to reference for your engineering teams. We believe in transparent, reproducible B2B tech education.",
  },
  {
    category: "Algo Compliance",
    question: "How do your algorithmic trading resources comply with financial and regulatory guidelines?",
    answer:
      "All quantitative and algorithmic trading content on this platform is strictly educational and architectural. We discuss software architecture, backtesting logic, and broker connectivity only. We never provide investment advice, assert guaranteed returns, assure profit, or make risk-free claims per our company compliance contract.",
  },
  {
    category: "Implementation",
    question: "Can we request custom consulting or engineering support based on one of your case studies?",
    answer:
      "Yes. If you see an architecture pattern, CRM system, or algo backtesting framework in our case studies that matches your roadmap, you can book a consultation with our architecture pod to implement a tailored version for your enterprise.",
  },
  {
    category: "Updates",
    question: "How frequently are these tutorials, benchmarks, and engineering insights updated?",
    answer:
      "We review and update evergreen tutorials, SEO/GEO guidelines, and benchmark datasets at least once per quarter to ensure consistency with Next.js releases, browser engines, and financial technology standards.",
  },
];

export default function ResourcesPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredItems = resourceItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techStack.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main
      className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
      style={{ background: "var(--page-bg)" }}
    >
      {/* Page Background CSS */}
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
                }
            }
            .stroke-watermark-resources {
                -webkit-text-stroke: 2.5px rgba(0, 61, 63, 0.35);
            }
            @media (prefers-color-scheme: dark) {
                .stroke-watermark-resources {
                    -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.32);
                }
            }
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
          `,
        }}
      />

      {/* =====================================================================
          SECTION 1: HERO SECTION (WITH SAME TO SAME TEXT REVEAL ANIMATION)
          ===================================================================== */}
      <section className="w-full relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16 overflow-hidden z-10">
        {/* Decorative Hero Radial Glow */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          style={{
            background: "var(--hero-glow)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 85%, transparent 100%)",
          }}
        />

        {/* 3D Glass Bolt Accent on Right */}
        <div className="absolute top-12 right-0 sm:right-6 lg:right-12 w-32 sm:w-48 lg:w-64 pointer-events-none z-0 opacity-65 dark:opacity-85 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]">
          <Image
            src="/assets/icons/uvicon-bolt-1.webp"
            alt="3D Glass Lightning Bolt Accent"
            width={280}
            height={280}
            className="w-full h-auto object-contain transform rotate-12"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 backdrop-blur-md border border-[#FFC050]/30 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#003D3F]/80 dark:text-white/80 font-[family-name:var(--font-body)]">
              Knowledge Hub • Technical Case Studies & Architecture Guides
            </span>
          </div>

          {/* Watermark + H1 TextReveal */}
          <div className="relative w-full flex items-center justify-start mb-6 pt-10 sm:pt-16 md:pt-20 lg:pt-24">
            <span className="absolute top-0 left-0 text-[38px] sm:text-[76px] md:text-[104px] lg:text-[132px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-resources whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95 leading-none">
              RESOURCES
            </span>

            {/* HERE: SAME TO SAME TEXT REVEAL WITH MASKED LINE/WORD ANIMATION */}
            <TextReveal
              text="Actionable Digital Engineering Insights & Institutional Tech Resources"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#003D3F] dark:text-white tracking-tight font-[family-name:var(--font-heading-main)] leading-[1.15] relative z-10 max-w-4xl drop-shadow-sm"
              tag="h1"
            />
          </div>

          {/* GEO Answer-First Paragraph */}
          <p className="text-[#003D3F]/85 dark:text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-[family-name:var(--font-body)] relative z-10 mb-8">
            Explore Uvicon Technologies engineering resources: enterprise client case studies, Next.js 15 performance tutorials, institutional algo trading software architecture guides, and B2B SaaS system blueprints. Designed for technical founders, quantitative analysts, and enterprise engineering leaders in India.
          </p>

          {/* Quick Search & Category Filter Toolbar */}
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-[#003D3F]/15 dark:border-white/15">
            {/* Horizontal Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
              {[
                { id: "all", label: "All Resources", count: resourceItems.length },
                {
                  id: "case-studies",
                  label: "Case Studies",
                  count: resourceItems.filter((i) => i.category === "case-studies").length,
                },
                {
                  id: "tutorials",
                  label: "Technical Tutorials",
                  count: resourceItems.filter((i) => i.category === "tutorials").length,
                },
                {
                  id: "blog",
                  label: "Engineering Blog",
                  count: resourceItems.filter((i) => i.category === "blog").length,
                },
                {
                  id: "whitepapers",
                  label: "Whitepapers & Guides",
                  count: resourceItems.filter((i) => i.category === "whitepapers").length,
                },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-xl shrink-0 ${
                      isActive
                        ? "bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] shadow-md border border-[#00595C] dark:border-[#FFC050]"
                        : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/80 dark:text-white/80 hover:bg-[#003D3F]/12 dark:hover:bg-white/15 border border-[#003D3F]/15 dark:border-white/15"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                        isActive
                          ? "bg-white/20 text-white dark:bg-[#002829]/20 dark:text-[#002829]"
                          : "bg-[#003D3F]/10 dark:bg-white/10 text-[#003D3F] dark:text-white"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#003D3F]/50 dark:text-white/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack, topics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/60 dark:bg-[#002224]/60 backdrop-blur-xl border border-[#003D3F]/20 dark:border-white/20 text-sm font-medium text-[#003D3F] dark:text-white placeholder-[#003D3F]/50 dark:placeholder-white/50 focus:outline-none focus:border-[#00595C] dark:focus:border-[#FFC050] transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: RESOURCES GRID (WITH SAME TO SAME CARD REVEAL CURTAIN WIPE)
          ===================================================================== */}
      <section className="w-full relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="w-full py-16 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#001012]/40 rounded-3xl border border-[#003D3F]/10 dark:border-white/10">
              <BookOpen className="w-12 h-12 text-[#FFC050] mb-3 opacity-80" />
              <h3 className="text-xl font-bold text-[#003D3F] dark:text-white">
                No resources match your search
              </h3>
              <p className="text-sm text-[#003D3F]/70 dark:text-white/70 mt-1 max-w-md">
                Try searching for a different keyword or switch category filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] font-bold text-sm shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, idx) => {
                // WE APPLY EXACT SAME TO SAME CARD REVEAL WITH STAGGERED DELAYS
                const cardDelay = (idx % 3) * 0.12;

                return (
                  <CardReveal
                    key={item.id}
                    delay={cardDelay}
                    className="w-full h-full flex flex-col justify-between bg-white/80 dark:bg-[#001416]/80 backdrop-blur-[20px] backdrop-saturate-[180%] rounded-3xl p-6 sm:p-8 border border-white/40 border-t-white/70 dark:border-white/20 dark:border-t-white/40 shadow-sm hover:border-[#00595C]/50 dark:hover:border-[#FFC050]/50 transition-all duration-300 group"
                  >
                    {/* Top Header: Badge, Read time & Date */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#00595C]/12 dark:bg-white/10 text-[#00595C] dark:text-[#FFC050] border border-[#00595C]/25 dark:border-white/15">
                          {item.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#003D3F]/70 dark:text-white/70">
                          <Clock className="w-3.5 h-3.5 text-[#FFC050]" />
                          <span>{item.readTime}</span>
                        </div>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight group-hover:text-[#00595C] dark:group-hover:text-[#FFC050] transition-colors">
                        {item.title}
                      </h3>

                      {/* Date & Author */}
                      <div className="text-xs font-bold text-[#003D3F]/60 dark:text-white/60 mt-2">
                        {item.date} • {item.author}
                      </div>

                      {/* Summary */}
                      <p className="text-sm sm:text-base text-[#003D3F]/85 dark:text-white/85 leading-relaxed mt-3 font-[family-name:var(--font-body)]">
                        {item.summary}
                      </p>

                      {/* Key Takeaways */}
                      <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-[#003D3F]/10 dark:border-white/10">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] mb-0.5">
                          Key Takeaways:
                        </span>
                        {item.keyTakeaways.map((takeaway, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[#003D3F]/90 dark:text-white/90"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC050] shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Section: Tech Stack & CTA Link */}
                    <div className="mt-6 pt-5 border-t border-[#003D3F]/15 dark:border-white/15">
                      {/* Tech Stack Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-4">
                        {item.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#003D3F]/6 dark:bg-white/8 text-[#00595C] dark:text-[#3FC1B8] border border-[#003D3F]/15 dark:border-white/15"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Navigation Button */}
                      <Link
                        href={item.href}
                        className="w-full py-3 px-5 rounded-xl bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] hover:bg-[#003D3F] dark:hover:bg-[#F0C685] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm group-hover:translate-x-1"
                      >
                        <span>
                          {item.category === "case-studies"
                            ? "Read Case Study"
                            : item.category === "tutorials"
                            ? "Explore Tutorial"
                            : item.category === "whitepapers"
                            ? "Download Whitepaper"
                            : "Read Article"}
                        </span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: ARCHITECTURE & COMPLIANCE STANDARD (FACTUAL TECH HUB)
          ===================================================================== */}
      <section className="w-full relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto">
          <CardReveal
            delay={0.1}
            className="w-full bg-gradient-to-br from-[#003D3F]/10 via-[#00595C]/15 to-[#FFC050]/15 dark:from-[#002224]/80 dark:via-[#003D3F]/80 dark:to-[#FFC050]/15 backdrop-blur-[24px] rounded-3xl p-8 sm:p-12 border border-[#00595C]/30 dark:border-[#FFC050]/30 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/40 text-xs font-extrabold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4 text-[#FFC050]" />
                <span>Uvicon Regulatory & Engineering Governance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                Transparent Tech Education with Strict Financial Compliance
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#003D3F]/85 dark:text-white/85 leading-relaxed mt-3 font-[family-name:var(--font-body)]">
                In strict adherence to financial regulations and our company compliance policy, every algorithmic trading resource, Python strategy backtesting engine, and broker API guide on this Knowledge Hub focuses exclusively on software architecture and execution speed. We never guarantee returns, assure profit, or make risk-free claims.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-full py-4 px-6 rounded-2xl bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] hover:opacity-90 font-bold text-base transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Book Architecture Review</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="w-full py-4 px-6 rounded-2xl bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 text-[#003D3F] dark:text-white border border-[#003D3F]/20 dark:border-white/20 font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>View Engineering Pricing</span>
              </Link>
            </div>
          </CardReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: FAQ SECTION (WITH SCHEMA SUPPORT & ACCORDION)
          ===================================================================== */}
      <section className="w-full relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#00595C] dark:text-[#FFC050]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <TextReveal
              text="Knowledge Hub & Technical Resource FAQs"
              className="text-2xl sm:text-4xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mt-2 justify-center"
              tag="h2"
            />
          </div>

          <div className="flex flex-col gap-4">
            {resourcesFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <CardReveal
                  key={idx}
                  delay={idx * 0.1}
                  className="w-full bg-white/80 dark:bg-[#001618]/80 backdrop-blur-xl rounded-2xl border border-[#003D3F]/15 dark:border-white/15 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-base sm:text-lg text-[#003D3F] dark:text-white hover:text-[#00595C] dark:hover:text-[#FFC050] transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FFC050] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#003D3F]/85 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] border-t border-[#003D3F]/10 dark:border-white/10 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </CardReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: BOTTOM CTA BAND
          ===================================================================== */}
      <section className="w-full relative py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <CardReveal
            delay={0.1}
            className="w-full bg-gradient-to-r from-[#003D3F] via-[#00595C] to-[#003D3F] rounded-3xl p-8 sm:p-14 border border-[#FFC050]/40 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#FFC050]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="px-3.5 py-1 rounded-full bg-[#FFC050]/20 text-[#FFC050] border border-[#FFC050]/40 text-xs font-extrabold uppercase tracking-wider mb-4">
                Architecture Pod • Uvicon Technologies
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-heading-main)] leading-tight max-w-3xl">
                Ready to Architect Your Next Enterprise System?
              </h2>
              <p className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed mt-3 max-w-2xl">
                Book a 2-Week Architecture & Interactive Figma Prototype sprint with our senior engineering team in India.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <Link
                  href="/contact"
                  className="py-4 px-8 rounded-2xl bg-[#FFC050] text-[#002829] hover:bg-[#F0C685] font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Book Architecture Discovery</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="py-4 px-8 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Explore All Services</span>
                </Link>
              </div>
            </div>
          </CardReveal>
        </div>
      </section>
    </main>
  );
}
