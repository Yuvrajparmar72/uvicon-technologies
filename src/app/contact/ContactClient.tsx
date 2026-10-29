"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
    Sparkles,
    ShieldCheck,
    Zap,
    Award,
    CheckCircle2,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
    Users,
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Check,
    Globe,
    Lock,
    CalendarCheck2,
    HelpCircle,
    BadgeCheck,
    Headphones,
    FileSignature,
    CheckCheck,
    Building2,
    Compass,
    Radio,
    Rocket
} from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";

/* ==========================================================================
   FRAMER MOTION ANIMATION VARIANTS
   ========================================================================== */

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05
        }
    }
};

/* ==========================================================================
   DATA STRUCTURES: CHANNELS, FAQS, ONBOARDING STEPS
   ========================================================================== */

interface ContactFaq {
    id: string;
    question: string;
    answer: string;
    icon: React.ElementType;
}

const contactFaqs: ContactFaq[] = [
    {
        id: "c-faq-1",
        question: "How quickly will an architect respond to my inquiry?",
        answer: "We guarantee a direct response from a Lead Solutions Architect within 15 minutes during standard market hours (9:00 AM – 9:00 PM IST), and within 2 hours during weekends/off-hours.",
        icon: Clock
    },
    {
        id: "c-faq-2",
        question: "Can we sign a Non-Disclosure Agreement (NDA) before discussing our project?",
        answer: "Yes, absolutely. If you check the NDA box in the inquiry form, our legal team will countersign and send our mutual NDA to your email before our initial scoping call.",
        icon: ShieldCheck
    },
    {
        id: "c-faq-3",
        question: "Do you offer fixed-price quotes or hourly billing?",
        answer: "We primarily work on predictable fixed-scope sprint milestones. You receive a guaranteed fixed SOW with bi-weekly deliverables so there are never any unexpected billing surprises.",
        icon: BadgeCheck
    },
    {
        id: "c-faq-4",
        question: "Can we schedule a live technical scoping call over Google Meet?",
        answer: "Yes. After submitting your project spec or clicking 'Instant Meeting', you can pick an immediate 20-minute slot on Google Meet with our Head of Engineering.",
        icon: CalendarCheck2
    }
];

