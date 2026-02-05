import type { CosmeticDefinition } from "@/types/game";

export const COSMETICS: CosmeticDefinition[] = [
  // Head items
  {
    id: "tiny-crown",
    name: "Tiny Crown",
    description: "A crown fit for corgi royalty",
    cost: 500,
    slot: "head",
    imagePath: "/cosmetics/crown.png",
  },
  {
    id: "party-hat",
    name: "Party Hat",
    description: "Every click is a celebration!",
    cost: 200,
    slot: "head",
    imagePath: "/cosmetics/party-hat.png",
  },
  {
    id: "propeller-cap",
    name: "Propeller Cap",
    description: "Spin to win!",
    cost: 750,
    slot: "head",
    imagePath: "/cosmetics/propeller-cap.png",
  },
  {
    id: "wizard-hat",
    name: "Wizard Hat",
    description: "A master of mystical toots",
    cost: 1500,
    slot: "head",
    imagePath: "/cosmetics/wizard-hat.png",
    unlockRequirement: { type: "level", value: 10 },
  },
  {
    id: "viking-helmet",
    name: "Viking Helmet",
    description: "For the bravest of corgis",
    cost: 3000,
    slot: "head",
    imagePath: "/cosmetics/viking-helmet.png",
    unlockRequirement: { type: "level", value: 20 },
  },

  // Body items
  {
    id: "superhero-cape",
    name: "Superhero Cape",
    description: "Not all heroes wear pants",
    cost: 800,
    slot: "body",
    imagePath: "/cosmetics/cape.png",
  },
  {
    id: "tuxedo",
    name: "Tuxedo",
    description: "Fancy toots for fancy occasions",
    cost: 1200,
    slot: "body",
    imagePath: "/cosmetics/tuxedo.png",
  },
  {
    id: "raincoat",
    name: "Raincoat",
    description: "Splash splash toot",
    cost: 600,
    slot: "body",
    imagePath: "/cosmetics/raincoat.png",
  },
  {
    id: "sweater",
    name: "Cozy Sweater",
    description: "Warm belly, warm toots",
    cost: 400,
    slot: "body",
    imagePath: "/cosmetics/sweater.png",
  },
  {
    id: "astronaut-suit",
    name: "Astronaut Suit",
    description: "Space toots: the final frontier",
    cost: 5000,
    slot: "body",
    imagePath: "/cosmetics/astronaut.png",
    unlockRequirement: { type: "level", value: 25 },
  },

  // Accessories
  {
    id: "sunglasses",
    name: "Cool Shades",
    description: "Too cool to smell",
    cost: 300,
    slot: "accessory",
    imagePath: "/cosmetics/sunglasses.png",
  },
  {
    id: "bowtie",
    name: "Bowtie",
    description: "Sophisticated and gassy",
    cost: 250,
    slot: "accessory",
    imagePath: "/cosmetics/bowtie.png",
  },
  {
    id: "bandana",
    name: "Bandana",
    description: "Outlaw of the olfactory",
    cost: 350,
    slot: "accessory",
    imagePath: "/cosmetics/bandana.png",
  },
  {
    id: "monocle",
    name: "Monocle",
    description: "I say, quite the fragrance!",
    cost: 1000,
    slot: "accessory",
    imagePath: "/cosmetics/monocle.png",
    unlockRequirement: { type: "level", value: 15 },
  },
  {
    id: "gold-chain",
    name: "Gold Chain",
    description: "Bling bling boom",
    cost: 2500,
    slot: "accessory",
    imagePath: "/cosmetics/gold-chain.png",
    unlockRequirement: { type: "level", value: 20 },
  },
];

// Get cosmetic by ID
export function getCosmeticById(id: string): CosmeticDefinition | undefined {
  return COSMETICS.find((c) => c.id === id);
}

// Get cosmetics by slot
export function getCosmeticsBySlot(slot: CosmeticDefinition["slot"]): CosmeticDefinition[] {
  return COSMETICS.filter((c) => c.slot === slot);
}
