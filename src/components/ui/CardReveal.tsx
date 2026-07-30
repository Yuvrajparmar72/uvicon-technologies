"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  radius?: string;
}

export const CardReveal: React.FC<CardRevealProps> = ({
  children,
  className = "",
  delay = 0,
  radius = "1.5rem",
}) => {
  return (
    <motion.div
      className={className}
      initial={{
        clipPath: `inset(20% 0% 0% 0% round ${radius})`,
        opacity: 0,
        y: 45,
        scale: 0.96,
      }}
      whileInView={{
        clipPath: `inset(0% 0% 0% 0% round ${radius})`,
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{
        duration: 0.85,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
};
