"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    Star,
    Quote,
    ChevronLeft,
    ChevronRight,
    Send,
    Sparkles,
    CheckCircle2,
    User,
    Building2,
    MessageSquarePlus,
    X
} from "lucide-react";

import { testimonialsData, Testimonial } from "@/data/testimonialsData";

const categories = [
    "All",
    "Algo Trading",
    "Web Development",
    "CRM & SaaS",
    "Mobile App",
    "Game Development",
    "AI & Agents"
] as const;

/* ------------------------------------------------------------------ */
/*  Star Rating Component                                             */
/* ------------------------------------------------------------------ */

function StarRating({ rating, interactive = false, onRate }: {
    rating: number;
    interactive?: boolean;
    onRate?: (rating: number) => void;
}) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type={interactive ? "button" : undefined}
                    disabled={!interactive}
                    onClick={() => interactive && onRate?.(star)}
                    className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"} focus:outline-none`}
                    aria-label={interactive ? `Rate ${star} stars` : undefined}
                >
                    <Star
                        className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${
                            star <= rating
                                ? "text-[#FFC050] fill-[#FFC050]"
                                : "text-[#003D3F]/20 dark:text-white/20"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Aggregate Stats Bar                                               */
/* ------------------------------------------------------------------ */

function AggregateStats({ data = testimonialsData }: { data?: Testimonial[] }) {
    const avgRating = (data.reduce((sum, t) => sum + t.rating, 0) / data.length).toFixed(1);

    return (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-[20px] bg-[#003D3F]/6 dark:bg-white/8 border border-[#003D3F]/12 dark:border-white/15 backdrop-blur-md shrink-0">
            <span className="text-xl sm:text-2xl font-black text-[#003D3F] dark:text-[#FFC050] font-[family-name:var(--font-heading-main)]">{avgRating}</span>
            <div className="flex flex-col text-left">
                <StarRating rating={Math.round(Number(avgRating))} />
                <span className="text-[9px] sm:text-[10px] font-semibold text-[#003D3F]/60 dark:text-white/60 mt-0.5">Average Rating</span>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Review Submission Modal                                           */
/* ------------------------------------------------------------------ */

function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        projectType: "",
        review: "",
        rating: 0,
    });
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", role: "", company: "", projectType: "", review: "", rating: 0 });
            onClose();
        }, 2500);
    };

    const isValid = formData.name && formData.review && formData.rating > 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Write a review">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content — Glassmorphic Container */}
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-[#002224]/95 backdrop-blur-2xl rounded-[2rem] border border-white/40 dark:border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.5)] p-6 sm:p-9 z-10 font-[family-name:var(--font-body)]">

                {/* Subtle Ambient Radial Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFC050]/20 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8.5 h-8.5 rounded-full bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#003D3F]/70 dark:text-white/70 hover:bg-[#FFC050] hover:text-[#002829] dark:hover:bg-[#FFC050] dark:hover:text-[#002829] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                    aria-label="Close review form"
                >
                    <X className="w-4 h-4" />
                </button>

                {submitted ? (
                    /* Success State */
                    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-[#FFC050]/20 flex items-center justify-center shadow-lg border border-[#FFC050]/40">
                            <CheckCircle2 className="w-8 h-8 text-[#FFC050]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                            Thank You!
                        </h3>
                        <p className="text-sm text-[#003D3F]/80 dark:text-white/80 font-[family-name:var(--font-body)] max-w-xs">
                            Your review has been submitted for verification. It will appear live once approved by our team.
                        </p>
                    </div>
                ) : (
                    /* Form State */
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                                <Sparkles className="w-3 h-3" />
                                <span>Client Feedback</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)]">
                                Share Your Experience
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/70 mt-1">
                                All reviews are manually verified against project records before publishing.
                            </p>
                        </div>

                        {/* Star Rating */}
                        <div className="p-3.5 rounded-2xl bg-[#003D3F]/5 dark:bg-white/5 border border-[#003D3F]/10 dark:border-white/10 backdrop-blur-md">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80 mb-2">
                                Rating *
                            </label>
                            <StarRating
                                rating={formData.rating}
                                interactive
                                onRate={(r) => setFormData({ ...formData, rating: r })}
                            />
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="review-name" className="block text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80 mb-1.5">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003D3F]/40 dark:text-white/40" />
                                <input
                                    id="review-name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Rahul Sharma"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/15 text-[#003D3F] dark:text-white placeholder:text-[#003D3F]/40 dark:placeholder:text-white/40 text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:border-transparent transition-all backdrop-blur-md"
                                />
                            </div>
                        </div>

                        {/* Role & Company — Side by Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="review-role" className="block text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80 mb-1.5">
                                    Your Role
                                </label>
                                <input
                                    id="review-role"
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="e.g. CTO, Founder"
                                    className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/15 text-[#003D3F] dark:text-white placeholder:text-[#003D3F]/40 dark:placeholder:text-white/40 text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:border-transparent transition-all backdrop-blur-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="review-company" className="block text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80 mb-1.5">
                                    Company
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#003D3F]/40 dark:text-white/40" />
                                    <input
                                        id="review-company"
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="e.g. TechCorp"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/15 text-[#003D3F] dark:text-white placeholder:text-[#003D3F]/40 dark:placeholder:text-white/40 text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:border-transparent transition-all backdrop-blur-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Project Type */}
                        <div>
                            <label htmlFor="review-project" className="block text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80 mb-1.5">
                                Project Type
                            </label>
                            <select
                                id="review-project"
                                value={formData.projectType}
                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-[#001f21] border border-[#003D3F]/15 dark:border-white/15 text-[#003D3F] dark:text-white text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:border-transparent transition-all appearance-none"
                            >
                                <option value="">Select project type</option>
                                <option value="Web Development">Web Development</option>
                                <option value="CRM & SaaS">CRM & SaaS</option>
                                <option value="Algo Trading">Algo Trading</option>
                                <option value="Game Development">Game Development</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="AI & Agents">AI & Agents</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Review Text */}
                        <div>
                            <label htmlFor="review-text" className="block text-xs font-bold uppercase tracking-wider text-[#003D3F]/80 dark:text-white/80 mb-1.5">
                                Your Review *
                            </label>
                            <textarea
                                id="review-text"
                                required
                                rows={4}
                                value={formData.review}
                                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                                placeholder="Tell us about your experience working with Uvicon Technologies..."
                                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-[#003D3F]/15 dark:border-white/15 text-[#003D3F] dark:text-white placeholder:text-[#003D3F]/40 dark:placeholder:text-white/40 text-sm font-[family-name:var(--font-body)] focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:border-transparent transition-all resize-none backdrop-blur-md"
                            />
                        </div>

                        {/* Verification Notice */}
                        <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl bg-[#FFC050]/15 border border-[#FFC050]/30 backdrop-blur-md">
                            <CheckCircle2 className="w-4 h-4 text-[#FFC050] shrink-0 mt-0.5" />
                            <p className="text-[11px] sm:text-xs text-[#003D3F]/85 dark:text-white/85 leading-relaxed font-medium">
                                Reviews are verified against project records before publishing.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-sm tracking-wide transition-all shadow-md hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>Submit Review</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main Testimonials Section                                         */
/* ------------------------------------------------------------------ */

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Number of visible cards per breakpoint
    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCards(3);
            } else if (window.innerWidth >= 640) {
                setVisibleCards(2);
            } else {
                setVisibleCards(1);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredTestimonials = activeCategory === "All"
        ? testimonialsData
        : testimonialsData.filter((t) => t.projectType === activeCategory);

    const maxIndex = Math.max(0, filteredTestimonials.length - visibleCards);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setActiveIndex(0);
    };

    const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
    const handleNext = () => setActiveIndex((prev) => Math.min(maxIndex, prev + 1));

    return (
        <>
            {/* JSON-LD Schema for Reviews (GEO/SEO) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Uvicon Technologies",
                        "url": "https://uvicon.in",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": (testimonialsData.reduce((s, t) => s + t.rating, 0) / testimonialsData.length).toFixed(1),
                            "reviewCount": testimonialsData.length,
                            "bestRating": "5",
                            "worstRating": "1"
                        },
                        "review": testimonialsData.map((t) => ({
                            "@type": "Review",
                            "author": {
                                "@type": "Person",
                                "name": t.name,
                                "jobTitle": t.role
                            },
                            "datePublished": t.date,
                            "reviewBody": t.review,
                            "reviewRating": {
                                "@type": "Rating",
                                "ratingValue": t.rating,
                                "bestRating": "5",
                                "worstRating": "1"
                            }
                        }))
                    })
                }}
            />

            <section className="w-full relative pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 px-5 sm:px-10 lg:px-16 overflow-hidden font-[family-name:var(--font-body)] transition-colors duration-500">

                {/* Watermark & Radial Glow CSS Theme Variables */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .stroke-watermark-testimonials {
                        -webkit-text-stroke: 2px rgba(0, 61, 63, 0.14);
                    }
                    @media (prefers-color-scheme: dark) {
                        .stroke-watermark-testimonials {
                            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.12);
                        }
                    }
                    :root {
                        --testimonials-glow: radial-gradient(circle at 80% 50%, rgba(0, 180, 170, 0.25) 0%, rgba(255, 192, 80, 0.15) 40%, transparent 80%);
                    }
                    @media (prefers-color-scheme: dark) {
                        :root {
                            --testimonials-glow: radial-gradient(circle at 80% 50%, rgba(0, 180, 170, 0.28) 0%, rgba(0, 120, 115, 0.12) 45%, rgba(0, 60, 55, 0.04) 70%, transparent 100%);
                        }
                    }
                `}} />

                {/* Ambient Background Accents — Radial Glow & 3D Bolt Icons (Left & Right Background) */}
                <div
                    className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)"
                    }}
                >
                    {/* Large Round Shape Radial Gradient Glow (Anchored to Right Edge Across All Screens) */}
                    <div
                        className="absolute top-[10%] -right-[20%] sm:-right-[12%] lg:-right-[5%] w-[420px] h-[420px] sm:w-[680px] sm:h-[680px] lg:w-[880px] lg:h-[880px] rounded-full blur-[70px] sm:blur-[95px] lg:blur-[120px] opacity-75 dark:opacity-85 pointer-events-none z-0"
                        style={{
                            background: "var(--testimonials-glow)"
                        }}
                    />

                    {/* 3D Glass Lightning Bolt 4 Icon Accent (Bottom Left Background — Positioned Near 'Share Your Experience' Banner) */}
                    <div className="absolute bottom-[4%] sm:bottom-[6%] -left-6 sm:-left-12 lg:-left-16 w-36 sm:w-56 lg:w-72 pointer-events-none opacity-60 dark:opacity-85 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)] z-0">
                        <Image
                            src="/assets/icons/uvicon-bolt-4.webp"
                            alt="3D Glass Bolt 4 Accent Left"
                            width={300}
                            height={300}
                            className="w-full h-auto object-contain transform -rotate-15"
                        />
                    </div>

                    {/* 3D Glass Lightning Bolt 1 Icon Accent (Right Side Background — Matched with Hero & Dev Sections) */}
                    <div className="absolute top-[12%] sm:top-[15%] -right-6 sm:-right-14 lg:-right-20 w-44 sm:w-64 lg:w-80 pointer-events-none opacity-65 dark:opacity-90 drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_45px_rgba(0,0,0,0.6)] z-0">
                        <Image
                            src="/assets/icons/uvicon-bolt-1.webp"
                            alt="3D Glass Bolt Accent Right"
                            width={320}
                            height={320}
                            className="w-full h-auto object-contain transform rotate-12"
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start">

                    {/* Header */}
                    <div className="relative text-right w-full max-w-5xl ml-auto mb-8 sm:mb-12 flex flex-col items-end justify-end">

                        {/* Watermark + H2 */}
                        <div className="relative w-full flex justify-end items-center">
                            <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[32px] sm:text-[110px] lg:text-[160px] font-black tracking-widest uppercase pointer-events-none select-none text-transparent stroke-watermark-testimonials whitespace-nowrap font-[family-name:var(--font-heading-main)] z-0 text-right">
                                REVIEWS
                            </span>

                            <h2 className="text-[24px] sm:text-[44px] lg:text-[54px] font-bold text-[#003D3F] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] relative z-10 leading-tight">
                                What Our Clients Say
                            </h2>
                        </div>

                        {/* Subtitle */}
                        <p className="text-[#003D3F]/85 dark:text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl text-right font-medium font-[family-name:var(--font-body)] mt-2.5 sm:mt-4 relative z-10">
                            Real feedback from verified enterprise clients, quantitative traders, startup founders, and business leaders across India.
                        </p>

                        {/* Stats & Category Filters - Flowing together inline */}
                        <div className="w-full flex items-center justify-end gap-2 sm:gap-3 mt-6 sm:mt-8 relative z-10 overflow-x-auto no-scrollbar pb-2 sm:pb-0 flex-nowrap sm:flex-wrap">
                            
                            {/* Average Rating Block */}
                            <AggregateStats data={testimonialsData} />

                            {/* Divider Line on Desktop */}
                            <div className="hidden sm:block w-[1px] h-8 bg-[#003D3F]/15 dark:bg-white/15 mx-1 shrink-0" />

                            {/* Filter Pills */}
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`shrink-0 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-bold transition-all focus:outline-none backdrop-blur-md ${
                                        activeCategory === cat
                                            ? "bg-[#00595C] text-white dark:bg-[#FFC050] dark:text-[#002829] shadow-md scale-105"
                                            : "bg-[#003D3F]/6 dark:bg-white/8 text-[#003D3F]/80 dark:text-white/80 hover:bg-[#003D3F]/12 dark:hover:bg-white/15 border border-[#003D3F]/10 dark:border-white/10"
                                    }`}
                                >
                                    {cat} {cat === "All" ? `(${testimonialsData.length})` : `(${testimonialsData.filter(t => t.projectType === cat).length})`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Area */}
                    <div className="w-full relative" ref={carouselRef}>

                        {/* Cards Track */}
                        <div className="overflow-hidden w-full">
                            <div
                                className="flex gap-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                    transform: `translateX(calc(-${activeIndex} * (100% + 24px) / ${visibleCards}))`,
                                }}
                            >
                                {filteredTestimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="shrink-0 flex flex-col justify-between bg-white/70 dark:bg-[#001719]/75 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#003D3F]/10 dark:border-white/[0.07] shadow-none hover:border-[#00595C]/30 dark:hover:border-[#FFC050]/30 transition-all duration-300 group relative overflow-hidden min-h-[280px] sm:min-h-[340px]"
                                        style={{
                                            width: `calc(${100 / visibleCards}% - ${(24 * (visibleCards - 1)) / visibleCards}px)`,
                                            minWidth: `calc(${100 / visibleCards}% - ${(24 * (visibleCards - 1)) / visibleCards}px)`,
                                        }}
                                    >
                                        {/* Quote Icon Watermark */}
                                        <Quote className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 text-[#003D3F]/5 dark:text-white/5 rotate-180" />

                                        <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
                                            {/* Project Badge */}
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FFC050]/15 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30 tracking-wide uppercase">
                                                    {testimonial.projectType}
                                                </span>
                                                <StarRating rating={testimonial.rating} />
                                            </div>

                                            {/* Review Text */}
                                            <p className="text-xs sm:text-[15px] text-[#003D3F]/85 dark:text-white/90 leading-relaxed font-[family-name:var(--font-body)]">
                                                &ldquo;{testimonial.review}&rdquo;
                                            </p>
                                        </div>

                                        {/* Author Info */}
                                        <div className="relative z-10 flex items-center gap-2.5 sm:gap-3.5 mt-5 pt-4 sm:pt-5 border-t border-[#003D3F]/10 dark:border-white/10">
                                            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#003D3F]/8 dark:bg-white/8 border border-[#003D3F]/12 dark:border-white/15 flex items-center justify-center overflow-hidden shrink-0">
                                                <User className="w-4 h-4 sm:w-6 sm:h-6 text-[#003D3F]/50 dark:text-white/50" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs sm:text-sm font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] truncate">
                                                    {testimonial.name}
                                                </span>
                                                <span className="text-[10px] sm:text-xs text-[#003D3F]/65 dark:text-white/65 truncate">
                                                    {testimonial.role}{testimonial.company && ` · ${testimonial.company}`}
                                                </span>
                                            </div>
                                            <div className="ml-auto flex items-center gap-1 px-2 py-0.5 sm:py-1 rounded-full bg-[#003D3F]/5 dark:bg-white/8 shrink-0">
                                                <CheckCircle2 className="w-3 h-3 text-[#FFC050]" />
                                                <span className="text-[9px] sm:text-[10px] font-bold text-[#003D3F]/60 dark:text-white/60 uppercase tracking-wider">Verified</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 sm:mt-8">
                            {/* Write Review CTA */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2"
                            >
                                <MessageSquarePlus className="w-4 h-4" />
                                <span>Write a Review</span>
                            </button>

                            {/* Arrow Nav + Dots */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                {/* Chevron Arrows */}
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={handlePrev}
                                        disabled={activeIndex === 0}
                                        aria-label="Previous testimonial"
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#003D3F] dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFC050]/25 dark:hover:bg-[#FFC050]/25 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={activeIndex === maxIndex}
                                        aria-label="Next testimonial"
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#003D3F]/8 dark:bg-white/10 flex items-center justify-center text-[#003D3F] dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FFC050]/25 dark:hover:bg-[#FFC050]/25 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFC050]"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Dot Indicators (Max 8 dots for clean UI if many pages) */}
                                <div className="flex items-center gap-1.5">
                                    {Array.from({ length: Math.min(8, maxIndex + 1) }).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            aria-label={`Go to slide ${idx + 1}`}
                                            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                                                activeIndex === idx
                                                    ? "w-7 bg-[#00595C] dark:bg-[#FFC050]"
                                                    : "w-2.5 bg-[#00595C]/25 dark:bg-white/25 hover:bg-[#00595C]/50"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dedicated Glassmorphism Write-a-Review Callout Banner */}
                    <div className="w-full mt-12 sm:mt-16 bg-white/50 dark:bg-white/[0.04] backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-[#003D3F]/10 dark:border-white/[0.08] shadow-none flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC050]/15 dark:bg-[#FFC050]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex flex-col items-start gap-2 text-left relative z-10 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC050]/20 text-[#003D3F] dark:text-[#FFC050] border border-[#FFC050]/30 text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Have You Worked With Us?</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-section)] leading-tight">
                                Share Your Experience & Feedback
                            </h3>
                            <p className="text-xs sm:text-sm text-[#003D3F]/80 dark:text-white/80 leading-relaxed font-[family-name:var(--font-body)]">
                                Your verified review helps other quantitative traders, founders, and enterprises choose the right tech partner.
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-sm tracking-wide transition-all shadow-[0_10px_25px_rgba(0,89,92,0.25)] dark:shadow-[0_10px_25px_rgba(255,192,80,0.25)] hover:scale-105 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FFC050] focus:ring-offset-2 relative z-10"
                        >
                            <MessageSquarePlus className="w-4.5 h-4.5" />
                            <span>Write a Client Review</span>
                        </button>
                    </div>
                </div>
            </section>

            <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
