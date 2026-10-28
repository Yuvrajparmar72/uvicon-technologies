"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CostCalculatorModal from "./CostCalculatorModal";
import {
    Code2, Cloud, Globe, Terminal, Database, Cpu, Zap, Smartphone, Shield, Server,
    Wifi, Lock, Network, Key, Blocks, HardDrive, Compass, Focus, CircuitBoard,
    Activity, Bluetooth, Fingerprint, Layers, CreditCard, Sparkles, TrendingUp,
    Gamepad2, Store, Monitor, Binary, CheckCircle2, DollarSign, IndianRupee, Mail,
    UserPlus, LogIn, ShoppingCart, Home, BookOpen, Grid, Settings, Share2,
    Infinity as InfinityIcon, Code, BarChart3, HelpCircle, Laptop, Radio,
    MonitorSmartphone, MousePointer, Hash, Filter, Eye, Layers3, Flame, Award,
    Tag, Bell, Sliders, Play, ArrowUpRight, ArrowLeft, ArrowRight,
    ChevronDown, Check, Star
} from "lucide-react";

const availableIcons = [
    Code2, Cloud, Globe, Terminal, Database, Cpu, Zap, Smartphone, Shield, Server,
    Wifi, Lock, Network, Key, Blocks, HardDrive, Compass, Focus, CircuitBoard,
    Activity, Bluetooth, Fingerprint, Layers, CreditCard, Sparkles, TrendingUp,
    Gamepad2, Store, Monitor, Binary, CheckCircle2, DollarSign, IndianRupee, Mail,
    UserPlus, LogIn, ShoppingCart, Home, BookOpen, Grid, Settings, Share2,
    InfinityIcon, Code, BarChart3, HelpCircle, Laptop, Radio,
    MonitorSmartphone, MousePointer, Hash, Filter, Eye, Layers3, Flame, Award,
    Tag, Bell, Sliders, Play
];

interface CategoryTier {
    name: string;
    price: string;
    period: string;
    popular?: boolean;
    badge: string;
    features: string[];
    ctaText: string;
    ctaHref: string;
}

interface CategoryInfo {
    shortDesc: string;
    fullDesc: string;
    highlights: string[];
    tiers: CategoryTier[];
}

