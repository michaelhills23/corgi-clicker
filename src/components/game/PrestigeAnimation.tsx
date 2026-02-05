"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PrestigeAnimationProps {
  isPlaying: boolean;
  onComplete: () => void;
  newMultiplier: number;
}

// Generate random fart clouds for the explosion
function generateClouds(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 30,
    distance: 100 + Math.random() * 200,
    size: 40 + Math.random() * 40,
    delay: Math.random() * 0.3,
  }));
}

export function PrestigeAnimation({
  isPlaying,
  onComplete,
  newMultiplier,
}: PrestigeAnimationProps) {
  const [clouds] = useState(() => generateClouds(12));
  const [phase, setPhase] = useState<"buildup" | "explosion" | "reveal">("buildup");

  useEffect(() => {
    if (!isPlaying) {
      setPhase("buildup");
      return;
    }

    // Phase timing
    const explosionTimer = setTimeout(() => setPhase("explosion"), 1000);
    const revealTimer = setTimeout(() => setPhase("reveal"), 2000);
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [isPlaying, onComplete]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark backdrop */}
          <motion.div
            className="absolute inset-0 bg-bg-inverse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
          />

          {/* Buildup phase - corgi charging up */}
          {phase === "buildup" && (
            <motion.div
              className="relative z-10"
              initial={{ scale: 1 }}
              animate={{
                scale: [1, 1.1, 1, 1.2, 1, 1.3],
                rotate: [0, -5, 5, -5, 5, 0],
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.div
                className="text-9xl"
                animate={{
                  filter: [
                    "brightness(1)",
                    "brightness(1.5)",
                    "brightness(1)",
                    "brightness(2)",
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🐕
              </motion.div>
              <motion.p
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-text-inverse font-display text-2xl whitespace-nowrap"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                Charging up...
              </motion.p>
            </motion.div>
          )}

          {/* Explosion phase - fart clouds everywhere */}
          {phase === "explosion" && (
            <>
              {/* Central flash */}
              <motion.div
                className="absolute w-96 h-96 rounded-full bg-fart-cloud"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 10, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              {/* Exploding clouds */}
              {clouds.map((cloud) => {
                const radians = (cloud.angle * Math.PI) / 180;
                const x = Math.cos(radians) * cloud.distance;
                const y = Math.sin(radians) * cloud.distance;

                return (
                  <motion.div
                    key={cloud.id}
                    className="absolute text-6xl"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x,
                      y,
                      scale: cloud.size / 40,
                      opacity: 0,
                      rotate: cloud.angle,
                    }}
                    transition={{
                      duration: 1,
                      delay: cloud.delay,
                      ease: "easeOut",
                    }}
                  >
                    💨
                  </motion.div>
                );
              })}

              {/* Big toot text */}
              <motion.h1
                className="relative z-10 font-display text-6xl text-brand-tertiary"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: [0, 1.5, 1], rotate: [-10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ textShadow: "0 0 20px rgba(255, 230, 109, 0.8)" }}
              >
                THE BIG TOOT!
              </motion.h1>
            </>
          )}

          {/* Reveal phase - show new multiplier */}
          {phase === "reveal" && (
            <motion.div
              className="relative z-10 text-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <motion.div
                className="text-8xl mb-4"
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🐕
              </motion.div>
              <h2 className="font-display text-4xl text-text-inverse mb-4">
                Prestige Complete!
              </h2>
              <motion.div
                className="bg-brand-tertiary rounded-2xl px-8 py-4 inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <p className="font-body text-text-primary text-lg">
                  New Multiplier
                </p>
                <p className="font-accent text-5xl text-brand-primary">
                  x{newMultiplier.toFixed(1)}
                </p>
              </motion.div>
              <motion.p
                className="mt-6 text-text-inverse/70 font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Starting fresh with more power!
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
