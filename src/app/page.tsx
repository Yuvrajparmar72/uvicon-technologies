import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight, Sparkles, Store } from "lucide-react";

export default function Page() {
    // Inner Ring Tech Icons (6 items evenly spaced at 60deg intervals)
    const innerIcons = [
        { src: "/assets/icons/python.png", alt: "Python", angle: 0 },
        { src: "/assets/icons/node-js.png", alt: "Node.js", angle: 60 },
        { src: "/assets/icons/figma.png", alt: "Figma", angle: 120 },
        { src: "/assets/icons/swift.png", alt: "Swift", angle: 180 },
        { src: "/assets/icons/java-logo.png", alt: "Java", angle: 240 },
        { src: "/assets/icons/html.png", alt: "HTML5", angle: 300 },
    ];

    // Outer Ring Tech Icons (7 items evenly spaced at 51.4deg intervals)
    const outerIcons = [
        { src: "/assets/icons/css.png", alt: "CSS3", angle: 0 },
        { src: "/assets/icons/angular.js.png", alt: "Angular", angle: 51.4 },
        { src: "/assets/icons/github.png", alt: "GitHub", angle: 102.8 },
        { src: "/assets/icons/gitlab.png", alt: "GitLab", angle: 154.2 },
        { src: "/assets/icons/photoshop.png", alt: "Photoshop", angle: 205.7 },
        { src: "/assets/icons/illustrator.png", alt: "Illustrator", angle: 257.1 },
        { src: "/assets/icons/illustrator-draw.png", alt: "Illustrator Draw", angle: 308.5 },
    ];

    return (
        <main className="w-full">
            {/* 100vh 3D Hero Section */}
            <section className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-[#00383B] via-[#002629] to-[#001D1F] flex flex-col justify-between pt-28 px-4 sm:px-8 lg:px-16 font-[family-name:var(--font-body)]">

                {/* 3D Glass Accent 1 (Top Right Background - Static) */}
                <div className="absolute -top-10 sm:-top-14 lg:-top-16 -right-6 sm:-right-10 lg:-right-14 w-48 sm:w-64 lg:w-80 pointer-events-none z-10 opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Accent"
                        width={320}
                        height={320}
                        className="w-full h-auto object-contain transform rotate-12"
                    />
                </div>

                {/* 3D Glass Accent 2 (Bottom Left Background - Static) */}
                <div className="absolute bottom-4 -left-10 w-44 sm:w-60 lg:w-72 pointer-events-none z-10 opacity-85 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Accent"
                        width={300}
                        height={300}
                        className="w-full h-auto object-contain transform -rotate-45"
                    />
                </div>

                {/* Hero Main Content Grid */}
                <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 my-auto pb-12 lg:pb-16">

                    {/* Left Column: CTA & Info */}
                    <div className="lg:col-span-6 flex flex-col items-start gap-6 sm:gap-7 text-left">

                        {/* Top Subtitle / Greeting */}
                        <div className="inline-flex items-center gap-2 text-white/90 text-lg sm:text-xl font-medium tracking-wide">
                            <span>Hey, we are <span className="text-[#FFC050] font-bold">Uvicon</span></span>
                        </div>

                        {/* H1 Main Headline */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-wide font-[family-name:var(--font-heading-main)] leading-[1.1] drop-shadow-md">
                            Custom Web, App & Algo Solutions
                        </h1>

                        {/* GEO Answer-First Description */}
                        <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-xl font-[family-name:var(--font-body)]">
                            Uvicon Technologies crafts high-performance custom websites, mobile applications, interactive games, and automated algorithmic trading solutions with modern, premium aesthetics.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-1">
                            <Link
                                href="/softwares"
                                className="px-8 py-3.5 rounded-full bg-[#005A5B]/80 hover:bg-[#007577] border border-[#FFC050]/50 text-white font-bold text-base tracking-wide transition-all shadow-xl hover:scale-105 flex items-center gap-2"
                            >
                                <span>Hire us</span>
                            </Link>

                            <a
                                href="mailto:contact@uvicon.in"
                                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all shadow-lg hover:scale-110"
                                aria-label="Email Us"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Glassmorphism Marketplace Card */}
                        <Link
                            href="/softwares"
                            className="mt-4 w-full max-w-md bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-[#FFC050]/60 rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] relative overflow-hidden group transition-all flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-xl bg-[#FFC050]/20 border border-[#FFC050]/40 flex items-center justify-center text-[#FFC050] shrink-0 group-hover:scale-110 transition-transform">
                                    <Store className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FFC050]">
                                        <span>Uvicon Marketplace</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC050] animate-ping"></span>
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-white leading-tight font-[family-name:var(--font-heading-section)]">
                                        Explore Apps & Algo Tools
                                    </h4>
                                    <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                                        Browse ready-to-use software, scripts & trading bots.
                                    </p>
                                </div>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#FFC050] text-white group-hover:text-[#002829] flex items-center justify-center shrink-0 transition-colors shadow-md">
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </Link>

                    </div>

                    {/* Right Column Reservation for Desktop Layout */}
                    <div className="hidden lg:block lg:col-span-6 pointer-events-none min-h-[500px]"></div>

                </div>

                {/* 3D Character & Concentric Revolving Orbit System (Anchored directly to bottom:0 of Section) */}
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-2 xl:right-12 z-20 pointer-events-none flex flex-col items-center justify-end">

                    {/* Round Radial Gradient starting from inner ring area */}
                    <div
                        className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1200px] sm:h-[1200px] lg:w-[1500px] lg:h-[1500px] pointer-events-none rounded-full blur-[80px] opacity-90 z-0"
                        style={{
                            background: "radial-gradient(circle, rgba(0, 205, 192, 0.55) 0%, rgba(0, 150, 142, 0.38) 25%, rgba(0, 80, 83, 0.22) 50%, rgba(0, 40, 43, 0.1) 75%, transparent 100%)"
                        }}
                    ></div>

                    {/* Inner Ring (Gold Orbit - behind character) */}
                    <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full border border-[#FFC050]/40 shadow-[0_0_25px_rgba(255,192,80,0.15)] animate-spin-slow flex items-center justify-center z-10">
                        {innerIcons.map((item, idx) => {
                            const rad = (item.angle * Math.PI) / 180;
                            const r = 240; // half of 480px
                            const x = Math.sin(rad) * r;
                            const y = -Math.cos(rad) * r;
                            return (
                                <div
                                    key={idx}
                                    className="absolute pointer-events-auto"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                                    }}
                                >
                                    <div className="animate-spin-reverse">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[#002829]/80 backdrop-blur-md border border-[#FFC050]/60 rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_12px_rgba(255,192,80,0.3)]">
                                            <Image src={item.src} alt={item.alt} width={22} height={22} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Outer Ring (Teal Orbit - behind character, 90px gap from inner ring) */}
                    <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] lg:w-[660px] lg:h-[660px] rounded-full border border-teal-400/30 shadow-[0_0_25px_rgba(45,212,191,0.12)] animate-spin-reverse flex items-center justify-center z-10">
                        {outerIcons.map((item, idx) => {
                            const rad = (item.angle * Math.PI) / 180;
                            const r = 330; // half of 660px
                            const x = Math.sin(rad) * r;
                            const y = -Math.cos(rad) * r;
                            return (
                                <div
                                    key={idx}
                                    className="absolute pointer-events-auto"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                                    }}
                                >
                                    <div className="animate-spin-slow">
                                        <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 bg-[#002829]/80 backdrop-blur-md border border-teal-400/50 rounded-xl p-1.5 flex items-center justify-center shadow-[0_0_12px_rgba(45,212,191,0.3)]">
                                            <Image src={item.src} alt={item.alt} width={20} height={20} className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 3D Main Character (Directly touching Section Bottom 0, in front of rings) */}
                    <Image
                        src="/assets/icons/uvicon-hero-character.webp"
                        alt="Uvicon 3D Character"
                        width={720}
                        height={720}
                        className="w-[320px] sm:w-[440px] lg:w-[520px] xl:w-[620px] h-auto object-contain object-bottom drop-shadow-[0_35px_50px_rgba(0,0,0,0.8)] relative z-20 leading-none block -mb-1"
                        priority
                    />

                </div>

            </section>
        </main>
    );
}
