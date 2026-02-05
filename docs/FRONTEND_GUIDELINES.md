# Frontend Guidelines - Corgi Clicker

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Corgi Orange | `#FF6B35` | Primary buttons, highlights |
| Teal Accent | `#4ECDC4` | Secondary actions, links |
| Warm Cream | `#FFF8E7` | Background |
| Near Black | `#2D3436` | Body text |
| Success Green | `#00B894` | Purchase confirmations |
| Coin Gold | `#FFD700` | Gold coins, achievements |
| Money Green | `#85BB65` | Dollar bills |
| Bronze | `#CD7F32` | Bronze coins |
| Silver | `#C0C0C0` | Silver coins |

### Tailwind Config Extension
```javascript
colors: {
  corgi: {
    orange: '#FF6B35',
    teal: '#4ECDC4',
    cream: '#FFF8E7',
  },
  currency: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    money: '#85BB65',
  }
}
```

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings | Fredoka One | 400 | Titles, big numbers |
| Body | Nunito | 400, 600, 700 | Descriptions, UI text |
| Numbers | Bangers | 400 | Currency display, stats |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Fredoka+One&family=Nunito:wght@400;600;700&display=swap');
```

### Tailwind Font Config
```javascript
fontFamily: {
  heading: ['Fredoka One', 'cursive'],
  body: ['Nunito', 'sans-serif'],
  numbers: ['Bangers', 'cursive'],
}
```

---

## Spacing Scale

Using Tailwind defaults:

| Name | Size | Usage |
|------|------|-------|
| xs | 4px (1) | Tight spacing |
| sm | 8px (2) | Component internal |
| md | 16px (4) | Standard gaps |
| lg | 24px (6) | Section spacing |
| xl | 32px (8) | Major sections |
| 2xl | 48px (12) | Page padding |

---

## Component Styles

### Buttons

```jsx
// Primary Button
<button className="
  bg-corgi-orange
  text-white
  font-body font-bold
  px-6 py-3
  rounded-full
  shadow-lg
  hover:scale-105
  active:scale-95
  transition-transform
">
  Buy Upgrade
</button>

// Secondary Button
<button className="
  bg-corgi-teal
  text-white
  font-body font-semibold
  px-4 py-2
  rounded-full
  shadow-md
  hover:scale-105
  transition-transform
">
  View Stats
</button>

// Disabled State
<button className="
  bg-gray-300
  text-gray-500
  cursor-not-allowed
  opacity-60
">
  Not Enough Coins
</button>
```

### Cards

```jsx
<div className="
  bg-corgi-cream
  rounded-2xl
  shadow-md
  p-4
  border-2 border-corgi-orange/20
">
  {/* Card content */}
</div>
```

### Modals

```jsx
// Backdrop
<div className="
  fixed inset-0
  bg-black/50
  backdrop-blur-sm
  flex items-center justify-center
  z-50
">
  {/* Modal content */}
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="
      bg-white
      rounded-2xl
      p-6
      shadow-2xl
      max-w-md w-full mx-4
    "
  >
    {/* Content */}
  </motion.div>
</div>
```

---

## Animation Guidelines

### Corgi Idle Animation (CSS)
```css
@keyframes corgi-breathe {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.02); }
}

.corgi-idle {
  animation: corgi-breathe 2s ease-in-out infinite;
}
```

### Corgi Click Animation (Framer Motion)
```jsx
const clickVariants = {
  idle: { scale: 1, rotate: 0 },
  clicked: {
    scale: [1, 0.9, 1.1, 1],
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.3 }
  }
}
```

### Fart Cloud Animation
```jsx
const fartCloudVariants = {
  initial: { scale: 0, opacity: 0, x: 0 },
  animate: {
    scale: [0, 1.5, 1],
    opacity: [0, 1, 0],
    x: [0, -50, -100],
    transition: { duration: 0.8 }
  }
}
```

### Coin Particle Burst
```jsx
// Spawn 5-10 coins that fly toward currency counter
const coinVariants = {
  initial: { scale: 0, opacity: 1 },
  animate: (custom) => ({
    x: custom.targetX,
    y: custom.targetY,
    scale: [0, 1, 0.5],
    opacity: [1, 1, 0],
    transition: {
      duration: 0.6,
      delay: custom.delay
    }
  })
}
```

### Upgrade Affordable Pulse
```jsx
const affordablePulse = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(255, 107, 53, 0.4)',
      '0 0 0 10px rgba(255, 107, 53, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity
    }
  }
}
```

### Prestige Screen Shake
```jsx
const screenShake = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile (default) | 320px - 640px | Primary target |
| Tablet (sm) | 641px - 1024px | Landscape phones, tablets |
| Desktop (lg) | 1025px+ | Desktop browsers |

### Mobile-First Approach
```jsx
// Example: Corgi size
<div className="
  w-48 h-48        /* Mobile: smaller */
  sm:w-64 sm:h-64  /* Tablet: medium */
  lg:w-80 lg:h-80  /* Desktop: larger */
">
```

---

## Accessibility

### Requirements
- All interactive elements keyboard accessible (tab, enter, space)
- Sound toggle always visible in header/nav
- Touch targets minimum 44x44px
- Focus visible states on all buttons
- Screen reader labels for icon-only buttons

### Focus States
```jsx
<button className="
  focus:outline-none
  focus:ring-4
  focus:ring-corgi-orange/50
  focus:ring-offset-2
">
```

### ARIA Labels
```jsx
<button
  aria-label="Toggle sound effects"
  onClick={toggleSound}
>
  {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
</button>
```

---

## Icon System

Use inline SVG or a lightweight icon library. Recommended icons needed:

| Icon | Usage |
|------|-------|
| Shop/Cart | Navigation |
| Trophy | Achievements |
| Chart/Stats | Statistics |
| Gear | Settings |
| Sound On/Off | Audio toggle |
| Music On/Off | Music toggle |
| Lock | Locked items |
| Check | Purchased/achieved |
| Arrow Left | Back navigation |

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Regular content |
| Floating | 10 | Tooltips, dropdowns |
| Particles | 20 | Coin/fart animations |
| Navigation | 30 | Fixed nav elements |
| Modal Backdrop | 40 | Dark overlay |
| Modal Content | 50 | Modal windows |
| Toast/Notification | 60 | Achievement popups |
