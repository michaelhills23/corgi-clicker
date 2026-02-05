import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GameState, UpgradeState } from "@/types/game";

// Schema version for migrations
const CURRENT_SCHEMA_VERSION = 1;

// Initial state for new games
const initialState: GameState = {
  // Core Currency
  currency: 0,
  totalEarned: 0,
  totalClicks: 0,
  clickValue: 1,

  // Progression
  level: 0,
  prestigeLevel: 0,
  prestigeMultiplier: 1,

  // Corgi
  activeCorgi: "sir-fluffington",
  corgiName: "Sir Fluffington",

  // Unlocks
  unlockedUpgrades: [],
  unlockedCosmetics: [],
  unlockedCorgis: ["sir-fluffington"],
  equippedCosmetics: [],

  // Achievements
  achievements: [],

  // Stats
  totalPlayTime: 0,
  sessionStart: Date.now(),
  highestClickValue: 1,
  totalGasLiters: 0,

  // Meta
  lastSaved: Date.now(),
  schemaVersion: CURRENT_SCHEMA_VERSION,
  hasSeenHint: false,
  hasSeenMicroPrestige: false,
};

// Actions interface
interface GameActions {
  // Core actions
  click: () => void;
  addCurrency: (amount: number) => void;

  // Upgrade actions
  purchaseUpgrade: (upgradeId: string, cost: number) => void;
  updateUpgradeState: (upgradeId: string, state: Partial<UpgradeState>) => void;

  // Cosmetic actions
  purchaseCosmetic: (cosmeticId: string, cost: number) => void;
  equipCosmetic: (cosmeticId: string) => void;
  unequipCosmetic: (cosmeticId: string) => void;

  // Corgi actions
  unlockCorgi: (corgiId: string) => void;
  setActiveCorgi: (corgiId: string, name: string) => void;
  setCorgiName: (name: string) => void;

  // Achievement actions
  unlockAchievement: (achievementId: string) => void;

  // Progression actions
  setClickValue: (value: number) => void;
  prestige: () => void;

  // Stats actions
  updatePlayTime: (seconds: number) => void;

