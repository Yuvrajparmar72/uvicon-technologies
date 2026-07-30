import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="w-full relative min-h-screen px-5 sm:px-10 lg:px-16 pt-28 pb-20 flex flex-col items-center overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255, 192, 80, 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-start gap-5 sm:gap-6 lg:w-3/4 mb-16 sm:mb-24">
          <Skeleton className="w-48 h-8 rounded-full" />
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            <Skeleton className="w-full h-12 sm:h-16 lg:h-20" />
            <Skeleton className="w-4/5 h-12 sm:h-16 lg:h-20" />
          </div>
          <div className="flex flex-col gap-2.5 w-full mt-2 sm:mt-4">
            <Skeleton className="w-full sm:w-3/4 h-5" />
            <Skeleton className="w-4/5 sm:w-2/3 h-5" />
          </div>
        </div>

        {/* Category Tabs Skeleton */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="w-36 h-11 rounded-full shrink-0" />
          ))}
        </div>

        {/* Resources Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-4 bg-white/40 dark:bg-[#002224]/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#003D3F]/10 dark:border-white/10 shadow-sm"
            >
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="w-24 h-6 rounded-full mt-2" />
              <Skeleton className="w-3/4 h-7 mt-1" />
              <div className="flex flex-col gap-2 mt-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-4/5 h-4" />
              </div>
              <Skeleton className="w-36 h-10 rounded-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
