import React from "react";
import { Metadata } from "next";
import WebPageClient from "./WebPageClient";

export const metadata: Metadata = {
    title: "Custom Website Development India | Uvicon",
    description:
        "Premium web development, enterprise SaaS dashboards, and headless eCommerce platforms built with Next.js & React. 100/100 Core Web Vitals.",
    openGraph: {
        title: "Custom Website Development India | Uvicon",
        description:
            "Uvicon Technologies engineers high-performance custom web applications, SaaS dashboards, and headless eCommerce platforms in India.",
        url: "https://uvicon.in/services/web",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Custom Website Development India | Uvicon",
        description:
            "Enterprise SaaS platforms and headless eCommerce with sub-second loads and 100% IP transfer.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO
   ========================================================================== */

const webSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://uvicon.in/#organization",
            name: "Uvicon Technologies",
            url: "https://uvicon.in",
            logo: "https://uvicon.in/assets/icons/uvicon-technologies-logo.webp",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Behind Climax Academy, Panna Naka",
                addressLocality: "Chhatarpur",
                addressRegion: "Madhya Pradesh",
                postalCode: "471001",
                addressCountry: "IN",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8889007424",
                email: "uvicontechnologies@gmail.com",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
            },
        },
        {
            "@type": "Service",
            name: "Custom Web & SaaS Development",
            serviceType: "Enterprise Web Applications, SaaS Dashboards, Headless eCommerce",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/web",
            description:
                "Premium custom web development services including full-stack SaaS platforms, headless B2B eCommerce, and digital healthcare portals. Engineered for 100/100 Core Web Vitals with complete source code ownership transferred under NDA.",
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
                    name: "Do you use WordPress or pre-built templates?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "No. We engineer custom web applications from scratch using modern frameworks like Next.js, React, and Node.js. This ensures your platform is highly secure, exceptionally fast, and tailored exactly to your business logic without the bloat of generic templates.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Will my website be mobile-responsive and SEO-friendly?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely. Every web platform we build follows a mobile-first design philosophy. We implement strict technical SEO practices, structured JSON-LD data, and optimize for 100/100 Core Web Vitals to ensure maximum visibility on search engines.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Who owns the code after the project is complete?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "You do. Upon milestone completion and final payment, 100% of the source code, design assets, and intellectual property are legally transferred to you under a strict NDA. We believe in zero vendor lock-in.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can you integrate our existing CRM or third-party APIs?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. We specialize in building custom API gateways and integrating with third-party services, including payment processors (Stripe, Razorpay), CRMs (Salesforce, HubSpot), ERPs, and custom enterprise tools.",
                    },
                },
            ],
        },
    ],
};

export default function WebDevPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webSchema),
                }}
            />
            <WebPageClient />
        </>
    );
}
