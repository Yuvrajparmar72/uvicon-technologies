import React from "react";
import { Metadata } from "next";
import SoftwarePageClient from "./SoftwarePageClient";

export const metadata: Metadata = {
    title: "Custom Software Development India | Uvicon",
    description:
        "Enterprise custom software, algo trading engines, SaaS platforms & microservices architecture in India. Sub-0.1ms execution, 100% IP transfer, 90-day SLA.",
    openGraph: {
        title: "Custom Software Development India | Uvicon",
        description:
            "Uvicon Technologies engineers enterprise-grade custom software, algo trading systems, SaaS platforms, and cloud microservices in India with 100% IP ownership.",
        url: "https://uvicon.in/services/software",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Custom Software Development India | Uvicon",
        description:
            "Enterprise custom software, algo trading engines, and SaaS platforms with sub-0.1ms execution and 100% IP transfer.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO (AI SEARCH OVERVIEWS)
   ========================================================================== */

const softwareSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://uvicon.in/#organization",
            name: "Uvicon Technologies",
            url: "https://uvicon.in",
            logo: "https://uvicon.in/assets/icons/uvicon-technologies-logo.webp",
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
            name: "Custom Software Development & Algo Trading Systems",
            serviceType: "Enterprise Custom Software, Algorithmic Trading Engines, SaaS Platform Development",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/software",
            description:
                "Enterprise-grade custom software development including algorithmic trading engines with sub-0.1ms execution, SaaS platforms, cloud microservices, and real-time data pipelines. 100% IP transfer under NDA with 90-day post-launch SLA.",
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
                    name: "What types of custom software does Uvicon build?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We build enterprise SaaS platforms, algorithmic trading engines, CRM/ERP systems, real-time data pipelines, cloud microservices architectures, and custom API gateways. Every solution is architected from scratch — no templates, no WordPress, no pre-built frameworks repurposed. Each codebase is strictly typed, rigorously tested, and legally transferred to you under NDA.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you ensure sub-millisecond latency in algo trading systems?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our quant engines are engineered in Python and C++ with optimized memory buffers, direct broker API hooks (Zerodha, Angel One, Upstox, IBKR), and zero-bloat modular architecture. We run automated backtesting against multi-year tick data and benchmark every order routing path for deterministic low-latency execution. We provide software architecture and backtesting tools only — we never guarantee returns or assure profit.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do we receive 100% source code and intellectual property ownership?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, absolutely. Every engagement begins with a legally binding NDA and Master Services Agreement. Upon milestone completion, 100% of all source code, database schemas, API keys, deployment scripts, and architecture documentation are transferred directly to your organization. Zero vendor lock-in, zero recurring license fees.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How do you estimate timelines and pricing for custom software projects?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We use an agile milestone-based pricing model. After a comprehensive architecture discovery session, we provide a fixed-price proposal with clear sprint milestones. Small-to-medium SaaS platforms typically ship in 4–6 weeks. Enterprise trading engines or distributed systems range from 8–12+ weeks. No surprise invoices — every deliverable is pre-defined.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What security standards do you enforce for enterprise software?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We enforce bank-grade security: end-to-end SSL/TLS encryption, automated CI/CD vulnerability scanning, ACID database compliance, SQL injection and CSRF immunity, strict role-based access control (RBAC), and containerized secret management. All developer access is governed by enterprise NDAs with zero-data-leakage standards.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What does the 90-day post-launch SLA warranty cover?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our 90-day SLA warranty covers all bugs and performance regressions within the agreed project scope. We provide proactive cloud health monitoring, priority bug-fix response times, database backup verification, and dedicated engineering support. If a bug surfaces, our core squad patches it at zero additional charge.",
                    },
                },
            ],
        },
    ],
};

export default function SoftwarePage() {
    return (
        <>
            {/* Structured Schema Script for SEO & GEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(softwareSchema),
                }}
            />
            {/* Interactive Software Page View */}
            <SoftwarePageClient />
        </>
    );
}
