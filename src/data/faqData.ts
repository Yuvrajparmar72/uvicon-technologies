export interface FAQItem {
    id: string;
    category: string;
    question: string;
    answer: string;
}

export const homeFaqs: FAQItem[] = [
    {
        id: "faq-1",
        category: "Algo Trading & Software",
        question: "How fast is Uvicon's algorithmic trading software execution latency?",
        answer: "Uvicon Pro trading engine delivers sub-0.1ms execution latency with direct API connectivity to major Indian brokerages (Zerodha, Angel One, Dhan, Alice Blue, Fyers). Built on high-performance C++ core and Redis caching, our architecture ensures zero slippage slippage-protected order routing."
    },
    {
        id: "faq-2",
        category: "Web & Enterprise SaaS",
        question: "What technology stack does Uvicon use for custom Web & SaaS development?",
        answer: "We build modern, ultra-fast web platforms using Next.js (App Router), TypeScript, React, Node.js, Tailwind CSS, PostgreSQL, and Cloudflare edge networks. All projects achieve 95+ Google Lighthouse scores, complete WCAG compliance, and sub-1.2s page loads."
    },
    {
        id: "faq-3",
        category: "Security & Ownership",
        question: "Do clients get 100% full source code ownership and NDA protection?",
        answer: "Yes, absolutely. Upon final project sign-off, you receive 100% intellectual property (IP) rights and complete unencrypted source code repositories. We execute strict Non-Disclosure Agreements (NDAs) prior to discussing any technical architecture or strategy."
    },
    {
        id: "faq-4",
        category: "Project Delivery",
        question: "What is the typical delivery timeline for custom software or web platforms?",
        answer: "Standard web platforms and custom CRM tools are typically delivered within 2 to 4 weeks. Complex enterprise SaaS platforms, algorithmic strategy engines, or cross-platform mobile apps take 4 to 8 weeks depending on scope, API integrations, and QA testing cycles."
    },
    {
        id: "faq-5",
        category: "Support & Maintenance",
        question: "How does Uvicon handle post-launch technical support and maintenance?",
        answer: "Every project includes 30 to 90 days of complimentary post-launch technical support, covering 24/7 server monitoring, critical bug fixes, security patches, and API updates. We also offer ongoing monthly SLA maintenance plans for enterprise clients."
    },
    {
        id: "faq-6",
        category: "Custom Features",
        question: "Can I request a custom backtesting engine or bespoke API integration?",
        answer: "Yes. Our engineering team specializes in custom strategy backtesting engines, proprietary indicators, WebSockets live market data feeds, multi-broker copy trading architectures, and custom CRM automation pipelines tailored specifically to your business workflows."
    }
];

export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}
