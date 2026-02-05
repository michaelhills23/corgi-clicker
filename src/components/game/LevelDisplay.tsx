"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { getLevelProgress, getLevelThreshold, getLevelTitle } from "@/utils/progression";

export function LevelDisplay() {
  const level = useGameStore((state) => state.level);
  const totalEarned = useGameStore((state) => state.totalEarned);
  const prestigeLevel = useGameStore((state) => state.prestigeLevel);

  const progress = getLevelProgress(totalEarned, level);
  const nextThreshold = getLevelThreshold(level + 1);
  const title = getLevelTitle(level);

  return (
    <div className="bg-bg-secondary rounded-2xl px-4 py-3 shadow-md">
      {/* Level header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-text-primary">
            Level {level}
          </span>
          {prestigeLevel > 0 && (
            <span className="bg-brand-tertiary/30 text-brand-tertiary px-2 py-0.5 rounded-full text-xs font-body font-semibold">
              P{prestigeLevel}
            </span>
          )}
        </div>
        <span className="font-body text-sm text-text-secondary">{title}</span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Progress text */}
      <div className="flex justify-between mt-1">
        <span className="font-body text-xs text-text-tertiary">
          {Math.floor(progress * 100)}%
        </span>
        <span className="font-body text-xs text-text-tertiary">
          Next: ${nextThreshold.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// Compact version for navigation or headers
export function LevelDisplayCompact() {
  const level = useGameStore((state) => state.level);
  const totalEarned = useGameStore((state) => state.totalEarned);
  const progress = getLevelProgress(totalEarned, level);

  return (
    <div className="flex items-center gap-2">
      <span className="font-display text-sm text-text-primary">Lv.{level}</span>
      <div className="w-16 h-2 bg-bg-tertiary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-primary rounded-full"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
