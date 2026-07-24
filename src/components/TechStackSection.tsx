"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Layers, Cpu, Code2, Paintbrush, ShieldCheck, X, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface TechDetails {
    name: string;
    category: string;
    desc: string;
    icon: string;
    overview: string;
    uviconUsage: string;
    highlights: string[];
    seoKeywords: string[];
}

interface HoverModalState {
    tech: TechDetails;
    cardX: number;
    cardY: number;
    modalX: number;
    modalY: number;
    anchorX: number;
    anchorY: number;
}

export default function TechStackSection() {
    const [activeTab, setActiveTab] = useState("all");
    const [hoverState, setHoverState] = useState<HoverModalState | null>(null);
    const [selectedTechMobile, setSelectedTechMobile] = useState<TechDetails | null>(null);

    // Full 22 Technologies with Deep SEO / GEO Rich Descriptions & Implementation Details
    const techItemsRow1: TechDetails[] = [
        {
            name: "React",
            category: "frontend",
            desc: "Component UI Library",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
            overview: "Declarative, component-based JavaScript library for building high-performance reactive web interfaces.",
            uviconUsage: "Uvicon Technologies crafts modular, re-usable React component architectures powered by state management libraries like Zustand and Redux Toolkit to deliver fluid web experiences.",
            highlights: ["Declarative Virtual DOM Architecture", "Reusable Micro-Frontend Components", "Optimized State & Hook Pipelines"],
            seoKeywords: ["React Development Agency", "Uvicon React Experts", "Custom React UI Components"]
        },
        {
            name: "Next.js",
            category: "frontend",
            desc: "Fullstack React Framework",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
            overview: "Enterprise React framework delivering Server-Side Rendering (SSR), App Router, Edge API routes, and automated image optimization.",
            uviconUsage: "We build hyper-fast, SEO-optimized SaaS platforms and enterprise portals with Next.js App Router, achieving 99+ Lighthouse scores and sub-second page loads.",
            highlights: ["Server-Side Rendering (SSR) & SSG", "Zero-Config Edge API Routes", "Automatic Code Splitting & SEO Optimization"],
            seoKeywords: ["Next.js Enterprise Developers", "Uvicon Next.js SSR Agency", "Next.js App Router Experts"]
        },
        {
            name: "TypeScript",
            category: "frontend",
            desc: "Typed JavaScript",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
            overview: "Strongly typed programming language that extends JavaScript by adding static type definitions.",
            uviconUsage: "100% of Uvicon Technologies codebases use strict TypeScript to eliminate runtime bugs, accelerate refactoring, and guarantee type-safe API contracts across client and server.",
            highlights: ["Static Type Safety & Inference", "Self-Documenting Codebase Architecture", "Zero Runtime Type Crashes"],
            seoKeywords: ["TypeScript Fullstack Development", "Type-Safe Web Applications", "Uvicon TypeScript Engineers"]
        },
        {
            name: "Tailwind CSS",
            category: "frontend",
            desc: "Utility-First CSS",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
            overview: "Utility-first CSS framework designed for rapid, highly customizable visual component styling.",
            uviconUsage: "Our design team uses Tailwind CSS to implement custom design systems, glassmorphism visual effects, and fluid responsive layouts without stylesheet bloat.",
            highlights: ["JIT Compiler & Minimal CSS Footprint", "Responsive & Theme-Driven Design System", "Custom Micro-Animations & Glassmorphism"],
            seoKeywords: ["Tailwind CSS UI Design", "Modern Web Aesthetics", "Uvicon Frontend Styling"]
        },
        {
            name: "Angular",
            category: "frontend",
            desc: "Enterprise Web Apps",
            icon: "/assets/icons/angular.js.png",
            overview: "Google-backed opinionated TypeScript web framework engineered for enterprise-grade single-page applications.",
            uviconUsage: "Uvicon leverages Angular for mission-critical enterprise dashboards, banking software, and complex internal platforms requiring strict architectural standards.",
            highlights: ["RxJS Reactive Data Streams", "Built-In Dependency Injection", "Strict MVVM Enterprise Pattern"],
            seoKeywords: ["Enterprise Angular Development", "Angular Single Page Apps", "Uvicon Angular Agency"]
        },
        {
            name: "Python",
            category: "backend",
            desc: "AI & Machine Learning",
            icon: "/assets/icons/python.png",
            overview: "High-level, versatile programming language powering AI, Large Language Models (LLMs), and data science.",
            uviconUsage: "We build custom LLM agent workflows, Retrieval-Augmented Generation (RAG) pipelines, predictive data engines, and high-speed FastAPI backends with Python.",
            highlights: ["Custom LLM & AI Agent Pipelines", "PyTorch & TensorFlow Model Integration", "High-Performance FastAPI Microservices"],
            seoKeywords: ["Python AI Engineering", "Custom LLM & RAG Solutions", "Uvicon Python Backend Services"]
        },
        {
            name: "Node.js",
            category: "backend",
            desc: "Backend API Engine",
            icon: "/assets/icons/node-js.png",
            overview: "Asynchronous, event-driven JavaScript runtime built on Chrome's V8 engine for scalable network backends.",
            uviconUsage: "Uvicon engineers high-throughput Node.js microservices, WebSocket realtime chat/notification servers, and RESTful API gateways handling millions of requests.",
            highlights: ["Non-Blocking Event Loop Architecture", "Realtime WebSockets & Streaming APIs", "High-Concurrency Scalable Microservices"],
            seoKeywords: ["Node.js API Development", "Realtime Backend Engineering", "Uvicon Node.js Microservices"]
        },
        {
            name: "MongoDB",
            category: "backend",
            desc: "NoSQL Database",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
            overview: "Leading document-oriented NoSQL database offering high scalability, flexible JSON schemas, and horizontal sharding.",
            uviconUsage: "We architect MongoDB Atlas clusters for real-time application analytics, dynamic user profiles, and rapid-iteration cloud applications.",
            highlights: ["Flexible BSON Document Storage", "Horizontal Sharded Auto-Scaling", "MongoDB Atlas Enterprise Cloud Security"],
            seoKeywords: ["MongoDB NoSQL Architecture", "Cloud Database Integration", "Uvicon MongoDB Solutions"]
        },
        {
            name: "Firebase",
            category: "backend",
            desc: "BaaS & Realtime DB",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
            overview: "Google's comprehensive Backend-as-a-Service platform featuring real-time databases, authentication, and cloud functions.",
            uviconUsage: "We integrate Cloud Firestore, Firebase Auth, App Hosting, and serverless Cloud Functions for rapid startup MVP launches and real-time app sync.",
            highlights: ["Instant Real-time Data Syncing", "Serverless Cloud Functions Automation", "Enterprise Multi-Factor Authentication"],
            seoKeywords: ["Firebase Cloud Development", "Serverless Backend Solutions", "Uvicon Firebase Specialists"]
        },
        {
            name: "PostgreSQL",
            category: "backend",
            desc: "Relational Database",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
            overview: "Advanced, open-source object-relational SQL database known for reliability, data integrity, and complex queries.",
            uviconUsage: "We design ACID-compliant relational schemas, complex database migrations, and pgvector embeddings for secure transactional and AI applications.",
            highlights: ["ACID-Compliant Transaction Security", "pgVector Support for AI Embeddings", "Advanced Indexing & Complex Joins"],
            seoKeywords: ["PostgreSQL Database Design", "Relational Database Engineering", "Uvicon SQL Experts"]
        },
        {
            name: "Docker",
            category: "devops",
            desc: "Containerization",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
            overview: "Containerization platform that packages applications and dependencies into isolated lightweight containers.",
            uviconUsage: "Uvicon containerizes all client software to guarantee 100% environment parity between local developer machines, staging, and production servers.",
            highlights: ["Container-Level Application Isolation", "Multi-Stage Lightweight Production Builds", "Environment Parity Across Staging & Cloud"],
            seoKeywords: ["Docker Containerization Services", "DevOps Container Infrastructure", "Uvicon Docker Deployment"]
        }
    ];

    const techItemsRow2: TechDetails[] = [
        {
            name: "Figma",
            category: "design",
            desc: "UI/UX & Prototyping",
            icon: "/assets/icons/figma.png",
            overview: "Collaborative, web-based UI/UX vector design and interactive prototyping application.",
            uviconUsage: "Our product design team creates wireframes, high-fidelity UI components, interactive prototypes, and developer handoff specs in Figma.",
            highlights: ["High-Fidelity Interactive Prototyping", "Design System & Component Token Kits", "Seamless Developer Handoff Specs"],
            seoKeywords: ["Figma UI UX Design Agency", "Custom Web Prototyping", "Uvicon Product Design"]
        },
        {
            name: "Photoshop",
            category: "design",
            desc: "Graphic & Asset Design",
            icon: "/assets/icons/photoshop.png",
            overview: "Industry-standard raster image editor for professional digital art, photo manipulation, and web graphics.",
            uviconUsage: "We craft custom marketing visuals, hero section visual textures, and digital branding assets optimized for high-density screens.",
            highlights: ["High-Resolution Image Processing", "Custom Texture & Branding Composition", "Optimized WebP & AVIF Asset Output"],
            seoKeywords: ["Digital Graphic Design", "Brand Visual Assets", "Uvicon Photoshop Design"]
        },
        {
            name: "Illustrator",
            category: "design",
            desc: "Vector Art & Branding",
            icon: "/assets/icons/illustrator.png",
            overview: "Vector graphics software for designing scalable logos, iconography, and complex digital illustrations.",
            uviconUsage: "We design scalable SVG icons, custom mascot illustrations, and vector brand collateral that render sharply on Retina 4K displays.",
            highlights: ["Infinite Resolution Vector Art", "Custom SVG Iconography & Logos", "Retina-Ready Brand Visuals"],
            seoKeywords: ["Vector Illustration Agency", "Custom SVG Icon Design", "Uvicon Branding Services"]
        },
        {
            name: "Swift",
            category: "mobile",
            desc: "Native iOS Apps",
            icon: "/assets/icons/swift.png",
            overview: "Apple's powerful native programming language built for iOS, iPadOS, macOS, and watchOS applications.",
            uviconUsage: "Uvicon builds high-performance, native iOS applications using SwiftUI, async/await concurrency, and native Apple hardware APIs.",
            highlights: ["Native Apple Hardware Performance", "Declarative SwiftUI Component Design", "Seamless iOS Ecosystem Integration"],
            seoKeywords: ["Swift iOS App Development", "Native iPhone App Agency", "Uvicon Swift Developers"]
        },
        {
            name: "Kotlin",
            category: "mobile",
            desc: "Android Development",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",
            overview: "Modern, concise static programming language officially endorsed by Google for Android app creation.",
            uviconUsage: "We engineer native Android mobile applications with Kotlin Jetpack Compose, Coroutines for smooth async work, and Material 3 design.",
            highlights: ["Declarative Jetpack Compose UI", "Coroutines Async Thread Management", "Google Android Native API Integration"],
            seoKeywords: ["Kotlin Android Development", "Native Mobile App Company", "Uvicon Kotlin Engineers"]
        },
        {
            name: "Flutter",
            category: "mobile",
            desc: "Cross-Platform Apps",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
            overview: "Google's open-source multi-platform UI framework for building natively compiled mobile, web, and desktop apps from a single codebase.",
            uviconUsage: "We build cross-platform mobile apps for iOS and Android from a unified Dart codebase, slashing dev time while maintaining native 60fps performance.",
            highlights: ["Single Codebase for iOS & Android", "Native 60fps Skia/Impeller Rendering", "Accelerated Time-to-Market MVP Launch"],
            seoKeywords: ["Flutter Cross-Platform Development", "iOS & Android App Company", "Uvicon Flutter Agency"]
        },
        {
            name: "Java",
            category: "mobile",
            desc: "Enterprise & Android",
            icon: "/assets/icons/java-logo.png",
            overview: "Time-tested object-oriented programming language for high-volume enterprise backends and Android systems.",
            uviconUsage: "Uvicon builds enterprise Spring Boot microservices, high-frequency transaction engines, and legacy enterprise software integrations in Java.",
            highlights: ["Spring Boot Enterprise Architecture", "High-Volume Transaction Security", "Legacy Systems & Microservices Integration"],
            seoKeywords: ["Java Enterprise Solutions", "Spring Boot Backend Development", "Uvicon Java Engineers"]
        },
        {
            name: "GitHub",
            category: "devops",
            desc: "Version Control & CI/CD",
            icon: "/assets/icons/github.png",
            overview: "Developer platform for Git version control, pull request code reviews, and automated CI/CD workflows.",
            uviconUsage: "We manage source code with strict branch protection rules, automated lint testing via GitHub Actions, and release tag deployments.",
            highlights: ["Automated GitHub Actions CI/CD Pipelines", "Strict Pull Request & Code Review Governance", "Automated Security & Vulnerability Scanning"],
            seoKeywords: ["GitHub CI CD Automation", "DevOps Release Pipelines", "Uvicon DevOps Services"]
        },
        {
            name: "Kubernetes",
            category: "devops",
            desc: "Container Orchestration",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg",
            overview: "Open-source system for automating deployment, scaling, and management of containerized applications.",
            uviconUsage: "Uvicon orchestrates cloud environments with auto-scaling pods, load balancing, self-healing containers, and zero-downtime rolling updates.",
            highlights: ["Horizontal Pod Auto-Scaling", "Self-Healing Container Clusters", "Zero-Downtime Rolling Production Updates"],
            seoKeywords: ["Kubernetes Cloud Orchestration", "DevOps Cluster Management", "Uvicon Kubernetes Agency"]
        },
        {
            name: "AWS",
            category: "devops",
            desc: "Cloud Infrastructure",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
            overview: "Comprehensive cloud computing platform offering elastic compute, serverless Lambda, S3, and global CDN infrastructure.",
            uviconUsage: "We architect cloud infrastructure on AWS utilizing EC2, S3, Lambda serverless functions, CloudFront CDN, and RDS databases.",
            highlights: ["Serverless Cloud Architecture (Lambda)", "Global Low-Latency CloudFront CDN", "High-Availability 99.99% Uptime Deployment"],
            seoKeywords: ["AWS Cloud Architecture", "Serverless Infrastructure Solutions", "Uvicon AWS Cloud Agency"]
        },
        {
            name: "GraphQL",
            category: "backend",
            desc: "API Query Language",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
            overview: "Data query and manipulation language for APIs that empowers clients to request exactly the data required.",
            uviconUsage: "We build Apollo GraphQL API gateways that aggregate multiple backend services into a single typed schema, preventing over-fetching on mobile.",
            highlights: ["Exact Client-Driven Data Queries", "Strongly-Typed Schema Contracts", "Single Aggregated API Gateway Endpoint"],
            seoKeywords: ["GraphQL API Engineering", "Apollo Server Development", "Uvicon GraphQL Specialists"]
        }
    ];

    const allTechList = [...techItemsRow1, ...techItemsRow2];

    const categories = [
        { id: "all", label: "All Stack", icon: Layers },
        { id: "frontend", label: "Frontend & Web", icon: Code2 },
        { id: "backend", label: "Backend & AI", icon: Cpu },
        { id: "design", label: "UI/UX & Design", icon: Paintbrush },
        { id: "devops", label: "Mobile & DevOps", icon: ShieldCheck },
    ];

    const filterItem = (item: TechDetails) => {
        if (activeTab === "all") return true;
        if (activeTab === "devops") return item.category === "devops" || item.category === "mobile";
        return item.category === activeTab;
    };

    const createSeamlessMarquee = <T,>(items: T[]): T[] => {
        if (items.length === 0) return [];
        let base: T[] = [];
        while (base.length < 20) {
            base = [...base, ...items];
        }
        return [...base, ...base];
    };

    const row1Filtered = techItemsRow1.filter(filterItem);
    const row2Filtered = techItemsRow2.filter(filterItem);

    const marqueeRow1 = createSeamlessMarquee(row1Filtered);
    const marqueeRow2 = createSeamlessMarquee(row2Filtered);

    // Smart Hover Card Position & Exact Card Border Edge Calculation
    const handleCardMouseEnter = (tech: TechDetails, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Account for hover:scale-105 expansion so line touches outer border edge perfectly
        const scaledHalfW = (rect.width * 1.05) / 2;
        const scaledHalfH = (rect.height * 1.05) / 2;

        const isLeftHalf = cardCenterX < viewportW / 2;
        const isTopHalf = cardCenterY < viewportH / 2;

        const modalW = Math.min(360, viewportW - 40);
        const modalH = 340;

        // Position modal intelligently based on card position in viewport
        let targetX = isLeftHalf ? cardCenterX + scaledHalfW + 60 : cardCenterX - scaledHalfW - modalW - 60;
        let targetY = isTopHalf ? cardCenterY + scaledHalfH + 20 : cardCenterY - scaledHalfH - modalH - 20;

        // Clamp inside viewport boundaries
        targetX = Math.max(20, Math.min(targetX, viewportW - modalW - 20));
        targetY = Math.max(20, Math.min(targetY, viewportH - modalH - 20));

        // Connect from EXACT CARD BORDER EDGE (scaled) to MODAL BORDER EDGE
        let cardStartX = cardCenterX;
        let cardStartY = cardCenterY;
        let modalAnchorX = targetX + modalW / 2;
        let modalAnchorY = targetY + modalH / 2;

        if (targetX >= cardCenterX) {
            // Modal is on the RIGHT of card -> Start from Card's RIGHT BORDER, connect to Modal's LEFT BORDER
            cardStartX = cardCenterX + scaledHalfW;
            cardStartY = cardCenterY;

            modalAnchorX = targetX;
            modalAnchorY = Math.max(targetY + 25, Math.min(cardCenterY, targetY + modalH - 25));
        } else {
            // Modal is on the LEFT of card -> Start from Card's LEFT BORDER, connect to Modal's RIGHT BORDER
            cardStartX = cardCenterX - scaledHalfW;
            cardStartY = cardCenterY;

            modalAnchorX = targetX + modalW;
            modalAnchorY = Math.max(targetY + 25, Math.min(cardCenterY, targetY + modalH - 25));
        }

        setHoverState({
            tech,
            cardX: cardStartX,
            cardY: cardStartY,
            modalX: targetX,
            modalY: targetY,
            anchorX: modalAnchorX,
            anchorY: modalAnchorY
        });
    };

    const handleCardMouseLeave = () => {
        setHoverState(null);
    };

    // Close mobile modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setHoverState(null);
                setSelectedTechMobile(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // SVG Curved Path Generator (Border-to-Border Bezier line in Active Card #FFC050 Border Color)
    const renderConnectionLine = () => {
        if (!hoverState) return null;
        const { cardX, cardY, anchorX, anchorY } = hoverState;

        // Control points for smooth organic S-curve / Bezier curve from Card Border to Modal Border
        const dx = anchorX - cardX;
        const controlX1 = cardX + dx * 0.5;
        const controlY1 = cardY;
        const controlX2 = cardX + dx * 0.5;
        const controlY2 = anchorY;

        const pathData = `M ${cardX} ${cardY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${anchorX} ${anchorY}`;

        return (
            <svg className="fixed inset-0 pointer-events-none z-40 w-full h-full">
                <defs>
                    <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFC050" stopOpacity="1" />
                        <stop offset="50%" stopColor="#FFD580" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#FFC050" stopOpacity="1" />
                    </linearGradient>
                    <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Outer Glow Path matching Active Card Border Glow */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="#FFC050"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    filter="url(#glowEffect)"
                />

                {/* Main Active Border Color Solid Line (#FFC050) */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="url(#connectorGradient)"
                    strokeWidth="1.1"
                />

                {/* Subtle border touch point node */}
                <circle cx={cardX} cy={cardY} r="2.5" fill="#FFC050" />
                <circle cx={anchorX} cy={anchorY} r="2.5" fill="#FFC050" />
            </svg>
        );
    };

    return (
        <section className="w-full relative pt-2 sm:pt-4 pb-12 sm:pb-16 px-5 sm:px-10 lg:px-16 font-[family-name:var(--font-body)] transition-colors duration-500" style={{ overflowX: 'clip', overflowY: 'visible' }}>
            {/* Inline Style Keyframes for Smooth Marquee */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marqueeLeft {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee-left {
                    display: flex;
                    width: max-content;
                    animation: marqueeLeft 42s linear infinite;
                }
                .animate-marquee-right {
                    display: flex;
                    width: max-content;
                    animation: marqueeRight 42s linear infinite;
                }
                .animate-marquee-left:hover, .animate-marquee-right:hover {
                    animation-play-state: paused;
                }
            `}} />

            {/* Hidden Crawlable Semantic Microdata for Google/AI Crawlers (SEO & GEO Optimization) */}
            <div className="hidden sr-only" aria-hidden="true">
                {allTechList.map((t, idx) => (
                    <article key={`seo-crawl-${idx}`} itemScope itemType="https://schema.org/SoftwareApplication">
                        <h3 itemProp="name">{t.name} Development at Uvicon Technologies</h3>
                        <p itemProp="description">{t.overview} {t.uviconUsage}</p>
                        <ul>
                            {t.highlights.map((h, hIdx) => (
                                <li key={`seo-h-${hIdx}`}>{h}</li>
                            ))}
                        </ul>
                        <span itemProp="keywords">{t.seoKeywords.join(", ")}</span>
                    </article>
                ))}
            </div>

            {/* SVG Curved Connector Line */}
            {renderConnectionLine()}

            {/* Giant Hero-Style Left Ambient Gradient Glow */}
            <div
                className="absolute top-1/2 -left-20 sm:-left-36 -translate-y-1/2 w-[650px] sm:w-[1000px] lg:w-[1300px] h-[650px] sm:h-[950px] lg:h-[1150px] pointer-events-none rounded-full blur-[130px] opacity-80 dark:opacity-95 z-0"
                style={{
                    background: "radial-gradient(circle at 10% 50%, rgba(0, 215, 200, 0.5) 0%, rgba(0, 140, 130, 0.25) 40%, transparent 75%)"
                }}
            />

            {/* 3D Glass Bolt Accent (uvicon-bolt-4.webp) */}
            <div className="absolute top-[4%] -right-12 sm:-right-20 lg:-right-24 w-52 sm:w-72 lg:w-[20rem] opacity-45 dark:opacity-70 drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] pointer-events-none z-0">
                <Image
                    src="/assets/icons/uvicon-bolt-4.webp"
                    alt="3D Glass Accent"
                    width={320}
                    height={320}
                    className="w-full h-auto object-contain transform rotate-12"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-end">

                {/* Section Header with DEVELOPMENT Watermark - Right Aligned */}
                <div className="relative text-right w-full max-w-7xl mb-4 sm:mb-5 flex flex-col items-end justify-end">

                    {/* Watermark and H2 Wrapper */}
                    <div className="relative w-full flex justify-end items-center">
                        {/* Big Hollow Outlined Text Watermark (DEVELOPMENT) */}
                        <span
                            className="absolute top-1/2 right-0 -translate-y-1/2 text-[44px] sm:text-[100px] lg:text-[140px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-80"
                        >
                            DEVELOPMENT
                        </span>

                        {/* Main Heading (TOOLS THAT WE USE) */}
                        <h2 className="text-[24px] sm:text-[38px] lg:text-[48px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight uppercase tracking-wider text-right">
                            TOOLS THAT WE USE
                        </h2>
                    </div>

                    {/* Subtitle Paragraph - Right Aligned */}
                    <p className="text-[#003D3F]/85 dark:text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl text-right font-medium mt-1.5 relative z-10 font-[family-name:var(--font-body)]">
                        We harness cutting-edge design tools, AI models, frontend frameworks, and cloud architectures to build production-ready digital products.
                    </p>
                </div>

                {/* Category Filter Pills - Right Aligned (3 top + 2 bottom on Mobile) */}
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap items-end justify-end gap-2 sm:gap-3 mb-4 sm:mb-5 relative z-10 max-w-7xl">
                    {/* Mobile Row 1 (3 Buttons) / Desktop inline */}
                    <div className="flex items-center justify-end gap-2 sm:gap-3 flex-wrap">
                        {categories.slice(0, 3).map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-xl ${isActive
                                        ? "bg-[#00595C]/15 dark:bg-white/15 text-[#00595C] dark:text-[#FFC050] border-2 border-[#00595C]/40 dark:border-[#FFC050]/50 shadow-md scale-105"
                                        : "bg-transparent text-[#003D3F]/75 dark:text-white/75 hover:bg-white/10 dark:hover:bg-white/10 border border-white/40 dark:border-white/15"
                                        }`}
                                >
                                    <CatIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-[#00595C] dark:text-[#FFC050]" : "text-[#003D3F]/60 dark:text-white/60"}`} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile Row 2 (2 Buttons) / Desktop inline */}
                    <div className="flex items-center justify-end gap-2 sm:gap-3 flex-wrap">
                        {categories.slice(3, 5).map((cat) => {
                            const CatIcon = cat.icon;
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-xl ${isActive
                                        ? "bg-[#00595C]/15 dark:bg-white/15 text-[#00595C] dark:text-[#FFC050] border-2 border-[#00595C]/40 dark:border-[#FFC050]/50 shadow-md scale-105"
                                        : "bg-transparent text-[#003D3F]/75 dark:text-white/75 hover:bg-white/10 dark:hover:bg-white/10 border border-white/40 dark:border-white/15"
                                        }`}
                                >
                                    <CatIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-[#00595C] dark:text-[#FFC050]" : "text-[#003D3F]/60 dark:text-white/60"}`} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Marquee Wrapper — Section-level overflowX:clip handles horizontal clipping */}
                <div className="w-full relative py-1 z-10">

                    {/* Marquee Row 1 (Left Slide) */}
                    <div className="mb-1 py-3">
                        <div className="animate-marquee-left flex gap-4 sm:gap-6 items-center">
                            {marqueeRow1.map((tech, idx) => (
                                <div
                                    key={`row1-${idx}`}
                                    onMouseEnter={(e) => handleCardMouseEnter(tech, e)}
                                    onMouseLeave={handleCardMouseLeave}
                                    onClick={() => setSelectedTechMobile(tech)}
                                    className="flex-shrink-0 flex items-center gap-3.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white/70 dark:bg-white/8 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:scale-105 hover:border-[#FFC050] dark:hover:border-[#FFC050] hover:shadow-[0_12px_35px_rgba(255,192,80,0.35)] transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#002829] p-1.5 sm:p-2 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0 text-left">
                                        <span className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white leading-tight font-[family-name:var(--font-heading-section)] flex items-center gap-1.5">
                                            {tech.name}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-[#003D3F]/70 dark:text-white/70 font-medium whitespace-nowrap mt-0.5">
                                            {tech.desc}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Marquee Row 2 (Right Slide) */}
                    <div className="py-3">
                        <div className="animate-marquee-right flex gap-4 sm:gap-6 items-center">
                            {marqueeRow2.map((tech, idx) => (
                                <div
                                    key={`row2-${idx}`}
                                    onMouseEnter={(e) => handleCardMouseEnter(tech, e)}
                                    onMouseLeave={handleCardMouseLeave}
                                    onClick={() => setSelectedTechMobile(tech)}
                                    className="flex-shrink-0 flex items-center gap-3.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white/70 dark:bg-white/8 backdrop-blur-xl border border-black/10 dark:border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:scale-105 hover:border-[#FFC050] dark:hover:border-[#FFC050] hover:shadow-[0_12px_35px_rgba(255,192,80,0.35)] transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-[#002829] p-1.5 sm:p-2 border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0 text-left">
                                        <span className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white leading-tight font-[family-name:var(--font-heading-section)] flex items-center gap-1.5">
                                            {tech.name}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-[#003D3F]/70 dark:text-white/70 font-medium whitespace-nowrap mt-0.5">
                                            {tech.desc}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* Desktop Hover Floating Modal (Ultra-Transparent High-End Glassmorphism) */}
            {hoverState && (
                <div
                    className="fixed z-50 pointer-events-auto hidden md:flex flex-col gap-4 bg-white/10 dark:bg-[#00181A]/20 backdrop-blur-xl backdrop-saturate-[180%] rounded-2xl border border-white/30 dark:border-white/15 border-t-white/60 dark:border-t-[#FFC050]/50 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left w-[360px] transform transition-all duration-200 animate-in fade-in zoom-in-95"
                    style={{
                        left: `${hoverState.modalX}px`,
                        top: `${hoverState.modalY}px`
                    }}
                    onMouseEnter={() => setHoverState(hoverState)}
                    onMouseLeave={handleCardMouseLeave}
                >
                    {/* Dynamic JSON-LD Structured Data for Hovered Card */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "SoftwareApplication",
                                "name": `${hoverState.tech.name} Enterprise Solutions by Uvicon Technologies`,
                                "applicationCategory": "DeveloperApplication",
                                "operatingSystem": "All",
                                "description": `${hoverState.tech.overview} ${hoverState.tech.uviconUsage}`,
                                "publisher": {
                                    "@type": "Organization",
                                    "name": "Uvicon Technologies",
                                    "url": "https://uvicontechnologies.com"
                                },
                                "keywords": hoverState.tech.seoKeywords.join(", ")
                            })
                        }}
                    />

                    {/* Popover Header */}
                    <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-3">
                        <div className="w-11 h-11 rounded-xl bg-white/80 dark:bg-[#00383A]/80 backdrop-blur-md p-2 border border-black/10 dark:border-white/15 flex items-center justify-center shrink-0 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={hoverState.tech.icon}
                                alt={hoverState.tech.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] truncate">
                                    {hoverState.tech.name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#00595C]/20 dark:bg-[#FFC050]/20 text-[#00595C] dark:text-[#FFC050] border border-[#00595C]/30 dark:border-[#FFC050]/40 shrink-0">
                                    {hoverState.tech.category}
                                </span>
                            </div>
                            <span className="text-xs text-[#003D3F]/75 dark:text-white/70 font-medium truncate mt-0.5">
                                {hoverState.tech.desc}
                            </span>
                        </div>
                    </div>

                    {/* Overview & Uvicon Usage */}
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 bg-[#00595C]/15 dark:bg-white/10 backdrop-blur-md p-3 rounded-xl border border-black/5 dark:border-white/10">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Overview
                            </span>
                            <p className="text-xs leading-relaxed text-[#003D3F]/90 dark:text-white/90 font-medium line-clamp-3">
                                {hoverState.tech.overview}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#003D3F] dark:text-white/80">
                                How Uvicon Uses {hoverState.tech.name}
                            </span>
                            <p className="text-xs leading-relaxed text-[#003D3F]/80 dark:text-white/80 line-clamp-3">
                                {hoverState.tech.uviconUsage}
                            </p>
                        </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="flex flex-col gap-1.5 pt-1">
                        {hoverState.tech.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#003D3F]/85 dark:text-white/85">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00595C] dark:text-[#FFC050] shrink-0" />
                                <span className="truncate">{h}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile / Tap Full Screen Modal Overlay (Ultra-Transparent Glassmorphism) */}
            {selectedTechMobile && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm md:hidden transition-all animate-in fade-in"
                    onClick={() => setSelectedTechMobile(null)}
                >
                    <div
                        className="relative w-full max-w-sm bg-white/35 dark:bg-[#002829]/45 backdrop-blur-2xl backdrop-saturate-[200%] rounded-3xl border border-white/40 dark:border-white/20 border-t-white/70 dark:border-t-[#FFC050]/60 p-6 shadow-2xl flex flex-col gap-4 text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedTechMobile(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/10 text-gray-700 dark:text-white/80"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/80 dark:bg-[#00383A]/80 backdrop-blur-md p-2 border border-black/10 dark:border-white/15 flex items-center justify-center shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={selectedTechMobile.icon} alt={selectedTechMobile.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold text-[#003D3F] dark:text-white">{selectedTechMobile.name}</h3>
                                <span className="text-xs text-[#003D3F]/70 dark:text-white/70">{selectedTechMobile.desc}</span>
                            </div>
                        </div>

                        <div className="bg-[#00595C]/15 dark:bg-white/10 backdrop-blur-md p-3 rounded-xl border border-black/5 dark:border-white/10 text-xs leading-relaxed text-[#003D3F]/90 dark:text-white/90">
                            {selectedTechMobile.overview}
                        </div>

                        <div className="text-xs leading-relaxed text-[#003D3F]/80 dark:text-white/80">
                            {selectedTechMobile.uviconUsage}
                        </div>

                        <button
                            onClick={() => setSelectedTechMobile(null)}
                            className="w-full py-2.5 rounded-full bg-[#00595C] dark:bg-[#FFC050] text-white dark:text-[#02181A] text-xs font-bold shadow-md"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
