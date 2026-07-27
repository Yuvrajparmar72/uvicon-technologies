export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    projectType: "Algo Trading" | "Web Development" | "CRM & SaaS" | "Mobile App" | "Game Development" | "AI & Agents";
    review: string;
    date: string;
}

export const testimonialsData: Testimonial[] = [
    // --- ALGO TRADING & FINTECH (8 Reviews) ---
    {
        id: "algo-1",
        name: "Rahul Mehta",
        role: "Founder & Quantitative Strategist",
        company: "TradeVista Analytics (Mumbai)",
        avatar: "/assets/images/testimonials/rahul-mehta.webp",
        rating: 5,
        projectType: "Algo Trading",
        review: "Uvicon Pro transformed our quantitative trading workflow. The backtesting engine processes 5 years of tick-by-tick market data in under 4 seconds, and the multi-broker bridge handled our automated order execution cleanly with sub-0.1ms latency.",
        date: "2025-11-15"
    },
    {
        id: "algo-2",
        name: "Karan Singhania",
        role: "Head of Proprietary Trading",
        company: "QuantEdge Capital (Bengaluru)",
        avatar: "/assets/images/testimonials/karan-singhania.webp",
        rating: 5,
        projectType: "Algo Trading",
        review: "We commissioned a custom Python-C++ execution engine for Zerodha & AngelOne WebSocket feeds. Uvicon's team built fail-safe stop-loss modules and auto-reconnection logic that survived peak market volatility without a single dropped packet.",
        date: "2025-12-04"
    },
    {
        id: "algo-3",
        name: "Devendra Patel",
        role: "Senior Algo Architect",
        company: "AlphaPulse Systems (Ahmedabad)",
        avatar: "/assets/images/testimonials/devendra-patel.webp",
        rating: 4,
        projectType: "Algo Trading",
        review: "Great experience building multi-account copy trading architecture. Their WebSockets sync and risk management dashboard allow parameter tweaks on live strategies in real-time. Initial setup took 2 weeks longer than estimated, but code quality is rock solid.",
        date: "2025-10-19"
    },
    {
        id: "algo-4",
        name: "Siddharth Verma",
        role: "Independent Quantitative Trader",
        company: "OptionMatrix (Delhi NCR)",
        avatar: "/assets/images/testimonials/siddharth-verma.webp",
        rating: 5,
        projectType: "Algo Trading",
        review: "The option greeks calculation module and live straddle/strangle strategy tester built by Uvicon operate seamlessly. The UI makes paper trading and live deployment straightforward without needing to write custom API wrappers.",
        date: "2026-01-09"
    },
    {
        id: "algo-5",
        name: "Meera Krishnan",
        role: "Operations Lead",
        company: "DeltaCurve Algo Labs (Chennai)",
        avatar: "/assets/images/testimonials/meera-krishnan.webp",
        rating: 5,
        projectType: "Algo Trading",
        review: "Uvicon integrated automated trailing stop-loss algorithms across 4 broker APIs for our sub-brokers. System uptime has been 99.99% over 6 months of active market hours.",
        date: "2025-08-28"
    },
    {
        id: "algo-6",
        name: "Amitabh Banerjee",
        role: "Director",
        company: "FinTech Orbit (Kolkata)",
        avatar: "/assets/images/testimonials/amitabh-banerjee.webp",
        rating: 5,
        projectType: "Algo Trading",
        review: "Backtesting institutional multi-leg option strategies used to freeze our previous platform. Uvicon's Redis-backed architecture processes 500+ strategy variations smoothly with zero browser lag.",
        date: "2025-09-14"
    },
    {
        id: "algo-7",
        name: "Vikramaditya Rao",
        role: "Fund Manager",
        company: "Apex Wealth Tech (Hyderabad)",
        avatar: "/assets/images/testimonials/vikramaditya-rao.webp",
        rating: 4,
        projectType: "Algo Trading",
        review: "Strict adherence to API security standards and broker OAuth compliance. Their team clearly understands financial markets logic, slippage modeling, and order routing.",
        date: "2026-02-01"
    },
    {
        id: "algo-8",
        name: "Sameer Joshi",
        role: "Product Manager",
        company: "TradeSmart Solutions (Pune)",
        avatar: "/assets/images/testimonials/sameer-joshi.webp",
        rating: 5,
        projectType: "Algo Trading",
        review: "Custom algorithmic strategy dashboard with interactive TradingView charts integration. The latency from signal generation to order placement is virtually imperceptible.",
        date: "2025-11-30"
    },

    // --- WEB DEVELOPMENT & ENTERPRISE PORTALS (8 Reviews) ---
    {
        id: "web-1",
        name: "Vikram Joshi",
        role: "Managing Director",
        company: "CloudBridge Enterprises (Mumbai)",
        avatar: "/assets/images/testimonials/vikram-joshi.webp",
        rating: 5,
        projectType: "Web Development",
        review: "Our enterprise website rebuild with Uvicon was flawless — Google Lighthouse scores hit 99+, page loads under 1.2s, and the glassmorphism design gets compliments from every client. Their 4-step Agile process kept us informed at every stage.",
        date: "2026-01-18"
    },
    {
        id: "web-2",
        name: "Ananya Deshmukh",
        role: "Head of Marketing",
        company: "Zenith Global Solutions (Pune)",
        avatar: "/assets/images/testimonials/ananya-deshmukh.webp",
        rating: 5,
        projectType: "Web Development",
        review: "We migrated from a slow WordPress setup to a custom Next.js web application built by Uvicon. Organic traffic increased 35% in 3 months due to instant page load speeds and perfect Core Web Vitals.",
        date: "2025-10-05"
    },
    {
        id: "web-3",
        name: "Rajesh Nair",
        role: "Chief Operating Officer",
        company: "LogiTech Express (Kochi)",
        avatar: "/assets/images/testimonials/rajesh-nair.webp",
        rating: 4,
        projectType: "Web Development",
        review: "Clean responsive layouts across mobile, tablet, and desktop. The custom CMS they integrated allows our marketing team to publish landing pages without waiting on developers.",
        date: "2025-12-12"
    },
    {
        id: "web-4",
        name: "Shalini Saxena",
        role: "Brand Director",
        company: "LuxeSpace Interiors (Gurugram)",
        avatar: "/assets/images/testimonials/shalini-saxena.webp",
        rating: 5,
        projectType: "Web Development",
        review: "The visual presentation of our portfolio web app is top tier. Micro-animations, dark mode toggle, and smooth page transitions make our catalog look like a high-end luxury portal.",
        date: "2025-11-02"
    },
    {
        id: "web-5",
        name: "Tushar Malhotra",
        role: "VP of Engineering",
        company: "InnoWave Systems (Noida)",
        avatar: "/assets/images/testimonials/tushar-malhotra.webp",
        rating: 5,
        projectType: "Web Development",
        review: "Clean TypeScript architecture with full SSR/ISR support. Their code structure made it easy for our internal tech team to add custom API routes after handoff.",
        date: "2026-01-25"
    },
    {
        id: "web-6",
        name: "Nandini Ranganathan",
        role: "Founder",
        company: "EcoVerse Retail (Bengaluru)",
        avatar: "/assets/images/testimonials/nandini-ranganathan.webp",
        rating: 5,
        projectType: "Web Development",
        review: "E-commerce web app loading under 900ms. Mobile conversion rates jumped by 28% after Uvicon redesigned our checkout flow with modern glassmorphic UI elements.",
        date: "2025-09-18"
    },
    {
        id: "web-7",
        name: "Gaurav Roy",
        role: "Co-Founder",
        company: "FinEdge Advisory (Kolkata)",
        avatar: "/assets/images/testimonials/gaurav-roy.webp",
        rating: 4,
        projectType: "Web Development",
        review: "Delivered our corporate website 4 days ahead of schedule. Excellent SEO optimization with proper schema markup, Open Graph tags, and structured heading hierarchy.",
        date: "2025-08-11"
    },
    {
        id: "web-8",
        name: "Pooja Hegde",
        role: "Creative Lead",
        company: "PixelCraft Media (Hyderabad)",
        avatar: "/assets/images/testimonials/pooja-hegde.webp",
        rating: 5,
        projectType: "Web Development",
        review: "Finding a dev agency that respects pixel-perfect UI designs from Figma is rare. Uvicon matched every vector asset, font scale, and CSS token without compromise.",
        date: "2025-12-28"
    },

    // --- CRM & ENTERPRISE SAAS (7 Reviews) ---
    {
        id: "crm-1",
        name: "Priya Sharma",
        role: "Head of Sales",
        company: "NexFlow CRM Solutions (Delhi)",
        avatar: "/assets/images/testimonials/priya-sharma.webp",
        rating: 5,
        projectType: "CRM & SaaS",
        review: "Uvicon Connect replaced three separate tools we were paying for. Real-time Kanban pipelines, automated lead distribution, and client analytics — all in one dashboard. Our sales team onboarded in under two days.",
        date: "2025-09-22"
    },
    {
        id: "crm-2",
        name: "Manish Agarwal",
        role: "Chief Commercial Officer",
        company: "OmniChannel Logistics (Surat)",
        avatar: "/assets/images/testimonials/manish-agarwal.webp",
        rating: 5,
        projectType: "CRM & SaaS",
        review: "Custom SaaS portal managing 15,000+ daily shipment leads with real-time WebSockets status updates. System stability has been flawless even during peak festive sale rushes.",
        date: "2025-11-20"
    },
    {
        id: "crm-3",
        name: "Bhavna Kulkarni",
        role: "Operations Manager",
        company: "EduSphere Learning (Pune)",
        avatar: "/assets/images/testimonials/bhavna-kulkarni.webp",
        rating: 4,
        projectType: "CRM & SaaS",
        review: "Automated student lead distribution CRM with role-based access control (RBAC). Cut manual assignment effort by 80% across 12 branch offices.",
        date: "2026-01-04"
    },
    {
        id: "crm-4",
        name: "Sanjay Singhal",
        role: "Managing Director",
        company: "PrimeEstate Reality (Jaipur)",
        avatar: "/assets/images/testimonials/sanjay-singhal.webp",
        rating: 5,
        projectType: "CRM & SaaS",
        review: "Real-estate lead tracking SaaS with WhatsApp API integration. Sales agents receive instant notifications when a site visit lead is assigned, reducing response time to under 3 minutes.",
        date: "2025-10-14"
    },
    {
        id: "crm-5",
        name: "Ritu Mathur",
        role: "Head of Customer Support",
        company: "ServiceSync (Bengaluru)",
        avatar: "/assets/images/testimonials/ritu-mathur.webp",
        rating: 5,
        projectType: "CRM & SaaS",
        review: "Ticket management system with automated SLA escalation workflows. Clean UI, smooth filtering by status/priority, and intuitive agent performance reporting.",
        date: "2025-12-15"
    },
    {
        id: "crm-6",
        name: "Abhishek Chawla",
        role: "Founder",
        company: "B2B Connect (Gurugram)",
        avatar: "/assets/images/testimonials/abhishek-chawla.webp",
        rating: 5,
        projectType: "CRM & SaaS",
        review: "Multi-tenant SaaS architecture built on PostgreSQL and Next.js. Data isolation between client accounts is airtight, and tenant onboarding takes less than 60 seconds.",
        date: "2026-02-10"
    },
    {
        id: "crm-7",
        name: "Kavita Menon",
        role: "VP of Operations",
        company: "InsurTech Direct (Chennai)",
        avatar: "/assets/images/testimonials/kavita-menon.webp",
        rating: 4,
        projectType: "CRM & SaaS",
        review: "Custom claims processing CRM dashboard. Reduced average claim verification cycle from 5 days to 1.5 days through integrated document previewers and automated checks.",
        date: "2025-09-02"
    },

    // --- MOBILE APPS - iOS & ANDROID (5 Reviews) ---
    {
        id: "app-1",
        name: "Harish Pillai",
        role: "Product Owner",
        company: "QuickPay Wallet (Bengaluru)",
        avatar: "/assets/images/testimonials/harish-pillai.webp",
        rating: 5,
        projectType: "Mobile App",
        review: "Cross-platform Flutter application built with bio-metric authentication, instant UPI SDK integration, and smooth 60fps page navigation. Passed Apple App Store and Google Play reviews on first submission.",
        date: "2025-11-08"
    },
    {
        id: "app-2",
        name: "Divya Sundaram",
        role: "Co-Founder",
        company: "FitPulse Health (Hyderabad)",
        avatar: "/assets/images/testimonials/divya-sundaram.webp",
        rating: 5,
        projectType: "Mobile App",
        review: "Native Swift iOS app with Apple HealthKit integration and real-time workout tracking. The UI design is clean, battery consumption is minimal, and user retention grew 45% in 60 days.",
        date: "2025-12-22"
    },
    {
        id: "app-3",
        name: "Ketan Trivedi",
        role: "CTO",
        company: "FleetTrack Mobility (Ahmedabad)",
        avatar: "/assets/images/testimonials/ketan-trivedi.webp",
        rating: 4,
        projectType: "Mobile App",
        review: "GPS driver tracking app built for Android with offline data sync. Works reliably even when drivers traverse low-connectivity highways across western India.",
        date: "2026-01-14"
    },
    {
        id: "app-4",
        name: "Shruti Kapoor",
        role: "Head of Product",
        company: "StyleHub Commerce (Mumbai)",
        avatar: "/assets/images/testimonials/shruti-kapoor.webp",
        rating: 5,
        projectType: "Mobile App",
        review: "React Native shopping app with push notifications, AR try-on feature, and seamless payment gateway. Crash rate is below 0.02% over 50,000 active downloads.",
        date: "2025-10-27"
    },
    {
        id: "app-5",
        name: "Varun Malhotra",
        role: "Founder",
        company: "EventPass India (Delhi)",
        avatar: "/assets/images/testimonials/varun-malhotra.webp",
        rating: 5,
        projectType: "Mobile App",
        review: "Event ticketing app with offline QR code scanner for entry gates. Scanned 10,000+ tickets at our annual concert with zero delay or double-entry glitches.",
        date: "2025-08-19"
    },

    // --- GAME DEVELOPMENT (5 Reviews) ---
    {
        id: "game-1",
        name: "Sneha Reddy",
        role: "Product Manager",
        company: "GameForge Studios (Bengaluru)",
        avatar: "/assets/images/testimonials/sneha-reddy.webp",
        rating: 5,
        projectType: "Game Development",
        review: "From 3D concept art to cross-platform Unity publishing, Uvicon handled our entire game pipeline. The multiplayer mechanics are buttery smooth, maintaining 60fps even on mid-range smartphones.",
        date: "2025-12-03"
    },
    {
        id: "game-2",
        name: "Aman Preet Singh",
        role: "Lead Game Designer",
        company: "PixelStorm Games (Chandigarh)",
        avatar: "/assets/images/testimonials/aman-preet-singh.webp",
        rating: 5,
        projectType: "Game Development",
        review: "2D isometric puzzle game with custom physics engine and integrated in-app purchases. Uvicon's optimization kept game build size under 45MB while maintaining HD visual fidelity.",
        date: "2025-09-30"
    },
    {
        id: "game-3",
        name: "Rohan Varma",
        role: "Studio Head",
        company: "Chakra Interactive (Pune)",
        avatar: "/assets/images/testimonials/rohan-varma.webp",
        rating: 4,
        projectType: "Game Development",
        review: "Multiplayer WebGL game playable directly in mobile browsers without downloads. Smart asset streaming logic prevents initial load freezes.",
        date: "2026-01-30"
    },
    {
        id: "game-4",
        name: "Meghna Bhatia",
        role: "Producer",
        company: "Mythic Realms Studio (Mumbai)",
        avatar: "/assets/images/testimonials/meghna-bhatia.webp",
        rating: 5,
        projectType: "Game Development",
        review: "Custom shader graphics and character animation rigging for our mobile RPG game. The particle effects run smoothly without overheating devices.",
        date: "2025-11-12"
    },
    {
        id: "game-5",
        name: "Yashwant Rao",
        role: "Founder",
        company: "IndiePlay Games (Hyderabad)",
        avatar: "/assets/images/testimonials/yashwant-rao.webp",
        rating: 5,
        projectType: "Game Development",
        review: "Hyper-casual game development with automated ad-mediation SDKs (AppLovin & Unity Ads). Reached #4 in Google Play Arcade category within 3 weeks of launch.",
        date: "2025-08-04"
    },

    // --- AI & WORKFLOW AGENTS (5 Reviews) ---
    {
        id: "ai-1",
        name: "Dr. Anil Kapoor",
        role: "CTO",
        company: "UHMB Healthcare Services (Delhi NCR)",
        avatar: "/assets/images/testimonials/anil-kapoor.webp",
        rating: 4,
        projectType: "AI & Agents",
        review: "We needed a HIPAA-compliant AI medical document parser and booking agent. Uvicon delivered an intelligent agent system with instant appointment scheduling and EHR management with sub-second response times.",
        date: "2025-07-10"
    },
    {
        id: "ai-2",
        name: "Nikhil Srivastava",
        role: "Head of AI & Automation",
        company: "FinCognitive Technologies (Gurugram)",
        avatar: "/assets/images/testimonials/nikhil-srivastava.webp",
        rating: 5,
        projectType: "AI & Agents",
        review: "Built autonomous document extraction agents processing 500+ PDF invoices daily. Accuracy rate is over 98.5%, saving our accounts team 30+ manual hours every week.",
        date: "2025-12-19"
    },
    {
        id: "ai-3",
        name: "Preeti Shenoy",
        role: "Operations Director",
        company: "LexAssist Legal (Bengaluru)",
        avatar: "/assets/images/testimonials/preeti-shenoy.webp",
        rating: 5,
        projectType: "AI & Agents",
        review: "Custom RAG (Retrieval-Augmented Generation) agent for legal document research. Answers complex contract queries with precise page/clause citations in seconds.",
        date: "2026-02-05"
    },
    {
        id: "ai-4",
        name: "Kartik Nambiar",
        role: "Co-Founder",
        company: "SupportBot AI (Kochi)",
        avatar: "/assets/images/testimonials/kartik-nambiar.webp",
        rating: 5,
        projectType: "AI & Agents",
        review: "Multi-lingual AI customer support agent integrated with WhatsApp Business API. Handles 70% of routine customer queries automatically without human escalation.",
        date: "2025-10-22"
    },
    {
        id: "ai-5",
        name: "Tarun Chhabra",
        role: "VP of Product",
        company: "DataCraft Analytics (Noida)",
        avatar: "/assets/images/testimonials/tarun-chhabra.webp",
        rating: 4,
        projectType: "AI & Agents",
        review: "Seamless LLM pipeline orchestration using modern vector databases. Uvicon's team built guardrails that completely eliminated hallucination risks in client-facing answers.",
        date: "2025-11-25"
    }
];
