"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameLayout } from "@/components/layout/GameLayout";
import { useGameStore } from "@/store/gameStore";
import { UPGRADES } from "@/data/upgrades";
import { COSMETICS } from "@/data/cosmetics";
import { CORGIS } from "@/data/corgis";
import { UpgradeCard } from "@/components/shop/UpgradeCard";
import { CosmeticCard } from "@/components/shop/CosmeticCard";
import { CorgiCard } from "@/components/shop/CorgiCard";

type ShopTab = "upgrades" | "cosmetics" | "corgis";

const TABS: { id: ShopTab; label: string; emoji: string }[] = [
  { id: "upgrades", label: "Upgrades", emoji: "⬆️" },
  { id: "cosmetics", label: "Cosmetics", emoji: "👗" },
  { id: "corgis", label: "Corgis", emoji: "🐕" },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTab>("upgrades");
  const currency = useGameStore((state) => state.currency);
  const level = useGameStore((state) => state.level);
  const totalClicks = useGameStore((state) => state.totalClicks);
  const prestigeLevel = useGameStore((state) => state.prestigeLevel);
  const unlockedUpgrades = useGameStore((state) => state.unlockedUpgrades);

  // Filter upgrades based on unlock requirements
  const availableUpgrades = useMemo(() => {
    return UPGRADES.filter((upgrade) => {
      if (!upgrade.unlockRequirement) return true;

      const req = upgrade.unlockRequirement;
      switch (req.type) {
        case "level":
          return level >= (req.value as number);
        case "clicks":
          return totalClicks >= (req.value as number);
        case "prestige":
          return prestigeLevel >= (req.value as number);
        case "upgrade":
          return unlockedUpgrades.some((u) => u.id === req.value);
        default:
          return true;
      }
    });
  }, [level, totalClicks, prestigeLevel, unlockedUpgrades]);

  return (
    <GameLayout>
      <div className="min-h-screen p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl text-text-primary">Shop</h1>
          <div className="bg-bg-secondary rounded-full px-4 py-2 shadow-md">
            <span className="font-accent text-xl text-currency-gold">
              ${currency.toLocaleString()}
            </span>
          </div>
        </header>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 py-2 px-4 rounded-full font-body font-semibold text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-brand-primary text-text-inverse"
                  : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary"
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-1">{tab.emoji}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "upgrades" && (
              <div className="space-y-4">
                {availableUpgrades.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-body text-text-secondary">
                      Keep clicking to unlock upgrades!
                    </p>
                  </div>
                ) : (
                  availableUpgrades.map((upgrade) => (
                    <UpgradeCard key={upgrade.id} upgrade={upgrade} />
                  ))
                )}

                {/* Hidden upgrades teaser */}
                {availableUpgrades.length < UPGRADES.length && (
                  <div className="text-center py-4">
                    <p className="font-body text-sm text-text-tertiary">
                      {UPGRADES.length - availableUpgrades.length} more upgrades
                      to discover...
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "cosmetics" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {COSMETICS.map((cosmetic) => (
                  <CosmeticCard key={cosmetic.id} cosmetic={cosmetic} />
                ))}
              </div>
            )}

            {activeTab === "corgis" && (
              <div className="space-y-4">
                {CORGIS.map((corgi) => (
                  <CorgiCard key={corgi.id} corgi={corgi} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </GameLayout>
  );
}
