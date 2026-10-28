import React from "react";
import { Metadata } from "next";
import WhyChooseUsClient from "./WhyChooseUsClient";

export const metadata: Metadata = {
    title: "Why Choose Us | Uvicon Technologies — The Engineering Advantage",
    description:
        "Discover why fast-growing enterprises, fintech leaders, and startups choose Uvicon Technologies for custom software, sub-0.1ms algo trading engines, and Next.js web applications with 100% IP ownership.",
    openGraph: {
        title: "Why Choose Us | Uvicon Technologies — The Engineering Advantage",
        description:
            "100% IP ownership, sub-0.1ms latency, direct tech lead access, and predictable fixed-scope delivery. Discover why engineering teams partner with Uvicon.",
        url: "https://uvicon.in/why-choose-us",
        siteName: "Uvicon Technologies",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Why Choose Us | Uvicon Technologies — The Engineering Advantage",
        description:
            "Explore Uvicon's 6 core engineering differentiators, interactive agency comparison matrix, 4-phase delivery engine, and 90-day SLA warranty."
    }
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & SEARCH ENGINE OVERVIEWS
   ========================================================================== */

const whyChooseUsSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://uvicon.in/#organization",
            name: "Uvicon Technologies",
            url: "https://uvicon.in",
            logo: "https://uvicon.in/assets/icons/uvicon-technologies-logo.webp",
            description:
                "Uvicon Technologies is a premier Indian technology studio delivering bespoke custom software, high-speed Next.js web applications, iOS/Android mobile apps, and quant trading software architecture with zero compromise.",
            contactPoint: {
                "@type": "ContactPoint",
                email: "contact@uvicon.in",
                contactType: "customer support",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"]
            }
        },
        {
            "@type": "WebPage",
            "@id": "https://uvicon.in/why-choose-us/#webpage",
            url: "https://uvicon.in/why-choose-us",
            name: "Why Choose Us | Uvicon Technologies",
            description:
                "Detailed comparison and engineering advantages of choosing Uvicon Technologies for software development and algorithmic systems.",
            isPartOf: {
                "@id": "https://uvicon.in/#website"
            }
        }
    ]
};

export default function WhyChooseUsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(whyChooseUsSchema) }}
            />
            <WhyChooseUsClient />
        </>
    );
}
