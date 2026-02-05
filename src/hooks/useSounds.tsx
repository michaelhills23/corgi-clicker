"use client";

import { useCallback, useEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { useSoundSettings } from "@/contexts/SoundContext";

// Sound definitions with multiple variations for variety
const SOUND_DEFINITIONS: Record<string, { src: string[]; volume: number }> = {
  // Coin collect sound
  coin: {
    src: ["/sounds/coin.mp3"],
    volume: 0.5,
  },
  // Purchase success
  purchase: {
    src: ["/sounds/purchase.mp3"],
    volume: 0.6,
  },
  // Level up / achievement
  levelUp: {
    src: ["/sounds/levelup.mp3"],
    volume: 0.7,
  },
  // Prestige
  prestige: {
    src: ["/sounds/prestige.mp3"],
    volume: 0.8,
  },
  // UI click
  uiClick: {
    src: ["/sounds/click.mp3"],
    volume: 0.3,
  },
};

type SoundName = "fart" | "coin" | "purchase" | "levelUp" | "prestige" | "uiClick";

// Separate fart sounds for random variation
const FART_SOUNDS = ["/sounds/fart1.mp3", "/sounds/fart2.mp3", "/sounds/fart3.mp3"];
const FART_VOLUME = 0.6;

export function useSounds() {
  const { getEffectiveVolume, sfxMuted } = useSoundSettings();
  const soundsRef = useRef<Map<string, Howl>>(new Map());
  const fartSoundsRef = useRef<Howl[]>([]);

  // Initialize sounds
  useEffect(() => {
    const fartSounds = fartSoundsRef.current;
    const sounds = soundsRef.current;

    // Create individual fart sound instances for variation
    FART_SOUNDS.forEach((src) => {
      fartSounds.push(
        new Howl({
          src: [src],
          volume: FART_VOLUME,
          preload: true,
        })
      );
    });

    // Create other sounds
    Object.entries(SOUND_DEFINITIONS).forEach(([name, def]) => {
      const sound = new Howl({
        src: def.src,
        volume: def.volume,
        preload: true,
      });
      sounds.set(name, sound);
    });

    return () => {
      // Cleanup using captured refs
      fartSounds.forEach((s) => s.unload());
      fartSounds.length = 0;
      sounds.forEach((s) => s.unload());
      sounds.clear();
    };
  }, []);

  // Update global volume when settings change
  useEffect(() => {
    const vol = getEffectiveVolume("sfx");
    Howler.volume(vol);
  }, [getEffectiveVolume]);

  // Play a random fart sound
  const playFart = useCallback(() => {
    if (sfxMuted || fartSoundsRef.current.length === 0) return;
    const randomIndex = Math.floor(Math.random() * fartSoundsRef.current.length);
    const sound = fartSoundsRef.current[randomIndex];
    sound.volume(FART_VOLUME * getEffectiveVolume("sfx"));
    sound.play();
  }, [sfxMuted, getEffectiveVolume]);

  // Play a named sound
  const playSound = useCallback(
    (name: SoundName) => {
      if (sfxMuted) return;
      if (name === "fart") {
        playFart();
        return;
      }
      const sound = soundsRef.current.get(name);
      if (sound) {
        const def = SOUND_DEFINITIONS[name];
        sound.volume(def.volume * getEffectiveVolume("sfx"));
        sound.play();
      }
    },
    [sfxMuted, getEffectiveVolume, playFart]
  );

  return {
    playFart,
    playSound,
    playCoin: useCallback(() => playSound("coin"), [playSound]),
    playPurchase: useCallback(() => playSound("purchase"), [playSound]),
    playLevelUp: useCallback(() => playSound("levelUp"), [playSound]),
    playPrestige: useCallback(() => playSound("prestige"), [playSound]),
    playUiClick: useCallback(() => playSound("uiClick"), [playSound]),
  };
}
