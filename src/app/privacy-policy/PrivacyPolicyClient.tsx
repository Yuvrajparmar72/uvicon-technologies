"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export default function PrivacyPolicyClient() {
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#00595C]/10 dark:from-[#3FC1B8]/10 to-transparent rounded-full blur-[100px] pointer-events-none z-0" />

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
                                <span>Legal</span>
                            </div>
                            <span className="text-xs sm:text-sm text-[#003D3F]/70 dark:text-white/60 font-medium">
                                Last Updated: October 1, 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-[#003D3F] dark:text-white font-[family-name:var(--font-heading-main)] tracking-tight">
                            Privacy Policy
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
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                1. Introduction
                            </h2>
                            <p>
                                At Uvicon Technologies ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website (uvicon.in) or engage our software development and IT consulting services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                2. Information We Collect
                            </h2>
                            <p className="mb-3">We may collect the following types of information:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and company details provided via contact forms or project inquiries.</li>
                                <li><strong>Technical Data:</strong> IP addresses, browser type, device information, and usage metrics collected automatically via cookies to improve our website experience.</li>
                                <li><strong>Project Data:</strong> Proprietary enterprise data, APIs, or source code shared strictly under a Non-Disclosure Agreement (NDA) for development purposes.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                3. How We Use Your Information
                            </h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To respond to your inquiries and provide technical consultations.</li>
                                <li>To execute software development contracts and deliver requested IT services.</li>
                                <li>To send administrative notifications, invoices, and project updates.</li>
                                <li>To improve our website's performance and user interface.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                4. Data Security & NDA Compliance
                            </h2>
                            <p>
                                We implement industry-standard security measures, including encryption and secure server hosting, to protect your personal information. Furthermore, all client project data, algorithms, and trade secrets are strictly governed by our Non-Disclosure Agreements (NDAs). Your proprietary data is never used to train public AI models or shared with third-party vendors without explicit consent.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                5. Third-Party Sharing
                            </h2>
                            <p>
                                We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates. We may use third-party service providers (e.g., AWS, Vercel, Stripe) to help us operate our business, provided they adhere to strict data protection standards.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                6. Cookies & Tracking
                            </h2>
                            <p>
                                Our website may use "cookies" to enhance user experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-[#00595C] dark:text-[#3FC1B8] font-[family-name:var(--font-heading-section)] mb-2">
                                7. Your Data Rights
                            </h2>
                            <p>
                                Depending on your jurisdiction, you have the right to access, correct, update, or request deletion of your personal information. To exercise these rights, please contact us using the information below.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-[#003D3F]/10 dark:border-white/10 mt-12">
                            <h2 className="text-lg font-bold text-[#003D3F] dark:text-white mb-4">Contact Us</h2>
                            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
                            <div className="flex flex-col gap-3 font-medium">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-[#FFC050] shrink-0" />
                                    <a href="tel:+918889007424" className="hover:text-[#00595C] dark:hover:text-[#3FC1B8] transition-colors">+91 8889007424</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-[#FFC050] shrink-0" />
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <a href="mailto:uvicontechnologies@gmail.com" className="hover:text-[#00595C] dark:hover:text-[#3FC1B8] transition-colors">uvicontechnologies@gmail.com</a>
                                        <span className="hidden sm:inline text-text-secondary/50">•</span>
                                        <a href="mailto:contact@uvicon.in" className="hover:text-[#00595C] dark:hover:text-[#3FC1B8] transition-colors text-xs text-text-secondary/70">contact@uvicon.in</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#FFC050] shrink-0 mt-0.5" />
                                    <span>Behind Climax Academy, Panna Naka, Chhatarpur, M.P. 471001</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
