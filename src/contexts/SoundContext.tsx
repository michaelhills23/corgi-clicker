"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface SoundSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  sfxMuted: boolean;
  musicMuted: boolean;
}

interface SoundContextValue extends SoundSettings {
  setMasterVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  toggleSfxMute: () => void;
  toggleMusicMute: () => void;
  getEffectiveVolume: (type: "sfx" | "music") => number;
}

const STORAGE_KEY = "corgi-clicker-sound-settings";

const defaultSettings: SoundSettings = {
  masterVolume: 0.7,
  sfxVolume: 1.0,
  musicVolume: 0.5,
  sfxMuted: false,
  musicMuted: false,
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SoundSettings>(defaultSettings);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SoundSettings>;
        setSettings((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors
    }
    setIsHydrated(true);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isHydrated]);

  const setMasterVolume = useCallback((volume: number) => {
    setSettings((prev) => ({ ...prev, masterVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setSfxVolume = useCallback((volume: number) => {
    setSettings((prev) => ({ ...prev, sfxVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const setMusicVolume = useCallback((volume: number) => {
    setSettings((prev) => ({ ...prev, musicVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  const toggleSfxMute = useCallback(() => {
    setSettings((prev) => ({ ...prev, sfxMuted: !prev.sfxMuted }));
  }, []);

  const toggleMusicMute = useCallback(() => {
    setSettings((prev) => ({ ...prev, musicMuted: !prev.musicMuted }));
  }, []);

  const getEffectiveVolume = useCallback(
    (type: "sfx" | "music"): number => {
      if (type === "sfx") {
        return settings.sfxMuted ? 0 : settings.masterVolume * settings.sfxVolume;
      }
      return settings.musicMuted ? 0 : settings.masterVolume * settings.musicVolume;
    },
    [settings]
  );

  return (
    <SoundContext.Provider
      value={{
        ...settings,
        setMasterVolume,
        setSfxVolume,
        setMusicVolume,
        toggleSfxMute,
        toggleMusicMute,
        getEffectiveVolume,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundSettings() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundSettings must be used within a SoundProvider");
  }
  return context;
}
