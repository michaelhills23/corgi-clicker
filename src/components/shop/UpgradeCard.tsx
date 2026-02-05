"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { UpgradeDefinition } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { getUpgradeCost } from "@/data/upgrades";
import { useSounds } from "@/hooks/useSounds";

interface UpgradeCardProps {
  upgrade: UpgradeDefinition;
}

export function UpgradeCard({ upgrade }: UpgradeCardProps) {
  const currency = useGameStore((state) => state.currency);
  const unlockedUpgrades = useGameStore((state) => state.unlockedUpgrades);
  const purchaseUpgrade = useGameStore((state) => state.purchaseUpgrade);
  const setClickValue = useGameStore((state) => state.setClickValue);
  const clickValue = useGameStore((state) => state.clickValue);
  const { playPurchase } = useSounds();

  const ownedUpgrade = unlockedUpgrades.find((u) => u.id === upgrade.id);
  const currentLevel = ownedUpgrade?.level ?? 0;
  const isMaxLevel = currentLevel >= upgrade.maxLevel;
  const cost = useMemo(
    () => getUpgradeCost(upgrade, currentLevel),
    [upgrade, currentLevel]
  );
  const canAfford = currency >= cost && !isMaxLevel;

  const handlePurchase = () => {
    if (!canAfford) return;

    purchaseUpgrade(upgrade.id, cost);
    playPurchase();

    // Apply the effect
    if (upgrade.effect.type === "additive") {
      setClickValue(clickValue + upgrade.effect.value);
    } else {
      setClickValue(Math.floor(clickValue * upgrade.effect.value));
    }
  };

  const effectText =
    upgrade.effect.type === "additive"
      ? `+${upgrade.effect.value}`
      : `x${upgrade.effect.value}`;

  return (
    <motion.div
      className={`bg-bg-secondary rounded-2xl p-4 shadow-md border-2 transition-all ${
        canAfford
          ? "border-brand-primary/50 animate-glow-pulse"
          : isMaxLevel
            ? "border-success/50 opacity-75"
            : "border-transparent"
      }`}
      whileHover={{ scale: canAfford ? 1.02 : 1 }}
      whileTap={{ scale: canAfford ? 0.98 : 1 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-display text-lg text-text-primary">
            {upgrade.name}
          </h3>
          <p className="font-body text-sm text-text-secondary">
            {upgrade.description}
          </p>
        </div>
        <div className="text-right">
          <span className="font-accent text-sm text-brand-tertiary">
            Tier {upgrade.tier}
          </span>
        </div>
      </div>

      {/* Flavor text */}
      <p className="font-body text-xs text-text-tertiary italic mb-3">
        &quot;{upgrade.flavor}&quot;
      </p>

      {/* Stats */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-brand-primary/20 text-brand-primary px-2 py-1 rounded-full text-sm font-body font-semibold">
          {effectText}
        </span>
        <span className="text-text-secondary text-sm font-body">
          Level {currentLevel}/{upgrade.maxLevel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-bg-tertiary rounded-full mb-3 overflow-hidden">
        <motion.div
          className="h-full bg-brand-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Purchase button */}
      <div className="flex justify-between items-center">
        <span
          className={`font-accent text-lg ${
            canAfford ? "text-currency-gold" : "text-text-tertiary"
          }`}
        >
          ${cost.toLocaleString()}
        </span>
        <motion.button
          className={`px-4 py-2 rounded-full font-body font-semibold transition-colors ${
            isMaxLevel
              ? "bg-success text-text-inverse cursor-default"
              : canAfford
                ? "bg-brand-primary text-text-inverse hover:bg-brand-primary/90"
                : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
          }`}
          onClick={handlePurchase}
          disabled={!canAfford}
          whileHover={canAfford ? { scale: 1.05 } : {}}
          whileTap={canAfford ? { scale: 0.95 } : {}}
        >
          {isMaxLevel ? "MAX" : "Buy"}
        </motion.button>
      </div>
    </motion.div>
  );
}
