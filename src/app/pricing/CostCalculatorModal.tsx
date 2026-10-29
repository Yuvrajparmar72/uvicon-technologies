"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
    Globe, Smartphone, Monitor, Cloud,
    Briefcase, ShoppingCart, Code, Target,
    Layers, Users, Database, Package,
    Layout, PenTool, Star, Rocket, TrendingUp, Building2, Store, MessageCircle,
    CheckCircle2, ArrowRight, ArrowLeft, X, Clock, Zap,
    IndianRupee, Sparkles, ArrowUpRight, Calculator
} from "lucide-react";

import {
    WizardState,
    PROJECT_TYPES,
    PROJECT_PHASES,
    PLATFORMS,
    DESIGN_LEVELS,
    FEATURES,
    calculateEstimate,
    formatCurrency,
} from "./calculatorData";

/* ─── ICON MAPPING ──────────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Globe, Smartphone, Monitor, Cloud,
    Briefcase, ShoppingCart, Code, Target,
    Layers, Users, Database, Package,
    Layout, PenTool, Star, Rocket,
    TrendingUp, Building2, Store, MessageCircle,
};

const getIcon = (name: string, className = "w-6 h-6") => {
    const IconComp = ICON_MAP[name] || Globe;
    return <IconComp className={className} />;
};

/* ─── STEP METADATA ─────────────────────────────────────────────────────────── */

const STEP_META = [
    { title: "Project Type", subtitle: "What are you building?" },
    { title: "Development Phase", subtitle: "MVP or Full Scale?" },
    { title: "Platform", subtitle: "Where will it run?" },
    { title: "Design & UX", subtitle: "Visual complexity level" },
    { title: "Advanced Features", subtitle: "Select required modules" },
    { title: "Your Estimate", subtitle: "Cost breakdown & next steps" },
];

const TOTAL_STEPS = 6;

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────────── */

