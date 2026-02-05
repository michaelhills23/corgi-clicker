# Implementation Plan - Corgi Clicker

## Phase Overview

| Phase | Description | Dependencies |
|-------|-------------|--------------|
| 1 | Project Setup | None |
| 2 | Core Game State | Phase 1 |
| 3 | Main Game Screen | Phase 2 |
| 4 | Audio System | Phase 1 |
| 5 | Shop System | Phase 2, 3 |
| 6 | Progression System | Phase 2, 5 |
| 7 | Visual Polish | Phase 3 |
| 8 | Achievements & Stats | Phase 2 |
| 9 | Final Polish | All phases |
| 10 | Deployment | Phase 9 |

---

## Phase 1: Project Setup

### 1.1 Initialize Next.js Project
```bash
npx create-next-app@14 corgi-clicker --typescript --tailwind --eslint --app --src-dir
```

### 1.2 Install Dependencies
```bash
npm install zustand framer-motion howler
npm install -D @types/howler prettier
```

### 1.3 Configure Tailwind
- Add custom colors (corgi palette)
- Add custom fonts
- Configure animation utilities

### 1.4 Set Up Folder Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── shop/
│   │   └── page.tsx
│   ├── achievements/
│   │   └── page.tsx
│   └── stats/
│       └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── game/
│   │   ├── Corgi.tsx
│   │   ├── CurrencyDisplay.tsx
│   │   ├── FartCloud.tsx
│   │   └── CoinParticle.tsx
│   ├── shop/
│   │   ├── UpgradeCard.tsx
│   │   ├── CosmeticCard.tsx
│   │   └── CorgiCard.tsx
│   └── layout/
│       ├── Navigation.tsx
│       └── SettingsModal.tsx
├── store/
│   ├── gameStore.ts
│   └── audioStore.ts
├── data/
│   ├── upgrades.ts
│   ├── cosmetics.ts
│   ├── corgis.ts
│   └── achievements.ts
├── utils/
│   ├── calculations.ts
│   ├── storage.ts
│   └── formatters.ts
└── types/
    └── game.ts
