import React from "react";
import { Metadata } from "next";
import MobilePageClient from "./MobilePageClient";

export const metadata: Metadata = {
    title: "iOS & Android Mobile App Development India | Uvicon",
    description:
        "Premium native and cross-platform mobile app development services. We build scalable, offline-first iOS and Android apps with 100% IP ownership transfer.",
    openGraph: {
        title: "iOS & Android Mobile App Development India | Uvicon",
        description:
            "Uvicon Technologies engineers high-performance native (Swift, Kotlin) and cross-platform (React Native) mobile applications in India.",
        url: "https://uvicon.in/services/mobile",
        siteName: "Uvicon Technologies",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "iOS & Android Mobile App Development India | Uvicon",
        description:
            "Deep hardware integrations, offline-first architecture, and 60-FPS native mobile app development.",
    },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO
   ========================================================================== */

const mobileSchema = {
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
            name: "Mobile App Development (iOS & Android)",
            serviceType: "Native iOS Apps, Native Android Apps, Cross-Platform Apps",
            provider: {
                "@id": "https://uvicon.in/#organization",
            },
            url: "https://uvicon.in/services/mobile",
            description:
                "Premium mobile application development services for iOS and Android. Specializing in Swift, Kotlin, React Native, offline-first architectures, and deep hardware integrations.",
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
                    name: "Should I build a Native or Cross-Platform app?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "It depends on your app's core functionality. If your app relies heavily on 3D graphics, complex AR, or low-level Bluetooth, we recommend Native (Swift/Kotlin). For 90% of business apps, SaaS companions, and marketplaces, we recommend React Native for faster development and a shared codebase without sacrificing performance.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Do you handle the App Store and Google Play submissions?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. We manage the entire submission process, including provisioning profiles, certificates, privacy policy compliance, and handling any reviewer feedback until the app is live on both the Apple App Store and Google Play Store.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can you build offline-capable applications?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Absolutely. We specialize in local-first architecture using SQLite and WatermelonDB. This allows users to read and write data offline, which automatically syncs to the cloud once an internet connection is re-established.",
                    },
                },
            ],
        },
    ],
};

export default function MobileDevPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(mobileSchema),
                }}
            />
            <MobilePageClient />
        </>
    );
}
