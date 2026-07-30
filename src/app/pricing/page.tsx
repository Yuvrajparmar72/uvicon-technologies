import React from "react";
import { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
    title: "Algo Trading Software & Custom App Pricing India | Uvicon",
    description:
        "Transparent sprint & retainer pricing for custom software, web applications, mobile apps, and algo trading software licensing in India. 100% IP ownership.",
    openGraph: {
        title: "Algo Trading Software & Custom App Pricing India | Uvicon",
        description:
            "Transparent sprint & retainer pricing for custom software, web applications, mobile apps, and algo trading software licensing in India. 100% IP ownership.",
        url: "https://uvicon.in/pricing",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Algo Trading Software & Custom App Pricing India | Uvicon",
        description:
            "Agile milestone pricing for custom software, web portals, mobile apps, and institutional algo backtesting software in India.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO (AI SEARCH OVERVIEWS)
   ========================================================================== */

const pricingSchema = {
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
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "How do you estimate timelines and milestone payments for custom software and web apps?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We use an agile milestone-based pricing model. After a comprehensive discovery session where we map out your functional requirements, technical architecture, and UI/UX scope, we provide a fixed-price proposal with clear sprint milestones. Payment is divided across defined delivery phases (typically 30% upfront on architecture approval, 40% on mid-sprint staging demo, and 30% on final production deployment).",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do we receive 100% intellectual property (IP) and custom source code ownership?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, absolutely. Upon final project delivery and milestone completion, 100% of the intellectual property, custom source code, design assets, database scripts, and deployment configurations are legally transferred to your company. We work under strict non-disclosure agreements (NDAs) from day one to protect your confidential ideas.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is your refund and project cancellation policy?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Our billing operates on mutually agreed milestone deliverables. If you choose to terminate an engagement prior to the completion of a sprint milestone, billing is pro-rated only for the actual engineering hours and approved deliverables completed up to that date. For full terms and refund conditions, please review our transparent Refund Policy at /refund-policy.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How does licensing and billing work for Uvicon Pro algorithmic trading software?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Uvicon Pro is offered through flexible institutional software licensing and subscription tiers. In strict accordance with financial regulations and our compliance policy, we provide software architecture, broker connectivity hooks, and backtesting tools only. We never claim guaranteed returns, assure profit, or make risk-free claims.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you sign Non-Disclosure Agreements (NDAs) before discussing our project scope?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. We routinely execute mutual or client-provided NDAs before our first technical discovery call. We maintain enterprise-grade access control, secure repository governance, and strict confidentiality across every engineering pod.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What post-launch SLA warranty and maintenance support is included in turnkey builds?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Every Full-Cycle Product Engineering delivery includes a 90-day post-launch SLA warranty covering bug fixes, browser compatibility, and performance monitoring at zero additional cost. Beyond the warranty period, we offer continuous 24/7 server health monitoring, security patch management, and dedicated SLA response times under our monthly support retainers.",
                    },
                },
            ],
        },
    ],
};

export default function PricingPage() {
    return (
        <>
            {/* Structured Schema Script for SEO & GEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(pricingSchema),
                }}
            />
            {/* Interactive Pricing Page View */}
            <PricingPageClient />
        </>
    );
}
