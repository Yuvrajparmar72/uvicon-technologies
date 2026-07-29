import React from "react";
import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
    title: "Custom Software, Web & Mobile App Dev Services | Uvicon",
    description:
        "Explore Uvicon Technologies services: enterprise custom software, Next.js web dev, iOS/Android mobile apps, games & AI algo trading tools in India.",
    openGraph: {
        title: "Custom Software, Web & Mobile App Dev Services | Uvicon",
        description:
            "Uvicon Technologies builds enterprise custom software, high-speed Next.js web applications, native iOS & Android mobile apps, and algo trading systems in India.",
        url: "https://uvicon.in/services",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Custom Software, Web & Mobile App Dev Services | Uvicon",
        description:
            "Enterprise custom software, conversion-engineered web portals, mobile apps, and quant trading software architecture.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO (AI SEARCH OVERVIEWS)
   ========================================================================== */

const servicesSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://uvicon.in/#organization",
            name: "Uvicon Technologies",
            url: "https://uvicon.in",
            logo: "https://uvicon.in/assets/icons/uvicon-logo.png",
            contactPoint: {
                "@type": "ContactPoint",
                email: "contact@uvicon.in",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
            },
        },
        {
            "@type": "Service",
            name: "Custom Software & Algo Trading Systems",
            serviceType: "Enterprise Backend Software & Quantitative Trading Engineering",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/software",
            description:
                "Enterprise-grade backend custom software, high-frequency algorithmic trading engines, multi-broker order routing, and strategy backtesting tools.",
            areaServed: {
                "@type": "Country",
                name: "India",
            },
        },
        {
            "@type": "Service",
            name: "Web Development & Enterprise Portals",
            serviceType: "Next.js Web Application & SaaS Portal Development",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/web",
            description:
                "Lightning-fast, conversion-optimized Next.js web applications, SSR enterprise SaaS portals, and Core Web Vitals 100/100 Lighthouse builds.",
            areaServed: {
                "@type": "Country",
                name: "India",
            },
        },
        {
            "@type": "Service",
            name: "Native & Cross-Platform Mobile Apps",
            serviceType: "iOS, Android & Flutter Mobile Application Development",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/mobile",
            description:
                "Retina-ready iOS (SwiftUI), Android (Kotlin), and Flutter cross-platform mobile apps with 60fps rendering and biometric hardware security.",
            areaServed: {
                "@type": "Country",
                name: "India",
            },
        },
        {
            "@type": "Service",
            name: "Game Development & AI Agents",
            serviceType: "Interactive 2D/3D Gaming Studios & Custom LLM AI Workflows",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/games-ai",
            description:
                "2D/3D game engineering, real-time multiplayer networking, custom Large Language Model (LLM) agents, and RAG knowledge pipelines.",
            areaServed: {
                "@type": "Country",
                name: "India",
            },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How do you estimate timelines and pricing for custom software or web applications?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We use an agile milestone-based pricing model. After a comprehensive discovery session where we map out your functional requirements, technical architecture, and UI/UX scope, we provide a fixed-price proposal with clear sprint milestones. Small-to-medium web portals typically ship in 4 to 6 weeks, while enterprise trading engines or custom SaaS systems range from 8 to 12+ weeks.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do we receive 100% intellectual property (IP) and source code ownership?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, absolutely. Upon final project delivery and milestone completion, 100% of the intellectual property, custom source code, design assets, and deployment scripts are legally transferred to your company. We work under strict non-disclosure agreements (NDAs) from day one.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What technologies do you use for algorithmic trading software, and do you guarantee returns?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We architect algo trading systems using Python, C++, Node.js, PostgreSQL, Redis, and WebSockets for low-latency broker connectivity and backtesting execution. In strict accordance with financial regulations and our company compliance policy, we provide software architecture and backtesting tools only. We never guarantee returns, assure profit, or make risk-free claims.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you ensure our application is secure and performs fast under heavy traffic?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We build zero-vulnerability cloud architectures with end-to-end SSL encryption, strict WCAG accessibility compliance, SQL injection prevention, and automated vulnerability scanning. On the frontend, our Next.js web applications are optimized for sub-100ms Largest Contentful Paint (LCP) and 99+ Google Lighthouse performance scores.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you provide post-launch hosting, maintenance, and 24/7 technical support?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. Every turnkey product delivery includes a 90-day post-launch SLA warranty covering bug fixes and performance monitoring. Beyond that, we offer continuous 24/7 proactive health monitoring, server maintenance, cloud backup management, and dedicated SLA response times under our managed support retainers.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can we start with a small Proof-of-Concept (PoC) or design prototype before full development?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. For complex enterprise applications or new quant trading concepts, we recommend starting with a 2-week Architecture & Interactive Figma Prototype sprint. This gives your stakeholders a clickable high-fidelity mockup and technical blueprint before committing to full-scale engineering.",
                    },
                },
            ],
        },
    ],
};

export default function ServicesPage() {
    return (
        <>
            {/* Structured Schema Script for SEO & GEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(servicesSchema),
                }}
            />
            {/* Interactive Services Page View */}
            <ServicesPageClient />
        </>
    );
}
