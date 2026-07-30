"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  tag = "h2",
}) => {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
      rotateZ: 3,
    },
    visible: {
      y: "0%",
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const MotionTag = motion[tag] as React.ElementType;

  return (
    <MotionTag
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
