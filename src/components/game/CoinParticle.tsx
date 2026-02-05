"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CurrencyType } from "@/types/game";

interface CoinParticleProps {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  currencyType: CurrencyType;
  value: number;
  onComplete: (id: string) => void;
}

// Get emoji based on currency type
function getCoinEmoji(type: CurrencyType): string {
  switch (type) {
    case "dollar-100":
      return "💵";
    case "dollar-20":
      return "💵";
    case "dollar-1":
      return "💲";
    case "gold":
      return "🪙";
    case "silver":
      return "🥈";
    case "bronze":
      return "🥉";
  }
}

export function CoinParticle({
  id,
  startX,
  startY,
  endX,
  endY,
  currencyType,
  value,
  onComplete,
}: CoinParticleProps) {
  const [variants] = useState(() => ({
    // Add some randomness to the arc
    midX: (startX + endX) / 2 + (Math.random() - 0.5) * 50,
    midY: Math.min(startY, endY) - 50 - Math.random() * 30,
    rotation: Math.random() * 360,
  }));

  const emoji = getCoinEmoji(currencyType);
  const duration = 0.6;

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(id);
    }, duration * 1000);
    return () => clearTimeout(timer);
  }, [id, onComplete]);

  return (
    <motion.div
      className="absolute pointer-events-none z-20 text-2xl"
      style={{ left: startX, top: startY }}
      initial={{
        opacity: 1,
        scale: 1.2,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      animate={{
        opacity: [1, 1, 0],
        scale: [1.2, 1, 0.5],
        x: [0, variants.midX - startX, endX - startX],
        y: [0, variants.midY - startY, endY - startY],
        rotate: variants.rotation,
      }}
      transition={{
        duration,
        ease: "easeOut",
        times: [0, 0.5, 1],
      }}
    >
      {emoji}
      {value > 1 && (
        <span className="absolute -top-2 -right-2 text-xs font-accent text-brand-primary bg-bg-secondary rounded-full px-1">
          +{value}
        </span>
      )}
    </motion.div>
  );
}

// Manager for multiple coin particles
interface CoinParticleManagerProps {
  particles: Array<{
    id: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    currencyType: CurrencyType;
    value: number;
  }>;
  onParticleComplete: (id: string) => void;
}

export function CoinParticleManager({
  particles,
  onParticleComplete,
}: CoinParticleManagerProps) {
  return (
    <>
      {particles.map((particle) => (
        <CoinParticle
          key={particle.id}
          {...particle}
          onComplete={onParticleComplete}
        />
      ))}
    </>
  );
}
