"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
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

// Get display icon for currency type
function getCurrencyIcon(type: CurrencyType): string {
  switch (type) {
    case "dollar-100":
      return "💵";
    case "dollar-20":
      return "💵";
    case "dollar-1":
      return "💵";
    case "gold":
      return "🪙";
    case "silver":
      return "🪙";
    case "bronze":
      return "🪙";
  }
}

// Get color class for currency type
function getCurrencyColor(type: CurrencyType): string {
  switch (type) {
    case "dollar-100":
    case "dollar-20":
    case "dollar-1":
      return "text-currency-money";
    case "gold":
      return "text-currency-gold";
    case "silver":
      return "text-currency-silver";
    case "bronze":
      return "text-currency-bronze";
  }
}

// Format large numbers
function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`;
  }
  return Math.floor(value).toString();
}

export function CurrencyDisplay() {
  const currency = useGameStore((state) => state.currency);
  const totalEarned = useGameStore((state) => state.totalEarned);
  const [displayValue, setDisplayValue] = useState(currency);

  const currencyType = getCurrencyType(totalEarned);
  const icon = getCurrencyIcon(currencyType);
  const colorClass = getCurrencyColor(currencyType);

  // Animated spring for smooth counting
  const springValue = useSpring(currency, {
    stiffness: 100,
    damping: 20,
  });

  // Update spring target when currency changes
  useEffect(() => {
    springValue.set(currency);
  }, [currency, springValue]);

  // Update display value from spring
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      className="bg-bg-secondary rounded-2xl px-6 py-3 shadow-md flex items-center gap-3"
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-3xl">{icon}</span>
      <span className={`font-accent text-4xl sm:text-5xl ${colorClass}`}>
        {formatCurrency(displayValue)}
      </span>
    </motion.div>
  );
}

// Smaller version for headers
export function CurrencyDisplayCompact() {
  const currency = useGameStore((state) => state.currency);
  const totalEarned = useGameStore((state) => state.totalEarned);

  const currencyType = getCurrencyType(totalEarned);
  const icon = getCurrencyIcon(currencyType);
  const colorClass = getCurrencyColor(currencyType);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <span className={`font-accent text-2xl ${colorClass}`}>
        {formatCurrency(currency)}
      </span>
    </div>
  );
}
