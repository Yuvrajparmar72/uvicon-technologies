"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Code2, Layers, Gamepad2, Bot, ChevronRight, ArrowUpRight } from "lucide-react";

const expertiseTabs = [
    {
        id: "web-dev",
        title: "Web Development",
        cardTitle: "Web Development",
        letter: "W",
        icon: Code2,
        desc: "Our expert team builds responsive, high-performance websites tailored to your business needs using the latest technologies like React, Angular, and Node.js. We focus on speed, security, and scalability.",
        image: "/assets/images/Web-Development.avif",
        href: "/websites"
    },
    {
        id: "software-tools",
        title: "Software Tools",
        cardTitle: "Software Solutions",
        letter: "S",
        icon: Layers,
        desc: "We provide robust software tools and custom applications designed to streamline your operations and enhance productivity. From ERP systems to custom SaaS platforms, we build what you need.",
        image: "/assets/images/Software-tools.avif",
        href: "/softwares"
    },
    {
        id: "game-dev",
        title: "Game Development",
        cardTitle: "Game Development",
        letter: "G",
        icon: Gamepad2,
        desc: "Bring your game ideas to life with our end-to-end game development services. We specialize in 2D and 3D games, multiplayer mechanics, and cross-platform publishing using cutting-edge engines.",
        image: "/assets/images/Game-Development.avif",
        href: "/games"
    },
    {
        id: "ai-agents",
        title: "AI & Agents",
        cardTitle: "AI & Agents",
        letter: "A",
        icon: Bot,
        desc: "Harness the power of Artificial Intelligence with our custom AI agents and workflow automation tools. We create intelligent systems that learn, adapt, and drive business efficiency.",
        image: "/assets/images/Ai-Agents.avif",
        href: "/softwares"
    }
];