```

### 1.5 Add Google Fonts
Update `app/layout.tsx` with Fredoka One, Nunito, Bangers

---

## Phase 2: Core Game State

### 2.1 Create Zustand Store
```typescript
// store/gameStore.ts
- Define GameState interface
- Create store with all state fields
- Implement actions: click, purchase, equip, prestige
```

### 2.2 Implement Local Storage Persistence
```typescript
// utils/storage.ts
- saveGame(state)
- loadGame(): GameState | null
- migrateState(oldState)
```

### 2.3 Create Save/Load Utilities
- Auto-save hook with 30s interval
- Save on visibility change
- Save on beforeunload

### 2.4 Add Auto-Save Interval
```typescript
// Hook: useAutoSave()
- Set up interval on mount
- Clean up on unmount
- Trigger save on important actions
```

---

## Phase 3: Main Game Screen

### 3.1 Create Basic Layout
- Header with currency display
- Central corgi area
- Bottom navigation

### 3.2 Build Currency Display
- Animated number counter (count up effect)
- Currency type icon (coin/bill)
- Click multiplier indicator

### 3.3 Add Corgi Component
- Display corgi image
- Apply equipped cosmetics
- Show corgi name

### 3.4 Implement Click Handler
- Increment currency
- Update total clicks
- Check for achievements
- Check for secret unlock (6767)

### 3.5 Add Click Feedback Animation
- Squash and stretch
- Corgi expression change
- Haptic feedback (mobile)

### 3.6 Add Fart Particle Effect
- Spawn cloud at corgi butt
- Animate drift and fade
- Random variations

### 3.7 Implement Coin/Bill Particles
- Spawn at corgi
- Arc toward currency counter
- Match current currency type

---

## Phase 4: Audio System

### 4.1 Set Up Howler.js
```typescript
// store/audioStore.ts
- Sound enabled state
- Music enabled state
- Volume controls
```

### 4.2 Add Fart Sound Variations
- Load 3-5 different fart sounds
- Random selection on click
- Pitch variation

### 4.3 Add Coin Collect Sound
- Light "ding" sound
- Play with particles

### 4.4 Add Purchase Success Sound
- Ka-ching / success sound
- Play on buy

### 4.5 Add Background Music
- Looping main theme
- Fade in/out
- Respect user preference

### 4.6 Create Sound Settings Context
- Global sound toggle
- Music toggle
- Persist to localStorage

---

## Phase 5: Shop System

### 5.1 Create Shop Page Layout
- Tab navigation (Upgrades, Cosmetics, Corgis)
- Scrollable item grid
- Current currency in header

### 5.2 Build Upgrade Card Component
- Name and description
- Current level / max level
- Cost display
- Buy button
- Affordable indicator glow

### 5.3 Implement Upgrade Purchase Logic
- Check affordability
- Deduct currency
- Update upgrade level
- Recalculate click value
- Increase cost

### 5.4 Add Cost Scaling Calculations
```typescript
currentCost = baseCost * (costMultiplier ^ level)
```

### 5.5 Build Cosmetics Tab
- Grid of cosmetic items
- Owned vs purchasable states
- Equip/unequip toggle

### 5.6 Build Corgis Tab
- Grid of corgi cards
- Locked/unlocked states
- Select active corgi

### 5.7 Add "Affordable" Visual Indicators
- Pulsing glow on affordable items
- Greyed out unavailable items
- Lock icon on locked items

---

## Phase 6: Progression System

### 6.1 Implement Level Calculation
```typescript
level = floor(log10(totalEarned) * 10)
```

### 6.2 Add Currency Evolution Logic
- Map level ranges to currency types
- Update particle sprites
- Update display icon

### 6.3 Create Upgrade Unlock Conditions
- Check requirements on shop load
- Show/hide based on progress
- "Coming soon" placeholders

### 6.4 Implement Prestige Threshold
- Track when level 50+ reached
- Show "Big Toot" button

### 6.5 Build "The Big Toot" Prestige Flow
- Confirmation modal
- Epic animation sequence
- State reset with multiplier
- Unlock Lord Chaos

### 6.6 Add Prestige Multiplier Calculations
```typescript
prestigeMultiplier = 1 + (prestigeLevel * 0.1)
```

---

## Phase 7: Visual Polish

### 7.1 Generate AI Corgi Images
Prompts for Midjourney/DALL-E:
- "Chibi corgi, front-facing, cute cartoon style, orange and white fur, simple background, game asset"
- Variations for each character

### 7.2 Generate Cosmetic Item Images
- Transparent PNG overlays
- Position guides for each slot

### 7.3 Create Fart Cloud Sprite
- Cartoony cloud shape
- Subtle green tint
- Transparent edges

### 7.4 Create Coin/Bill Sprites
- Bronze, silver, gold coins
- $1, $20, $100 bills
- Simple, readable at small size

### 7.5 Implement Corgi Idle Animation
- Subtle breathing/bounce
- CSS keyframes

### 7.6 Add Screen Shake for Big Clicks
- Small shake on normal click
- Bigger shake on multiplied clicks
- Framer Motion animation

### 7.7 Build Prestige Animation Sequence
- Screen shake
- Rainbow explosion
- "THE BIG TOOT" text
- Confetti
- Fade to reset

---

## Phase 8: Achievements & Stats

### 8.1 Create Achievements Data Structure
```typescript
// data/achievements.ts
- All achievement definitions
- Condition checking functions
```

### 8.2 Implement Achievement Unlock Logic
- Check conditions on click
- Check on purchase
- Trigger notification

### 8.3 Build Achievements Display Page
- Grid of achievement badges
- Locked (silhouette) vs unlocked
- Progress bars where applicable

### 8.4 Create Stats Tracking
- Update totalPlayTime on interval
- Track highestClickValue
- Calculate totalGasLiters

### 8.5 Build Stats Display Page
- All-time stats section
- Current session stats
- Prestige info
- Fun gas stat with precision

---

## Phase 9: Final Polish

### 9.1 Add Settings Modal
- Sound toggle
- Music toggle
- Reset progress button

### 9.2 Implement Reset Progress
- Confirmation dialog
- Clear localStorage
- Reload to initial state

### 9.3 Mobile Responsiveness Pass
- Test all screens at 320px
- Ensure touch targets 44px+
- Test landscape orientation

### 9.4 Performance Optimization
- Lazy load shop data
- Optimize particle count
- Reduce re-renders

### 9.5 Add Loading State
- Skeleton loader
- Graceful hydration

---

## Phase 10: Deployment

### 10.1 Connect GitHub to Vercel
- Create Vercel account
- Import repository
- Configure project

### 10.2 Configure Build Settings
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`

