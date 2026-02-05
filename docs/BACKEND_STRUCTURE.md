# Backend Structure - Corgi Clicker

## Architecture Overview

**This is a client-side only application.** There is no traditional backend server. All game state is managed in the browser using Zustand and persisted to Local Storage.

---

## Local Storage Schema

### GameState Interface

```typescript
interface GameState {
  // === Core Currency ===
  currency: number;           // Current spendable currency
  totalEarned: number;        // All-time earnings (never resets except prestige)
  totalClicks: number;        // All-time click count
  clickValue: number;         // Current value per click (base + upgrades)

  // === Progression ===
  level: number;              // Current level (determines currency type)
  prestigeLevel: number;      // Number of times prestiged
  prestigeMultiplier: number; // Permanent multiplier from prestiges

  // === Corgi ===
  activeCorgi: string;        // ID of currently selected corgi
  corgiName: string;          // Player-given name for their corgi

  // === Unlocks ===
  unlockedUpgrades: UpgradeState[];  // Purchased upgrades with levels
  unlockedCosmetics: string[];       // IDs of owned cosmetics
  unlockedCorgis: string[];          // IDs of unlocked corgis
  equippedCosmetics: string[];       // IDs of currently equipped cosmetics

  // === Achievements ===
  achievements: string[];     // IDs of earned achievements

  // === Stats ===
  totalPlayTime: number;      // Seconds played (all time)
  sessionStart: number;       // Timestamp when current session started
  highestClickValue: number;  // Best single click ever
  totalGasLiters: number;     // Cumulative "gas released" (silly stat)

  // === Meta ===
  lastSaved: number;          // Timestamp of last save
  schemaVersion: number;      // For migration handling
  hasSeenHint: boolean;       // First-time hint shown
  hasSeenMicroPrestige: boolean; // Level 25 event triggered
}

interface UpgradeState {
  id: string;
  level: number;        // How many times purchased
  currentCost: number;  // Next purchase price
}
```

---

## Save/Load Logic

### Auto-Save Strategy
```typescript
// Save triggers:
// 1. Auto-save interval (every 30 seconds)
// 2. On any purchase (immediate)
// 3. On prestige (immediate)
// 4. On tab close/hidden (beforeunload + visibilitychange)
// 5. On achievement unlock (immediate)

const SAVE_KEY = 'corgi-clicker-save';
const SAVE_INTERVAL = 30000; // 30 seconds

function saveGame(state: GameState): void {
  const saveData = {
    ...state,
    lastSaved: Date.now(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function loadGame(): GameState | null {
  const saved = localStorage.getItem(SAVE_KEY);
  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved);
    return migrateState(parsed);
  } catch {
    return null;
  }
}
```

### State Migration
```typescript
const CURRENT_SCHEMA_VERSION = 1;

function migrateState(state: any): GameState {
  let migrated = { ...state };

  // Future migrations go here
  // if (migrated.schemaVersion < 2) {
  //   migrated = migrateV1toV2(migrated);
  // }

  migrated.schemaVersion = CURRENT_SCHEMA_VERSION;
  return migrated as GameState;
}
```

---

## Data Definitions

### Upgrade Definition

```typescript
interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  flavor: string;           // Funny flavor text
  baseCost: number;
  costMultiplier: number;   // Each purchase: cost *= multiplier
  effect: {
    type: 'additive' | 'multiplicative';
    value: number;
  };
  maxLevel: number;
  tier: 1 | 2 | 3 | 4;
  unlockRequirement?: {
    type: 'level' | 'upgrade' | 'prestige' | 'clicks';
    value: string | number;
  };
  visualEffect?: string;    // CSS class or animation ID
}

// Example upgrades
const UPGRADES: UpgradeDefinition[] = [
  // Tier 1
  {
    id: 'better-diet',
    name: 'Better Diet',
    description: '+10% per click',
    flavor: 'More fiber means more... output.',
    baseCost: 10,
    costMultiplier: 1.5,
    effect: { type: 'multiplicative', value: 1.1 },
    maxLevel: 10,
    tier: 1,
  },
  {
    id: 'fluffier-butt',
    name: 'Fluffier Butt',
    description: '+25% per click',
    flavor: 'Extra cushion for the pushin\'.',
    baseCost: 50,
    costMultiplier: 1.6,
    effect: { type: 'multiplicative', value: 1.25 },
    maxLevel: 10,
    tier: 1,
    unlockRequirement: { type: 'level', value: 3 },
  },
  // ... more upgrades
];
```

### Corgi Definition

```typescript
interface CorgiDefinition {
  id: string;
  name: string;
  description: string;
  unlockRequirement: {
    type: 'default' | 'currency' | 'prestige' | 'achievement' | 'secret';
    value?: number | string;
  };
  spriteSheet: string;      // Path to sprite image
  idleAnimation: string;    // CSS animation class
  clickAnimation: string;   // Framer Motion variant key
}

const CORGIS: CorgiDefinition[] = [
  {
    id: 'sir-fluffington',
    name: 'Sir Fluffington',
    description: 'A distinguished corgi of impeccable breeding.',
    unlockRequirement: { type: 'default' },
    spriteSheet: '/images/corgis/sir-fluffington.webp',
    idleAnimation: 'corgi-breathe',
    clickAnimation: 'standard-toot',
  },
  {
    id: 'princess-wigglebutt',
    name: 'Princess Wigglebutt',
    description: 'Royalty comes with extra floof.',
    unlockRequirement: { type: 'currency', value: 1000 },
    spriteSheet: '/images/corgis/princess-wigglebutt.webp',
    idleAnimation: 'corgi-prance',
    clickAnimation: 'elegant-toot',
  },
  {
    id: 'doge-mctoots',
    name: 'Doge McToots',
    description: 'much toot. very gas. wow.',
    unlockRequirement: { type: 'secret', value: 6767 }, // clicks
    spriteSheet: '/images/corgis/doge-mctoots.webp',
    idleAnimation: 'doge-wobble',
    clickAnimation: 'meme-toot',
  },
  // ... more corgis
];
```

