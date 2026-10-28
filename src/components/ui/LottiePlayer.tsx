"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface LottiePlayerProps {
    animationPath?: string;
    animationData?: any;
    className?: string;
    style?: React.CSSProperties;
    loop?: boolean;
    autoplay?: boolean;
}

// Dynamically import lottie-react to prevent SSR hydration errors
const DynamicLottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottiePlayer({
    animationPath,
    animationData,
    className = "w-full h-full",
    style,
    loop = true,
    autoplay = true
}: LottiePlayerProps) {
    const [data, setData] = useState<any>(animationData || null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (animationPath && !animationData) {
            fetch(animationPath)
                .then((res) => res.json())
                .then((json) => setData(json))
                .catch((err) => console.error("Error loading Lottie animation:", err));
        }
    }, [animationPath, animationData]);

    if (!isMounted || !data) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <div className="w-8 h-8 rounded-full border-2 border-[#FFC050]/40 border-t-[#FFC050] animate-spin" />
            </div>
        );
    }

    return (
        <div className={className} style={style}>
            <DynamicLottie
                animationData={data}
                loop={loop}
                autoplay={autoplay}
                className="w-full h-full"
            />
        </div>
    );
}