export default function CoreExpertiseSection() {
    const [activeTab, setActiveTab] = useState(0);
    const activeItem = expertiseTabs[activeTab];

    return (
        <section
            className="w-full relative pt-8 pb-16 sm:py-24 lg:py-32 px-5 sm:px-10 lg:px-16 overflow-hidden font-[family-name:var(--font-body)] transition-colors duration-500"
        >
            {/* Stroke watermark CSS only — background comes from unified page canvas */}
            <style dangerouslySetInnerHTML={{ __html: `
                .stroke-watermark {
                    -webkit-text-stroke: 2px rgba(0, 61, 63, 0.16);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark {
                        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.14);
                    }
                }
            `}} />

            {/* 3D Glass Bolt Accents (Background) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Bolt behind the left tabs */}
                <div className="absolute top-[35%] -left-8 sm:-left-16 lg:-left-20 w-48 sm:w-64 lg:w-80 opacity-40 dark:opacity-60 drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="Uvicon 3D glass bolt accent"
                        width={320}
                        height={320}
                        className="w-full h-auto object-contain transform -rotate-[35deg]"
                    />
                </div>
                
                {/* Bolt behind the right card */}
                <div className="absolute bottom-[2%] -right-10 sm:-right-16 lg:-right-24 w-52 sm:w-72 lg:w-[22rem] opacity-45 dark:opacity-70 drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-3.webp"
                        alt="Uvicon 3D glass bolt accent"
                        width={352}
                        height={352}
                        className="w-full h-auto object-contain transform rotate-[15deg]"
                    />
                </div>
            </div>

            {/* Subtle Ambient Particle Dots */}
            <div className="absolute inset-0 pointer-events-none opacity-35 dark:opacity-20 z-0">
                <div className="absolute top-[8%] left-[6%] w-2 h-2 rounded-full bg-[#003D3F] dark:bg-white animate-pulse"></div>
                <div className="absolute top-[22%] right-[8%] w-2 h-2 rounded-full bg-[#003D3F] dark:bg-white animate-ping"></div>
                <div className="absolute bottom-[28%] left-[10%] w-2.5 h-2.5 rounded-full bg-[#003D3F] dark:bg-white"></div>
                <div className="absolute bottom-[12%] right-[14%] w-2 h-2 rounded-full bg-[#003D3F] dark:bg-white"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
                {/* Header Container */}
                <div className="relative text-left sm:text-center w-full max-w-5xl mb-8 sm:mb-12 flex flex-col items-start sm:items-center justify-center">
                    
                    {/* Watermark and H2 Wrapper to guarantee perfect vertical alignment */}
                    <div className="relative w-full flex justify-start sm:justify-center items-center">
                        {/* Big Hollow Outlined Text Watermark (Centered exactly behind H2) */}
                        <span
                            className="absolute top-1/2 left-0 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 text-[64px] sm:text-[120px] lg:text-[170px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0"
                        >
                            EXPERTISE
                        </span>

                        {/* Main H2 Heading */}
                        <h2 className="text-[32px] sm:text-[46px] lg:text-[56px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                            Our Core Expertise
                        </h2>
                    </div>

                    {/* Subtitle Quote Paragraph */}
                    <p className="text-[#003D3F]/85 dark:text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-4xl mx-0 sm:mx-auto text-left sm:text-center font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-4 relative z-10">
                        &ldquo;Your vision, engineered to perfection. Our specialized teams work in sync to deliver secure, high-performance, and user-centric solutions tailored to meet the complex demands of the modern digital landscape.&rdquo;
                    </p>
                </div>

                {/* Mobile / Tablet (< lg): Top Horizontal Scrollable Pill Tabs */}
                <div className="w-full lg:hidden flex gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-6">
                    {expertiseTabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === index;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(index)}
                                className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all focus:outline-none backdrop-blur-xl ${
                                    isActive
                                        ? "bg-transparent text-[#00595C] dark:text-white shadow-md border border-[#00595C]/30 dark:border-white/20"
                                        : "bg-transparent text-[#003D3F]/80 dark:text-white/70 hover:bg-white/10 dark:hover:bg-white/10 border border-white/40 dark:border-white/10"
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? "text-[#00595C] dark:text-[#FFC050]" : "text-[#003D3F]/70 dark:text-white/70"}`} />
                                <span className="whitespace-nowrap">{tab.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Layout — Desktop: Left Vertical Sidebar (lg:col-span-3) + Right Content Card (lg:col-span-9) */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Left Column (Desktop Only): Compact Vertical Pill Tabs */}
                    <div className="hidden lg:flex lg:col-span-3 flex-col justify-center gap-3.5">
                        {expertiseTabs.map((tab, index) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === index;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(index)}
                                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl sm:rounded-3xl font-bold text-base transition-all text-left focus:outline-none backdrop-blur-xl ${
                                        isActive
                                            ? "bg-transparent text-[#00595C] dark:text-white shadow-lg translate-x-1.5 border border-[#00595C]/30 dark:border-[#FFC050]/40"
                                            : "bg-transparent text-[#003D3F]/80 dark:text-white/70 hover:bg-white/10 hover:dark:bg-white/10 hover:translate-x-1 border border-white/40 dark:border-white/10"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                                            isActive ? "bg-transparent border border-[#00595C]/20 dark:border-[#FFC050]/30 text-[#00595C] dark:text-[#FFC050]" : "bg-transparent text-[#003D3F]/70 dark:text-white/70"
                                        }`}>
                                            <Icon className="w-4.5 h-4.5" />
                                        </div>
                                        <span className="font-[family-name:var(--font-heading-section)] tracking-wide whitespace-nowrap text-sm sm:text-base">{tab.title}</span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isActive ? "text-[#00595C] dark:text-[#FFC050] translate-x-0.5" : "opacity-0"}`} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Column (lg:col-span-9): Active Card Display with Expanded Card Width & 50/50 Split Image */}
                    <div className="lg:col-span-9 flex">
                        <div className="w-full bg-white dark:bg-[#002224] rounded-3xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[360px] sm:min-h-[400px] transition-all duration-300">
                            
                            {/* Left Info Area (lg:col-span-6) */}
                            <div className="order-2 lg:order-1 lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-start relative z-10">
                                {/* Watermark Initial Letter in Card Background */}
                                <span className="absolute top-1 left-4 text-[130px] sm:text-[190px] font-black text-[#003D3F]/5 dark:text-white/5 select-none pointer-events-none leading-none font-[family-name:var(--font-heading-main)]">
                                    {activeItem.letter}
                                </span>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] tracking-tight relative z-10">
                                    {activeItem.cardTitle}
                                </h3>

                                <p className="text-[#003D3F]/80 dark:text-white/85 text-sm sm:text-base leading-relaxed font-[family-name:var(--font-body)] mt-4 relative z-10">
                                    {activeItem.desc}
                                </p>

                                <Link
                                    href={activeItem.href}
                                    className="flex sm:inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-[#00595C]/10 dark:hover:bg-[#FFC050]/10 backdrop-blur-xl border border-[#00595C]/30 dark:border-[#FFC050]/40 text-[#00595C] dark:text-[#FFC050] font-bold text-sm tracking-wide transition-all shadow-sm hover:scale-105 mt-6 relative z-10 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                >
                                    <span>Explore {activeItem.title}</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Right Image Area (lg:col-span-6 — Increased Image Width, Flush Edge-to-Edge) */}
                            <div className="order-1 lg:order-2 lg:col-span-6 relative w-full h-[260px] sm:h-[320px] lg:h-auto min-h-[260px] overflow-hidden">
                                <Image
                                    src={activeItem.image}
                                    alt={activeItem.cardTitle}
                                    fill
                                    className="object-cover object-center rounded-t-3xl lg:rounded-none lg:rounded-r-3xl transition-transform duration-700 hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