  // Meta actions
  setHasSeenHint: (seen: boolean) => void;
  setHasSeenMicroPrestige: (seen: boolean) => void;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;

// Migrate old save data to current schema
function migrateState(
  persistedState: unknown,
  version: number
): GameState & Partial<GameActions> {
  const state = persistedState as GameState;

  // Migration from version 0 to 1 (example for future use)
  if (version === 0) {
    // Add any new fields with defaults
    return {
      ...state,
      schemaVersion: 1,
    };
  }

  return state;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      // Core actions
      click: () =>
        set((state) => {
          const earned = state.clickValue * state.prestigeMultiplier;
          const newHighest = Math.max(state.highestClickValue, earned);
          // 0.001 liters per click (adjustable for fun)
          const gasProduced = 0.001;

          return {
            currency: state.currency + earned,
            totalEarned: state.totalEarned + earned,
            totalClicks: state.totalClicks + 1,
            highestClickValue: newHighest,
            totalGasLiters: state.totalGasLiters + gasProduced,
            lastSaved: Date.now(),
          };
        }),

      addCurrency: (amount: number) =>
        set((state) => ({
          currency: state.currency + amount,
          totalEarned: state.totalEarned + amount,
          lastSaved: Date.now(),
        })),

      // Upgrade actions
      purchaseUpgrade: (upgradeId: string, cost: number) =>
        set((state) => {
          if (state.currency < cost) return state;

          const existingUpgrade = state.unlockedUpgrades.find(
            (u) => u.id === upgradeId
          );

          let newUpgrades: UpgradeState[];
          if (existingUpgrade) {
            newUpgrades = state.unlockedUpgrades.map((u) =>
              u.id === upgradeId
                ? { ...u, level: u.level + 1, currentCost: cost }
                : u
            );
          } else {
            newUpgrades = [
              ...state.unlockedUpgrades,
              { id: upgradeId, level: 1, currentCost: cost },
            ];
          }

          return {
            currency: state.currency - cost,
            unlockedUpgrades: newUpgrades,
            lastSaved: Date.now(),
          };
        }),

      updateUpgradeState: (upgradeId: string, updates: Partial<UpgradeState>) =>
        set((state) => ({
          unlockedUpgrades: state.unlockedUpgrades.map((u) =>
            u.id === upgradeId ? { ...u, ...updates } : u
          ),
          lastSaved: Date.now(),
        })),

      // Cosmetic actions
      purchaseCosmetic: (cosmeticId: string, cost: number) =>
        set((state) => {
          if (state.currency < cost) return state;
          if (state.unlockedCosmetics.includes(cosmeticId)) return state;

          return {
            currency: state.currency - cost,
            unlockedCosmetics: [...state.unlockedCosmetics, cosmeticId],
            lastSaved: Date.now(),
          };
        }),

      equipCosmetic: (cosmeticId: string) =>
        set((state) => {
          if (!state.unlockedCosmetics.includes(cosmeticId)) return state;
          if (state.equippedCosmetics.includes(cosmeticId)) return state;

          return {
            equippedCosmetics: [...state.equippedCosmetics, cosmeticId],
            lastSaved: Date.now(),
          };
        }),

      unequipCosmetic: (cosmeticId: string) =>
        set((state) => ({
          equippedCosmetics: state.equippedCosmetics.filter(
            (id) => id !== cosmeticId
          ),
          lastSaved: Date.now(),
        })),

      // Corgi actions
      unlockCorgi: (corgiId: string) =>
        set((state) => {
          if (state.unlockedCorgis.includes(corgiId)) return state;

          return {
            unlockedCorgis: [...state.unlockedCorgis, corgiId],
            lastSaved: Date.now(),
          };
        }),

      setActiveCorgi: (corgiId: string, name: string) =>
        set((state) => {
          if (!state.unlockedCorgis.includes(corgiId)) return state;

          return {
            activeCorgi: corgiId,
            corgiName: name,
            lastSaved: Date.now(),
          };
        }),

      setCorgiName: (name: string) =>
        set(() => ({
          corgiName: name,
          lastSaved: Date.now(),
        })),

      // Achievement actions
      unlockAchievement: (achievementId: string) =>
        set((state) => {
          if (state.achievements.includes(achievementId)) return state;

          return {
            achievements: [...state.achievements, achievementId],
            lastSaved: Date.now(),
          };
        }),

      // Progression actions
      setClickValue: (value: number) =>
        set(() => ({
          clickValue: value,
          lastSaved: Date.now(),
        })),

      prestige: () =>
        set((state) => {
          // Can only prestige at level 50+
          if (state.level < 50) return state;

          const newPrestigeLevel = state.prestigeLevel + 1;
          const newMultiplier = 1 + newPrestigeLevel * 0.1;

          return {
            // Reset progress
            currency: 0,
            totalEarned: 0,
            totalClicks: 0,
            clickValue: 1,
            level: 0,
            unlockedUpgrades: [],

            // Keep cosmetics and corgis
            // Unlock Lord Chaos on first prestige
            unlockedCorgis:
              state.prestigeLevel === 0 &&
              !state.unlockedCorgis.includes("lord-chaos")
                ? [...state.unlockedCorgis, "lord-chaos"]
                : state.unlockedCorgis,

            // Increase prestige
            prestigeLevel: newPrestigeLevel,
            prestigeMultiplier: newMultiplier,

            // Reset hints
            hasSeenHint: false,
            hasSeenMicroPrestige: false,

            lastSaved: Date.now(),
          };
        }),

      // Stats actions
      updatePlayTime: (seconds: number) =>
        set((state) => ({
          totalPlayTime: state.totalPlayTime + seconds,
        })),

      // Meta actions
      setHasSeenHint: (seen: boolean) =>
        set(() => ({
          hasSeenHint: seen,
          lastSaved: Date.now(),
        })),

      setHasSeenMicroPrestige: (seen: boolean) =>
        set(() => ({
          hasSeenMicroPrestige: seen,
          lastSaved: Date.now(),
        })),

      resetGame: () =>
        set(() => ({
          ...initialState,
          sessionStart: Date.now(),
          lastSaved: Date.now(),
        })),
    }),
    {
      name: "corgi-clicker-save",
      storage: createJSONStorage(() => localStorage),
      version: CURRENT_SCHEMA_VERSION,
      migrate: migrateState,
      partialize: (state) => ({
        // Only persist state, not actions
        currency: state.currency,
        totalEarned: state.totalEarned,
        totalClicks: state.totalClicks,
        clickValue: state.clickValue,
        level: state.level,
        prestigeLevel: state.prestigeLevel,
        prestigeMultiplier: state.prestigeMultiplier,
        activeCorgi: state.activeCorgi,
        corgiName: state.corgiName,
        unlockedUpgrades: state.unlockedUpgrades,
        unlockedCosmetics: state.unlockedCosmetics,
        unlockedCorgis: state.unlockedCorgis,
        equippedCosmetics: state.equippedCosmetics,
        achievements: state.achievements,
        totalPlayTime: state.totalPlayTime,
        sessionStart: state.sessionStart,
        highestClickValue: state.highestClickValue,
        totalGasLiters: state.totalGasLiters,
        lastSaved: state.lastSaved,
        schemaVersion: state.schemaVersion,
        hasSeenHint: state.hasSeenHint,
        hasSeenMicroPrestige: state.hasSeenMicroPrestige,
      }),
    }
  )
);

// Selector hooks for common patterns
export const useCurrency = () => useGameStore((state) => state.currency);
export const useClickValue = () =>
  useGameStore((state) => state.clickValue * state.prestigeMultiplier);
export const useLevel = () => useGameStore((state) => state.level);
export const usePrestige = () =>
  useGameStore((state) => ({
    level: state.prestigeLevel,
    multiplier: state.prestigeMultiplier,
  }));
