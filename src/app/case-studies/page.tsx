import React from "react";
import { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
    title: "Case Studies & Production Proof | Uvicon Technologies",
    description:
        "Explore real-world case studies of systems engineered by Uvicon. From sub-0.1ms quant engines to Next.js 15 SaaS and native mobile applications with 100% IP ownership.",
    openGraph: {
        title: "Case Studies & Production Benchmarks | Uvicon Technologies",
        description:
            "Verified metrics, architecture breakdowns, and client success stories.",
        url: "https://uvicon.in/case-studies",
        siteName: "Uvicon Technologies",
        images: [
            {
                url: "/assets/images/uvicon-pro-preview.png",
                width: 1200,
                height: 630,
                alt: "Uvicon Technologies Case Studies",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Case Studies | Uvicon Technologies",
        description:
            "Real production software engineered with sub-millisecond precision and 100% IP rights.",
        images: ["/assets/images/uvicon-pro-preview.png"],
    },
    alternates: {
        canonical: "https://uvicon.in/case-studies",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Uvicon Technologies Case Studies",
    "url": "https://uvicon.in/case-studies",
    "description":
        "Case studies and production performance benchmarks of software delivered by Uvicon Technologies."
};

export default function CaseStudiesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CaseStudiesClient />
        </>
    );
}
