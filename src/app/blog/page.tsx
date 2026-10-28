import React from "react";
import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
    title: "Blog & Insights | Uvicon Technologies — Technical Engineering Ledger",
    description:
        "Deep technical articles on sub-millisecond algo latency, Next.js 15 SSR architecture, autonomous AI agents, and zero-debt software engineering.",
    openGraph: {
        title: "Engineering Blog & Technical Insights | Uvicon Technologies",
        description:
            "Architectural deep dives, quant engineering breakdowns, and system design papers.",
        url: "https://uvicon.in/blog",
        siteName: "Uvicon Technologies",
        images: [
            {
                url: "/assets/images/uvicon-pro-preview.png",
                width: 1200,
                height: 630,
                alt: "Uvicon Technologies Engineering Blog",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog & Insights | Uvicon Technologies",
        description:
            "Technical articles and architecture blueprints by Uvicon Lead Architects.",
        images: ["/assets/images/uvicon-pro-preview.png"],
    },
    alternates: {
        canonical: "https://uvicon.in/blog",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Uvicon Technologies Engineering Blog",
    "url": "https://uvicon.in/blog",
    "description":
        "Deep dives into quantitative trading latency, Next.js performance, and modern software architecture."
};

export default function BlogPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogClient />
        </>
    );
}
