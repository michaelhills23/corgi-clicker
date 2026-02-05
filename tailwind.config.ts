import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#FF6B35",
          secondary: "#4ECDC4",
          tertiary: "#FFE66D",
        },
        bg: {
          primary: "#FFF8E7",
          secondary: "#FFF1D6",
          tertiary: "#FFE9C4",
          inverse: "#2D3436",
        },
        text: {
          primary: "#2D3436",
          secondary: "#636E72",
          tertiary: "#B2BEC3",
          inverse: "#FFFFFF",
        },
        currency: {
          bronze: "#CD7F32",
          silver: "#C0C0C0",
          gold: "#FFD700",
          money: "#85BB65",
        },
        fart: {
          cloud: "#A8E6CF",
          "cloud-alt": "#88D8B0",
        },
        semantic: {
          success: "#00B894",
          warning: "#FDCB6E",
          error: "#E17055",
          info: "#74B9FF",
        },
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "cursive"],
        body: ["var(--font-nunito)", "sans-serif"],
        accent: ["var(--font-bangers)", "cursive"],
      },
      boxShadow: {
        orange: "0 4px 14px rgba(255, 107, 53, 0.4)",
        teal: "0 4px 14px rgba(78, 205, 196, 0.4)",
        gold: "0 4px 14px rgba(255, 215, 0, 0.4)",
        success: "0 4px 14px rgba(0, 184, 148, 0.4)",
        "glow-sm": "0 0 8px rgba(255, 107, 53, 0.4)",
        "glow-md": "0 0 16px rgba(255, 107, 53, 0.5)",
        "glow-lg": "0 0 24px rgba(255, 107, 53, 0.6)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "bounce-sm": "bounce-sm 0.3s ease-out",
        "wiggle": "wiggle 0.3s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "breathe": "breathe 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(255, 107, 53, 0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 107, 53, 0.6)" },
        },
        "bounce-sm": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "breathe": {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.02)" },
        },
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};

export default config;
