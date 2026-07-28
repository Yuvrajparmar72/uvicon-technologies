import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[#003D3F]/10 dark:bg-white/10 backdrop-blur-md rounded-xl ${className}`}
      {...props}
    />
  );
}
