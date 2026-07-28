import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Custom Software Development | Uvicon",
    description: "Enterprise-grade custom software development, Algo Trading, and SaaS solutions.",
};

export default function SoftwarePage() {
    return (
        <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#001719] text-[#003D3F] dark:text-white pt-28 pb-20 px-5 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-heading-main)] mb-6">Custom Software Development</h1>
            <p className="text-lg opacity-80 max-w-2xl">This page is under construction. Stay tuned for our enterprise software solutions!</p>
        </main>
    );
}