const categoryData: Record<string, CategoryInfo> = {
    "SOFTWARE DEVELOPMENT": {
        shortDesc: "End-to-end custom software solutions built with modern architectures. From SaaS platforms to internal tools, we deliver production-ready software with agile sprints.",
        fullDesc: "Our software development team specializes in building scalable, maintainable applications using cutting-edge technologies like Next.js, Node.js, Go, and Python. We follow strict CI/CD practices, automated testing, and zero-downtime deployment strategies. Every project comes with 100% IP ownership, comprehensive documentation, and post-launch support to ensure your product thrives in production.",
        highlights: ["Agile Sprints", "100% IP Ownership", "CI/CD Pipelines", "Post-Launch Support"],
        tiers: [
            { name: "Starter", price: "₹99,000", period: "per project", badge: "Basic", features: ["Single Module Development", "Basic UI/UX Design", "API Integration", "Cloud Deployment", "Source Code Ownership", "1 Week Post-Launch Support"], ctaText: "Get Started", ctaHref: "/contact?category=software&tier=starter" },
            { name: "Growth", price: "₹2,49,000", period: "per month", popular: true, badge: "Most Popular", features: ["Full-Stack Development Squad", "Advanced UI/UX & Prototyping", "Custom Backend Architecture", "Automated Testing & QA", "CI/CD Pipeline Setup", "Dedicated Tech Lead", "4 Weeks Post-Launch Support"], ctaText: "Scale Up", ctaHref: "/contact?category=software&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Enterprise System Architecture", "Microservices & Event-Driven Design", "Zero Trust Security", "Legacy Migration", "24/7 Monitoring & Ops", "Dedicated Solutions Architect", "SLA Guarantees"], ctaText: "Contact Team", ctaHref: "/contact?category=software&tier=enterprise" }
        ]
    },
    "APPLICATION DEVELOPMENT": {
        shortDesc: "Native & cross-platform mobile applications for iOS and Android. We build performant, beautiful apps that users love and businesses rely on.",
        fullDesc: "From React Native to Flutter and native Swift/Kotlin, we craft mobile experiences that are fast, intuitive, and scalable. Our mobile team handles everything from initial concept and UI/UX design to App Store optimization and post-launch analytics. We integrate push notifications, offline-first architecture, real-time sync, and biometric authentication for enterprise-grade mobile solutions.",
        highlights: ["Cross-Platform", "App Store Optimization", "Push Notifications", "Offline-First"],
        tiers: [
            { name: "Starter", price: "₹1,29,000", period: "per app", badge: "Basic", features: ["Single Platform (iOS or Android)", "Up to 8 Screens", "Basic UI Components", "API Integration", "App Store Submission", "1 Week Support"], ctaText: "Get Started", ctaHref: "/contact?category=app&tier=starter" },
            { name: "Growth", price: "₹2,99,000", period: "per month", popular: true, badge: "Most Popular", features: ["Cross-Platform (iOS + Android)", "Unlimited Screens", "Custom Animations & UI", "Push Notifications", "Offline Mode & Sync", "Analytics Dashboard", "4 Weeks Support"], ctaText: "Build Now", ctaHref: "/contact?category=app&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Enterprise Mobile Suite", "Biometric Authentication", "MDM Integration", "Custom SDK Development", "White-Label Solutions", "24/7 Support & SLA", "Dedicated Mobile Team"], ctaText: "Contact Team", ctaHref: "/contact?category=app&tier=enterprise" }
        ]
    },
    "WEBSITE DEVELOPMENT": {
        shortDesc: "High-performance, SEO-optimized websites built with Next.js and modern web technologies. Stunning designs that convert visitors into customers.",
        fullDesc: "We build blazing-fast websites using Next.js, React, and modern CSS frameworks with server-side rendering for maximum SEO performance. Our websites score 95+ on Core Web Vitals, include responsive design for all devices, and come with integrated analytics, CMS, and conversion optimization. From landing pages to complex web portals, we deliver pixel-perfect experiences.",
        highlights: ["95+ Lighthouse Score", "SEO Optimized", "Responsive Design", "CMS Integration"],
        tiers: [
            { name: "Starter", price: "₹49,000", period: "per site", badge: "Basic", features: ["Up to 5 Pages", "Responsive Design", "Basic SEO Setup", "Contact Form", "SSL Certificate", "1 Month Hosting"], ctaText: "Get Started", ctaHref: "/contact?category=web&tier=starter" },
            { name: "Growth", price: "₹1,49,000", period: "per project", popular: true, badge: "Most Popular", features: ["Up to 15 Pages", "Custom UI/UX Design", "Advanced SEO & Analytics", "CMS Integration", "Blog & Dynamic Content", "Performance Optimization", "3 Months Support"], ctaText: "Build Now", ctaHref: "/contact?category=web&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Unlimited Pages", "Custom Web Application", "E-commerce Integration", "Multi-language Support", "Advanced Security", "CDN & Caching", "Dedicated Web Team"], ctaText: "Contact Team", ctaHref: "/contact?category=web&tier=enterprise" }
        ]
    },
    "ALGO SOFTWARE": {
        shortDesc: "High-frequency algorithmic trading platforms with ultra-low latency execution. Built for traders who demand speed, accuracy, and reliability.",
        fullDesc: "Our algo trading solutions are engineered for sub-millisecond execution with direct exchange connectivity, real-time market data processing, and advanced risk management systems. We build custom strategy engines, backtesting frameworks, and portfolio management tools that handle thousands of orders per second while maintaining strict compliance and audit trails.",
        highlights: ["Ultra-Low Latency", "Backtesting Engine", "Risk Management", "Exchange Connectivity"],
        tiers: [
            { name: "Starter", price: "₹1,99,000", period: "per setup", badge: "Basic", features: ["Single Strategy Engine", "Basic Backtesting", "Paper Trading Mode", "Market Data Feed", "Basic Risk Controls", "Email Alerts"], ctaText: "Get Started", ctaHref: "/contact?category=algo&tier=starter" },
            { name: "Growth", price: "₹4,49,000", period: "per month", popular: true, badge: "Most Popular", features: ["Multi-Strategy Engine", "Advanced Backtesting & Optimization", "Live Trading with Risk Management", "Real-Time P&L Dashboard", "Custom Indicators", "API Access", "Priority Support"], ctaText: "Start Trading", ctaHref: "/contact?category=algo&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Co-located Infrastructure", "Direct Exchange Access", "Custom Matching Engine", "Advanced Risk & Compliance", "Multi-Asset Support", "24/7 Monitoring", "Dedicated Quant Team"], ctaText: "Contact Team", ctaHref: "/contact?category=algo&tier=enterprise" }
        ]
    },
    "SCALPING SOFTWARE": {
        shortDesc: "Lightning-fast scalping tools designed for high-frequency intraday traders. Maximize your profits with precision entry and exit automation.",
        fullDesc: "Our scalping software delivers microsecond-level execution with advanced order routing, smart position sizing, and automated profit booking. Built with real-time tick data processing, customizable scalping strategies, and integrated risk controls that protect your capital. Supports multiple brokers and exchanges with one-click trading and hotkey execution.",
        highlights: ["Microsecond Execution", "Auto Profit Booking", "Multi-Broker Support", "Hotkey Trading"],
        tiers: [
            { name: "Starter", price: "₹79,000", period: "per license", badge: "Basic", features: ["Single Broker Integration", "Basic Scalping Strategies", "Manual + Auto Mode", "Real-Time Charts", "Basic P&L Tracking", "Email Support"], ctaText: "Get Started", ctaHref: "/contact?category=scalping&tier=starter" },
            { name: "Growth", price: "₹1,99,000", period: "per month", popular: true, badge: "Most Popular", features: ["Multi-Broker Support", "Advanced Strategy Builder", "Smart Position Sizing", "Hotkey Execution", "Real-Time Risk Monitor", "Custom Indicators", "Priority Support"], ctaText: "Start Scalping", ctaHref: "/contact?category=scalping&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Institutional-Grade Infrastructure", "Co-location Support", "Custom Strategy Engine", "Multi-Exchange Routing", "Compliance & Audit Tools", "24/7 Support & SLA", "Dedicated Trading Tech Team"], ctaText: "Contact Team", ctaHref: "/contact?category=scalping&tier=enterprise" }
        ]
    },
    "GAMES": {
        shortDesc: "Immersive game development for mobile, web, and desktop platforms. From casual games to complex multiplayer experiences with stunning graphics.",
        fullDesc: "We create engaging gaming experiences using Unity, Unreal Engine, and custom WebGL frameworks. Our game development covers concept art, 3D modeling, physics engines, multiplayer networking, monetization systems, and cross-platform deployment. We specialize in both hyper-casual mobile games and complex multiplayer experiences with real-time leaderboards and social features.",
        highlights: ["Unity & Unreal", "Multiplayer Networking", "Cross-Platform", "Monetization Systems"],
        tiers: [
            { name: "Starter", price: "₹1,49,000", period: "per game", badge: "Basic", features: ["2D Mobile Game", "Up to 10 Levels", "Basic UI & Animations", "Ad Integration", "Play Store Submission", "1 Month Support"], ctaText: "Get Started", ctaHref: "/contact?category=games&tier=starter" },
            { name: "Growth", price: "₹3,99,000", period: "per project", popular: true, badge: "Most Popular", features: ["3D Game Development", "Multiplayer Support", "In-App Purchases", "Leaderboards & Achievements", "Custom Physics Engine", "Cross-Platform Deploy", "3 Months Support"], ctaText: "Build Game", ctaHref: "/contact?category=games&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["AAA-Quality Development", "MMO Infrastructure", "Custom Game Engine", "VR/AR Integration", "Anti-Cheat Systems", "Live Ops & Analytics", "Dedicated Game Studio"], ctaText: "Contact Team", ctaHref: "/contact?category=games&tier=enterprise" }
        ]
    },
    "CRM SOFTWARE": {
        shortDesc: "Custom CRM solutions that streamline your sales pipeline, automate follow-ups, and provide actionable insights to grow your business faster.",
        fullDesc: "Our CRM platforms are built to match your exact business workflow — from lead capture and scoring to deal management, email automation, and revenue forecasting. We integrate with your existing tools (WhatsApp, email, telephony) and provide real-time dashboards, custom reports, and AI-powered lead scoring to maximize your sales team's productivity and close rates.",
        highlights: ["Sales Automation", "WhatsApp Integration", "AI Lead Scoring", "Custom Dashboards"],
        tiers: [
            { name: "Starter", price: "₹89,000", period: "per setup", badge: "Basic", features: ["Contact Management", "Basic Pipeline View", "Email Integration", "Task Management", "Basic Reports", "Up to 5 Users"], ctaText: "Get Started", ctaHref: "/contact?category=crm&tier=starter" },
            { name: "Growth", price: "₹2,29,000", period: "per month", popular: true, badge: "Most Popular", features: ["Advanced Pipeline Management", "Email & WhatsApp Automation", "AI Lead Scoring", "Custom Dashboards & Reports", "Third-Party Integrations", "Up to 25 Users", "Priority Support"], ctaText: "Automate Sales", ctaHref: "/contact?category=crm&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Unlimited Users", "Custom Workflows & Automations", "Telephony Integration", "Revenue Forecasting", "Multi-Branch Support", "API Access & Webhooks", "Dedicated Account Manager"], ctaText: "Contact Team", ctaHref: "/contact?category=crm&tier=enterprise" }
        ]
    },
    "AI AGENTS": {
        shortDesc: "Autonomous AI agents that handle complex business tasks — from customer support to data analysis. Built with the latest LLM and multi-agent frameworks.",
        fullDesc: "We design and deploy intelligent AI agents using GPT, Gemini, Claude, and custom fine-tuned models. Our agents can autonomously handle customer inquiries, process documents, analyze data, generate reports, and orchestrate complex multi-step workflows. We build RAG pipelines, tool-calling agents, and multi-agent systems that integrate seamlessly with your existing business infrastructure.",
        highlights: ["Multi-Agent Systems", "RAG Pipelines", "Tool Calling", "Custom Fine-Tuning"],
        tiers: [
            { name: "Starter", price: "₹1,49,000", period: "per agent", badge: "Basic", features: ["Single AI Agent", "Basic Knowledge Base", "Chat Interface", "Email Integration", "Usage Analytics", "Monthly Token Limit"], ctaText: "Get Started", ctaHref: "/contact?category=ai&tier=starter" },
            { name: "Growth", price: "₹3,49,000", period: "per month", popular: true, badge: "Most Popular", features: ["Multi-Agent Orchestration", "RAG with Custom Data", "Tool Calling & API Access", "Voice & Chat Support", "Advanced Analytics", "Custom Fine-Tuning", "Priority Support"], ctaText: "Deploy Agents", ctaHref: "/contact?category=ai&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Enterprise AI Platform", "On-Premise Deployment", "Custom LLM Training", "Multi-Agent Workflows", "Compliance & Data Privacy", "Unlimited Usage", "Dedicated AI Team"], ctaText: "Contact Team", ctaHref: "/contact?category=ai&tier=enterprise" }
        ]
    },
    "EMPLOYEE MANAGEMENT": {
        shortDesc: "Complete HRMS & employee management systems with attendance tracking, payroll automation, and performance analytics for modern workplaces.",
        fullDesc: "Our employee management platforms cover the entire HR lifecycle — from recruitment and onboarding to attendance, leave management, payroll processing, performance reviews, and offboarding. We build custom portals with biometric integration, geo-fenced attendance, automated payroll calculations with tax compliance, and comprehensive analytics dashboards for data-driven HR decisions.",
        highlights: ["Payroll Automation", "Biometric Integration", "Leave Management", "Performance Reviews"],
        tiers: [
            { name: "Starter", price: "₹69,000", period: "per setup", badge: "Basic", features: ["Employee Directory", "Basic Attendance", "Leave Management", "Document Storage", "Basic Reports", "Up to 50 Employees"], ctaText: "Get Started", ctaHref: "/contact?category=hrms&tier=starter" },
            { name: "Growth", price: "₹1,79,000", period: "per month", popular: true, badge: "Most Popular", features: ["Biometric Attendance", "Payroll with Tax Compliance", "Performance Management", "Recruitment Module", "Custom Workflows", "Up to 500 Employees", "Priority Support"], ctaText: "Automate HR", ctaHref: "/contact?category=hrms&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Unlimited Employees", "Multi-Branch Management", "Custom Integrations", "Advanced Analytics", "Compliance Automation", "API Access", "Dedicated HR Tech Team"], ctaText: "Contact Team", ctaHref: "/contact?category=hrms&tier=enterprise" }
        ]
    },
    "SALES MANAGEMENT SOFTWARES": {
        shortDesc: "Powerful sales management platforms that track leads, automate outreach, and provide real-time revenue insights to supercharge your sales team.",
        fullDesc: "Our sales management solutions go beyond basic CRM — we build complete sales ecosystems with territory management, quota tracking, commission calculations, sales forecasting, and competitive intelligence. Integrated with email, WhatsApp, telephony, and social media for omnichannel outreach. Real-time dashboards give managers complete visibility into team performance and pipeline health.",
        highlights: ["Revenue Forecasting", "Commission Tracking", "Omnichannel Outreach", "Territory Management"],
        tiers: [
            { name: "Starter", price: "₹79,000", period: "per setup", badge: "Basic", features: ["Lead Management", "Basic Pipeline Tracking", "Email Templates", "Activity Logging", "Basic Dashboards", "Up to 10 Users"], ctaText: "Get Started", ctaHref: "/contact?category=sales&tier=starter" },
            { name: "Growth", price: "₹2,19,000", period: "per month", popular: true, badge: "Most Popular", features: ["Advanced Pipeline & Forecasting", "Omnichannel Communication", "Commission Calculator", "Territory Management", "Custom Reports & KPIs", "Up to 50 Users", "Priority Support"], ctaText: "Boost Sales", ctaHref: "/contact?category=sales&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Unlimited Users", "AI Sales Intelligence", "Custom Integrations", "Revenue Operations Suite", "Multi-Region Support", "API & Webhooks", "Dedicated Sales Tech Team"], ctaText: "Contact Team", ctaHref: "/contact?category=sales&tier=enterprise" }
        ]
    },
    "HOTEL MANAGEMENT SOFTWARES": {
        shortDesc: "Complete hotel management systems with booking engines, room management, POS integration, and guest experience platforms for hospitality businesses.",
        fullDesc: "Our hospitality solutions cover front desk operations, reservation management, channel manager integration (OTAs), housekeeping coordination, restaurant POS, inventory management, and guest engagement platforms. We build unified dashboards that give hoteliers real-time visibility into occupancy, revenue, and guest satisfaction across all properties.",
        highlights: ["Booking Engine", "Channel Manager", "POS Integration", "Guest Experience"],
        tiers: [
            { name: "Starter", price: "₹99,000", period: "per property", badge: "Basic", features: ["Room Management", "Basic Booking System", "Guest Check-in/out", "Invoice Generation", "Basic Reports", "Single Property"], ctaText: "Get Started", ctaHref: "/contact?category=hotel&tier=starter" },
            { name: "Growth", price: "₹2,49,000", period: "per month", popular: true, badge: "Most Popular", features: ["Multi-Channel Booking", "OTA Integration", "Restaurant POS", "Housekeeping Module", "Revenue Management", "Guest App", "Priority Support"], ctaText: "Upgrade Hotel", ctaHref: "/contact?category=hotel&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Multi-Property Management", "Central Reservation System", "Custom Channel Manager", "Advanced Revenue Optimization", "Loyalty Program", "API Integrations", "Dedicated Hospitality Team"], ctaText: "Contact Team", ctaHref: "/contact?category=hotel&tier=enterprise" }
        ]
    },
    "SEO MANAGEMENT SOFTWARES": {
        shortDesc: "Advanced SEO management platforms with keyword tracking, competitor analysis, and automated reporting to dominate search engine rankings.",
        fullDesc: "Our SEO platforms provide comprehensive search engine optimization tools — from technical SEO auditing and keyword research to backlink monitoring, content optimization, and rank tracking. We build custom dashboards with automated reporting, Google Search Console integration, competitor analysis, and AI-powered content suggestions that help businesses consistently improve their organic search visibility.",
        highlights: ["Rank Tracking", "Competitor Analysis", "Automated Reports", "Content Optimization"],
        tiers: [
            { name: "Starter", price: "₹49,000", period: "per setup", badge: "Basic", features: ["Keyword Tracking (100 keywords)", "Basic Site Audit", "Google Analytics Setup", "Monthly Reports", "On-Page SEO Guide", "Email Support"], ctaText: "Get Started", ctaHref: "/contact?category=seo&tier=starter" },
            { name: "Growth", price: "₹1,29,000", period: "per month", popular: true, badge: "Most Popular", features: ["Unlimited Keyword Tracking", "Advanced Technical Audit", "Competitor Monitoring", "Backlink Analysis", "Content Optimization AI", "Custom Dashboards", "Priority Support"], ctaText: "Rank Higher", ctaHref: "/contact?category=seo&tier=growth" },
            { name: "Enterprise", price: "Custom", period: "tailored scope", badge: "Enterprise", features: ["Multi-Domain Management", "White-Label Reports", "API Access", "Custom Integrations", "Dedicated SEO Strategist", "24/7 Monitoring", "Enterprise SLA"], ctaText: "Contact Team", ctaHref: "/contact?category=seo&tier=enterprise" }
        ]
    }
};

