// Level thresholds - each level requires more currency
// Level 1 = 100, Level 2 = 250, Level 3 = 500, etc.
// Formula: baseThreshold * (level ^ scalingFactor)
const BASE_THRESHOLD = 100;
const SCALING_FACTOR = 1.5;

// Calculate level from total earned currency
export function calculateLevel(totalEarned: number): number {
  if (totalEarned < BASE_THRESHOLD) return 0;

  // Binary search for the correct level
  let low = 1;
  let high = 100; // Max level cap

  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    if (getLevelThreshold(mid) <= totalEarned) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
}

// Get the currency threshold for a specific level
export function getLevelThreshold(level: number): number {
  if (level <= 0) return 0;
  return Math.floor(BASE_THRESHOLD * Math.pow(level, SCALING_FACTOR));
}

// Get progress to next level (0-1)
export function getLevelProgress(totalEarned: number, currentLevel: number): number {
  const currentThreshold = getLevelThreshold(currentLevel);
  const nextThreshold = getLevelThreshold(currentLevel + 1);

  if (currentLevel === 0) {
    return Math.min(totalEarned / BASE_THRESHOLD, 1);
  }

  const progress = (totalEarned - currentThreshold) / (nextThreshold - currentThreshold);
  return Math.min(Math.max(progress, 0), 1);
}

// Get prestige bonus calculation
export function getPrestigeMultiplier(prestigeLevel: number): number {
  // Each prestige adds 10% bonus
  return 1 + prestigeLevel * 0.1;
}

// Check if player can prestige
export function canPrestige(level: number): boolean {
  return level >= 50;
}

// Calculate prestige points earned (for future use)
export function calculatePrestigePoints(totalEarned: number, level: number): number {
  // Earn prestige points based on progress beyond level 50
  if (level < 50) return 0;
  return Math.floor((level - 49) * Math.sqrt(totalEarned / 1000000));
}

// Level titles for flavor
export function getLevelTitle(level: number): string {
  if (level >= 50) return "Legendary Toots";
  if (level >= 40) return "Master Blaster";
  if (level >= 30) return "Gas Giant";
  if (level >= 20) return "Wind Warrior";
  if (level >= 10) return "Toot Trainee";
  if (level >= 5) return "Gassy Pup";
  if (level >= 1) return "Beginner";
  return "New Sniffer";
}