### 10.3 Deploy to Production
- Push to main branch
- Verify deployment
- Check all routes

### 10.4 Test on Multiple Devices
- iPhone Safari
- Android Chrome
- Desktop Chrome/Firefox/Safari
- Tablet

### 10.5 Share with Daughter 🎉
- Get the URL
- Present the game
- Watch the giggles
- Accept feature requests

---

## Asset Checklist

### Images Needed
- [ ] Sir Fluffington (default corgi)
- [ ] Princess Wigglebutt (pink bow corgi)
- [ ] Captain Thunderbuns (superhero corgi)
- [ ] Lord Chaos (unhinged corgi)
- [ ] Doge McToots (meme corgi)
- [ ] Birthday Hat cosmetic
- [ ] Wizard Hat cosmetic
- [ ] Sunglasses cosmetic
- [ ] Bow Tie cosmetic
- [ ] Crown cosmetic
- [ ] Astronaut Helmet cosmetic
- [ ] Taco Costume cosmetic
- [ ] Rainbow Tutu cosmetic
- [ ] Bronze coin
- [ ] Silver coin
- [ ] Gold coin
- [ ] $1 bill
- [ ] $20 bill
- [ ] $100 bill
- [ ] Fart cloud
- [ ] Background pattern

### Sounds Needed
- [ ] Fart sound 1
- [ ] Fart sound 2
- [ ] Fart sound 3
- [ ] Fart sound 4 (big toot)
- [ ] Coin collect
- [ ] Purchase success
- [ ] Achievement unlock
- [ ] UI click
- [ ] Main theme music
- [ ] Shop music
- [ ] Achievement fanfare
- [ ] Prestige epic moment
- [ ] Secret unlock sound

---

## AI Image Generation Prompts

### Base Corgi Template
```
Chibi corgi, front-facing, cute cartoon style, large expressive eyes,
small body with stubby legs, fluffy orange and white fur, happy expression,
game character, transparent background, digital art, 2D sprite
--ar 1:1 --style cute
```

### Character Variations

**Princess Wigglebutt:**
```
Chibi corgi with pink bow on head, extra fluffy fur, princess tiara,
sparkles around, feminine cute, front-facing, game character sprite,
transparent background --ar 1:1
```

**Captain Thunderbuns:**
```
Chibi corgi wearing red superhero cape, determined heroic expression,
lightning bolt emblem, front-facing, game character sprite,
transparent background --ar 1:1
```

**Lord Chaos:**
```
Chibi corgi with slightly unhinged crazy expression, spiral sparkle eyes,
messy fur, chaotic energy, mischievous grin, front-facing,
game character sprite, transparent background --ar 1:1
```

**Doge McToots:**
```
Chibi Shiba Inu in corgi art style, doge meme expression, comic sans text
bubbles saying "wow" and "such", front-facing, game character sprite,
transparent background --ar 1:1
```

### Fart Cloud
```
Cartoon fart cloud, puffy cumulus shape, light green tint, sparkles,
comedic style, game asset, transparent background --ar 1:1
```
