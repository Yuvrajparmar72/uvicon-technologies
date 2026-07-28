import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Globe, Smartphone, Cpu } from "lucide-react";

export const metadata: Metadata = {
    title: "Services | Uvicon",
    description: "Enterprise software, web, mobile, and AI solutions.",
};

const services = [
    {
        id: "software",
        title: "Custom Software",
        description: "Enterprise-grade backend systems, algorithmic trading engines, and scalable SaaS architectures designed for high performance.",
        icon: Code2,
        link: "/services/software"
    },
    {
        id: "web",
        title: "Web Development",
        description: "Lightning-fast, conversion-optimized web applications built with Next.js, React, and modern web standards.",
        icon: Globe,
        link: "/services/web"
    },
    {
        id: "mobile",
        title: "Mobile Apps",
        description: "Native and cross-platform mobile experiences for iOS and Android, focusing on intuitive UX and seamless performance.",
        icon: Smartphone,
        link: "/services/mobile"
    },
    {
        id: "games-ai",
        title: "Game & AI Dev",
        description: "Next-generation interactive entertainment and artificial intelligence integrations, from LLM agents to 3D virtual worlds.",
        icon: Cpu,
        link: "/services/games-ai"
    }
];

export default function ServicesPage() {
    return (
        <main className="w-full min-h-screen bg-bg text-text-primary dark:text-white pt-24 lg:pt-32 pb-24 px-6 md:px-12 font-[family-name:var(--font-body)]">
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <header className="mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-heading-main)] tracking-tight mb-6">
                        Our Expertise
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
                        We design and build robust digital solutions for forward-thinking companies. Pure performance, zero compromise.
                    </p>
                </header>

                {/* Services List - Ultra Minimal */}
                <div className="flex flex-col gap-6 md:gap-8 border-t border-border/50 pt-8">
                    {services.map((service) => (
                        <Link 
                            key={service.id} 
                            href={service.link}
                            className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl border border-transparent hover:border-border/60 hover:bg-surface-alt/30 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface border border-border text-text-primary shadow-sm">
                                    <service.icon className="w-5 h-5 opacity-80" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold font-[family-name:var(--font-heading-section)] mb-2 group-hover:text-brand-accent transition-colors">
                                        {service.title}
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed max-w-xl text-sm md:text-base">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-6 md:mt-0 flex items-center gap-2 text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
                                <span>Learn more</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </main>
    );
}
