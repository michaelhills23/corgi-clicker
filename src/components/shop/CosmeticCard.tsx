"use client";

import { motion } from "framer-motion";
import type { CosmeticDefinition } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { useSounds } from "@/hooks/useSounds";

interface CosmeticCardProps {
  cosmetic: CosmeticDefinition;
}

const SLOT_EMOJI: Record<CosmeticDefinition["slot"], string> = {
  head: "👒",
  body: "👔",
  accessory: "💎",
};

export function CosmeticCard({ cosmetic }: CosmeticCardProps) {
  const currency = useGameStore((state) => state.currency);
  const level = useGameStore((state) => state.level);
  const unlockedCosmetics = useGameStore((state) => state.unlockedCosmetics);
  const equippedCosmetics = useGameStore((state) => state.equippedCosmetics);
  const purchaseCosmetic = useGameStore((state) => state.purchaseCosmetic);
  const equipCosmetic = useGameStore((state) => state.equipCosmetic);
  const unequipCosmetic = useGameStore((state) => state.unequipCosmetic);
  const { playPurchase, playUiClick } = useSounds();

  const isOwned = unlockedCosmetics.includes(cosmetic.id);
  const isEquipped = equippedCosmetics.includes(cosmetic.id);
  const canAfford = currency >= cosmetic.cost;

  // Check unlock requirement
  const isLocked =
    cosmetic.unlockRequirement?.type === "level" &&
    level < (cosmetic.unlockRequirement.value as number);

  const handlePurchase = () => {
    if (!canAfford || isLocked) return;
    purchaseCosmetic(cosmetic.id, cosmetic.cost);
    playPurchase();
  };

  const handleEquipToggle = () => {
    if (!isOwned) return;
    if (isEquipped) {
      unequipCosmetic(cosmetic.id);
    } else {
      equipCosmetic(cosmetic.id);
    }
    playUiClick();
  };

  return (
    <motion.div
      className={`bg-bg-secondary rounded-2xl p-4 shadow-md border-2 transition-all ${
        isEquipped
          ? "border-success"
          : !isOwned && canAfford && !isLocked
            ? "border-brand-primary/50 animate-glow-pulse"
            : "border-transparent"
      } ${isLocked ? "opacity-50" : ""}`}
      whileHover={{ scale: !isLocked ? 1.02 : 1 }}
      whileTap={{ scale: !isLocked ? 0.98 : 1 }}
    >
      {/* Icon and header */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-12 h-12 bg-bg-tertiary rounded-xl flex items-center justify-center text-2xl">
          {SLOT_EMOJI[cosmetic.slot]}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg text-text-primary">
            {cosmetic.name}
          </h3>
          <p className="font-body text-xs text-brand-secondary capitalize">
            {cosmetic.slot}
          </p>
        </div>
        {isOwned && (
          <span className="bg-success/20 text-success px-2 py-1 rounded-full text-xs font-body font-semibold">
            Owned
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-body text-sm text-text-secondary mb-3">
        {cosmetic.description}
      </p>

      {/* Lock message */}
      {isLocked && cosmetic.unlockRequirement && (
        <p className="font-body text-xs text-warning mb-3">
          🔒 Requires Level {cosmetic.unlockRequirement.value}
        </p>
      )}

      {/* Action button */}
      <div className="flex justify-between items-center">
        {!isOwned ? (
          <>
            <span
              className={`font-accent text-lg ${
                canAfford && !isLocked ? "text-currency-gold" : "text-text-tertiary"
              }`}
            >
              ${cosmetic.cost.toLocaleString()}
            </span>
            <motion.button
              className={`px-4 py-2 rounded-full font-body font-semibold transition-colors ${
                canAfford && !isLocked
                  ? "bg-brand-primary text-text-inverse hover:bg-brand-primary/90"
                  : "bg-bg-tertiary text-text-tertiary cursor-not-allowed"
              }`}
              onClick={handlePurchase}
              disabled={!canAfford || isLocked}
              whileHover={canAfford && !isLocked ? { scale: 1.05 } : {}}
              whileTap={canAfford && !isLocked ? { scale: 0.95 } : {}}
            >
              {isLocked ? "Locked" : "Buy"}
            </motion.button>
          </>
        ) : (
          <motion.button
            className={`w-full py-2 rounded-full font-body font-semibold transition-colors ${
              isEquipped
                ? "bg-success text-text-inverse"
                : "bg-brand-secondary text-text-inverse hover:bg-brand-secondary/90"
            }`}
            onClick={handleEquipToggle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isEquipped ? "Unequip" : "Equip"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
