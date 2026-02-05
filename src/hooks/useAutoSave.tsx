"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";

const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
const PLAY_TIME_INTERVAL = 1000; // 1 second

/**
 * Hook to handle auto-saving and play time tracking
 * - Saves every 30 seconds
 * - Saves when tab loses visibility
 * - Saves on page unload
 * - Tracks play time every second
 */
export function useAutoSave() {
  const updatePlayTime = useGameStore((state) => state.updatePlayTime);
  const lastSaveRef = useRef<number>(Date.now());

  // Force a save by triggering a state update
  // Zustand persist middleware will handle the actual save
  const triggerSave = useCallback(() => {
    // Touch lastSaved to trigger persist
    useGameStore.setState({ lastSaved: Date.now() });
    lastSaveRef.current = Date.now();
  }, []);

  useEffect(() => {
    // Auto-save interval
    const saveInterval = setInterval(() => {
      triggerSave();
    }, AUTO_SAVE_INTERVAL);

    // Play time tracking interval
    const playTimeInterval = setInterval(() => {
      updatePlayTime(1);
    }, PLAY_TIME_INTERVAL);

    // Save on visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        triggerSave();
      }
    };

    // Save on page unload
    const handleBeforeUnload = () => {
      triggerSave();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(saveInterval);
      clearInterval(playTimeInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // Final save on unmount
      triggerSave();
    };
  }, [triggerSave, updatePlayTime]);

  return { triggerSave };
}

/**
 * Provider component that initializes auto-save for the app
 * Use this in your root layout or main game component
 */
export function AutoSaveProvider({ children }: { children: React.ReactNode }) {
  useAutoSave();
  return <>{children}</>;
}
