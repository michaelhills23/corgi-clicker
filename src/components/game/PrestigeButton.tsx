"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { canPrestige, getPrestigeMultiplier } from "@/utils/progression";
import { useSounds } from "@/hooks/useSounds";
import { PrestigeAnimation } from "./PrestigeAnimation";

export function PrestigeButton() {
  const [showModal, setShowModal] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const level = useGameStore((state) => state.level);
  const prestigeLevel = useGameStore((state) => state.prestigeLevel);
  const prestige = useGameStore((state) => state.prestige);
  const { playPrestige } = useSounds();

  const isReady = canPrestige(level);
  const nextMultiplier = getPrestigeMultiplier(prestigeLevel + 1);
  const currentMultiplier = getPrestigeMultiplier(prestigeLevel);

  const handlePrestige = () => {
    setShowModal(false);
    setShowAnimation(true);
    playPrestige();
  };

  const handleAnimationComplete = () => {
    prestige();
    setShowAnimation(false);
  };

  if (!isReady && prestigeLevel === 0) {
    // Don't show anything until they're close to prestige
    if (level < 40) return null;

    return (
      <div className="bg-bg-secondary/50 rounded-2xl px-4 py-3 border-2 border-dashed border-text-tertiary">
        <p className="font-body text-sm text-text-tertiary text-center">
          Reach Level 50 to unlock The Big Toot
        </p>
        <p className="font-body text-xs text-text-tertiary text-center mt-1">
          {50 - level} levels to go...
        </p>
      </div>
    );
  }

  return (
    <>
      <motion.button
        className={`w-full rounded-2xl px-4 py-4 font-display text-lg transition-all ${
          isReady
            ? "bg-gradient-to-r from-brand-tertiary to-brand-primary text-text-inverse shadow-gold animate-glow-pulse"
            : "bg-bg-secondary text-text-secondary"
        }`}
        onClick={() => isReady && setShowModal(true)}
        disabled={!isReady}
        whileHover={isReady ? { scale: 1.02 } : {}}
        whileTap={isReady ? { scale: 0.98 } : {}}
      >
        {isReady ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">💨</span>
            <span>The Big Toot!</span>
            <span className="text-2xl">💨</span>
          </div>
        ) : (
          <div className="text-center">
            <p>Prestige x{currentMultiplier.toFixed(1)}</p>
            <p className="text-xs font-body">Level 50 to prestige again</p>
          </div>
        )}
      </motion.button>

      {/* Prestige animation */}
      <PrestigeAnimation
        isPlaying={showAnimation}
        onComplete={handleAnimationComplete}
        newMultiplier={nextMultiplier}
      />

      {/* Prestige confirmation modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-bg-inverse/80"
              onClick={() => setShowModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
              className="relative bg-bg-primary rounded-3xl p-6 max-w-sm w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  💨
                </motion.div>
                <h2 className="font-display text-2xl text-brand-primary">
                  The Big Toot!
                </h2>
                <p className="font-body text-text-secondary mt-2">
                  Release all your accumulated gas for a permanent bonus!
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-bg-secondary rounded-xl p-4 mb-6">
                <h3 className="font-body font-semibold text-text-primary mb-2">
                  What you&apos;ll get:
                </h3>
                <ul className="space-y-2 font-body text-sm">
                  <li className="flex items-center gap-2 text-success">
                    <span>✓</span>
                    <span>
                      Permanent x{nextMultiplier.toFixed(1)} multiplier (from x
                      {currentMultiplier.toFixed(1)})
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-success">
                    <span>✓</span>
                    <span>Keep all cosmetics and corgis</span>
                  </li>
                  {prestigeLevel === 0 && (
                    <li className="flex items-center gap-2 text-brand-tertiary">
                      <span>✨</span>
                      <span>Unlock Lord Chaos corgi!</span>
                    </li>
                  )}
                </ul>

                <h3 className="font-body font-semibold text-text-primary mt-4 mb-2">
                  What resets:
                </h3>
                <ul className="space-y-2 font-body text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span>↺</span>
                    <span>Currency back to 0</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>↺</span>
                    <span>Level back to 0</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>↺</span>
                    <span>All upgrades reset</span>
                  </li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  className="flex-1 py-3 rounded-full font-body font-semibold bg-bg-tertiary text-text-secondary"
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Not Yet
                </motion.button>
                <motion.button
                  className="flex-1 py-3 rounded-full font-body font-semibold bg-gradient-to-r from-brand-tertiary to-brand-primary text-text-inverse"
                  onClick={handlePrestige}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  DO IT! 💨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
