"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2, Zap, Shield, Activity, Layers } from "lucide-react";

interface Project {
    id: string;
    category: string;
    filterTag: string;
    title: string;
    description: string;
    icon: string;
    image: string;
    badge: string;
    metrics: string[];
    techStack: string[];
    link: string;
}

const projects: Project[] = [
    {
        id: "uvicon-connect",
        category: "CRM & Enterprise SaaS",
        filterTag: "crm",
        title: "Uvicon Connect — Intelligent Lead & Sales CRM",
        description: "An all-in-one Customer Relationship Management platform built for automated lead distribution, sales pipeline tracking, real-time client analytics, and team productivity.",
        icon: "https://pthobbphhnbsqsfslhrm.supabase.co/storage/v1/object/public/marketplace/icons/1780722206492-r38scv0.png",
        image: "/assets/images/uvicon-connect-preview.png",
        badge: "Featured CRM Tool",
        metrics: ["10k+ Leads Managed", "Real-Time Kanban Pipelines", "99.9% Cloud Uptime"],
        techStack: ["React", "Node.js", "PostgreSQL", "WebSockets"],
        link: "/softwares"
    },
    {
        id: "uvicon-pro",
        category: "Fintech & Algo Trading",
        filterTag: "algo",
        title: "Uvicon Pro — Algo Software & Strategy Tester",
        description: "Institutional-grade algorithmic trading software and backtesting engine for quantitative traders, featuring automated multi-broker execution and low-latency risk management.",
        icon: "https://pthobbphhnbsqsfslhrm.supabase.co/storage/v1/object/public/marketplace/icons/1780660337964-et9ae1w.png",
        image: "/assets/images/uvicon-pro-preview.png",
        badge: "Algo & Backtesting",
        metrics: ["< 0.1ms Execution Latency", "Multi-Broker Integration", "Backtest Strategy Engine"],
        techStack: ["Python", "React", "C++", "Redis", "WebSockets"],
        link: "/softwares"
    },
    {
        id: "uhmb-services",
        category: "Healthcare & Web Platform",
        filterTag: "healthcare",
        title: "UHMB Services — Digital Healthcare & Patient Portal",
        description: "A modern healthcare services platform offering online doctor appointments, electronic health records (EHR) management, and virtual telemedicine consultations.",
        icon: "/assets/icons/uhmb-logo.png",
        image: "/assets/images/uhmb-services-preview.png",
        badge: "Healthcare Platform",
        metrics: ["HIPAA Compliant Security", "Instant Doctor Booking", "24/7 Patient Care Portal"],
        techStack: ["Next.js", "Tailwind CSS", "Node.js", "Cloudflare"],
        link: "/websites"
    }
];