/* ==========================================================================
   PRICING FAQ DATA & SECTION COMPONENT
   (Billing-specific FAQ with accordion UI, SEO/GEO optimized)
   ========================================================================== */

const pricingFaqs = [
    {
        id: "pfaq-1",
        question: "How do you estimate timelines and milestone payments for custom software and web apps?",
        answer: "We use an agile milestone-based pricing model. After a comprehensive discovery session where we map out your functional requirements, technical architecture, and UI/UX scope, we provide a fixed-price proposal with clear sprint milestones. Payment is divided across defined delivery phases — typically 30% upfront on architecture approval, 40% on mid-sprint staging demo, and 30% on final production deployment."
    },
    {
        id: "pfaq-2",
        question: "Do we receive 100% intellectual property (IP) and custom source code ownership?",
        answer: "Yes, absolutely. Upon final project delivery and milestone completion, 100% of the intellectual property, custom source code, design assets, database scripts, and deployment configurations are legally transferred to your company. We work under strict non-disclosure agreements (NDAs) from day one to protect your confidential ideas."
    },
    {
        id: "pfaq-3",
        question: "What is your refund and project cancellation policy?",
        answer: "Our billing operates on mutually agreed milestone deliverables. If you choose to terminate an engagement prior to the completion of a sprint milestone, billing is pro-rated only for the actual engineering hours and approved deliverables completed up to that date. For full terms and refund conditions, please review our transparent Refund Policy."
    },
    {
        id: "pfaq-4",
        question: "How does licensing and billing work for Uvicon Pro algorithmic trading software?",
        answer: "Uvicon Pro is offered through flexible institutional software licensing and subscription tiers. In strict accordance with financial regulations and our compliance policy, we provide software architecture, broker connectivity hooks, and backtesting tools only. We never claim guaranteed returns, assure profit, or make risk-free claims."
    },
    {
        id: "pfaq-5",
        question: "Do you sign Non-Disclosure Agreements (NDAs) before discussing our project scope?",
        answer: "Yes. We routinely execute mutual or client-provided NDAs before our first technical discovery call. We maintain enterprise-grade access control, secure repository governance, and strict confidentiality across every engineering pod."
    },
    {
        id: "pfaq-6",
        question: "What post-launch SLA warranty and maintenance support is included in turnkey builds?",
        answer: "Every Full-Cycle Product Engineering delivery includes a 90-day post-launch SLA warranty covering bug fixes, browser compatibility, and performance monitoring at zero additional cost. Beyond the warranty period, we offer continuous 24/7 server health monitoring, security patch management, and dedicated SLA response times under our monthly support retainers."
    },
    {
        id: "pfaq-7",
        question: "Can I upgrade or downgrade my plan mid-project?",
        answer: "Yes — our engagement model is designed for flexibility. You can scale your team, add new feature modules, or adjust sprint scope at any milestone checkpoint without penalty. Upgrades are billed proportionally from the next sprint, and scope reductions are pro-rated. Your dedicated project manager handles all transitions seamlessly."
    },
    {
        id: "pfaq-8",
        question: "What payment methods do you accept?",
        answer: "We accept bank wire transfers (NEFT/RTGS/IMPS), UPI payments, credit/debit card payments via Razorpay, and international wire transfers for global clients. All invoices are GST-compliant with proper tax documentation. We also support milestone-based escrow arrangements for enterprise clients upon request."
    }
];

