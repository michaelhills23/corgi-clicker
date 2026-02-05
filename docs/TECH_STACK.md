# Tech Stack - Corgi Clicker

## Framework & Language

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.x | React framework with App Router |
| React | 18.2.x | UI library |
| TypeScript | 5.4.x | Type safety |

---

## Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.4.x | Utility-first CSS |
| Framer Motion | 11.x | Animations (fart clouds, coin particles) |

---

## State Management

| Technology | Version | Purpose |
|------------|---------|---------|
| Zustand | 4.5.x | Simple, lightweight state management |
| Local Storage | Native | Persistence layer (browser API) |

---

## Audio

| Technology | Version | Purpose |
|------------|---------|---------|
| Howler.js | 2.2.x | Cross-browser audio handling |

### Sound Sources (Free)
- freesound.org
- pixabay.com/sound-effects

### Music Tracks (5 total)
1. **Main game theme** - Upbeat, loopable
2. **Shop music** - Chill browsing vibes
3. **Achievements fanfare** - Celebratory
4. **Prestige "Big Toot" moment** - Epic/dramatic
5. **Secret corgi unlock** - Meme-worthy surprise

---

## Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Hosting (free tier) |
| GitHub | Source control |

---

## Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Linting |
| Prettier | Code formatting |

---

## Image Assets

| Source | Format | Purpose |
|--------|--------|---------|
| AI-generated (Midjourney/DALL-E) | WebP | Performance-optimized images |
| Sprite sheets | PNG/WebP | Animation frames |

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari (iOS) | Last 2 versions |
| Chrome Mobile (Android) | Last 2 versions |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial Load | < 2 seconds |
| Click Response | < 50ms feedback |
| Bundle Size | < 500KB (gzipped) |
| Lighthouse Score | > 90 (Performance) |

---

## Package.json Dependencies (Expected)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "howler": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0"
  }
}
```

---

## Why These Choices?

### Next.js 14
- App Router for modern React patterns
- Built-in optimization (images, fonts)
- Easy Vercel deployment
- Great developer experience

### Zustand over Redux
- Minimal boilerplate
- Perfect for small-medium apps
- Easy localStorage integration
- TypeScript-friendly

### Framer Motion
- Declarative animations
- Great for particle effects
- Smooth spring physics
- Exit animations built-in

### Howler.js
- Cross-browser audio (especially mobile Safari)
- Sprite support for multiple sounds
- Volume control and fading
- Reliable playback
