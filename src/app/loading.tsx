import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <main className="w-full relative min-h-screen px-5 sm:px-10 lg:px-16 pt-28 pb-20 flex flex-col items-center overflow-hidden">
      
      {/* Decorative Glow mimicking the page background */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ 
          background: "radial-gradient(circle at 50% 30%, rgba(255, 192, 80, 0.05) 0%, transparent 60%)"
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Hero Skeleton Section */}
        <div className="flex flex-col items-start gap-5 sm:gap-6 lg:w-2/3 mb-20 sm:mb-28">
          <Skeleton className="w-32 h-8 rounded-full" /> {/* Badge */}
          
          <div className="flex flex-col gap-3 sm:gap-4 w-full">
            <Skeleton className="w-full h-10 sm:h-14 lg:h-16" /> {/* H1 Line 1 */}
            <Skeleton className="w-4/5 h-10 sm:h-14 lg:h-16" /> {/* H1 Line 2 */}
          </div>
          
          <div className="flex flex-col gap-2.5 w-full mt-2 sm:mt-4">
            <Skeleton className="w-full sm:w-3/4 h-5" /> {/* Desc Line 1 */}
            <Skeleton className="w-4/5 sm:w-2/3 h-5" /> {/* Desc Line 2 */}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto">
            <Skeleton className="w-full sm:w-48 h-12 rounded-full" /> {/* Button 1 */}
            <Skeleton className="w-full sm:w-56 h-12 rounded-full" /> {/* Button 2 */}
          </div>
        </div>

        {/* Content Section Skeleton (3 Cards) */}
        <div className="w-full mt-10">
          <div className="flex flex-col gap-2 mb-8 sm:mb-12">
             <Skeleton className="w-24 h-6 rounded-full" /> {/* Subtitle */}
             <Skeleton className="w-64 h-10 sm:h-12" /> {/* Section Title */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-4 bg-white/40 dark:bg-[#002224]/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#003D3F]/10 dark:border-white/10 shadow-sm">
                <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl" /> {/* Icon */}
                <Skeleton className="w-3/4 h-6 sm:h-8 mt-2" /> {/* Card Title */}
                <div className="flex flex-col gap-2 mt-2">
                    <Skeleton className="w-full h-4" /> {/* Line 1 */}
                    <Skeleton className="w-full h-4" /> {/* Line 2 */}
                    <Skeleton className="w-4/5 h-4" /> {/* Line 3 */}
                </div>
                <Skeleton className="w-32 h-10 rounded-full mt-4" /> {/* Link Button */}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
