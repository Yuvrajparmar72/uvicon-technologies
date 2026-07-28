import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Game & AI Development | Uvicon",
    description: "Next-gen game development and AI agent integrations.",
};

export default function GamesAIPage() {
    return (
        <main className="w-full min-h-screen bg-[#F8FAFC] dark:bg-[#001719] text-[#003D3F] dark:text-white pt-28 pb-20 px-5 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-heading-main)] mb-6">Game & AI Development</h1>
            <p className="text-lg opacity-80 max-w-2xl">This page is under construction. We are building intelligent and immersive worlds.</p>
        </main>
    );
}
