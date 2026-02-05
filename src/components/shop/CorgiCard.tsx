"use client";

import { motion } from "framer-motion";
import type { CorgiDefinition } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { getCorgiCost } from "@/data/corgis";
import { useSounds } from "@/hooks/useSounds";

interface CorgiCardProps {
  corgi: CorgiDefinition;
}

const UNLOCK_TYPE_LABELS: Record<CorgiDefinition["unlockRequirement"]["type"], string> = {
  default: "Starter",
  currency: "Purchase",
  prestige: "Prestige",
  achievement: "Achievement",
  secret: "Secret",
};

export function CorgiCard({ corgi }: CorgiCardProps) {
  const currency = useGameStore((state) => state.currency);
  const prestigeLevel = useGameStore((state) => state.prestigeLevel);
  const unlockedCorgis = useGameStore((state) => state.unlockedCorgis);
  const activeCorgi = useGameStore((state) => state.activeCorgi);
  const unlockCorgi = useGameStore((state) => state.unlockCorgi);
  const setActiveCorgi = useGameStore((state) => state.setActiveCorgi);
  const addCurrency = useGameStore((state) => state.addCurrency);
  const { playPurchase, playUiClick } = useSounds();

  const isUnlocked = unlockedCorgis.includes(corgi.id);
  const isActive = activeCorgi === corgi.id;
  const cost = getCorgiCost(corgi);
  const canAfford = cost !== null && currency >= cost;

  // Check if unlock requirements are met
  const requirementsMet = (() => {
    switch (corgi.unlockRequirement.type) {
      case "default":
        return true;
      case "currency":
        return canAfford;
      case "prestige":
        return prestigeLevel >= (corgi.unlockRequirement.value as number);
      case "secret":
        return false; // Secret corgis need special unlock
      default:
        return false;
    }
  })();

  const handlePurchase = () => {
    if (!requirementsMet || cost === null) return;
    addCurrency(-cost); // Deduct currency
    unlockCorgi(corgi.id);
    playPurchase();
  };

  const handleSelect = () => {
    if (!isUnlocked) return;
    setActiveCorgi(corgi.id, corgi.name);
    playUiClick();
  };

  const getRequirementText = () => {
    switch (corgi.unlockRequirement.type) {
      case "default":
        return null;
      case "currency":
        return `$${(corgi.unlockRequirement.value as number).toLocaleString()}`;
      case "prestige":
        return `Prestige ${corgi.unlockRequirement.value}`;
      case "achievement":
        return `Unlock achievement`;
      case "secret":
        return "???";
    }
  };

  const isSecret = corgi.unlockRequirement.type === "secret" && !isUnlocked;

  return (
    <motion.div
      className={`bg-bg-secondary rounded-2xl p-4 shadow-md border-2 transition-all ${
        isActive
          ? "border-brand-primary"
          : !isUnlocked && requirementsMet
            ? "border-brand-primary/50 animate-glow-pulse"
            : "border-transparent"
      } ${isSecret ? "opacity-60" : ""}`}
      whileHover={{ scale: !isSecret ? 1.02 : 1 }}
      whileTap={{ scale: !isSecret ? 0.98 : 1 }}
    >
      {/* Corgi preview */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-16 h-16 bg-bg-tertiary rounded-full flex items-center justify-center text-4xl">
          {isSecret ? "❓" : "🐕"}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg text-text-primary">
            {isSecret ? "???" : corgi.name}
          </h3>
          <span
            className={`text-xs font-body px-2 py-0.5 rounded-full ${
              corgi.unlockRequirement.type === "prestige"
                ? "bg-brand-tertiary/30 text-brand-tertiary"
                : corgi.unlockRequirement.type === "secret"
                  ? "bg-bg-inverse/30 text-text-secondary"
                  : "bg-brand-secondary/30 text-brand-secondary"
            }`}
          >
            {UNLOCK_TYPE_LABELS[corgi.unlockRequirement.type]}
          </span>
        </div>
        {isActive && (
          <span className="bg-brand-primary text-text-inverse px-2 py-1 rounded-full text-xs font-body font-semibold">
            Active
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-body text-sm text-text-secondary mb-3">
        {isSecret ? "This corgi's identity is a mystery..." : corgi.description}
      </p>

      {/* Action */}
      {isUnlocked ? (
        <motion.button
          className={`w-full py-2 rounded-full font-body font-semibold transition-colors ${
            isActive
              ? "bg-brand-primary text-text-inverse cursor-default"
              : "bg-brand-secondary text-text-inverse hover:bg-brand-secondary/90"
          }`}
          onClick={handleSelect}
          disabled={isActive}
          whileHover={!isActive ? { scale: 1.02 } : {}}
          whileTap={!isActive ? { scale: 0.98 } : {}}
        >
          {isActive ? "Selected" : "Select"}
        </motion.button>
      ) : (
        <div className="flex justify-between items-center">
          <span
            className={`font-accent text-lg ${
              requirementsMet ? "text-currency-gold" : "text-text-tertiary"
            }`}
          >
            {getRequirementText()}
          </span>
          <motion.button
            className={`px-4 py-2 rounded-full font-body font-semibold transition-colors ${
              requirementsMet
                ? "bg-brand-primary text-text-inverse hover:bg-brand-primary/90"
                : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
            }`}
            onClick={handlePurchase}
            disabled={!requirementsMet}
            whileHover={requirementsMet ? { scale: 1.05 } : {}}
            whileTap={requirementsMet ? { scale: 0.95 } : {}}
          >
            {corgi.unlockRequirement.type === "currency"
              ? "Buy"
              : isSecret
                ? "???"
                : "Locked"}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
