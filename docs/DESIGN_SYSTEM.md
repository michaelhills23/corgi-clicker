# Design System - Corgi Clicker

## Overview

This document defines the visual language tokens for Corgi Clicker. All values are designed to work with Tailwind CSS and can be extended in `tailwind.config.ts`.

---

## Color Tokens

### Brand Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `brand-primary` | `#FF6B35` | `255, 107, 53` | Primary actions, corgi accent |
| `brand-secondary` | `#4ECDC4` | `78, 205, 196` | Secondary actions, links |
| `brand-tertiary` | `#FFE66D` | `255, 230, 109` | Highlights, special elements |

### Background Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `bg-primary` | `#FFF8E7` | `255, 248, 231` | Main background |
| `bg-secondary` | `#FFF1D6` | `255, 241, 214` | Cards, elevated surfaces |
| `bg-tertiary` | `#FFE9C4` | `255, 233, 196` | Hover states, active areas |
| `bg-inverse` | `#2D3436` | `45, 52, 54` | Dark mode elements, modals |

### Text Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `text-primary` | `#2D3436` | `45, 52, 54` | Body text, headings |
| `text-secondary` | `#636E72` | `99, 110, 114` | Descriptions, labels |
| `text-tertiary` | `#B2BEC3` | `178, 190, 195` | Placeholders, disabled |
| `text-inverse` | `#FFFFFF` | `255, 255, 255` | Text on dark backgrounds |

### Currency Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `currency-bronze` | `#CD7F32` | `205, 127, 50` | Bronze coins |
| `currency-silver` | `#C0C0C0` | `192, 192, 192` | Silver coins |
| `currency-gold` | `#FFD700` | `255, 215, 0` | Gold coins |
| `currency-money` | `#85BB65` | `133, 187, 101` | Dollar bills |

### Semantic Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `success` | `#00B894` | `0, 184, 148` | Purchase success, unlocks |
| `warning` | `#FDCB6E` | `253, 203, 110` | Caution states |
| `error` | `#E17055` | `225, 112, 85` | Errors, destructive |
| `info` | `#74B9FF` | `116, 185, 255` | Information, hints |

### Effect Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `fart-cloud` | `#A8E6CF` | `168, 230, 207` | Fart particle base |
| `fart-cloud-alt` | `#88D8B0` | `136, 216, 176` | Fart particle variant |
| `sparkle` | `#FFE66D` | `255, 230, 109` | Sparkle effects |
| `glow-primary` | `#FF6B35` | `255, 107, 53` | Button glow, affordable |
| `glow-gold` | `#FFD700` | `255, 215, 0` | Achievement glow |

---

## Typography

### Font Families

| Token | Font Stack | Usage |
|-------|------------|-------|
| `font-display` | `'Fredoka One', cursive` | Headings, titles, big text |
| `font-body` | `'Nunito', sans-serif` | Body text, descriptions |
| `font-accent` | `'Bangers', cursive` | Numbers, currency, stats |

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | `12px` | `16px` | Fine print, badges |
| `text-sm` | `14px` | `20px` | Labels, secondary text |
| `text-base` | `16px` | `24px` | Body text |
| `text-lg` | `18px` | `28px` | Emphasized body |
| `text-xl` | `20px` | `28px` | Section headers |
| `text-2xl` | `24px` | `32px` | Card titles |
| `text-3xl` | `30px` | `36px` | Page titles |
| `text-4xl` | `36px` | `40px` | Hero numbers |
| `text-5xl` | `48px` | `48px` | Currency display |
| `text-6xl` | `60px` | `60px` | Big announcements |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `font-normal` | `400` | Body text |
| `font-medium` | `500` | Emphasized text |
| `font-semibold` | `600` | Buttons, labels |
| `font-bold` | `700` | Headings, important |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `tracking-tighter` | `-0.05em` | Tight headings |
| `tracking-tight` | `-0.025em` | Compact text |
| `tracking-normal` | `0` | Body text |
| `tracking-wide` | `0.025em` | Buttons, labels |
| `tracking-wider` | `0.05em` | All caps text |

---

## Spacing Scale

Based on 4px base unit.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `space-0` | `0` | `0px` | Reset |
| `space-px` | `1px` | `1px` | Borders |
| `space-0.5` | `0.125rem` | `2px` | Micro spacing |
| `space-1` | `0.25rem` | `4px` | Tight gaps |
| `space-2` | `0.5rem` | `8px` | Component internal |
| `space-3` | `0.75rem` | `12px` | Small gaps |
| `space-4` | `1rem` | `16px` | Standard gaps |
| `space-5` | `1.25rem` | `20px` | Medium gaps |
| `space-6` | `1.5rem` | `24px` | Section spacing |
| `space-8` | `2rem` | `32px` | Large gaps |
| `space-10` | `2.5rem` | `40px` | Major sections |
| `space-12` | `3rem` | `48px` | Page padding |
| `space-16` | `4rem` | `64px` | Hero spacing |
| `space-20` | `5rem` | `80px` | Extra large |
| `space-24` | `6rem` | `96px` | Maximum spacing |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | `0` | Sharp corners |
| `rounded-sm` | `0.125rem` (2px) | Subtle rounding |
| `rounded` | `0.25rem` (4px) | Default inputs |
| `rounded-md` | `0.375rem` (6px) | Small cards |
| `rounded-lg` | `0.5rem` (8px) | Medium cards |
| `rounded-xl` | `0.75rem` (12px) | Large cards |
| `rounded-2xl` | `1rem` (16px) | Main cards, panels |
| `rounded-3xl` | `1.5rem` (24px) | Hero elements |
| `rounded-full` | `9999px` | Buttons, pills, avatars |