export default function FeaturedProjectsSection() {
    const [activeFilter, setActiveFilter] = useState<string>("all");

    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(p => p.filterTag === activeFilter);

    return (
        <section className="w-full relative pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 px-5 sm:px-10 lg:px-16 overflow-hidden font-[family-name:var(--font-body)] transition-colors duration-500">
            
            {/* Watermark Styling */}
            <style dangerouslySetInnerHTML={{ __html: `
                .stroke-watermark-projects {
                    -webkit-text-stroke: 2px rgba(0, 61, 63, 0.14);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-projects {
                        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.12);
                    }
                }
            `}} />

            {/* Ambient Background Accents */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[110px] opacity-30 dark:opacity-50 z-0"
                    style={{
                        background: "radial-gradient(circle, rgba(0, 180, 170, 0.3) 0%, rgba(255, 192, 80, 0.15) 50%, transparent 80%)"
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
                
                {/* Header Container */}
                <div className="relative text-left sm:text-center w-full max-w-5xl mb-10 sm:mb-14 flex flex-col items-start sm:items-center justify-center">
                    
                    {/* Watermark + H2 Wrapper */}
                    <div className="relative w-full flex justify-start sm:justify-center items-center">
                        <span className="absolute top-1/2 left-0 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 text-[44px] sm:text-[110px] lg:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-projects whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0">
                            PORTFOLIO
                        </span>

                        <h2 className="text-[28px] sm:text-[44px] lg:text-[54px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                            Featured Case Studies
                        </h2>
                    </div>

                    {/* Subtitle */}
                    <p className="text-[#003D3F]/85 dark:text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl text-left sm:text-center font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-4 relative z-10">
                        Explore real-world digital ecosystems, algorithmic trading engines, and enterprise web platforms custom built by Uvicon Technologies.
                    </p>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 relative z-10">
                        {[
                            { label: "All Projects", filter: "all" },
                            { label: "CRM & SaaS", filter: "crm" },
                            { label: "Algo Trading", filter: "algo" },
                            { label: "Healthcare Web", filter: "healthcare" }
                        ].map((btn) => (
                            <button
                                key={btn.filter}
                                onClick={() => setActiveFilter(btn.filter)}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-md ${
                                    activeFilter === btn.filter
                                        ? "bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] shadow-md scale-105"
                                        : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/80 dark:text-white/80 hover:bg-[#003D3F]/12 dark:hover:bg-white/15 border border-[#003D3F]/10 dark:border-white/10"
                                }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Projects Showcase Stack */}
                <div className="w-full flex flex-col gap-10 sm:gap-14 lg:gap-16">
                    {filteredProjects.map((project, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div
                                key={project.id}
                                className="w-full bg-white/70 dark:bg-[#002224]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/15 dark:border-white/15 shadow-[0_20px_50px_rgba(0,61,63,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.4)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group relative overflow-hidden transition-all duration-300 hover:border-[#00595C]/40 dark:hover:border-[#FFC050]/40"
                            >
                                
                                {/* Info Side (lg:col-span-6) */}
                                <div className={`flex flex-col items-start justify-center ${isEven ? "order-2 lg:order-1 lg:col-span-6" : "order-2 lg:order-2 lg:col-span-6"}`}>
                                    
                                    {/* App Icon + Badge */}
                                    <div className="flex items-center gap-3.5 mb-4">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white dark:bg-[#003D3F] p-2 shadow-md border border-[#003D3F]/15 dark:border-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                            <Image
                                                src={project.icon}
                                                alt={project.title}
                                                width={48}
                                                height={48}
                                                className="w-full h-full object-contain rounded-xl"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050]">
                                                {project.category}
                                            </span>
                                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30 w-fit mt-0.5">
                                                {project.badge}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl sm:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-[#003D3F]/80 dark:text-white/85 leading-relaxed mt-3 font-[family-name:var(--font-body)]">
                                        {project.description}
                                    </p>

                                    {/* Key Impact Metrics */}
                                    <div className="w-full flex flex-wrap gap-2.5 mt-5">
                                        {project.metrics.map((metric, mIdx) => (
                                            <div
                                                key={mIdx}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F] dark:text-white border border-[#003D3F]/12 dark:border-white/15"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                                <span>{metric}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack Pills */}
                                    <div className="flex items-center gap-2 mt-5 flex-wrap">
                                        <span className="text-xs font-bold text-[#003D3F]/60 dark:text-white/60 mr-1">Stack:</span>
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#00595C]/10 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Button */}
                                    <Link
                                        href={project.link}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-sm tracking-wide transition-all shadow-md hover:scale-105 mt-6 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                    >
                                        <span>Explore Project Details</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>

                                </div>

                                {/* Preview Image Side (lg:col-span-6) */}
                                <div className={`relative w-full h-[260px] sm:h-[340px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 dark:border-white/15 group-hover:shadow-2xl transition-all ${isEven ? "order-1 lg:order-2 lg:col-span-6" : "order-1 lg:order-1 lg:col-span-6"}`}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity pointer-events-none" />
                                    
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                                            <Sparkles className="w-3.5 h-3.5 text-[#FFC050]" />
                                            <span>Production Build</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
