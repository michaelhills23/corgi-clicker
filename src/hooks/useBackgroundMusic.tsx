"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { useSoundSettings } from "@/contexts/SoundContext";

const MUSIC_SRC = "/sounds/music.mp3";

export function useBackgroundMusic() {
  const { getEffectiveVolume, musicMuted, toggleMusicMute } = useSoundSettings();
  const musicRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize music (but don't autoplay - browsers block that)
  useEffect(() => {
    musicRef.current = new Howl({
      src: [MUSIC_SRC],
      loop: true,
      volume: getEffectiveVolume("music"),
      preload: true,
      onload: () => setIsLoaded(true),
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
    });

    return () => {
      if (musicRef.current) {
        musicRef.current.unload();
        musicRef.current = null;
      }
    };
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update volume when settings change
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume(getEffectiveVolume("music"));
    }
  }, [getEffectiveVolume]);

  // Handle mute state
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.mute(musicMuted);
    }
  }, [musicMuted]);

  const play = useCallback(() => {
    if (musicRef.current && !isPlaying) {
      musicRef.current.play();
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (musicRef.current && isPlaying) {
      musicRef.current.pause();
    }
  }, [isPlaying]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return {
    isPlaying,
    isLoaded,
    isMuted: musicMuted,
    play,
    pause,
    toggle,
    toggleMute: toggleMusicMute,
  };
}
