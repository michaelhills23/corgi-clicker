// ============================================
// Core Game State
// ============================================

export interface GameState {
  // Core Currency
  currency: number;
  totalEarned: number;
  totalClicks: number;
  clickValue: number;

  // Progression
  level: number;
  prestigeLevel: number;
  prestigeMultiplier: number;

  // Corgi
  activeCorgi: string;
  corgiName: string;

  // Unlocks
  unlockedUpgrades: UpgradeState[];
  unlockedCosmetics: string[];
  unlockedCorgis: string[];
  equippedCosmetics: string[];

  // Achievements
  achievements: string[];

  // Stats
  totalPlayTime: number;
  sessionStart: number;
  highestClickValue: number;
  totalGasLiters: number;

  // Meta
  lastSaved: number;
  schemaVersion: number;
  hasSeenHint: boolean;
  hasSeenMicroPrestige: boolean;
}

export interface UpgradeState {
  id: string;
  level: number;
  currentCost: number;
}

// ============================================
// Data Definitions
// ============================================

export interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  flavor: string;
  baseCost: number;
  costMultiplier: number;
  effect: {
    type: "additive" | "multiplicative";
    value: number;
  };
  maxLevel: number;
  tier: 1 | 2 | 3 | 4;
  unlockRequirement?: {
    type: "level" | "upgrade" | "prestige" | "clicks";
    value: string | number;
  };
  visualEffect?: string;
}

export interface CorgiDefinition {
  id: string;
  name: string;
  description: string;
  unlockRequirement: {
    type: "default" | "currency" | "prestige" | "achievement" | "secret";
    value?: number | string;
  };
  spriteSheet: string;
  idleAnimation: string;
  clickAnimation: string;
}

export interface CosmeticDefinition {
  id: string;
  name: string;
  description: string;
  cost: number;
  slot: "head" | "body" | "accessory";
  imagePath: string;
  unlockRequirement?: {
    type: "level" | "achievement";
    value: number | string;
  };
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: "clicks" | "currency" | "cosmetics" | "corgis" | "prestige";
    value: number;
  };
  secret?: boolean;
}

// ============================================
// Currency Types
// ============================================

export type CurrencyType =
  | "bronze"
  | "silver"
  | "gold"
  | "dollar-1"
  | "dollar-20"
  | "dollar-100";

// ============================================
// Audio Types
// ============================================

export interface AudioState {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number;
}
