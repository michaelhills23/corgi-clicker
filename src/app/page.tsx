"use client";

import { motion } from "framer-motion";
import { GameLayout } from "@/components/layout/GameLayout";
import { CurrencyDisplay } from "@/components/game/CurrencyDisplay";
import { Corgi } from "@/components/game/Corgi";
import { LevelDisplay } from "@/components/game/LevelDisplay";
import { PrestigeButton } from "@/components/game/PrestigeButton";
import { useGameStore } from "@/store/gameStore";

export default function Home() {
  const totalClicks = useGameStore((state) => state.totalClicks);

  return (
    <GameLayout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-24">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl text-brand-primary mb-2">
            Corgi Clicker
          </h1>
          <p className="font-body text-text-secondary text-sm">
            {totalClicks === 0
              ? "Click the corgi. You know you want to."
              : `${totalClicks.toLocaleString()} clicks and counting...`}
          </p>
        </motion.div>

        {/* Currency display */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CurrencyDisplay />
        </motion.div>

        {/* Main corgi game area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Corgi />
        </motion.div>

        {/* Hint text for new players */}
        {totalClicks === 0 && (
          <motion.p
            className="mt-8 text-text-tertiary text-sm font-body animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            👆 Tap the corgi!
          </motion.p>
        )}

        {/* Level and Prestige section */}
        <motion.div
          className="w-full max-w-xs mt-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LevelDisplay />
          <PrestigeButton />
        </motion.div>
      </div>
    </GameLayout>
  );
}
