import React from "react";
import { Metadata } from "next";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = {
    title: "FAQs & Tutorials | Uvicon Technologies — Technical Knowledge Base",
    description:
        "Comprehensive technical tutorials, developer guides, and FAQs covering sub-millisecond algo trading, Next.js web SaaS, 100% IP ownership, and 90-day SLAs.",
    openGraph: {
        title: "FAQs & Technical Tutorials | Uvicon Technologies",
        description:
            "Browse step-by-step developer guides, broker API walkthroughs, and answers to all software engineering questions.",
        url: "https://uvicon.in/faqs",
        siteName: "Uvicon Technologies",
        images: [
            {
                url: "/assets/images/uvicon-pro-preview.png",
                width: 1200,
                height: 630,
                alt: "Uvicon Technical Tutorials & Knowledge Base",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "FAQs & Tutorials | Uvicon Technologies",
        description:
            "Developer guides, video tutorials, and technical FAQs.",
        images: ["/assets/images/uvicon-pro-preview.png"],
    },
    alternates: {
        canonical: "https://uvicon.in/faqs",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Uvicon Technologies Knowledge Base & Tutorials",
    "url": "https://uvicon.in/faqs",
    "description":
        "Technical guides and frequently asked questions about Uvicon's software engineering services."
};

export default function FaqsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FaqsClient />
        </>
    );
}
