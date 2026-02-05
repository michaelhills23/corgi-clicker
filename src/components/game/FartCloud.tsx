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
    driftX: (Math.random() - 0.5) * 100,
    driftY: -50 - Math.random() * 50,
    rotation: (Math.random() - 0.5) * 30,
    scale: 0.8 + Math.random() * 0.4,
    duration: 1 + Math.random() * 0.5,
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
        width="60"
        height="40"
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cloud shape */}
        <ellipse cx="30" cy="22" rx="25" ry="15" fill="#A8E6CF" opacity="0.7" />
        <ellipse cx="18" cy="18" rx="12" ry="10" fill="#88D8B0" opacity="0.6" />
        <ellipse cx="42" cy="20" rx="10" ry="8" fill="#A8E6CF" opacity="0.5" />
        <ellipse cx="25" cy="12" rx="8" ry="6" fill="#88D8B0" opacity="0.4" />
        {/* Stink lines */}
        <path
          d="M15 8 Q13 5, 15 2"
          stroke="#88D8B0"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M30 6 Q28 3, 30 0"
          stroke="#88D8B0"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M45 8 Q47 5, 45 2"
          stroke="#88D8B0"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
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
