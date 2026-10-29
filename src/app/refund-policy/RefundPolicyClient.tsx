"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

export default function RefundPolicyClient() {
    return (
        <main
            className="w-full min-h-screen relative overflow-x-clip text-[#003D3F] dark:text-white transition-colors duration-500 font-[family-name:var(--font-body)]"
            style={{ background: "var(--page-bg)" }}
        >
            {/* Unified Page Background CSS */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                :root {
                    --page-bg: linear-gradient(to bottom, #E6F9F8 0px, #EBF8F7 50vh, #FDFBF7 100vh);
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --page-bg: linear-gradient(to bottom, #001214 0px, #001618 50vh, #021213 100vh);
                    }
                }
                html.dark {
                    --page-bg: linear-gradient(to bottom, #001214 0px, #001618 50vh, #021213 100vh);
                }
            `
                }}
            />

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#00595C]/10 dark:from-[#FFC050]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

            <section className="w-full relative pt-20 sm:pt-24 lg:pt-28 pb-32 sm:pb-40 px-2 sm:px-4 lg:px-6 z-10 flex flex-col min-h-screen">
                <div className="w-full mx-auto flex-grow">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-left mb-6 sm:mb-8"
                    >
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
                            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#00595C]/10 dark:bg-white/5 border border-[#00595C]/20 dark:border-white/10 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#00595C] dark:text-white/80">
                                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFC050]" />
                                <span>Billing & Policies</span>
                            </div>
                            <span className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/60 font-medium">
                                Last Updated: October 1, 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-main)] tracking-tight">
                            Refund & Cancellation Policy
                        </h1>
                    </motion.div>

                    {/* Content Glass Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white/80 dark:bg-[#001D1F]/70 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-14 border border-white/60 dark:border-white/10 shadow-[0_15px_40px_rgba(0,61,63,0.06)] dark:shadow-none relative overflow-hidden text-sm sm:text-base text-[#003D3F]/85 dark:text-white/85 leading-relaxed space-y-5"
                    >
                        <div>
                            <p className="font-medium text-[#00595C] dark:text-[#3FC1B8] text-lg">
                                At Uvicon Technologies, we operate on a milestone-based, fixed-price delivery model. We aim for 100% transparency before any code is written or payments are made.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                1. Milestone-Based Payments
                            </h2>
                            <p>
                                Software development is a labor-intensive engineering process. Therefore, all our projects are divided into distinct milestones (e.g., UI/UX Design, Core Architecture, Alpha Build, Production Release). Payments are invoiced and collected at the beginning of each milestone.
                            </p>
                            <p className="mt-3">
                                <strong>Once a milestone is actively in development or completed, the payment for that specific milestone is non-refundable.</strong> This covers the engineering hours and infrastructure resources already expended.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                2. Project Cancellations
                            </h2>
                            <p>
                                You retain the right to pause or cancel a project at any time. If you choose to cancel a project:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>No further milestones will be billed.</li>
                                <li>Any pre-paid amounts for milestones that have <strong>not yet started</strong> will be fully refunded within 14 business days.</li>
                                <li>You will receive the full source code and intellectual property for all milestones that have been completed and paid for up to the date of cancellation.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                3. Maintenance & SLA Subscriptions
                            </h2>
                            <p>
                                For ongoing maintenance contracts, server hosting, or Post-Launch SLA agreements:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>Monthly or annual subscriptions can be canceled at any time before the next billing cycle.</li>
                                <li>We do not offer prorated refunds for mid-cycle cancellations. Your service will simply remain active until the end of the current paid billing period.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                4. Delivery Delays
                            </h2>
                            <p>
                                We strive to meet all estimated delivery dates. However, software development can occasionally experience technical delays. Delays caused by third-party API changes, delayed feedback from the client, or scope changes requested by the client do not qualify for a refund.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-4">
                                5. How to Request a Cancellation or Refund
                            </h2>
                            <p>
                                To formally request a project cancellation and applicable refund, please submit a written notice to your assigned Project Manager and CC our billing department.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-[#003D3F]/10 dark:border-white/10 mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-lg font-bold text-[#003D3F] dark:text-white mb-2">Billing & Support Desk</h2>
                                <div className="flex flex-col gap-2 font-medium text-sm">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-[#FFC050] shrink-0" />
                                        <a href="tel:+918889007424" className="hover:text-[#00595C] dark:hover:text-[#3FC1B8] transition-colors">+91 8889007424</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-[#FFC050] shrink-0" />
                                        <a href="mailto:uvicontechnologies@gmail.com" className="hover:text-[#00595C] dark:hover:text-[#3FC1B8] transition-colors">uvicontechnologies@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                            
                            <Link 
                                href="/pricing"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00595C] hover:bg-[#003D3F] dark:bg-[#FFC050] dark:hover:bg-[#e0a840] text-white dark:text-[#002829] font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00595C] dark:focus:ring-offset-[#001214]"
                            >
                                <span>View Pricing Model</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
