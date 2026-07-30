import React from "react";
import { Metadata } from "next";
import ResourcesPageClient from "./ResourcesPageClient";

export const metadata: Metadata = {
  title: "Resources, Case Studies, FAQs & Technical Tutorials | Uvicon",
  description:
    "Explore Uvicon Technologies engineering resources: enterprise client case studies, Next.js tutorials, algo trading backtesting guides, and B2B SaaS architecture insights.",
  openGraph: {
    title: "Resources, Case Studies, FAQs & Technical Tutorials | Uvicon",
    description:
      "Actionable digital engineering insights, high-throughput Next.js tutorials, institutional algorithmic trading backtesting guides, and enterprise case studies in India.",
    url: "https://uvicon.in/resources",
    siteName: "Uvicon Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources, Case Studies, FAQs & Technical Tutorials | Uvicon",
    description:
      "Enterprise software case studies, high-speed Next.js tutorials, and algo trading backtesting architecture guides.",
  },
};

/* ==========================================================================
   JSON-LD STRUCTURED DATA SCHEMA FOR SEO & GEO
   ========================================================================== */

const resourcesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://uvicon.in/#organization",
      name: "Uvicon Technologies",
      url: "https://uvicon.in",
      logo: "https://uvicon.in/assets/icons/uvicon-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@uvicon.in",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://uvicon.in/resources/#webpage",
      url: "https://uvicon.in/resources",
      name: "Uvicon Engineering Resources & Knowledge Hub",
      description:
        "Technical case studies, Next.js tutorials, quantitative algo backtesting architecture guides, and B2B SaaS engineering whitepapers.",
      isPartOf: {
        "@id": "https://uvicon.in/#website",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Are Uvicon's technical tutorials, case studies, and architecture blueprints free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All technical tutorials, case study breakdowns, and architectural blueprints published on this Knowledge Hub are completely open and free to reference for your engineering teams. We believe in transparent, reproducible B2B tech education.",
          },
        },
        {
          "@type": "Question",
          name: "How do your algorithmic trading resources comply with financial and regulatory guidelines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All quantitative and algorithmic trading content on this platform is strictly educational and architectural. We discuss software architecture, backtesting logic, and broker connectivity only. We never provide investment advice, assert guaranteed returns, assure profit, or make risk-free claims per our company compliance contract.",
          },
        },
        {
          "@type": "Question",
          name: "Can we request custom consulting or engineering support based on one of your case studies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. If you see an architecture pattern, CRM system, or algo backtesting framework in our case studies that matches your roadmap, you can book a consultation with our architecture pod to implement a tailored version for your enterprise.",
          },
        },
        {
          "@type": "Question",
          name: "How frequently are these tutorials, benchmarks, and engineering insights updated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We review and update evergreen tutorials, SEO/GEO guidelines, and benchmark datasets at least once per quarter to ensure consistency with Next.js releases, browser engines, and financial technology standards.",
          },
        },
      ],
    },
  ],
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resourcesSchema),
        }}
      />
      <ResourcesPageClient />
    </>
  );
}