---

## Shadows

### Elevation Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | `none` | Flat elements |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Default cards |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | Elevated cards |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Modals, dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | High elevation |
| `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Maximum elevation |

### Colored Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-orange` | `0 4px 14px rgba(255,107,53,0.4)` | Primary button hover |
| `shadow-teal` | `0 4px 14px rgba(78,205,196,0.4)` | Secondary button hover |
| `shadow-gold` | `0 4px 14px rgba(255,215,0,0.4)` | Achievement glow |
| `shadow-success` | `0 4px 14px rgba(0,184,148,0.4)` | Purchase success |

### Inner Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.06)` | Pressed states |
| `shadow-inner-lg` | `inset 0 4px 8px rgba(0,0,0,0.1)` | Deep inset |

---

## Glow Effects

Used for "affordable" and interactive states.

| Token | Value | Usage |
|-------|-------|-------|
| `glow-sm` | `0 0 8px` | Subtle glow |
| `glow-md` | `0 0 16px` | Medium glow |
| `glow-lg` | `0 0 24px` | Strong glow |
| `glow-xl` | `0 0 32px` | Maximum glow |

### Glow Animation (Pulse)
```css
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 8px rgba(255, 107, 53, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.6);
  }
}
```

---

## Borders

### Border Widths

| Token | Value | Usage |
|-------|-------|-------|
| `border-0` | `0` | No border |
| `border` | `1px` | Default border |
| `border-2` | `2px` | Emphasized border |
| `border-4` | `4px` | Heavy border |

### Border Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `border-default` | `#E2E8F0` | Standard borders |
| `border-muted` | `#F1F5F9` | Subtle dividers |
| `border-strong` | `#CBD5E1` | Emphasized borders |
| `border-brand` | `#FF6B35` | Active, selected |
| `border-success` | `#00B894` | Success states |

---

## Opacity

| Token | Value | Usage |
|-------|-------|-------|
| `opacity-0` | `0` | Invisible |
| `opacity-5` | `0.05` | Barely visible |
| `opacity-10` | `0.1` | Very subtle |
| `opacity-20` | `0.2` | Subtle overlay |
| `opacity-30` | `0.3` | Light overlay |
| `opacity-50` | `0.5` | Half opacity |
| `opacity-60` | `0.6` | Disabled text |
| `opacity-75` | `0.75` | Faded elements |
| `opacity-90` | `0.9` | Near opaque |
| `opacity-100` | `1` | Fully opaque |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-0` | `0` | Base layer |
| `z-10` | `10` | Elevated content |
| `z-20` | `20` | Particles, effects |
| `z-30` | `30` | Fixed navigation |
| `z-40` | `40` | Modal backdrop |
| `z-50` | `50` | Modal content |
| `z-60` | `60` | Toasts, notifications |
| `z-max` | `9999` | Emergency overlay |

---

## Transition Tokens

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `duration-75` | `75ms` | Instant feedback |
| `duration-100` | `100ms` | Quick transitions |
| `duration-150` | `150ms` | Default transitions |
| `duration-200` | `200ms` | Standard animations |
| `duration-300` | `300ms` | Smooth transitions |
| `duration-500` | `500ms` | Slow animations |
| `duration-700` | `700ms` | Dramatic reveals |
| `duration-1000` | `1000ms` | Very slow |

### Timing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-linear` | `linear` | Constant speed |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerate |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerate |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth |
| `ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful bounce |

---

## Tailwind Config Extension

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF6B35',
          secondary: '#4ECDC4',
          tertiary: '#FFE66D',
        },
        bg: {
          primary: '#FFF8E7',
          secondary: '#FFF1D6',
          tertiary: '#FFE9C4',
          inverse: '#2D3436',
        },
        currency: {
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          gold: '#FFD700',
          money: '#85BB65',
        },
        fart: {
          cloud: '#A8E6CF',
          'cloud-alt': '#88D8B0',
        },
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
        accent: ['Bangers', 'cursive'],
      },
      boxShadow: {
        'orange': '0 4px 14px rgba(255, 107, 53, 0.4)',
        'teal': '0 4px 14px rgba(78, 205, 196, 0.4)',
        'gold': '0 4px 14px rgba(255, 215, 0, 0.4)',
        'glow-sm': '0 0 8px',
        'glow-md': '0 0 16px',
        'glow-lg': '0 0 24px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'bounce-sm': 'bounce-sm 0.3s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255, 107, 53, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.6)' },
        },
        'bounce-sm': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Usage Examples

### Primary Button
```jsx
<button className="
  bg-brand-primary
  text-text-inverse
  font-body font-semibold
  px-6 py-3
  rounded-full
  shadow-md hover:shadow-orange
  transition-all duration-200 ease-out
  hover:scale-105 active:scale-95
">
```

### Card Component
```jsx
<div className="
  bg-bg-secondary
  border-2 border-brand-primary/20
  rounded-2xl
  shadow-md
  p-4 space-y-3
">
```

### Currency Display
```jsx
<span className="
  font-accent
  text-5xl
  text-currency-gold
  drop-shadow-lg
">
```

### Affordable Item Glow
```jsx
<div className="
  animate-glow-pulse
  ring-2 ring-brand-primary/50
  rounded-xl
">
```
