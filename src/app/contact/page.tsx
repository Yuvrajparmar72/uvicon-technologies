import React from "react";
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us | Uvicon Technologies — Direct Tech Lead Consultation",
    description:
        "Connect directly with Uvicon's Lead Software Architects and quant engineers. Schedule a free technical consultation, lock in sprint scope, or request a mutual NDA.",
    openGraph: {
        title: "Contact Us | Uvicon Technologies",
        description:
            "Direct access to Lead Architects and dedicated engineering squads. Guaranteed sub-15min response time.",
        url: "https://uvicon.in/contact",
        siteName: "Uvicon Technologies",
        images: [
            {
                url: "/assets/images/uvicon-pro-preview.png",
                width: 1200,
                height: 630,
                alt: "Uvicon Technologies Contact & Consultation Desk",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us | Uvicon Technologies",
        description:
            "Schedule your technical consultation directly with our Lead Architects.",
        images: ["/assets/images/uvicon-pro-preview.png"],
    },
    alternates: {
        canonical: "https://uvicon.in/contact",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Uvicon Technologies",
    "url": "https://uvicon.in/contact",
    "description":
        "Direct communication channels and project inquiry form for Uvicon Technologies engineering studio.",
    "publisher": {
        "@type": "Organization",
        "name": "Uvicon Technologies",
        "url": "https://uvicon.in",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Behind Climax Academy, Panna Naka",
            "addressLocality": "Chhatarpur",
            "addressRegion": "Madhya Pradesh",
            "postalCode": "471001",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Technical Sales & Architectural Inquiries",
            "telephone": "+91-8889007424",
            "email": "uvicontechnologies@gmail.com",
            "availableLanguage": ["English", "Hindi"]
        }
    }
};

export default function ContactPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactClient />
        </>
    );
}