function PricingFaqSection() {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="pricing-faq" className="w-full relative z-40 px-4 sm:px-8 lg:px-16 pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 sm:mb-10"
                >
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#3FC1B8]/10 text-[#00595C] dark:text-[#3FC1B8] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#00595C]/20 dark:border-[#3FC1B8]/20 mb-4">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Billing & Engagement
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] tracking-tight mb-3">
                        Pricing Questions & Answers
                    </h2>
                    <p className="text-[#003D3F]/70 dark:text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed font-[family-name:var(--font-body)]">
                        Direct answers to common billing, payment, IP ownership, and engagement questions. Can&apos;t find what you need? <Link href="/contact" className="text-[#00595C] dark:text-[#3FC1B8] font-bold hover:underline underline-offset-2">Contact our team</Link>.
                    </p>
                </motion.div>

                {/* Accordion Grid */}
                <div className="flex flex-col gap-3 sm:gap-3.5">
                    {pricingFaqs.map((faq, idx) => {
                        const isOpen = openId === faq.id;
                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                                    isOpen
                                        ? "bg-white/85 dark:bg-[#001D1F]/90 border-[#00595C]/35 dark:border-[#3FC1B8]/40 shadow-md"
                                        : "bg-white/60 dark:bg-[#001719]/75 border-[#003D3F]/10 dark:border-white/[0.07] hover:border-[#00595C]/25 dark:hover:border-white/20"
                                } backdrop-blur-md`}
                            >
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#3FC1B8]/50 rounded-2xl sm:rounded-3xl cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center gap-3 min-w-0 pr-1">
                                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                            isOpen
                                                ? "bg-[#00595C] text-[#3FC1B8] dark:bg-[#3FC1B8] dark:text-[#002829]"
                                                : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8]"
                                        } transition-colors duration-300`}>
                                            <HelpCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                        </div>
                                        <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                            {faq.question}
                                        </h3>
                                    </div>

                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                        isOpen
                                            ? "bg-[#00595C]/15 text-[#00595C] dark:bg-[#3FC1B8]/20 dark:text-[#3FC1B8] rotate-180"
                                            : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/60 dark:text-white/60"
                                    }`}>
                                        <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </div>
                                </button>

                                {/* Expandable Content */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] border-t border-[#003D3F]/8 dark:border-white/8">
                                                <p className="pt-2.5">
                                                    {faq.answer}
                                                    {faq.id === "pfaq-3" && (
                                                        <>
                                                            {" "}
                                                            <Link href="/refund-policy" className="text-[#00595C] dark:text-[#3FC1B8] font-bold hover:underline underline-offset-2">
                                                                View Refund Policy →
                                                            </Link>
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

/* ==========================================================================
   MAIN PRICING PAGE CLIENT COMPONENT
   (FIXED ICONS + FIXED CENTER LOGO + LIGHT & DARK MODE SUPPORTED)
   ========================================================================== */


export default function PricingPageClient() {
    // Responsive screen detection to prevent mobile/tablet aspect-ratio squeezing and overlapping
    const [screenType, setScreenType] = useState<"mobile" | "tablet" | "desktop">("desktop");
    const [mounted, setMounted] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string>("SOFTWARE DEVELOPMENT");
    const [showMoreDesc, setShowMoreDesc] = useState(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

    // Reset "More" toggle when category changes
    useEffect(() => {
        setShowMoreDesc(false);
    }, [selectedOption]);

    // Ref kept for potential future use
    const heroScrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const updateScreen = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setScreenType("mobile");
            } else if (width < 1024) {
                setScreenType("tablet");
            } else {
                setScreenType("desktop");
            }
        };
        updateScreen();
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    // 1) Generate icons with exact ratio: 20% Big, 30% Medium, 50% Small
    // 2) Generate hollow glowing balls/rings in all remaining empty gaps
    // 3) Use screenType aspect ratio so ZERO overlap on mobile, tablet, or desktop
    const { denseIcons, dots } = useMemo(() => {
        const items: Array<{
            id: string;
            IconComponent: any;
            posX: number;
            posY: number;
            rotate: string;
            opacity: number;
            size: number;
            category: "big" | "medium" | "small";
            radiusPx: number;
        }> = [];

        // Dynamic virtual resolution & grid density based on device aspect ratio
        let VIRTUAL_W = 1400;
        let VIRTUAL_H = 800;
        let cols = 46;
        let rows = 34;

        if (screenType === "mobile") {
            VIRTUAL_W = 390;
            VIRTUAL_H = 844;
            cols = 18;  // fewer columns for narrow portrait phone width
            rows = 38;  // more rows for tall portrait height
        } else if (screenType === "tablet") {
            VIRTUAL_W = 768;
            VIRTUAL_H = 1024;
            cols = 28;
            rows = 38;
        }

        const cellW = 100 / cols;
        const cellH = 100 / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const seed = Math.abs((c * 73 + r * 137) ^ (r * 31));

                const rowStagger = (r % 2 === 1) ? (cellW * 0.5) : 0;
                const jitterX = (((seed * 17) % 100) - 50) / 100 * (cellW * 0.58);
                const jitterY = (((seed * 23) % 100) - 50) / 100 * (cellH * 0.58);

                let posX = (c * cellW) + (cellW * 0.5) + rowStagger + jitterX;
                let posY = (r * cellH) + (cellH * 0.5) + jitterY;

                if (posX > 100) posX -= 100;
                if (posX < 0) posX += 100;

                const distFromCenter = Math.hypot(posX - 50, posY - 50);
                if (distFromCenter < 10.0) {
                    continue;
                }

                // EXACT USER RATIO: 20% BIG, 30% MEDIUM, 50% SMALL
                const sizeBucket = (seed * 19) % 100;
                let size = 20;
                let opacity = 0.2;
                let category: "big" | "medium" | "small" = "medium";

                if (sizeBucket < 20) {
                    // 20% BIG ICONS
                    size = screenType === "mobile"
                        ? 24 + ((seed * 3) % 4) // 24-27px on mobile
                        : 30 + ((seed * 3) % 5); // 30-34px on desktop/tablet
                    opacity = 0.14 + ((seed * 7) % 8) / 100;
                    category = "big";
                } else if (sizeBucket < 50) {
                    // 30% MEDIUM ICONS
                    size = screenType === "mobile"
                        ? 15 + ((seed * 5) % 4) // 15-18px on mobile
                        : 19 + ((seed * 5) % 5); // 19-23px on desktop/tablet
                    opacity = 0.18 + ((seed * 11) % 12) / 100;
                    category = "medium";
                } else {
                    // 50% SMALL ICONS
                    size = screenType === "mobile"
                        ? 10 + ((seed * 9) % 3) // 10-12px on mobile
                        : 11 + ((seed * 9) % 4); // 11-14px on desktop/tablet
                    opacity = 0.16 + ((seed * 13) % 14) / 100;
                    category = "small";
                }

                const px = (posX / 100) * VIRTUAL_W;
                const py = (posY / 100) * VIRTUAL_H;

                // Safe diagonal radius in device pixels accounting for 45-degree rotation + safety margin
                const radiusPx = (size * 0.5 * 1.42) + (screenType === "mobile" ? 2.5 : 3.5);
                let hasCollision = false;

                for (let i = 0; i < items.length; i++) {
                    const other = items[i];
                    const minRequiredDistPx = radiusPx + other.radiusPx;
                    
                    const otherPx = (other.posX / 100) * VIRTUAL_W;
                    const otherPy = (other.posY / 100) * VIRTUAL_H;

                    const dxPx = px - otherPx;
                    const dyPx = py - otherPy;
                    const distPxSq = dxPx * dxPx + dyPx * dyPx;

                    if (distPxSq < minRequiredDistPx * minRequiredDistPx) {
                        hasCollision = true;
                        break;
                    }
                }

                if (hasCollision) {
                    continue;
                }

                const iconIdx = (c * 3 + r * 7 + seed) % availableIcons.length;
                const rotate = (((seed * 41) % 90) - 45);

                items.push({
                    id: `${r}-${c}`,
                    IconComponent: availableIcons[iconIdx],
                    posX,
                    posY,
                    rotate: `${rotate}deg`,
                    opacity,
                    size,
                    category,
                    radiusPx
                });
            }
        }

        // 2) GENERATE HOLLOW BALLS/RINGS IN ALL REMAINING GAPS (0% overlaps on all devices)
        const dotItems: Array<{
            id: string;
            posX: number;
            posY: number;
            size: number;
            opacity: number;
            isLarge: boolean;
            radiusPx: number;
        }> = [];

        const dotCols = screenType === "mobile" ? 24 : screenType === "tablet" ? 36 : 54;
        const dotRows = screenType === "mobile" ? 44 : screenType === "tablet" ? 44 : 40;
        const dotCellW = 100 / dotCols;
        const dotCellH = 100 / dotRows;

        for (let r = 0; r < dotRows; r++) {
            for (let c = 0; c < dotCols; c++) {
                const dotSeed = Math.abs((c * 97 + r * 163) ^ (r * 47));

                const dotJitterX = (((dotSeed * 29) % 100) - 50) / 100 * (dotCellW * 0.85);
                const dotJitterY = (((dotSeed * 43) % 100) - 50) / 100 * (dotCellH * 0.85);

                let dotX = (c * dotCellW) + (dotCellW * 0.5) + dotJitterX;
                let dotY = (r * dotCellH) + (dotCellH * 0.5) + dotJitterY;

                if (dotX > 100) dotX -= 100;
                if (dotX < 0) dotX += 100;

                const distFromCenter = Math.hypot(dotX - 50, dotY - 50);
                if (distFromCenter < 9.5) {
                    continue;
                }

                const dotSizeBucket = (dotSeed * 19) % 100;
                let dotSize = 4;
                let dotOpacity = 0.25;
                let isLarge = false;

                if (dotSizeBucket < 16) {
                    dotSize = screenType === "mobile" ? 6 + (dotSeed % 3) : 8 + (dotSeed % 5);
                    dotOpacity = 0.28 + ((dotSeed * 7) % 15) / 100;
                    isLarge = true;
                } else if (dotSizeBucket < 55) {
                    dotSize = screenType === "mobile" ? 4 + (dotSeed % 2) : 5 + (dotSeed % 3);
                    dotOpacity = 0.22 + ((dotSeed * 11) % 15) / 100;
                } else {
                    dotSize = screenType === "mobile" ? 2.5 + (dotSeed % 2) : 3 + (dotSeed % 2);
                    dotOpacity = 0.18 + ((dotSeed * 13) % 15) / 100;
                }

                const dotPx = (dotX / 100) * VIRTUAL_W;
                const dotPy = (dotY / 100) * VIRTUAL_H;
                const dotRadiusPx = (dotSize * 0.5) + (screenType === "mobile" ? 2.0 : 3.0);

                let hasCollision = false;

                for (let i = 0; i < items.length; i++) {
                    const icon = items[i];
                    const minRequiredDistPx = dotRadiusPx + icon.radiusPx;
                    
                    const iconPx = (icon.posX / 100) * VIRTUAL_W;
                    const iconPy = (icon.posY / 100) * VIRTUAL_H;
                    const dxPx = dotPx - iconPx;
                    const dyPx = dotPy - iconPy;

                    if (dxPx * dxPx + dyPx * dyPx < minRequiredDistPx * minRequiredDistPx) {
                        hasCollision = true;
                        break;
                    }
                }

                if (!hasCollision) {
                    for (let j = 0; j < dotItems.length; j++) {
                        const otherDot = dotItems[j];
                        const minRequiredDistPx = dotRadiusPx + otherDot.radiusPx;
                        
                        const otherDotPx = (otherDot.posX / 100) * VIRTUAL_W;
                        const otherDotPy = (otherDot.posY / 100) * VIRTUAL_H;
                        const dxPx = dotPx - otherDotPx;
                        const dyPx = dotPy - otherDotPy;

                        if (dxPx * dxPx + dyPx * dyPx < minRequiredDistPx * minRequiredDistPx) {
                            hasCollision = true;
                            break;
                        }
                    }
                }

                if (!hasCollision) {
                    dotItems.push({
                        id: `dot-${r}-${c}`,
                        posX: dotX,
                        posY: dotY,
                        size: dotSize,
                        opacity: dotOpacity,
                        isLarge,
                        radiusPx: dotRadiusPx
                    });
                }
            }
        }

        return { denseIcons: items, dots: dotItems };
    }, [screenType]);

    return (
        <main
            className="w-full min-h-screen relative overflow-x-clip font-[family-name:var(--font-body)] transition-colors duration-300"
            style={{ background: "var(--page-bg)" }}
        >
            {/* Light Mode & Dark Mode Support for Background, Icons, and Hollow Rings */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                :root {
                    --page-bg: linear-gradient(180deg,
                        #E6F9F8 0%,
                        #EBF8F7 35%,
                        #F0FAF9 70%,
                        #F5FCFC 100%
                    );
                    --center-rounded-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.28) 0%, rgba(0, 120, 115, 0.12) 40%, transparent 75%);
                    --icon-tint: #002D32;
                    --ring-large-border: rgba(0, 120, 115, 0.55);
                    --ring-small-border: rgba(0, 77, 83, 0.38);
                    --ring-large-shadow: 0 0 8px rgba(0, 180, 170, 0.25);
                    --glass-layer-bg: linear-gradient(135deg, rgba(0, 35, 40, 0.32) 0%, rgba(0, 18, 22, 0.42) 50%, rgba(0, 35, 40, 0.28) 100%);
                    --glass-layer-border: rgba(255, 255, 255, 0.35);
                    --glass-layer-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -1px 2px rgba(0, 0, 0, 0.15);
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(180deg,
                            #001214 0%,
                            #001A1C 35%,
                            #001618 70%,
                            #021213 100%
                        );
                        --center-rounded-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.48) 0%, rgba(0, 120, 115, 0.25) 40%, transparent 75%);
                        --icon-tint: #FFFFFF;
                        --ring-large-border: rgba(167, 243, 208, 0.65);
                        --ring-small-border: rgba(255, 255, 255, 0.42);
                        --ring-large-shadow: 0 0 8px rgba(167, 243, 208, 0.38);
                        --glass-layer-bg: linear-gradient(135deg, rgba(0, 8, 10, 0.58) 0%, rgba(0, 15, 18, 0.72) 50%, rgba(0, 8, 10, 0.52) 100%);
                        --glass-layer-border: rgba(255, 255, 255, 0.15);
                        --glass-layer-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.5);
                    }
                }
                .dark {
                    --page-bg: linear-gradient(180deg,
                        #001214 0%,
                        #001A1C 35%,
                        #001618 70%,
                        #021213 100%
                    );
                    --center-rounded-glow: radial-gradient(circle at 50% 50%, rgba(0, 180, 170, 0.48) 0%, rgba(0, 120, 115, 0.25) 40%, transparent 75%);
                    --icon-tint: #FFFFFF;
                    --ring-large-border: rgba(167, 243, 208, 0.65);
                    --ring-small-border: rgba(255, 255, 255, 0.42);
                    --ring-large-shadow: 0 0 8px rgba(167, 243, 208, 0.38);
                    --glass-layer-bg: linear-gradient(135deg, rgba(0, 8, 10, 0.58) 0%, rgba(0, 15, 18, 0.72) 50%, rgba(0, 8, 10, 0.52) 100%);
                    --glass-layer-border: rgba(255, 255, 255, 0.15);
                    --glass-layer-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.5);
                }
                .stroke-watermark-pricing {
                    -webkit-text-stroke: 2.5px rgba(0, 50, 55, 0.40);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-pricing {
                        -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.28);
                    }
                }
                .dark .stroke-watermark-pricing {
                    -webkit-text-stroke: 2.5px rgba(255, 255, 255, 0.28);
                }
            `
                }}
            />

            {/* FIXED BACKGROUND WRAPPER ("icons ke sath hi logo bhi fix hona chahiie") */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" style={{ willChange: "transform", contain: "layout style paint" }}>
                {/* Center Rounded Teal Gradient Glow */}
                <div
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    style={{ background: "var(--center-rounded-glow)" }}
                />

                {/* Hollow Balls/Rings in Empty Gaps (Light & Dark Mode Supported) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ contain: "layout style paint" }}>
                    {dots.map((dot) => (
                        <div
                            key={dot.id}
                            className="absolute rounded-full bg-transparent pointer-events-none"
                            style={{
                                top: `${dot.posY}%`,
                                left: `${dot.posX}%`,
                                width: `${dot.size}px`,
                                height: `${dot.size}px`,
                                opacity: dot.opacity,
                                borderWidth: dot.isLarge ? "1.5px" : "1px",
                                borderStyle: "solid",
                                borderColor: dot.isLarge ? "var(--ring-large-border)" : "var(--ring-small-border)",
                                transform: "translate(-50%, -50%)",
                                boxShadow: dot.isLarge ? "var(--ring-large-shadow)" : "none"
                            }}
                        />
                    ))}
                </div>

                {/* 20% Big, 30% Medium, 50% Small Icons (Light & Dark Mode Supported) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ contain: "layout style paint" }}>
                    {denseIcons.map((item) => {
                        const IconComp = item.IconComponent;
                        return (
                            <IconComp
                                key={item.id}
                                className="absolute pointer-events-none"
                                style={{
                                    top: `${item.posY}%`,
                                    left: `${item.posX}%`,
                                    width: `${item.size}px`,
                                    height: `${item.size}px`,
                                    opacity: item.opacity,
                                    color: "var(--icon-tint)",
                                    transform: `rotate(${item.rotate}) translate(-50%, -50%)`
                                }}
                            />
                        );
                    })}
                </div>

                {/* FIXED CENTER UVICON LOGO (Stays fixed right in the center along with the icons!) */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20">
                    <Image
                        src="/assets/icons/uvicon-technologies-logo.webp"
                        alt="Uvicon Technologies Logo"
                        width={130}
                        height={130}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
                        priority
                    />
                </div>

                {/* TRANSPARENT DARK GLASS LAYER (Part of Sticky Section, subtle blur & smoky glass tint with high z-index) */}
                <div
                    className="fixed inset-0 w-full h-full pointer-events-none z-30"
                    style={{
                        background: "var(--glass-layer-bg)",
                        borderBottom: "1px solid var(--glass-layer-border)",
                        boxShadow: "var(--glass-layer-shadow)",
                        willChange: "transform",
                        transform: "translateZ(0)"
                    }}
                />

                {/* SOLID DARK TEAL INTRODUCTORY CURTAIN LAYER (Disappears from center in soft blurry circle after 1 second, finishes in next 1 second) */}
                <AnimatePresence>
                    {showSplash && (
                        <motion.svg
                            key="splash-curtain"
                            className="fixed inset-0 w-full h-full pointer-events-none z-50"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 1 }}
                            transition={{ duration: 1.0 }}
                        >
                            <defs>
                                {/* Soft feathering/blur filter for the expanding circle edge so it's not sharp */}
                                <filter id="curtain-circle-blur" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="35" />
                                </filter>
                                <mask id="pricing-curtain-hole-mask">
                                    {/* White rect keeps the solid teal curtain 100% visible initially */}
                                    <rect width="100%" height="100%" fill="white" />
                                    {/* Black circle with gaussian blur expands immediately on mount to cut a soft-edged circular hole */}
                                    <motion.circle
                                        cx="50%"
                                        cy="50%"
                                        initial={{ r: "0%" }}
                                        animate={{ r: "160%" }}
                                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                                        onAnimationComplete={() => setShowSplash(false)}
                                        style={{ willChange: "transform" }}
                                        fill="black"
                                        filter="url(#curtain-circle-blur)"
                                    />
                                </mask>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                mask="url(#pricing-curtain-hole-mask)"
                                className="fill-[#E0F7F5] dark:fill-[#00080A]"
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>

            {/* FIRST SCREEN CONTAINER (Centered Heading + Buttons at Bottom) */}
            <div className="relative z-40 w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden">
                {/* Top Header Spacer */}
                <div className="h-16 sm:h-20 md:h-24 shrink-0 pointer-events-none" />

                {/* Hero Section: Perfectly Centered */}
                <section className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 my-auto py-4">
                    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
                        {/* Headings Container: TRANSPARENT watermark behind main heading */}
                        <div className="relative w-full flex items-center justify-center">
                            {/* Background Watermark "TRANSPARENT" */}
                            <motion.div
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full flex justify-center relative z-0"
                            >
                                <span className="text-[44px] sm:text-[88px] md:text-[120px] lg:text-[152px] xl:text-[176px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-pricing whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 opacity-95 leading-none text-center">
                                    TRANSPARENT
                                </span>
                            </motion.div>

                            {/* Main Heading "Pricing from Uvicon" — overlaps TRANSPARENT perfectly */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full flex justify-center absolute inset-0 items-center z-10 pointer-events-none"
                            >
                                <h1 className="text-[24px] sm:text-[48px] md:text-[64px] lg:text-[84px] xl:text-[96px] font-black text-[#00595C] dark:text-[#3FC1B8] tracking-[0.12em] sm:tracking-[0.20em] md:tracking-[0.22em] lg:tracking-tight uppercase font-[family-name:var(--font-heading-main)] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] whitespace-nowrap text-center">
                                    Pricing from Uvicon
                                </h1>
                            </motion.div>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[#003D3F]/70 dark:text-white/60 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mt-4 sm:mt-5 font-[family-name:var(--font-body)] text-center"
                        >
                            We architect high-performance digital ecosystems in India with transparent sprint milestones, zero vendor lock-in, and 100% intellectual property ownership.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[340px] sm:max-w-[580px] md:max-w-[760px] lg:max-w-xl px-1 mt-6 sm:mt-7"
                        >
                            <Link
                                href="/contact"
                                className="flex-1 w-1/2 py-3.5 sm:py-4 px-2 sm:px-5 rounded-xl sm:rounded-2xl bg-[#004A4D]/85 dark:bg-white/12 hover:bg-[#004A4D] dark:hover:bg-white/20 text-white/90 dark:text-white/85 border border-transparent dark:border-white/15 font-bold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap text-center"
                            >
                                <span>
                                    <span className="hidden sm:inline">Book Architecture Discovery</span>
                                    <span className="sm:hidden">Book Discovery</span>
                                </span>
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                            </Link>
                            <Link
                                href="/services"
                                className="flex-1 w-1/2 py-3.5 sm:py-4 px-2 sm:px-5 rounded-xl sm:rounded-2xl bg-[#003D3F]/10 dark:bg-white/5 hover:bg-[#003D3F]/15 dark:hover:bg-white/10 text-[#003D3F]/80 dark:text-white/65 border border-[#003D3F]/20 dark:border-white/15 font-semibold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-1.5 shadow-sm whitespace-nowrap text-center"
                            >
                                <span>
                                    <span className="hidden sm:inline">Explore Service Tiers</span>
                                    <span className="sm:hidden">Explore Tiers</span>
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* OPTIONS PILL BUTTONS (Starts from Bottom of Screen) */}
                <section className="w-full pointer-events-auto px-0 md:px-8 lg:px-16 pt-2 pb-2 sm:pb-3 lg:pb-4 shrink-0">
                    <style dangerouslySetInnerHTML={{ __html: `
                        .hide-scroll::-webkit-scrollbar { display: none; }
                        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                    `}} />
                    
                    {/* Swipe Indicator (Visible only on mobile/tablet) */}
                    <div className="lg:hidden w-full flex items-center justify-center gap-2 mb-3 text-[#003D3F]/60 dark:text-white/40 text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-4">
                        <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                        <span>Swipe to explore</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
                    </div>

                    {/* Mobile / Tablet: 2 Staggered Rows Horizontal Scroll */}
                    <div className="lg:hidden w-full overflow-x-auto hide-scroll px-4 md:px-8 pb-2">
                        <div className="flex flex-col gap-2.5 sm:gap-3 w-max min-w-full">
                            {/* Row 1 */}
                            <div className="flex flex-nowrap items-center gap-2.5 sm:gap-3">
                                {[
                                    "SOFTWARE DEVELOPMENT",
                                    "APPLICATION DEVELOPMENT",
                                    "WEBSITE DEVELOPMENT",
                                    "ALGO SOFTWARE",
                                    "SCALPING SOFTWARE",
                                    "GAMES"
                                ].map((option, idx) => (
                                    <motion.button
                                        key={option}
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => setSelectedOption(option)}
                                        className={`shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider uppercase transition-all duration-300 backdrop-blur-md ${
                                            selectedOption === option
                                                ? "bg-white text-[#002829] shadow-[0_0_15px_rgba(255,255,255,0.3)] md:shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-105 border-2 border-white"
                                                : "bg-white/5 dark:bg-white/5 text-[#003D3F]/80 dark:text-white/85 border border-[#003D3F]/25 dark:border-white/20 hover:border-[#00595C] dark:hover:border-white/60 hover:bg-white/10 hover:scale-[1.02]"
                                        }`}
                                    >
                                        {option}
                                    </motion.button>
                                ))}
                            </div>
                            {/* Row 2 */}
                            <div className="flex flex-nowrap items-center gap-2.5 sm:gap-3 ml-4 sm:ml-8">
                                {[
                                    "CRM SOFTWARE",
                                    "AI AGENTS",
                                    "EMPLOYEE MANAGEMENT",
                                    "SALES MANAGEMENT SOFTWARES",
                                    "HOTEL MANAGEMENT SOFTWARES",
                                    "SEO MANAGEMENT SOFTWARES"
                                ].map((option, idx) => (
                                    <motion.button
                                        key={option}
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.2 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => setSelectedOption(option)}
                                        className={`shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-extrabold tracking-wider uppercase transition-all duration-300 backdrop-blur-md ${
                                            selectedOption === option
                                                ? "bg-white text-[#002829] shadow-[0_0_15px_rgba(255,255,255,0.3)] md:shadow-[0_0_20px_rgba(255,255,255,0.35)] scale-105 border-2 border-white"
                                                : "bg-white/5 dark:bg-white/5 text-[#003D3F]/80 dark:text-white/85 border border-[#003D3F]/25 dark:border-white/20 hover:border-[#00595C] dark:hover:border-white/60 hover:bg-white/10 hover:scale-[1.02]"
                                        }`}
                                    >
                                        {option}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Exactly 2 Rows */}
                    <div className="hidden lg:flex flex-col items-center gap-2.5 xl:gap-3 w-full max-w-7xl mx-auto px-2 pb-0">
                        {/* Desktop Row 1 */}
                        <div className="flex flex-nowrap justify-center items-center gap-2 xl:gap-3 w-full">
                            {[
                                "SOFTWARE DEVELOPMENT",
                                "APPLICATION DEVELOPMENT",
                                "WEBSITE DEVELOPMENT",
                                "ALGO SOFTWARE",
                                "SCALPING SOFTWARE",
                                "GAMES"
                            ].map((option, idx) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => setSelectedOption(option)}
                                    className={`shrink-0 whitespace-nowrap px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full text-[10px] xl:text-xs font-extrabold tracking-wider uppercase transition-all duration-300 backdrop-blur-md ${
                                        selectedOption === option
                                            ? "bg-white text-[#002829] shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105 border-2 border-white"
                                            : "bg-white/5 dark:bg-white/5 text-[#003D3F]/80 dark:text-white/85 border border-[#003D3F]/25 dark:border-white/20 hover:border-[#00595C] dark:hover:border-white/60 hover:bg-white/10 hover:scale-[1.02]"
                                    }`}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>

                        {/* Desktop Row 2 */}
                        <div className="flex flex-nowrap justify-center items-center gap-2 xl:gap-3 w-full">
                            {[
                                "CRM SOFTWARE",
                                "AI AGENTS",
                                "EMPLOYEE MANAGEMENT",
                                "SALES MANAGEMENT SOFTWARES",
                                "HOTEL MANAGEMENT SOFTWARES",
                                "SEO MANAGEMENT SOFTWARES"
                            ].map((option, idx) => (
                                <motion.button
                                    key={option}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => setSelectedOption(option)}
                                    className={`shrink-0 whitespace-nowrap px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-full text-[10px] xl:text-xs font-extrabold tracking-wider uppercase transition-all duration-300 backdrop-blur-md ${
                                        selectedOption === option
                                            ? "bg-white text-[#002829] shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105 border-2 border-white"
                                            : "bg-white/5 dark:bg-white/5 text-[#003D3F]/80 dark:text-white/85 border border-[#003D3F]/25 dark:border-white/20 hover:border-[#00595C] dark:hover:border-white/60 hover:bg-white/10 hover:scale-[1.02]"
                                    }`}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* ===== DYNAMIC CATEGORY CONTENT SECTION ===== */}
            {categoryData[selectedOption] && (
                <section className="w-full relative z-40 px-4 sm:px-8 lg:px-16 pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-20 lg:pb-28">
                    <div className="max-w-6xl mx-auto">

                        {/* Category Description */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedOption + "-desc"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="mb-6 sm:mb-10"
                            >
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-main)] tracking-tight mb-3 sm:mb-4">
                                    {selectedOption.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}
                                </h2>
                                <p className="text-[#003D3F]/75 dark:text-white/65 text-sm sm:text-base md:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                                    {categoryData[selectedOption].shortDesc}
                                    {!showMoreDesc && (
                                        <button
                                            onClick={() => setShowMoreDesc(true)}
                                            className="inline-flex items-center gap-1 ml-2 text-[#00595C] dark:text-[#3FC1B8] font-bold hover:underline underline-offset-2 transition-colors text-sm sm:text-base"
                                        >
                                            More <ChevronDown className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </p>
                                <AnimatePresence>
                                    {showMoreDesc && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-[#003D3F]/65 dark:text-white/55 text-sm sm:text-base leading-relaxed mt-3 font-[family-name:var(--font-body)]">
                                                {categoryData[selectedOption].fullDesc}
                                            </p>
                                            <button
                                                onClick={() => setShowMoreDesc(false)}
                                                className="inline-flex items-center gap-1 mt-2 text-[#00595C] dark:text-[#3FC1B8] font-bold hover:underline underline-offset-2 transition-colors text-sm"
                                            >
                                                Less <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Highlight Pills */}
                                <div className="flex flex-wrap gap-2 mt-4 sm:mt-5">
                                    {categoryData[selectedOption].highlights.map((h, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#00595C]/10 dark:bg-[#3FC1B8]/10 text-[#00595C] dark:text-[#3FC1B8] border border-[#00595C]/20 dark:border-[#3FC1B8]/20 shadow-sm backdrop-blur-sm">
                                            <Sparkles className="w-3.5 h-3.5" />
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pricing Cards Grid */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedOption + "-cards"}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 justify-items-center md:justify-items-stretch pt-4"
                            >
                                {categoryData[selectedOption].tiers.map((tier, idx) => (
                                    <motion.div
                                        key={tier.name}
                                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                        className={`w-full max-w-[320px] sm:max-w-[360px] md:max-w-none mx-auto relative rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col transition-[transform,box-shadow,border-color] duration-300 ${
                                            tier.popular
                                                ? "bg-gradient-to-b from-[#004A4D] via-[#003D3F] to-[#002829] dark:from-[#00595C]/90 dark:via-[#003B3D] dark:to-[#001D1F] text-white shadow-[0_16px_50px_rgba(0,89,92,0.35)] dark:shadow-[0_16px_50px_rgba(63,193,184,0.25)] border-2 border-[#3FC1B8] ring-4 ring-[#3FC1B8]/20 scale-[1.02] md:scale-105 hover:-translate-y-2"
                                                : "bg-gradient-to-b from-white/90 via-white/75 to-white/50 dark:from-[#002829]/70 dark:via-[#001E20]/80 dark:to-[#001416]/90 border border-[#003D3F]/15 dark:border-white/12 text-[#003D3F] dark:text-white/90 shadow-[0_8px_30px_rgba(0,40,41,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(0,89,92,0.15)] dark:hover:shadow-[0_16px_40px_rgba(63,193,184,0.15)] hover:border-[#00595C]/40 dark:hover:border-[#3FC1B8]/40 hover:-translate-y-1.5"
                                        }`}
                                    >
                                        {/* Ambient Top Glow for Popular Card */}
                                        {tier.popular && (
                                            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                                                <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#3FC1B8]/25 rounded-full blur-3xl" />
                                            </div>
                                        )}

                                        {/* Popular Badge */}
                                        {tier.popular ? (
                                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                                                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#3FC1B8] to-[#00E5D4] text-[#002829] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md shadow-[#3FC1B8]/40 border border-white/40 whitespace-nowrap">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    {tier.badge}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mb-2">
                                                <span className="inline-block px-3 py-1 rounded-full bg-[#00595C]/10 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#00595C]/15 dark:border-white/10">
                                                    {tier.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Tier Name Heading */}
                                        <h3 className={`text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-wider font-[family-name:var(--font-heading-main)] mt-1 mb-1 ${
                                            tier.popular ? "text-[#3FC1B8] drop-shadow-[0_2px_8px_rgba(63,193,184,0.3)]" : "text-[#00595C] dark:text-[#3FC1B8]"
                                        }`}>
                                            {tier.name}
                                        </h3>

                                        {/* Price */}
                                        <div className="my-4 pb-4 border-b border-[#003D3F]/10 dark:border-white/10 flex items-baseline gap-1.5">
                                            <span className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-[family-name:var(--font-heading-main)] ${
                                                tier.popular ? "text-white" : "text-[#003D3F] dark:text-white"
                                            }`}>
                                                {tier.price}
                                            </span>
                                            <span className={`text-xs sm:text-sm font-semibold ${
                                                tier.popular ? "text-[#3FC1B8]" : "text-[#003D3F]/60 dark:text-white/45"
                                            }`}>
                                                {tier.period}
                                            </span>
                                        </div>

                                        {/* Features */}
                                        <ul className="flex-1 space-y-3 mb-6 sm:mb-8">
                                            {tier.features.map((feat, fi) => (
                                                <li key={fi} className="flex items-start gap-2.5">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                        tier.popular
                                                            ? "bg-[#3FC1B8]/20 text-[#3FC1B8]"
                                                            : "bg-[#00595C]/10 dark:bg-[#3FC1B8]/15 text-[#00595C] dark:text-[#3FC1B8]"
                                                    }`}>
                                                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                                    </div>
                                                    <span className={`text-xs sm:text-sm leading-snug font-medium ${
                                                        tier.popular ? "text-white/90" : "text-[#003D3F]/80 dark:text-white/75"
                                                    }`}>
                                                        {feat}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Link
                                            href={tier.ctaHref}
                                            className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                                                tier.popular
                                                    ? "bg-gradient-to-r from-[#3FC1B8] to-[#00E5D4] hover:from-[#5DECE1] hover:to-[#3FC1B8] text-[#002829] shadow-lg shadow-[#3FC1B8]/30 hover:scale-[1.02]"
                                                    : "bg-[#00595C]/10 dark:bg-white/10 text-[#00595C] dark:text-[#3FC1B8] hover:bg-[#00595C] hover:text-white dark:hover:bg-[#3FC1B8] dark:hover:text-[#002829] border border-[#00595C]/20 dark:border-white/15 hover:border-transparent hover:scale-[1.02] shadow-sm"
                                            }`}
                                        >
                                            {tier.ctaText}
                                            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Why Choose Section */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedOption + "-why"}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#00595C]/5 to-[#003D3F]/5 dark:from-white/3 dark:to-white/5 border border-[#003D3F]/10 dark:border-white/10 p-6 sm:p-8 lg:p-10"
                            >
                                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#003D3F] dark:text-white/95 font-[family-name:var(--font-heading-main)] mb-4 sm:mb-6">
                                    Why Choose Uvicon for {selectedOption.split(" ").map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" ")}?
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
                                    {categoryData[selectedOption].highlights.map((h, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-[#003D3F]/8 dark:border-white/8">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00595C]/10 dark:bg-[#3FC1B8]/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00595C] dark:text-[#3FC1B8]" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-[#003D3F]/80 dark:text-white/75">{h}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsCalculatorOpen(true)}
                                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#00595C] dark:bg-[#3FC1B8] text-white dark:text-[#002829] font-bold text-sm sm:text-base transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                                    >
                                        Get Custom Quote
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                    <p className="text-xs sm:text-sm text-[#003D3F]/50 dark:text-white/40">
                                        Free consultation • Instant accurate estimation
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </section>
            )}

            {/* ===== SECTION: HOW IT WORKS (4-STEP PROCESS) ===== */}
            <section id="how-it-works" className="w-full relative z-40 px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-10 sm:mb-14"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#3FC1B8]/10 text-[#00595C] dark:text-[#3FC1B8] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#00595C]/20 dark:border-[#3FC1B8]/20 mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            Simple & Transparent
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] tracking-tight mb-3">
                            How Our Pricing Works
                        </h2>
                        <p className="text-[#003D3F]/70 dark:text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-body)]">
                            From initial discovery to production launch, every milestone has a fixed cost with zero surprises. Here&apos;s how we engage.
                        </p>
                    </motion.div>

                    {/* 4-Step Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                        {[
                            {
                                step: "01",
                                title: "Discovery Call",
                                desc: "Free 30-minute consultation to map your functional requirements, technical architecture, and UI/UX scope. No obligations.",
                                icon: HelpCircle,
                                accent: "from-[#00595C] to-[#3FC1B8]"
                            },
                            {
                                step: "02",
                                title: "Architecture & Quote",
                                desc: "Detailed fixed-price proposal with clear sprint milestones, technology stack recommendations, and delivery timelines.",
                                icon: Layers,
                                accent: "from-[#3FC1B8] to-[#00E5D4]"
                            },
                            {
                                step: "03",
                                title: "Agile Sprint Delivery",
                                desc: "Iterative development with staging demos at each milestone. Pay only for approved deliverables — 30% upfront, 40% mid-sprint, 30% on launch.",
                                icon: Zap,
                                accent: "from-[#00E5D4] to-[#3FC1B8]"
                            },
                            {
                                step: "04",
                                title: "Launch & Support",
                                desc: "Production deployment with 90-day SLA warranty covering bug fixes, performance monitoring, and security patches at zero extra cost.",
                                icon: Shield,
                                accent: "from-[#3FC1B8] to-[#00595C]"
                            }
                        ].map((item, idx) => {
                            const StepIcon = item.icon;
                            return (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-white/80 via-white/60 to-white/40 dark:from-[#002829]/60 dark:via-[#001E20]/70 dark:to-[#001416]/80 border border-[#003D3F]/10 dark:border-white/10 backdrop-blur-md hover:border-[#00595C]/30 dark:hover:border-[#3FC1B8]/30 transition-all duration-300 group"
                                >
                                    {/* Step Number */}
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                        <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <span className="absolute top-4 right-4 text-3xl sm:text-4xl font-black text-[#003D3F]/5 dark:text-white/5 font-[family-name:var(--font-heading-main)]">
                                        {item.step}
                                    </span>
                                    <h3 className="text-base sm:text-lg font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/65 leading-relaxed font-[family-name:var(--font-body)]">
                                        {item.desc}
                                    </p>

                                    {/* Connector Line (hidden on last item and mobile) */}
                                    {idx < 3 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-3 lg:-right-3.5 w-6 lg:w-7 h-[2px] bg-gradient-to-r from-[#3FC1B8]/40 to-transparent z-20" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== SECTION: TRUST SIGNALS / SOCIAL PROOF STATS ===== */}
            <section id="trust-stats" className="w-full relative z-40 px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-16">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#004A4D]/90 via-[#003D3F]/95 to-[#002829] dark:from-[#001D1F]/90 dark:via-[#001416]/95 dark:to-[#001012] border border-[#3FC1B8]/20 dark:border-[#3FC1B8]/15 p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,89,92,0.2)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.4)] relative overflow-hidden"
                    >
                        {/* Ambient Glows */}
                        <div className="absolute top-0 left-0 w-48 h-48 bg-[#3FC1B8]/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#3FC1B8]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                            {[
                                { value: "150+", label: "Projects Delivered", sublabel: "Across 12 industries" },
                                { value: "98%", label: "Client Retention", sublabel: "Repeat engagement rate" },
                                { value: "100%", label: "IP Ownership", sublabel: "Full source code transfer" },
                                { value: "< 15 min", label: "SLA Response", sublabel: "24/7 priority support" }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3FC1B8] font-[family-name:var(--font-heading-main)] tracking-tight mb-1">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-white/90 mb-0.5">
                                        {stat.label}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-white/50 font-medium">
                                        {stat.sublabel}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== SECTION: PRICING FAQ ACCORDION ===== */}
            <PricingFaqSection />

            {/* ===== SECTION: ENTERPRISE ARCHITECTURE & TRANSPARENT ASSURANCE ===== */}
            <section id="pricing-assurance" className="w-full relative z-40 px-4 sm:px-8 lg:px-16 pt-8 sm:pt-12 lg:pt-14 pb-44 sm:pb-56 lg:pb-68">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-10 sm:mb-14"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#00595C]/10 dark:bg-[#3FC1B8]/10 text-[#00595C] dark:text-[#3FC1B8] text-[10px] sm:text-xs font-black uppercase tracking-wider border border-[#00595C]/20 dark:border-[#3FC1B8]/20 mb-3 sm:mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            Enterprise Engineering Standard
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] tracking-tight mb-3">
                            Transparent Scope & Architecture Guarantees
                        </h2>
                        <p className="text-[#003D3F]/70 dark:text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-body)]">
                            Institutional rigor applied to every build. Fixed-cost sprint contracts, verified staging demos, and complete IP sovereignty from day one.
                        </p>
                    </motion.div>

                    {/* 3 High-Assurance Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
                        {[
                            {
                                icon: Shield,
                                title: "100% IP & Source Ownership",
                                desc: "Legally binding IP assignment upon final sprint sign-off. Full unencrypted Git repositories, CI/CD pipelines, and design assets with zero vendor lock-in.",
                                badge: "Legal Sovereign"
                            },
                            {
                                icon: Layers,
                                title: "Milestone Escrow & Demos",
                                desc: "Payment releases strictly tied to functional staging demos. You test and approve live builds before any milestone disbursement is finalized.",
                                badge: "Zero Risk"
                            },
                            {
                                icon: Activity,
                                title: "90-Day Post-Launch SLA",
                                desc: "Complimentary 24/7 server health monitoring, rapid security patch deployment, and browser compatibility tuning at zero extra cost.",
                                badge: "Full Support"
                            }
                        ].map((item, idx) => {
                            const ItemIcon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-white/70 via-white/50 to-white/30 dark:from-[#002829]/50 dark:via-[#001E20]/60 dark:to-[#001416]/70 border border-[#003D3F]/10 dark:border-white/10 backdrop-blur-md hover:border-[#00595C]/30 dark:hover:border-[#3FC1B8]/30 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-4">
                                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#00595C]/10 dark:bg-[#3FC1B8]/15 flex items-center justify-center text-[#00595C] dark:text-[#3FC1B8] group-hover:scale-105 transition-transform">
                                                <ItemIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>
                                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00595C]/5 dark:bg-white/5 text-[#00595C] dark:text-[#3FC1B8] border border-[#00595C]/10 dark:border-white/10">
                                                {item.badge}
                                            </span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/65 leading-relaxed font-[family-name:var(--font-body)]">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Interactive Estimator Ribbon (Distinct from the Footer's "Let's Talk" form) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-[#00595C]/10 via-[#3FC1B8]/10 to-[#00595C]/5 dark:from-[#3FC1B8]/10 dark:via-[#00E5D4]/5 dark:to-transparent border border-[#00595C]/20 dark:border-[#3FC1B8]/20 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left"
                    >
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00595C] dark:bg-[#3FC1B8] text-white dark:text-[#002829] flex items-center justify-center shrink-0 shadow-md">
                                <Sliders className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm sm:text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                    Planning a Custom Enterprise Architecture?
                                </h4>
                                <p className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/65 font-[family-name:var(--font-body)]">
                                    Use our interactive calculator to estimate sprint timelines, technical stacks, and budgets in seconds.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsCalculatorOpen(true)}
                            className="w-full sm:w-auto shrink-0 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#3FC1B8] dark:hover:bg-[#5DECE1] text-white dark:text-[#002829] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] cursor-pointer"
                        >
                            <span>Calculate Project Cost</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                </div>
            </section>

            {/* COST CALCULATOR MODAL WIZARD */}
            <CostCalculatorModal
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
            />
        </main>
    );
}
