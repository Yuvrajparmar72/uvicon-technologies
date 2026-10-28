import React from "react";
import { Metadata } from "next";
import GamesAiPageClient from "./GamesAiPageClient";

export const metadata: Metadata = {
    title: "Game Development & AI Agents India | Uvicon",
    description:
        "Custom 3D game engines, spatial computing (XR), and autonomous AI LLM agents. Enterprise-grade development with 100% IP ownership.",
    openGraph: {
        title: "Game Development & AI Agents India | Uvicon",
        description:
            "Uvicon Technologies pioneers multiplayer game development (Unreal Engine/Unity) and autonomous enterprise AI agents.",
        url: "https://uvicon.in/services/games-ai",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Game Development & AI Agents India | Uvicon",
        description:
            "From high-fidelity 3D multiplayer games to private LLM models and RAG data pipelines.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO
   ========================================================================== */

const gamesAiSchema = {
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
            name: "Game Engine & AI Development",
            serviceType: "3D Game Development, Autonomous AI Agents, RPA, Spatial Computing",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/games-ai",
            description:
                "Advanced technology solutions covering 3D multiplayer game development in Unity/Unreal Engine, private enterprise AI agents (LLMs/RAG), robotic process automation, and spatial computing experiences.",
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
                    name: "Is AI secure for our proprietary enterprise data?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. We deploy custom LLMs and RAG architectures within your own private cloud VPC (Virtual Private Cloud). This ensures that your proprietary data is never sent to public endpoints (like ChatGPT) to train third-party models.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you develop for mobile, PC, or console games?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "We develop for all major platforms. Using Unity, we efficiently target iOS, Android, and PC. For high-fidelity AAA experiences, we utilize Unreal Engine 5 targeting PC and next-gen consoles.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Who owns the code and trained AI models?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "You do. Upon milestone completion, 100% of the game source code, 3D assets, custom AI model weights, and data pipelines are legally transferred to you under NDA.",
                    },
                },
            ],
        },
    ],
};

export default function GamesAiPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(gamesAiSchema),
                }}
            />
            <GamesAiPageClient />
        </>
    );
}
