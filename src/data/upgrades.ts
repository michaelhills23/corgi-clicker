import type { UpgradeDefinition } from "@/types/game";

export const UPGRADES: UpgradeDefinition[] = [
  // Tier 1 - Starting upgrades
  {
    id: "better-diet",
    name: "Better Diet",
    description: "+1 per click",
    flavor: "Premium kibble = premium toots",
    baseCost: 10,
    costMultiplier: 1.5,
    effect: { type: "additive", value: 1 },
    maxLevel: 50,
    tier: 1,
  },
  {
    id: "belly-rubs",
    name: "Belly Rubs",
    description: "+2 per click",
    flavor: "A happy corgi is a gassy corgi",
    baseCost: 50,
    costMultiplier: 1.6,
    effect: { type: "additive", value: 2 },
    maxLevel: 40,
    tier: 1,
    unlockRequirement: { type: "clicks", value: 25 },
  },
  {
    id: "squeaky-toy",
    name: "Squeaky Toy",
    description: "+3 per click",
    flavor: "Squeak squeak TOOT",
    baseCost: 150,
    costMultiplier: 1.7,
    effect: { type: "additive", value: 3 },
    maxLevel: 30,
    tier: 1,
    unlockRequirement: { type: "level", value: 3 },
  },

  // Tier 2 - Early game multipliers
  {
    id: "bean-breakfast",
    name: "Bean Breakfast",
    description: "x1.5 click multiplier",
    flavor: "Beans, beans, the magical fruit...",
    baseCost: 500,
    costMultiplier: 2.0,
    effect: { type: "multiplicative", value: 1.5 },
    maxLevel: 10,
    tier: 2,
    unlockRequirement: { type: "level", value: 5 },
  },
  {
    id: "comfy-bed",
    name: "Comfy Bed",
    description: "+5 per click",
    flavor: "Rest well, toot well",
    baseCost: 800,
    costMultiplier: 1.8,
    effect: { type: "additive", value: 5 },
    maxLevel: 25,
    tier: 2,
    unlockRequirement: { type: "upgrade", value: "belly-rubs" },
  },
  {
    id: "yoga-classes",
    name: "Yoga Classes",
    description: "x1.3 click multiplier",
    flavor: "Downward dog, upward toot",
    baseCost: 1200,
    costMultiplier: 2.2,
    effect: { type: "multiplicative", value: 1.3 },
    maxLevel: 8,
    tier: 2,
    unlockRequirement: { type: "level", value: 8 },
  },

  // Tier 3 - Mid game
  {
    id: "probiotic-treats",
    name: "Probiotic Treats",
    description: "+10 per click",
    flavor: "Gut health = gas wealth",
    baseCost: 5000,
    costMultiplier: 1.9,
    effect: { type: "additive", value: 10 },
    maxLevel: 20,
    tier: 3,
    unlockRequirement: { type: "level", value: 12 },
  },
  {
    id: "spa-day",
    name: "Spa Day",
    description: "x2 click multiplier",
    flavor: "Relaxed sphincter, powerful output",
    baseCost: 10000,
    costMultiplier: 2.5,
    effect: { type: "multiplicative", value: 2.0 },
    maxLevel: 5,
    tier: 3,
    unlockRequirement: { type: "level", value: 15 },
  },
  {
    id: "thunder-butt",
    name: "Thunder Butt",
    description: "+25 per click",
    flavor: "The prophecy speaks of one with legendary gas...",
    baseCost: 25000,
    costMultiplier: 2.0,
    effect: { type: "additive", value: 25 },
    maxLevel: 15,
    tier: 3,
    unlockRequirement: { type: "level", value: 20 },
  },

  // Tier 4 - Late game
  {
    id: "golden-kibble",
    name: "Golden Kibble",
    description: "x3 click multiplier",
    flavor: "Food fit for a king, toots fit for a god",
    baseCost: 100000,
    costMultiplier: 3.0,
    effect: { type: "multiplicative", value: 3.0 },
    maxLevel: 3,
    tier: 4,
    unlockRequirement: { type: "level", value: 30 },
  },
  {
    id: "gas-mastery",
    name: "Gas Mastery",
    description: "+100 per click",
    flavor: "You have become one with the toot",
    baseCost: 500000,
    costMultiplier: 2.5,
    effect: { type: "additive", value: 100 },
    maxLevel: 10,
    tier: 4,
    unlockRequirement: { type: "level", value: 40 },
  },
  {
    id: "cosmic-farts",
    name: "Cosmic Farts",
    description: "x5 click multiplier",
    flavor: "Your toots echo through the universe",
    baseCost: 1000000,
    costMultiplier: 4.0,
    effect: { type: "multiplicative", value: 5.0 },
    maxLevel: 2,
    tier: 4,
    unlockRequirement: { type: "prestige", value: 1 },
  },
];

// Calculate cost for a given upgrade at a specific level
export function getUpgradeCost(upgrade: UpgradeDefinition, level: number): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
}

// Get upgrade by ID
export function getUpgradeById(id: string): UpgradeDefinition | undefined {
  return UPGRADES.find((u) => u.id === id);
}