export default function ContactClient() {
    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        company: "",
        serviceCategory: "Custom Software & Web SaaS",
        budgetRange: "$2,500 – $7,500 (Sprint)",
        timeline: "2 – 4 Weeks (Standard)",
        requirements: "",
        requestNda: true
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);

    const toggleFaq = (id: string) => {
        setOpenFaqId((prev) => (prev === id ? null : id));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const { error } = await supabase.from("contact_inquiries").insert([
                {
                    full_name: formData.fullName,
                    email: formData.email,
                    company: formData.company || null,
                    service_category: formData.serviceCategory,
                    budget_range: formData.budgetRange,
                    timeline: formData.timeline,
                    requirements: formData.requirements,
                    request_nda: formData.requestNda
                }
            ]);

            if (error) {
                console.error("Supabase submission error:", error);
                setSubmitError(error.message || "Failed to submit inquiry. Please try again.");
            } else {
                setIsSubmitted(true);
            }
        } catch (err: any) {
            console.error("Submission unexpected error:", err);
            setSubmitError("Network error. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main
            className="w-full relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* Unified Page Background Canvas */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                :root {
                    --page-bg: linear-gradient(to bottom,
                        #E6F9F8 0px,
                        #EBF8F7 50vh,
                        #F0FAF9 100vh,
                        #F5FCFC 150vh,
                        #FDFBF7 220vh
                    );
                    --hero-glow: radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.8) 35%, rgba(184, 230, 226, 0.4) 65%, transparent 100%);
                }
                @media (min-width: 768px) {
                    :root {
                        --hero-glow: radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(213, 245, 242, 0.85) 30%, rgba(184, 230, 226, 0.4) 60%, transparent 100%);
                    }
                }
                @media (min-width: 1024px) {
                    :root {
                        --hero-glow: radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.98) 0%, rgba(213, 245, 242, 0.85) 25%, rgba(184, 230, 226, 0.45) 50%, transparent 70%);
                    }
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(to bottom,
                            #001214 0px,
                            #001618 50vh,
                            #001A1C 100vh,
                            #001618 150vh,
                            #021213 220vh
                        );
                        --hero-glow: radial-gradient(circle at 50% 20%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 35%, rgba(0, 85, 80, 0.2) 65%, transparent 100%);
                    }
                }
                html.dark {
                    --page-bg: linear-gradient(to bottom,
                        #001214 0px,
                        #001618 50vh,
                        #001A1C 100vh,
                        #001618 150vh,
                        #021213 220vh
                    );
                    --hero-glow: radial-gradient(ellipse at 50% 30%, rgba(0, 180, 170, 0.65) 0%, rgba(0, 135, 128, 0.45) 25%, rgba(0, 85, 80, 0.2) 50%, transparent 70%);
                }
                .stroke-watermark-hero {
                    -webkit-text-stroke: 2px rgba(0, 61, 63, 0.22);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-hero {
                        -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
                    }
                }
                html.dark .stroke-watermark-hero {
                    -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
                }
                .stroke-watermark-section {
                    -webkit-text-stroke: 1.5px rgba(0, 61, 63, 0.2);
                }
                @media (prefers-color-scheme: dark) {
                    .stroke-watermark-section {
                        -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
                    }
                }
                html.dark .stroke-watermark-section {
                    -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.18);
                }
            `
                }}
            />

            {/* Continuous Seamless Radial Glow Canvas */}
            <div
                className="absolute top-0 left-0 w-full h-[180vh] pointer-events-none z-0"
                style={{
                    background: "var(--hero-glow)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)"
                }}
            />

            {/* =====================================================================
               SECTION 1: HERO — EXECUTIVE ARCHITECT CONSULTATION TERMINAL
               ===================================================================== */}
            <section className="w-full relative pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-16 z-10">
                {/* 3D Glass Bolt Accents with Floating Animation */}
                <div className="absolute top-12 right-4 sm:right-10 w-28 sm:w-40 lg:w-48 pointer-events-none z-0 opacity-45 dark:opacity-75 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-slow">
                    <Image
                        src="/assets/icons/uvicon-bolt-1.webp"
                        alt="3D Glass Lightning Bolt Accent"
                        width={220}
                        height={220}
                        className="w-full h-auto object-contain transform rotate-15"
                    />
                </div>
                <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 lg:w-40 pointer-events-none z-0 opacity-40 dark:opacity-65 drop-shadow-[0_20px_35px_rgba(0,0,0,0.2)] animate-float-reverse">
                    <Image
                        src="/assets/icons/uvicon-bolt-2.webp"
                        alt="3D Glass Lightning Bolt Accent Left"
                        width={180}
                        height={180}
                        className="w-full h-auto object-contain transform -rotate-15"
                    />
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Top Status Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00595C]/10 dark:bg-[#FFC050]/15 border border-[#00595C]/20 dark:border-[#FFC050]/30 text-xs font-extrabold uppercase tracking-wider text-[#00595C] dark:text-[#FFC050] backdrop-blur-xl shadow-xs">
                            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                            <span>LEAD SOLUTIONS ARCHITECTS ONLINE • 15-MIN SLA GUARANTEE</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#003D3F]/70 dark:text-white/70">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>100% Mutual NDA Guaranteed</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* LEFT COLUMN: AUTHORITY HEADLINE & DIRECT CHANNELS (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-5 text-left">
                            <div className="relative w-full">
                                <span className="text-[38px] sm:text-[60px] lg:text-[100px] xl:text-[110px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] block -mb-2 sm:-mb-4 opacity-80 whitespace-nowrap">
                                    CONNECT
                                </span>
                                <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-[#003D3F] dark:text-white tracking-wide font-[family-name:var(--font-heading-main)] relative z-10 leading-[1.15] drop-shadow-sm">
                                    Direct Access To Lead Software Architects
                                </h1>
                            </div>

                            <p className="text-[#003D3F]/80 dark:text-white/80 text-[14px] sm:text-[16px] leading-[1.6] font-[family-name:var(--font-body)]">
                                Skip the junior sales reps. Speak directly with our Lead Systems Architects and quant engineers to scope your project, establish fixed milestone pricing, or execute a mutual NDA.
                            </p>
                        {/* Direct Channels Glass Card */}
                        <div className="bg-gradient-to-b from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001D1F]/85 dark:to-[#001416]/90 rounded-3xl p-6 sm:p-7 border border-[#003D3F]/15 dark:border-white/15 backdrop-blur-2xl shadow-xl relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#003D3F]/10 dark:border-white/10">
                                <Headphones className="w-5 h-5 text-[#00595C] dark:text-[#FFC050]" />
                                <h3 className="text-base sm:text-lg font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                    Direct Channels & Hotlines
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4 text-xs sm:text-sm">
                                {/* Direct Phone Hotline */}
                                <a
                                    href="tel:+918889007424"
                                    className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 hover:border-[#FFC050] transition-all flex items-center gap-3.5 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#00595C]/10 dark:bg-[#FFC050]/15 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] group-hover:scale-110 transition-transform shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-[#003D3F]/60 dark:text-white/60 block">
                                            Direct Phone / WhatsApp Hotline
                                        </span>
                                        <span className="font-bold text-[#003D3F] dark:text-white group-hover:text-[#00595C] dark:group-hover:text-[#FFC050]">
                                            +91 8889007424
                                        </span>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:uvicontechnologies@gmail.com"
                                    className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 hover:border-[#FFC050] transition-all flex items-center gap-3.5 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#00595C]/10 dark:bg-[#FFC050]/15 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] group-hover:scale-110 transition-transform shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[11px] font-bold text-[#003D3F]/60 dark:text-white/60 block">
                                            Architectural Inquiries Email
                                        </span>
                                        <span className="font-bold text-[#003D3F] dark:text-white group-hover:text-[#00595C] dark:group-hover:text-[#FFC050] break-all block">
                                            uvicontechnologies@gmail.com
                                        </span>
                                        <span className="text-[11px] text-[#003D3F]/60 dark:text-white/50 block mt-0.5">
                                            Alt: contact@uvicon.in
                                        </span>
                                    </div>
                                </a>

                                {/* Office Location */}
                                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] shrink-0 mt-0.5">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-[#003D3F]/60 dark:text-white/60 block">
                                            Engineering Studio HQ
                                        </span>
                                        <span className="font-bold text-[#003D3F] dark:text-white leading-snug block">
                                            Behind Climax Academy, Panna Naka, Chhatarpur, M.P. 471001
                                        </span>
                                    </div>
                                </div>

                                {/* Instant Tech Desk */}
                                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-[#00595C]/10 dark:bg-[#FFC050]/15 flex items-center justify-center text-[#00595C] dark:text-[#FFC050] shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-bold text-[#003D3F]/60 dark:text-white/60 block">
                                            Response Time Guarantee
                                        </span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                            Sub-15 Minutes SLA (Live Now)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Standard Guarantees Box */}
                        <div className="bg-white/80 dark:bg-[#001D1F]/70 backdrop-blur-xl rounded-3xl p-6 border border-[#003D3F]/15 dark:border-white/10 shadow-sm text-left">
                            <h4 className="text-xs font-black uppercase tracking-wider text-[#00595C] dark:text-[#3FC1B8] mb-3 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                <span>Our Consultation Commitments</span>
                            </h4>
                            <div className="space-y-2 text-xs text-[#003D3F]/85 dark:text-white/85">
                                <div className="flex items-center gap-2 font-semibold">
                                    <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                    <span>Strict Mutual Non-Disclosure Agreement (NDA)</span>
                                </div>
                                <div className="flex items-center gap-2 font-semibold">
                                    <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                    <span>100% Fixed Scope & No Hidden Fees</span>
                                </div>
                                <div className="flex items-center gap-2 font-semibold">
                                    <Check className="w-3.5 h-3.5 text-[#FFC050] shrink-0" />
                                    <span>Direct access to the engineers building your code</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: INTERACTIVE INQUIRY FORM */}
                    <div className="lg:col-span-7 bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-[#001D1F]/95 dark:via-[#001719]/90 dark:to-[#001214]/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#003D3F]/20 dark:border-white/15 backdrop-blur-2xl shadow-2xl text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-[#00595C]/10 dark:bg-[#FFC050]/15 text-[#00595C] dark:text-[#FFC050] font-black text-xs uppercase tracking-wider border-l border-b border-[#00595C]/20 dark:border-[#FFC050]/30">
                            Fixed Milestone Scope Desk
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Request Sprint Architecture & Scope SOW
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/75 dark:text-white/75 mt-1 font-[family-name:var(--font-body)]">
                                Fill in your project specifications to receive a technical blueprint, timeline estimate, and mutual NDA.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3"
                            >
                                <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <CheckCheck className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                    Technical Inquiry Received Successfully!
                                </h4>
                                <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 max-w-md">
                                    Our Lead Solutions Architect is reviewing your requirements. We will contact you at <strong>{formData.email}</strong> within 15 minutes with our mutual NDA and scoping schedule.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-4 px-6 py-2 rounded-full bg-[#00595C] dark:bg-[#FFC050] text-white dark:text-[#002829] font-bold text-xs"
                                >
                                    Submit Another Inquiry
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs sm:text-sm">
                                {/* Row 1: Full Name & Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#003D3F] dark:text-white mb-1.5">
                                            Your Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Alex Morgan"
                                            className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 text-[#003D3F] dark:text-white placeholder-[#003D3F]/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#003D3F] dark:text-white mb-1.5">
                                            Work Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="alex@company.com"
                                            className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 text-[#003D3F] dark:text-white placeholder-[#003D3F]/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Service Category & Timeline */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#003D3F] dark:text-white mb-1.5">
                                            Engineering Initiative *
                                        </label>
                                        <select
                                            name="serviceCategory"
                                            value={formData.serviceCategory}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-[#001D1F] border border-[#003D3F]/15 dark:border-white/10 text-[#003D3F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                        >
                                            <option value="Custom Software & Web SaaS">Custom Software & Web SaaS</option>
                                            <option value="Algo Trading & Quant Engines">Algo Trading & Quant Engines</option>
                                            <option value="Native & Mobile Applications">Native & Mobile Applications</option>
                                            <option value="Autonomous AI Agents & RAG">Autonomous AI Agents & RAG</option>
                                            <option value="Enterprise Cloud & Microservices">Enterprise Cloud & Microservices</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#003D3F] dark:text-white mb-1.5">
                                            Target Launch Timeline
                                        </label>
                                        <select
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-[#001D1F] border border-[#003D3F]/15 dark:border-white/10 text-[#003D3F] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                        >
                                            <option value="Urgent (1 – 2 Weeks)">Urgent (1 – 2 Weeks)</option>
                                            <option value="2 – 4 Weeks (Standard)">2 – 4 Weeks (Standard)</option>
                                            <option value="1 – 2 Months (Scale)">1 – 2 Months (Scale)</option>
                                            <option value="Long-Term Retainer">Long-Term Retainer</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Row 3: Project Requirements */}
                                <div>
                                    <label className="block text-xs font-bold text-[#003D3F] dark:text-white mb-1.5">
                                        Project Scope & Technical Details *
                                    </label>
                                    <textarea
                                        name="requirements"
                                        rows={4}
                                        required
                                        value={formData.requirements}
                                        onChange={handleInputChange}
                                        placeholder="Describe your tech stack preferences, broker APIs, user scale, or specific architecture requirements..."
                                        className="w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/10 text-[#003D3F] dark:text-white placeholder-[#003D3F]/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                    />
                                </div>

                                {/* Row 4: NDA Checkbox */}
                                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#00595C]/6 dark:bg-white/5 border border-[#00595C]/15 dark:border-white/10">
                                    <input
                                        type="checkbox"
                                        id="requestNda"
                                        name="requestNda"
                                        checked={formData.requestNda}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-[#00595C] rounded border-gray-300 focus:ring-[#FFC050]"
                                    />
                                    <label htmlFor="requestNda" className="text-xs font-semibold text-[#003D3F] dark:text-white cursor-pointer select-none">
                                        Request Mutual Non-Disclosure Agreement (NDA) countersigned before code discussion.
                                    </label>
                                </div>

                                {submitError && (
                                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold">
                                        {submitError}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FFC050] to-[#E6A639] text-[#002829] font-bold text-sm tracking-wide shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FFC050] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>
                                        {isSubmitting ? "Locking In Scope..." : "Lock In Sprint Scope & Request Consultation"}
                                    </span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>

            {/* =====================================================================
               SECTION 3: WHAT HAPPENS NEXT? (THE 3-STEP ONBOARDING PROTOCOL)
               ===================================================================== */}
            <section className="w-full relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="relative text-left w-full max-w-6xl mr-auto mb-8 sm:mb-10 flex flex-col items-start">
                        <div className="relative w-full flex flex-col lg:flex-row justify-start items-start lg:items-center min-h-[0px] lg:min-h-[120px] xl:min-h-[140px]">
                            <span className="text-[34px] sm:text-[54px] lg:text-[130px] xl:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-section leading-none font-[family-name:var(--font-heading-main)] -mb-1 sm:-mb-2 lg:mb-0 opacity-90 lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 lg:z-0 whitespace-nowrap">
                                PROTOCOL
                            </span>
                            <h2 className="text-[22px] sm:text-[32px] lg:text-[36px] xl:text-[44px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight text-left whitespace-normal lg:whitespace-nowrap">
                                What Happens After You Submit?
                            </h2>
                        </div>
                        <p className="text-[#003D3F]/80 dark:text-white/80 text-[13px] sm:text-[15px] lg:text-[17px] leading-[1.6] max-w-2xl mr-auto text-left font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-3.5 lg:mt-3 relative z-10">
                            Our onboarding protocol is streamlined to ensure you go from initial requirement to active production sprints in under 72 hours.
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
                        {[
                            {
                                step: "01",
                                title: "15-Min Technical Review & NDA",
                                desc: "Our Lead Solutions Architect reviews your specifications and sends our mutual NDA countersigned.",
                                icon: ShieldCheck
                            },
                            {
                                step: "02",
                                title: "Live Scoping Call & Figma Alignment",
                                desc: "A 20-minute video session to lock in data models, tech stack selection, and fixed milestone pricing.",
                                icon: Users
                            },
                            {
                                step: "03",
                                title: "Sprint Kickoff & Git Repo Access",
                                desc: "We initialize your private GitHub repo, connect CI/CD pipelines, and begin Phase 1 delivery.",
                                icon: Rocket
                            }
                        ].map((proto, pIdx) => {
                            const ProtoIcon = proto.icon;
                            return (
                                <div
                                    key={pIdx}
                                    className="bg-white/85 dark:bg-[#001D1F]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#003D3F]/15 dark:border-white/10 shadow-sm flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl sm:text-3xl font-black text-[#00595C] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">
                                                {proto.step}
                                            </span>
                                            <div className="w-9 h-9 rounded-xl bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#00595C] dark:text-[#FFC050]">
                                                <ProtoIcon className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <h3 className="text-base font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight mb-2">
                                            {proto.title}
                                        </h3>
                                        <p className="text-xs text-[#003D3F]/75 dark:text-white/75 leading-relaxed font-[family-name:var(--font-body)]">
                                            {proto.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =====================================================================
               SECTION 4: 2-COLUMN ACCORDION FAQS
               ===================================================================== */}
            <section className="w-full relative pt-4 sm:pt-6 lg:pt-8 pb-24 sm:pb-30 lg:pb-36 mb-3 sm:mb-4 lg:mb-5 px-4 sm:px-8 lg:px-16 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-4xl mx-auto text-left sm:text-center mb-8 sm:mb-10">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#FFC050]/30 text-xs font-bold text-[#003D3F] dark:text-[#FFC050] mb-3">
                            <HelpCircle className="w-3.5 h-3.5 text-[#FFC050]" />
                            <span>FREQUENTLY ASKED QUESTIONS</span>
                        </div>
                        <h2 className="text-[24px] sm:text-[34px] lg:text-[40px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                            Questions Regarding Consultation & Scoping
                        </h2>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4.5 mb-12">
                        {contactFaqs.map((faq) => {
                            const isOpen = openFaqId === faq.id;
                            const IconComponent = faq.icon || HelpCircle;

                            return (
                                <div
                                    key={faq.id}
                                    className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                                        isOpen
                                            ? "bg-white/90 dark:bg-[#001D1F]/90 border-[#00595C]/35 dark:border-[#FFC050]/40 shadow-md"
                                            : "bg-white/70 dark:bg-[#001719]/75 border-[#003D3F]/10 dark:border-white/[0.07] hover:border-[#00595C]/25 dark:hover:border-white/20"
                                    } backdrop-blur-md self-start text-left`}
                                >
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#FFC050]/50 cursor-pointer"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-3 min-w-0 pr-1">
                                            <div
                                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                                    isOpen
                                                        ? "bg-[#00595C] text-[#FFC050] dark:bg-[#FFC050] dark:text-[#002829]"
                                                        : "bg-[#003D3F]/8 dark:bg-white/10 text-[#00595C] dark:text-[#FFC050]"
                                                } transition-colors duration-300`}
                                            >
                                                <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                            </div>
                                            <h3 className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-snug">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <div
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                                isOpen
                                                    ? "bg-[#00595C]/15 text-[#00595C] dark:bg-[#FFC050]/20 dark:text-[#FFC050] rotate-180"
                                                    : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/60 dark:text-white/60"
                                            }`}
                                        >
                                            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/85 leading-relaxed font-[family-name:var(--font-body)] border-t border-[#003D3F]/8 dark:border-white/8">
                                                    <p className="pt-2.5">{faq.answer}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
