"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { FartCloudManager } from "./FartCloud";
import { CoinParticleManager } from "./CoinParticle";
import { useSounds } from "@/hooks/useSounds";
import { useScreenShake } from "@/hooks/useScreenShake";
import type { CurrencyType } from "@/types/game";

// Get currency type based on total earned
function getCurrencyType(totalEarned: number): CurrencyType {
  if (totalEarned >= 1_000_000) return "dollar-100";
  if (totalEarned >= 100_000) return "dollar-20";
  if (totalEarned >= 10_000) return "dollar-1";
  if (totalEarned >= 1_000) return "gold";
  if (totalEarned >= 100) return "silver";
  return "bronze";
}

interface FartCloud {
  id: string;
  x: number;
  y: number;
}

interface CoinParticle {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  currencyType: CurrencyType;
  value: number;
}

export function Corgi() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { playFart, playCoin } = useSounds();
  const { shake, triggerShake } = useScreenShake();

  const click = useGameStore((state) => state.click);
  const clickValue = useGameStore((state) => state.clickValue);
  const prestigeMultiplier = useGameStore((state) => state.prestigeMultiplier);
  const totalEarned = useGameStore((state) => state.totalEarned);
  const corgiName = useGameStore((state) => state.corgiName);

  const [fartClouds, setFartClouds] = useState<FartCloud[]>([]);
  const [coinParticles, setCoinParticles] = useState<CoinParticle[]>([]);

  const earnedValue = clickValue * prestigeMultiplier;
  const currencyType = getCurrencyType(totalEarned);

  const handleClick = useCallback(() => {
      // Trigger game state update
      click();

      // Play sounds
      playFart();
      playCoin();

      // Get container position for particle spawning
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Spawn fart cloud at corgi's butt (right side since corgi faces left)
        const fartId = `fart-${Date.now()}-${Math.random()}`;
        setFartClouds((clouds) => [
          ...clouds,
          {
            id: fartId,
            x: centerX + 60,
            y: centerY + 10,
          },
        ]);

        // Spawn coin particle from corgi to currency display
        // Currency display is assumed to be above the corgi
        const coinId = `coin-${Date.now()}-${Math.random()}`;
        setCoinParticles((particles) => [
          ...particles,
          {
            id: coinId,
            startX: centerX,
            startY: centerY - 40,
            endX: centerX,
            endY: -100, // Flies up toward the currency display
            currencyType,
            value: earnedValue,
          },
        ]);
      }

      // Trigger squash animation
      controls.start({
        scale: [1, 0.9, 1.05, 1],
        rotate: [0, -2, 2, 0],
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      });

      // Screen shake for big clicks (value > 10)
      if (earnedValue >= 10) {
        const intensity = Math.min(earnedValue / 5, 15); // Cap at 15
        triggerShake(intensity, 150);
      }
    },
    [click, controls, currencyType, earnedValue, playFart, playCoin, triggerShake]
  );

  const handleFartComplete = useCallback((id: string) => {
    setFartClouds((clouds) => clouds.filter((c) => c.id !== id));
  }, []);

  const handleCoinComplete = useCallback((id: string) => {
    setCoinParticles((particles) => particles.filter((p) => p.id !== id));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      style={{
        transform: shake.isShaking ? `translate(${shake.x}px, ${shake.y}px)` : undefined,
      }}
    >
      {/* Particle effects container */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <FartCloudManager
          clouds={fartClouds}
          onCloudComplete={handleFartComplete}
        />
        <CoinParticleManager
          particles={coinParticles}
          onParticleComplete={handleCoinComplete}
        />
      </div>

      {/* Corgi name */}
      <motion.p
        className="font-display text-lg text-text-secondary mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {corgiName}
      </motion.p>

      {/* Clickable corgi */}
      <motion.button
        className="relative w-48 h-48 sm:w-64 sm:h-64 bg-bg-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-orange transition-shadow cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
        onClick={handleClick}
        animate={controls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        style={{ touchAction: "manipulation" }}
      >
        {/* Idle breathing animation wrapper */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/corgis/sir-fluffington.png"
            alt={corgiName}
            width={200}
            height={200}
            className="w-40 h-40 sm:w-52 sm:h-52 object-contain pointer-events-none"
            priority
          />
        </motion.div>

        {/* Click value indicator (shows on hover) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brand-primary text-text-inverse px-3 py-1 rounded-full text-sm font-body font-semibold opacity-0 hover:opacity-100 transition-opacity">
          +{earnedValue}
        </div>
      </motion.button>

      {/* Click multiplier indicator */}
      {prestigeMultiplier > 1 && (
        <motion.div
          className="mt-2 bg-brand-tertiary/50 rounded-full px-3 py-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="font-accent text-sm text-text-primary">
            x{prestigeMultiplier.toFixed(1)} bonus
          </span>
        </motion.div>
      )}
    </div>
  );
}
