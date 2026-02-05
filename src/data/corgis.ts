import type { CorgiDefinition } from "@/types/game";

export const CORGIS: CorgiDefinition[] = [
  {
    id: "sir-fluffington",
    name: "Sir Fluffington",
    description: "A noble corgi with a fluffy bottom. Your loyal starter companion.",
    unlockRequirement: { type: "default" },
    spriteSheet: "/corgis/sir-fluffington.png",
    idleAnimation: "breathe",
    clickAnimation: "squash",
  },
  {
    id: "princess-beans",
    name: "Princess Beans",
    description: "A regal corgi who demands belly rubs. Slightly gassier than average.",
    unlockRequirement: { type: "currency", value: 1000 },
    spriteSheet: "/corgis/princess-beans.png",
    idleAnimation: "breathe",
    clickAnimation: "squash",
  },
  {
    id: "captain-bork",
    name: "Captain Bork",
    description: "A brave adventurer corgi. His toots are legendary in seven seas.",
    unlockRequirement: { type: "currency", value: 10000 },
    spriteSheet: "/corgis/captain-bork.png",
    idleAnimation: "breathe",
    clickAnimation: "squash",
  },
  {
    id: "professor-woofles",
    name: "Professor Woofles",
    description: "A scholarly corgi who studies the art of flatulence. PhD in Gas Dynamics.",
    unlockRequirement: { type: "currency", value: 50000 },
    spriteSheet: "/corgis/professor-woofles.png",
    idleAnimation: "breathe",
    clickAnimation: "squash",
  },
  {
    id: "lord-chaos",
    name: "Lord Chaos",
    description: "A mysterious corgi of immense power. Unlocked through prestige.",
    unlockRequirement: { type: "prestige", value: 1 },
    spriteSheet: "/corgis/lord-chaos.png",
    idleAnimation: "float",
    clickAnimation: "explode",
  },
  {
    id: "golden-boy",
    name: "Golden Boy",
    description: "A shimmering corgi made of pure gold. The ultimate flex.",
    unlockRequirement: { type: "currency", value: 1000000 },
    spriteSheet: "/corgis/golden-boy.png",
    idleAnimation: "sparkle",
    clickAnimation: "squash",
  },
  {
    id: "secret-corgi",
    name: "???",
    description: "A secret corgi. How did you find this?",
    unlockRequirement: { type: "secret", value: "konami" },
    spriteSheet: "/corgis/secret-corgi.png",
    idleAnimation: "glitch",
    clickAnimation: "warp",
  },
];

// Get corgi by ID
export function getCorgiById(id: string): CorgiDefinition | undefined {
  return CORGIS.find((c) => c.id === id);
}

// Get corgi cost (for purchasable corgis)
export function getCorgiCost(corgi: CorgiDefinition): number | null {
  if (corgi.unlockRequirement.type === "currency") {
    return corgi.unlockRequirement.value as number;
  }
  return null;
}