interface CostCalculatorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CostCalculatorModal({ isOpen, onClose }: CostCalculatorModalProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const contentRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState<WizardState>({
        projectType: null,
        phase: null,
        platform: null,
        designLevel: null,
        features: [],
    });

    const estimate = calculateEstimate(state);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // ESC to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Reset when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setDirection(1);
                setState({
                    projectType: null,
                    phase: null,
                    platform: null,
                    designLevel: null,
                    features: [],
                });
            }, 400);
        }
    }, [isOpen]);

    // Scroll content to top on step change
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [step]);

    const goNext = useCallback(() => {
        if (step < TOTAL_STEPS) {
            setDirection(1);
            setStep((s) => s + 1);
        }
    }, [step]);

    const goBack = useCallback(() => {
        if (step > 1) {
            setDirection(-1);
            setStep((s) => s - 1);
        }
    }, [step]);

    const selectAndAdvance = useCallback(
        (setter: () => void) => {
            setter();
            setTimeout(() => goNext(), 200);
        },
        [goNext]
    );

    const toggleFeature = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            features: prev.features.includes(id)
                ? prev.features.filter((f) => f !== id)
                : [...prev.features, id],
        }));
    }, []);

    const canProceed = () => {
        if (step === 1) return !!state.projectType;
        if (step === 2) return !!state.phase;
        if (step === 3) return !!state.platform;
        if (step === 4) return !!state.designLevel;
        return true;
    };

    /* ─── CARD STYLES ─────────────────────────────────────────────────────── */

    const cardBase =
        "relative flex flex-col items-start p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-300 group h-full";
    const cardSelected =
        "border-[#3FC1B8] bg-[#3FC1B8]/8 shadow-[0_0_30px_rgba(63,193,184,0.15)] ring-1 ring-[#3FC1B8]/30";
    const cardUnselected =
        "border-white/10 bg-white/[0.03] hover:border-[#3FC1B8]/40 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(63,193,184,0.08)]";

    /* ─── STEP RENDERERS ──────────────────────────────────────────────────── */

    const renderStep1 = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECT_TYPES.map((type) => (
                <button
                    key={type.id}
                    onClick={() =>
                        selectAndAdvance(() =>
                            setState((prev) => ({ ...prev, projectType: type.id as any, platform: null }))
                        )
                    }
                    className={`${cardBase} ${state.projectType === type.id ? cardSelected : cardUnselected}`}
                >
                    <div
                        className={`p-3 rounded-xl mb-4 transition-colors ${
                            state.projectType === type.id
                                ? "bg-[#3FC1B8]/20 text-[#3FC1B8]"
                                : "bg-white/5 text-white/40 group-hover:bg-[#3FC1B8]/10 group-hover:text-[#3FC1B8]"
                        }`}
                    >
                        {getIcon(type.iconName, "w-7 h-7 sm:w-8 sm:h-8")}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white/90 font-[family-name:var(--font-heading-main)]">
                        {type.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/40 mt-1 text-left">{type.description}</p>
                    <div className="mt-auto pt-4 w-full border-t border-dashed border-white/10">
                        <span className="text-xs font-bold text-[#3FC1B8]/70 uppercase tracking-wider">
                            Base: {formatCurrency(type.basePrice || 0)}
                        </span>
                    </div>
                    {state.projectType === type.id && (
                        <div className="absolute top-3 right-3">
                            <CheckCircle2 className="w-5 h-5 text-[#3FC1B8]" />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PROJECT_PHASES.map((phase) => (
                    <button
                        key={phase.id}
                        onClick={() =>
                            selectAndAdvance(() =>
                                setState((prev) => ({ ...prev, phase: phase.id as any }))
                            )
                        }
                        className={`${cardBase} ${state.phase === phase.id ? cardSelected : cardUnselected}`}
                    >
                        <div
                            className={`mb-3 transition-colors ${
                                state.phase === phase.id
                                    ? "text-[#3FC1B8]"
                                    : "text-white/30 group-hover:text-[#3FC1B8]"
                            }`}
                        >
                            {getIcon(phase.iconName, "w-9 h-9 sm:w-10 sm:h-10")}
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-white/90 font-[family-name:var(--font-heading-main)]">
                            {phase.label}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/40 mt-2 text-left leading-relaxed">
                            {phase.description}
                        </p>
                        {state.phase === phase.id && (
                            <div className="absolute top-3 right-3">
                                <CheckCircle2 className="w-5 h-5 text-[#3FC1B8]" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
            <div className="bg-[#3FC1B8]/5 border border-[#3FC1B8]/15 rounded-xl p-4 flex gap-3 text-white/60 text-xs sm:text-sm items-center">
                <Zap className="w-5 h-5 text-[#3FC1B8] shrink-0" />
                <p>
                    Choosing &quot;MVP&quot; focuses on speed and core value. &quot;Enterprise&quot; ensures
                    maximum security and scalability but costs more.
                </p>
            </div>
        </div>
    );

    const renderStep3 = () => {
        if (!state.projectType) return <p className="text-white/40">Please select a project type first.</p>;
        const options = PLATFORMS[state.projectType] || [];
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setState((prev) => ({ ...prev, platform: opt.id }))}
                        className={`${cardBase} ${state.platform === opt.id ? cardSelected : cardUnselected}`}
                    >
                        <div
                            className={`transition-colors ${
                                state.platform === opt.id
                                    ? "text-[#3FC1B8]"
                                    : "text-white/30 group-hover:text-[#3FC1B8]"
                            }`}
                        >
                            {getIcon(opt.iconName)}
                        </div>
                        <h3 className="font-bold text-white/90 mt-3 text-sm sm:text-base font-[family-name:var(--font-heading-main)]">
                            {opt.label}
                        </h3>
                        <p className="text-xs text-white/40 mt-1 text-left">{opt.description}</p>
                        {state.platform === opt.id && (
                            <div className="absolute top-2 right-2">
                                <div className="w-3 h-3 bg-[#3FC1B8] rounded-full shadow-[0_0_8px_rgba(63,193,184,0.6)]" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const renderStep4 = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {DESIGN_LEVELS.map((level) => (
                <button
                    key={level.id}
                    onClick={() => setState((prev) => ({ ...prev, designLevel: level.id as any }))}
                    className={`${cardBase} ${state.designLevel === level.id ? cardSelected : cardUnselected}`}
                >
                    {state.designLevel === level.id && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3FC1B8] to-[#00E5D4] rounded-t-2xl" />
                    )}
                    <div className="flex w-full items-center justify-between mb-3">
                        <div
                            className={`transition-colors ${
                                state.designLevel === level.id
                                    ? "text-[#3FC1B8]"
                                    : "text-white/30 group-hover:text-[#3FC1B8]"
                            }`}
                        >
                            {getIcon(level.iconName, "w-7 h-7 sm:w-8 sm:h-8")}
                        </div>
                        {state.designLevel === level.id && (
                            <CheckCircle2 className="w-5 h-5 text-[#3FC1B8]" />
                        )}
                    </div>
                    <h3 className="font-black text-white/90 text-base sm:text-lg font-[family-name:var(--font-heading-main)]">
                        {level.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/40 mt-1 text-left">{level.description}</p>
                </button>
            ))}
        </div>
    );

    const renderStep5 = () => (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {FEATURES.map((feat) => {
                    const isSelected = state.features.includes(feat.id);
                    return (
                        <button
                            key={feat.id}
                            onClick={() => toggleFeature(feat.id)}
                            className={`p-4 border rounded-xl flex items-center justify-between transition-all duration-200 group ${
                                isSelected
                                    ? "border-[#3FC1B8]/50 bg-[#3FC1B8]/8 shadow-[0_0_20px_rgba(63,193,184,0.1)]"
                                    : "border-white/8 bg-white/[0.02] hover:border-[#3FC1B8]/30 hover:bg-white/[0.04]"
                            }`}
                        >
                            <div className="text-left">
                                <h4
                                    className={`font-bold text-sm ${
                                        isSelected ? "text-[#3FC1B8]" : "text-white/80"
                                    }`}
                                >
                                    {feat.label}
                                </h4>
                                <p className="text-[10px] sm:text-xs text-white/35 mt-0.5">{feat.description}</p>
                            </div>
                            <div className="text-right flex flex-col items-end min-w-[65px]">
                                <div
                                    className={`text-xs font-bold ${
                                        isSelected
                                            ? "text-[#3FC1B8]"
                                            : "text-white/40 group-hover:text-[#3FC1B8]/70"
                                    }`}
                                >
                                    +{formatCurrency(feat.price)}
                                </div>
                                {isSelected ? (
                                    <CheckCircle2 className="w-4 h-4 text-[#3FC1B8] mt-1" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full border border-white/20 mt-1 group-hover:border-[#3FC1B8]/40" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="mt-5 text-center text-xs text-white/30 italic bg-white/[0.02] p-3 rounded-xl border border-white/5">
                * Selected features increase both cost and development timeline.
            </div>
        </div>
    );

    const renderStep6 = () => (
        <div className="space-y-6 sm:space-y-8">
            {/* Cost Hero */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#003D3F] via-[#002829] to-[#001416] p-6 sm:p-8 lg:p-10 border border-[#3FC1B8]/20">
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#3FC1B8]/5 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#3FC1B8]/3 rounded-full" />

                <p className="text-[#3FC1B8]/60 text-xs uppercase tracking-[0.2em] font-bold mb-3 relative z-10">
                    Total Estimated Investment
                </p>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-[family-name:var(--font-heading-main)] mb-1 relative z-10">
                    {formatCurrency(estimate.minEstimate)}
                    <span className="text-lg sm:text-2xl text-white/30 mx-2">—</span>
                    {formatCurrency(estimate.maxEstimate)}
                </div>

                <div className="flex items-center gap-2 text-white/50 mt-4 relative z-10 bg-white/5 rounded-xl px-4 py-2.5 w-fit">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#3FC1B8]" />
                    <span className="text-xs sm:text-sm font-medium">
                        Timeline: {estimate.estimatedWeeksMin} — {estimate.estimatedWeeksMax} Weeks
                    </span>
                </div>
            </div>

            {/* Breakdown */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <div className="bg-gradient-to-r from-[#3FC1B8]/10 to-transparent px-5 sm:px-6 py-4 border-b border-white/8">
                    <h3 className="text-base sm:text-lg font-black text-white/90 font-[family-name:var(--font-heading-main)]">
                        Project Summary
                    </h3>
                </div>
                <div className="p-5 sm:p-6 space-y-3">
                    {[
                        { l: "Project Type", v: PROJECT_TYPES.find((p) => p.id === state.projectType)?.label },
                        { l: "Phase", v: PROJECT_PHASES.find((p) => p.id === state.phase)?.label },
                        {
                            l: "Platform",
                            v: state.projectType
                                ? PLATFORMS[state.projectType]?.find((p) => p.id === state.platform)?.label
                                : null,
                        },
                        { l: "Design Level", v: DESIGN_LEVELS.find((d) => d.id === state.designLevel)?.label },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-3">
                            <span className="text-xs sm:text-sm text-white/40">{item.l}</span>
                            <span className="text-xs sm:text-sm font-semibold text-white/80 capitalize">
                                {item.v || "—"}
                            </span>
                        </div>
                    ))}

                    <div className="pt-2">
                        <span className="text-xs sm:text-sm text-white/40 block mb-2">
                            Features ({state.features.length})
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {state.features.length === 0 ? (
                                <span className="text-xs text-white/25">None selected</span>
                            ) : (
                                state.features.map((f) => {
                                    const feat = FEATURES.find((ft) => ft.id === f);
                                    return (
                                        <span
                                            key={f}
                                            className="text-[10px] sm:text-xs bg-[#3FC1B8]/10 border border-[#3FC1B8]/20 text-[#3FC1B8] px-2 py-1 rounded-lg font-medium"
                                        >
                                            {feat?.label}
                                        </span>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="pt-3 border-t border-white/8 space-y-2 mt-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-white/35">Base + Phase (×{estimate.breakdown.phaseMultiplier})</span>
                            <span className="text-white/60 font-semibold">{formatCurrency(estimate.breakdown.base)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/35">Design Premium</span>
                            <span className="text-white/60 font-semibold">+{formatCurrency(estimate.breakdown.designCost)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-white/35">Features</span>
                            <span className="text-white/60 font-semibold">+{formatCurrency(estimate.breakdown.featuresCost)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                    href={`/contact?estimate=${encodeURIComponent(
                        `${formatCurrency(estimate.minEstimate)} - ${formatCurrency(estimate.maxEstimate)}`
                    )}&type=${state.projectType || ""}&phase=${state.phase || ""}`}
                    onClick={() => {
                        supabase.from("quote_estimates").insert([
                            {
                                project_type: state.projectType,
                                phase: state.phase,
                                platform: state.platform,
                                design_level: state.designLevel,
                                features: state.features,
                                min_estimate: estimate.minEstimate,
                                max_estimate: estimate.maxEstimate,
                                status: "draft"
                            }
                        ]).then(() => {});
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3FC1B8] to-[#00E5D4] text-[#002829] font-black text-sm sm:text-base shadow-[0_8px_30px_rgba(63,193,184,0.3)] hover:shadow-[0_12px_40px_rgba(63,193,184,0.4)] transition-all hover:-translate-y-0.5"
                >
                    Start Your Project
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
                <button
                    onClick={() => {
                        setStep(1);
                        setDirection(-1);
                        setState({
                            projectType: null,
                            phase: null,
                            platform: null,
                            designLevel: null,
                            features: [],
                        });
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/10 hover:text-white/80 transition-all"
                >
                    <Calculator className="w-4 h-4" />
                    Recalculate
                </button>
            </div>
        </div>
    );

    const stepRenderers = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6];

    /* ─── ANIMATION VARIANTS ──────────────────────────────────────────────── */

    const stepVariants = {
        enter: (d: number) => ({
            x: d > 0 ? 60 : -60,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (d: number) => ({
            x: d > 0 ? -60 : 60,
            opacity: 0,
        }),
    };

    /* ─── RENDER ──────────────────────────────────────────────────────────── */

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70" style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }} />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.92, opacity: 0, y: 30 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-[96vw] max-w-[900px] max-h-[92vh] bg-gradient-to-b from-[#001618] via-[#001214] to-[#000D0E] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
                    >
                        {/* Progress Bar */}
                        <div className="h-1 sm:h-1.5 w-full bg-white/5 shrink-0">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#3FC1B8] to-[#00E5D4] shadow-[0_0_12px_rgba(63,193,184,0.5)]"
                                initial={false}
                                animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>

                        {/* Header */}
                        <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5 border-b border-white/8 flex justify-between items-start shrink-0">
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="px-2.5 py-0.5 bg-[#3FC1B8]/10 text-[#3FC1B8] text-[10px] font-bold uppercase rounded-full tracking-widest border border-[#3FC1B8]/15">
                                        Step {step} of {TOTAL_STEPS}
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white/95 font-[family-name:var(--font-heading-main)] leading-tight">
                                    {STEP_META[step - 1].title}
                                </h2>
                                <p className="text-xs sm:text-sm text-white/40 mt-0.5">
                                    {STEP_META[step - 1].subtitle}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Running total */}
                                {step < TOTAL_STEPS && (
                                    <div className="hidden sm:block bg-white/5 px-4 py-2 rounded-xl border border-white/8 text-right">
                                        <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">
                                            Est. Cost
                                        </div>
                                        <div className="text-sm sm:text-base font-black text-[#3FC1B8] font-[family-name:var(--font-heading-main)]">
                                            <IndianRupee className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline -mt-0.5" />
                                            {estimate.minEstimate > 0
                                                ? ` ${estimate.minEstimate.toLocaleString("en-IN")}+`
                                                : " 0"}
                                        </div>
                                    </div>
                                )}

                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                    aria-label="Close calculator"
                                >
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Content Area (scrollable) */}
                        <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
                            <div className="p-5 sm:p-8">
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.div
                                        key={step}
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {stepRenderers[step - 1]()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Footer Navigation */}
                        {step < TOTAL_STEPS && (
                            <div className="px-5 sm:px-8 py-4 sm:py-5 bg-white/[0.02] border-t border-white/8 flex justify-between items-center shrink-0">
                                <button
                                    onClick={goBack}
                                    disabled={step === 1}
                                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                        step === 1
                                            ? "text-white/15 cursor-not-allowed"
                                            : "text-white/50 hover:bg-white/5 hover:text-white/80"
                                    }`}
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>

                                {/* Mobile running total */}
                                <div className="sm:hidden text-center">
                                    <div className="text-[9px] text-white/25 uppercase tracking-widest font-bold">Est.</div>
                                    <div className="text-xs font-black text-[#3FC1B8]">
                                        {estimate.minEstimate > 0
                                            ? `₹${estimate.minEstimate.toLocaleString("en-IN")}+`
                                            : "₹0"}
                                    </div>
                                </div>

                                <button
                                    onClick={goNext}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md transition-all ${
                                        !canProceed()
                                            ? "bg-white/5 text-white/20 cursor-not-allowed shadow-none"
                                            : "bg-gradient-to-r from-[#3FC1B8] to-[#00E5D4] text-[#002829] hover:shadow-[0_8px_25px_rgba(63,193,184,0.3)] hover:-translate-y-0.5"
                                    }`}
                                >
                                    Continue <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        )}

                        {/* Footer for result step */}
                        {step === TOTAL_STEPS && (
                            <div className="px-5 sm:px-8 py-4 sm:py-5 bg-white/[0.02] border-t border-white/8 flex justify-between items-center shrink-0">
                                <button
                                    onClick={goBack}
                                    className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm text-white/50 hover:bg-white/5 hover:text-white/80 transition-all"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Edit Selections
                                </button>
                                <div className="flex items-center gap-2 text-white/25 text-xs">
                                    <Sparkles className="w-3.5 h-3.5 text-[#3FC1B8]/50" />
                                    Powered by Uvicon
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
