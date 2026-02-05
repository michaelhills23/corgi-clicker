"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FartCloudProps {
  id: string;
  x: number;
  y: number;
  onComplete: (id: string) => void;
}

export function FartCloud({ id, x, y, onComplete }: FartCloudProps) {
  // Random variations for organic feel
  const [variants] = useState(() => ({
    driftX: 60 + Math.random() * 100, // Drift to the right (away from butt)
    driftY: -20 - Math.random() * 30,
    rotation: (Math.random() - 0.5) * 40,
    scale: 2.5 + Math.random() * 1.5, // Much bigger clouds (2.5x to 4x)
    duration: 1.5 + Math.random() * 0.5,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, variants.duration * 1000);
    return () => clearTimeout(timer);
  }, [id, onComplete, variants.duration]);

  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{ left: x, top: y }}
      initial={{
        opacity: 0.8,
        scale: 0.3,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      animate={{
        opacity: 0,
        scale: variants.scale,
        x: variants.driftX,
        y: variants.driftY,
        rotate: variants.rotation,
      }}
      transition={{
        duration: variants.duration,
        ease: "easeOut",
      }}
    >
      <svg
        width="120"
        height="90"
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cloud shape - big, puffy, and GREEN */}
        <ellipse cx="60" cy="50" rx="50" ry="32" fill="#7CB342" opacity="0.85" />
        <ellipse cx="35" cy="45" rx="28" ry="22" fill="#8BC34A" opacity="0.8" />
        <ellipse cx="85" cy="48" rx="24" ry="20" fill="#9CCC65" opacity="0.75" />
        <ellipse cx="50" cy="30" rx="20" ry="16" fill="#8BC34A" opacity="0.7" />
        <ellipse cx="75" cy="32" rx="16" ry="14" fill="#AED581" opacity="0.7" />
        <ellipse cx="45" cy="60" rx="18" ry="14" fill="#7CB342" opacity="0.6" />
        {/* Stink lines - prominent */}
        <path
          d="M30 22 Q26 14, 30 6"
          stroke="#558B2F"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M60 18 Q56 10, 60 2"
          stroke="#558B2F"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M90 22 Q94 14, 90 6"
          stroke="#558B2F"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
}

// Manager component for multiple fart clouds
interface FartCloudManagerProps {
  clouds: Array<{ id: string; x: number; y: number }>;
  onCloudComplete: (id: string) => void;
}

export function FartCloudManager({
  clouds,
  onCloudComplete,
}: FartCloudManagerProps) {
  return (
    <>
      {clouds.map((cloud) => (
        <FartCloud
          key={cloud.id}
          id={cloud.id}
          x={cloud.x}
          y={cloud.y}
          onComplete={onCloudComplete}
        />
      ))}
    </>
  );
}
