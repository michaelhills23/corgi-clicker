"use client";

import { useCallback, useState } from "react";

interface ShakeState {
  x: number;
  y: number;
  isShaking: boolean;
}

export function useScreenShake() {
  const [shake, setShake] = useState<ShakeState>({ x: 0, y: 0, isShaking: false });

  const triggerShake = useCallback((intensity: number = 5, duration: number = 200) => {
    setShake({ x: 0, y: 0, isShaking: true });

    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= duration) {
        setShake({ x: 0, y: 0, isShaking: false });
        return;
      }

      // Decay the intensity over time
      const progress = elapsed / duration;
      const currentIntensity = intensity * (1 - progress);

      // Random shake offset
      const x = (Math.random() - 0.5) * 2 * currentIntensity;
      const y = (Math.random() - 0.5) * 2 * currentIntensity;

      setShake({ x, y, isShaking: true });
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return { shake, triggerShake };
}
