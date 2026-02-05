# Product Requirements Document - Corgi Clicker

## Core Concept

A clicker game where a chibi corgi farts currency. Click the corgi → it farts coins → collect money → buy upgrades → currency evolves to dollar bills → prestige with "The Big Toot" → infinite scaling.

**Target Audience:** 10-12 year old, sophisticated silly humor
**Deployment:** Vercel (free tier)
**Persistence:** Local Storage

---

## User Stories

1. As a player, I can click the corgi to earn currency
2. As a player, I can buy upgrades to increase money per click
3. As a player, I can buy cosmetic outfits for my corgi
4. As a player, I can unlock new corgi characters
5. As a player, I can view my achievements
6. As a player, I can view my lifetime stats
7. As a player, I can prestige to reset with bonuses
8. As a player, my progress saves automatically
9. As a player, I can name my corgi

---

## Random Visual Variations

When purchasing upgrades, the corgi gains randomized visual modifications:

- **Butt size variations** - Slightly different proportions each time
- **Fart cloud styles** - Different shapes, colors, sparkle patterns
- **Expression changes** - Random silly faces during farts
- **Accessory wobbles** - Cosmetics animate differently per click

This makes each player's corgi feel unique even with the same upgrades!

---

## Upgrade Tiers (Escalating Absurdity)

### Tier 1 - Sensible Silly
| Upgrade | Effect | Visual |
|---------|--------|--------|
| Better Diet | +10% per click | Random food particle effects |
| Fluffier Butt | +25% per click | Random fluff poof variations |
| Premium Beans | +50% per click | Random bean colors fly out |

### Tier 2 - Getting Weird
| Upgrade | Effect |
|---------|--------|
| Bean Amplifier | 2x multiplier |
| Double Cheek Technology | Clicks count twice |
| Reverberating Resonance | Chain reaction farts |

### Tier 3 - Escalating Absurd (weird > gross)
| Upgrade | Effect | Visual |
|---------|--------|--------|
| Jetpack Posterior | Auto-hover animation | Rainbow trails |
| Interdimensional Portal | Visual warping | Glimpses of corgi multiverse |
| Clone Army | Multiple mini-corgis appear | Philosophical questions arise |

### Tier 4 - Maximum Chaos (surreal, not scatological)
| Upgrade | Effect | Visual |
|---------|--------|--------|
| Time Dilation Field | Slow-mo effect | Everything gets dramatic |
| Reality Fabric Tears | Screen warps | Glitch aesthetics |
| Corgi Transcendence | Approach "The Big Toot" | Existential undertones |

---

## Currency Evolution

| Level Range | Currency Type |
|-------------|---------------|
| 1-10 | Bronze coins |
| 11-25 | Silver coins |
| 26-50 | Gold coins |
| 51-75 | $1 bills |
| 76-100 | $20 bills |
| 100+ | $100 bills (raining money!) |

---

## Corgi Characters (5 total - 1 secret!)

| Character | Description | Unlock |
|-----------|-------------|--------|
| Sir Fluffington | Classic orange/white corgi | Starter (default) |
| Princess Wigglebutt | Pink bow, extra fluffy | Currency purchase |
| Captain Thunderbuns | Superhero cape, determined expression | Currency purchase |
| Lord Chaos | Slightly unhinged expression, sparkle eyes | First prestige |
| 🔒 Doge McToots | Meme corgi, Shiba-style, "much toot, very gas, wow" text bubbles | Secret: reach exactly 6767 total clicks |

**Secret unlock note:** Triggers on crossing threshold, can't overshoot.

---

## Cosmetic Outfits (per corgi)

- Birthday Hat
- Wizard Hat
- Sunglasses
- Bow Tie
- Crown
- Astronaut Helmet
- Taco Costume
- Rainbow Tutu

---

## Achievements

| Achievement | Requirement |
|-------------|-------------|
| First Toot | 1 click |
| Century of Cheeks | 100 clicks |
| Thousand Toots | 1,000 clicks |
| The Millionaire | Earn $1M total |
| Fashion Icon | Buy 5 cosmetics |
| Corgi Collector | Unlock all corgis |
| Big Tooter | Prestige once |
| Serial Tooter | Prestige 5 times |

---

## Stats Tracked

- Total clicks (all time)
- Total money earned (all time)
- Current prestige level
- Time played
- Clicks per session
- Highest single click value
- **Total Gas Released (liters, approximate)** - Calculated pseudo-scientifically: clicks × random(0.3-0.7) liters, displayed with unnecessary decimal precision

---

## Onboarding

- No formal tutorial
- Single diegetic hint on first load: "Click the corgi. You know you want to."
- Hint fades after first click, never returns

---

## Micro-Prestige (Prestige Preview)

At ~Level 25, a cosmetic-only "Mini Toot" event triggers:
- Screen flashes, confetti, dramatic sound - but NO reset
- Text: "Whoa! That was a big one! Imagine what THE BIG TOOT could do..."
- Teaches the prestige ritual without punishment
- Real prestige unlocks at Level 50+

---

## Success Criteria

- Game loads in <2 seconds
- Clicking feels responsive (<50ms feedback)
- Progress saves correctly on browser close
- All 5 corgis unlockable (including secret)
- Prestige system works with multipliers
- Sound can be toggled on/off
- Works on mobile (touch) and desktop (click)

---

## Out of Scope (v1)

- Multiplayer/leaderboards
- Cloud saves/accounts
- In-app purchases
- Passive/idle income
- Mini-games
