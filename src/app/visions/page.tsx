import React from "react";
import { Metadata } from "next";
import VisionValuesClient from "./VisionValuesClient";

export const metadata: Metadata = {
    title: "Vision & Values | Uvicon Technologies — Our Principles & North Star",
    description:
        "Explore Uvicon's core vision, mission, and foundational engineering values. From sub-millisecond algorithmic precision to 100% IP ownership and radical architectural purity.",
    openGraph: {
        title: "Vision & Values | Uvicon Technologies",
        description:
            "Our North Star: Engineering high-throughput software, autonomous AI systems, and deterministic algorithmic engines with zero vendor lock-in.",
        url: "https://uvicon.in/visions",
        siteName: "Uvicon Technologies",
        images: [
            {
                url: "/assets/images/uvicon-pro-preview.png",
                width: 1200,
                height: 630,
                alt: "Uvicon Technologies Vision & Values",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Vision & Values | Uvicon Technologies",
        description:
            "Explore our 6 foundational engineering values and long-term innovation roadmap.",
        images: ["/assets/images/uvicon-pro-preview.png"],
    },
    alternates: {
        canonical: "https://uvicon.in/visions",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Vision & Values | Uvicon Technologies",
    "url": "https://uvicon.in/visions",
    "description":
        "Discover Uvicon's core vision, mission, and 6 foundational values driving high-velocity software engineering.",
    "publisher": {
        "@type": "Organization",
        "name": "Uvicon Technologies",
        "url": "https://uvicon.in",
        "logo": "https://uvicon.in/assets/icons/uvicon-bolt-1.webp"
    }
};

export default function VisionValuesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <VisionValuesClient />
        </>
    );
}
