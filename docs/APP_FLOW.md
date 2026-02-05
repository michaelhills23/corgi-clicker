# Application Flow - Corgi Clicker

## Screen Inventory

### 1. Main Game Screen (/)
- Corgi display (clickable)
- Corgi name display
- Currency counter
- Click multiplier display
- Level indicator
- Navigation to other screens
- Settings button

### 2. Shop Screen (/shop)
- Upgrades tab
- Cosmetics tab
- Corgis tab
- Current currency display
- Back to game button

### 3. Achievements Screen (/achievements)
- Grid of achievement badges
- Locked vs unlocked states
- Progress indicators
- Back to game button

### 4. Stats Screen (/stats)
- All-time statistics
- Current session stats
- Prestige info
- Gas released counter
- Back to game button

### 5. Settings Modal (overlay)
- Sound on/off toggle
- Music on/off toggle
- Reset progress (with confirmation)
- Close button

---

## User Flows

### Primary Gameplay Loop

```
┌─────────────────────────────────────────────┐
│                                             │
│  1. Player on Main Screen                   │
│              ↓                              │
│  2. Player clicks corgi                     │
│              ↓                              │
│  3. Corgi plays fart animation + sound      │
│              ↓                              │
│  4. Currency particles fly out              │
│              ↓                              │
│  5. Currency counter increases              │
│              ↓                              │
│  6. Check for level up / achievements       │
│              ↓                              │
│  7. Repeat ←────────────────────────────────┘
```

### Purchase Flow

```
1. Player opens Shop
        ↓
2. Player selects category (upgrades/cosmetics/corgis)
        ↓
3. Player views item with price
        ↓
4. If affordable → Buy button active
        ↓
5. Player clicks Buy
        ↓
6. Deduct currency, apply item, play success sound
        ↓
7a. If upgrade → return to game with new multiplier
7b. If cosmetic → apply to corgi immediately
7c. If corgi → switch active corgi
```

### Prestige Flow ("The Big Toot")

```
1. Player reaches prestige threshold (Level 50+)
        ↓
2. "The Big Toot" button appears (glowing)
        ↓
3. Player clicks button
        ↓
4. Confirmation modal:
   "Reset everything for X% permanent bonus?"
        ↓
5. Player confirms
        ↓
6. Epic animation sequence plays
        ↓
7. Game resets with prestige multiplier applied
        ↓
8. If first prestige → Lord Chaos unlocked!
```

### Secret Corgi Unlock Flow

```
1. Player accumulates clicks naturally
        ↓
2. Total clicks crosses 6767 threshold
        ↓
3. Immediate interrupt - special unlock animation
        ↓
4. "much toot, very gas, wow" text appears
        ↓
5. Doge McToots added to corgi collection
        ↓
6. Achievement notification
```

### First-Time User Flow

```
1. Player loads game
        ↓
2. Default corgi (Sir Fluffington) displayed
        ↓
3. Hint appears: "Click the corgi. You know you want to."
        ↓
4. Player clicks corgi
        ↓
5. Hint fades permanently
        ↓
6. "First Toot" achievement unlocks
        ↓
7. Normal gameplay begins
```

### Micro-Prestige Event (Level ~25)

```
1. Player reaches Level 25
        ↓
2. Screen flashes dramatically
        ↓
3. Confetti explosion
        ↓
4. Sound effect plays
        ↓
5. Text: "Whoa! That was a big one!
   Imagine what THE BIG TOOT could do..."
        ↓
6. No reset occurs - cosmetic only
        ↓
7. Player continues playing (now aware of prestige)
```

---

## Navigation Structure

```
                    ┌─────────────┐
                    │  Main Game  │
                    │     (/)     │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│     Shop      │  │ Achievements  │  │    Stats      │
│   (/shop)     │  │(/achievements)│  │   (/stats)    │
└───────────────┘  └───────────────┘  └───────────────┘

Settings Modal - accessible from all screens via gear icon
```

---

## State Transitions

### Currency State
```
Clicking → +currency → Check level → Update UI
                              ↓
                    Level changed? → Update currency type
                              ↓
                    Achievement check → Show notification if earned
```

### Save State
```
Auto-save timer (30s) ──────────────→ Save to localStorage
Purchase action ────────────────────→ Save to localStorage
Tab close (beforeunload) ───────────→ Save to localStorage
```

### Load State
```
App mount → Check localStorage →
    ↓ exists?
    Yes → Load state, validate, migrate if needed
    No  → Initialize default state
```