### Cosmetic Definition

```typescript
interface CosmeticDefinition {
  id: string;
  name: string;
  description: string;
  cost: number;
  slot: 'head' | 'body' | 'accessory';
  imagePath: string;
  unlockRequirement?: {
    type: 'level' | 'achievement';
    value: number | string;
  };
}

const COSMETICS: CosmeticDefinition[] = [
  {
    id: 'birthday-hat',
    name: 'Birthday Hat',
    description: 'Every day is a party!',
    cost: 100,
    slot: 'head',
    imagePath: '/images/cosmetics/birthday-hat.webp',
  },
  // ... more cosmetics
];
```

### Achievement Definition

```typescript
interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: {
    type: 'clicks' | 'currency' | 'cosmetics' | 'corgis' | 'prestige';
    value: number;
  };
  secret?: boolean;  // Hidden until unlocked
}

const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-toot',
    name: 'First Toot',
    description: 'Every journey begins with a single toot.',
    icon: '💨',
    condition: { type: 'clicks', value: 1 },
  },
  {
    id: 'millionaire',
    name: 'The Millionaire',
    description: 'Earn $1,000,000 total.',
    icon: '💰',
    condition: { type: 'currency', value: 1000000 },
  },
  // ... more achievements
];
```

---

## Calculations

### Click Value Calculation

```typescript
function calculateClickValue(state: GameState): number {
  const baseValue = 1;

  // Apply additive upgrades first
  let additiveBonus = 0;
  for (const upgrade of state.unlockedUpgrades) {
    const def = UPGRADES.find(u => u.id === upgrade.id);
    if (def?.effect.type === 'additive') {
      additiveBonus += def.effect.value * upgrade.level;
    }
  }

  // Apply multiplicative upgrades
  let multiplier = 1;
  for (const upgrade of state.unlockedUpgrades) {
    const def = UPGRADES.find(u => u.id === upgrade.id);
    if (def?.effect.type === 'multiplicative') {
      multiplier *= Math.pow(def.effect.value, upgrade.level);
    }
  }

  // Apply prestige multiplier
  const prestigeBonus = 1 + (state.prestigeLevel * 0.1); // +10% per prestige

  return Math.floor((baseValue + additiveBonus) * multiplier * prestigeBonus);
}
```

### Level Calculation

```typescript
function calculateLevel(totalEarned: number): number {
  // Logarithmic scaling
  if (totalEarned < 100) return 1;
  return Math.floor(Math.log10(totalEarned) * 10);
}

function getCurrencyType(level: number): CurrencyType {
  if (level <= 10) return 'bronze';
  if (level <= 25) return 'silver';
  if (level <= 50) return 'gold';
  if (level <= 75) return 'dollar-1';
  if (level <= 100) return 'dollar-20';
  return 'dollar-100';
}
```

### Prestige Calculation

```typescript
const PRESTIGE_THRESHOLD = 50; // Minimum level to prestige

function canPrestige(state: GameState): boolean {
  return state.level >= PRESTIGE_THRESHOLD;
}

function calculatePrestigeBonus(currentPrestige: number): number {
  // Each prestige gives +10% permanent multiplier
  return 1 + (currentPrestige * 0.1);
}

function performPrestige(state: GameState): GameState {
  return {
    ...getInitialState(),
    prestigeLevel: state.prestigeLevel + 1,
    prestigeMultiplier: calculatePrestigeBonus(state.prestigeLevel + 1),
    unlockedCorgis: [...state.unlockedCorgis, 'lord-chaos'], // First prestige unlock
    achievements: state.achievements,
    totalPlayTime: state.totalPlayTime,
    schemaVersion: state.schemaVersion,
  };
}
```

### Gas Calculation (Silly Stat)

```typescript
function calculateGasReleased(clicks: number): number {
  // Each click releases 0.3-0.7 liters of "gas"
  // We use a seeded random based on click count for consistency
  let totalGas = 0;
  for (let i = 0; i < clicks; i++) {
    const pseudoRandom = Math.sin(i * 12.9898) * 43758.5453;
    const gasPerClick = 0.3 + (pseudoRandom - Math.floor(pseudoRandom)) * 0.4;
    totalGas += gasPerClick;
  }
  return totalGas;
}

// Display with unnecessary precision
function formatGas(liters: number): string {
  return `${liters.toFixed(7)} L`;
}
```

---

## Initial State

```typescript
function getInitialState(): GameState {
  return {
    currency: 0,
    totalEarned: 0,
    totalClicks: 0,
    clickValue: 1,

    level: 1,
    prestigeLevel: 0,
    prestigeMultiplier: 1,

    activeCorgi: 'sir-fluffington',
    corgiName: 'Sir Fluffington',

    unlockedUpgrades: [],
    unlockedCosmetics: [],
    unlockedCorgis: ['sir-fluffington'],
    equippedCosmetics: [],

    achievements: [],

    totalPlayTime: 0,
    sessionStart: Date.now(),
    highestClickValue: 1,
    totalGasLiters: 0,

    lastSaved: Date.now(),
    schemaVersion: 1,
    hasSeenHint: false,
    hasSeenMicroPrestige: false,
  };
}
```
