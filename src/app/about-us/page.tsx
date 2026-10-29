import React from "react";
import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
    title: "About Us | Uvicon Technologies — India's Premier Tech Studio",
    description:
        "Learn about Uvicon Technologies — our mission, engineering philosophy, and high-performance solutions across custom software, algo trading systems, web, and mobile apps in India.",
    openGraph: {
        title: "About Us | Uvicon Technologies — India's Premier Tech Studio",
        description:
            "Uvicon Technologies builds custom software, Next.js web applications, mobile apps, and algorithmic trading tools with zero compromise on engineering precision.",
        url: "https://uvicon.in/about-us",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | Uvicon Technologies — India's Premier Tech Studio",
        description:
            "Learn about Uvicon Technologies — our vision, engineering culture, and commitment to 100% intellectual property ownership and high-performance software architecture.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO SEARCH OVERVIEWS
   ========================================================================== */

const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://uvicon.in/#organization",
            name: "Uvicon Technologies",
            url: "https://uvicon.in",
            logo: "https://uvicon.in/assets/icons/uvicon-technologies-logo.webp",
            description:
                "Uvicon Technologies is a premier Indian technology studio delivering bespoke custom software, high-speed Next.js web applications, iOS/Android mobile apps, and quant trading software architecture.",
            foundingDate: "2023",
            founders: [
                {
                    "@type": "Person",
                    name: "Uvicon Leadership",
                },
            ],
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
                contactType: "customer support",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
            },
            sameAs: [],
        },
        {
            "@type": "AboutPage",
            "@id": "https://uvicon.in/about-us/#webpage",
            url: "https://uvicon.in/about-us",
            name: "About Us | Uvicon Technologies",
            isPartOf: {
                "@id": "https://uvicon.in/#website",
            },
            about: {
                "@id": "https://uvicon.in/#organization",
            },
            description:
                "Discover the origin, core values, technology stack, and engineering standards behind Uvicon Technologies.",
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://uvicon.in",
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "About Us",
                    item: "https://uvicon.in/about-us",
                },
            ],
        },
    ],
};

export default function AboutUsPage() {
    return (
        <>
            {/* Structured Schema Script for SEO & GEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutSchema),
                }}
            />
            {/* Interactive About Us Client View */}
            <AboutUsClient />
        </>
    );
}
