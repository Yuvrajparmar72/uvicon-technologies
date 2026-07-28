import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Uvicon",
    description: "Get in touch with Uvicon Technologies to start your next big project.",
};

export default function ContactPage() {
    return (
        <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#001719] text-[#003D3F] dark:text-white pt-28 pb-20 px-5 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-heading-main)] mb-6">Contact Us</h1>
            <p className="text-lg opacity-80 max-w-2xl">This page is under construction. We look forward to hearing from you soon.</p>
        </main>
    );
}
