"use client";

import { motion } from "framer-motion";
import { useSoundSettings } from "@/contexts/SoundContext";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

export function SoundControls() {
  const { sfxMuted, toggleSfxMute } = useSoundSettings();
  const { isPlaying, toggle: toggleMusic, isMuted: musicMuted } = useBackgroundMusic();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {/* SFX Toggle */}
      <motion.button
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
          sfxMuted
            ? "bg-bg-tertiary text-text-tertiary"
            : "bg-bg-secondary text-text-primary"
        }`}
        onClick={toggleSfxMute}
        whileTap={{ scale: 0.9 }}
        title={sfxMuted ? "Unmute sound effects" : "Mute sound effects"}
      >
        {sfxMuted ? "🔇" : "🔊"}
      </motion.button>

      {/* Music Toggle */}
      <motion.button
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
          !isPlaying || musicMuted
            ? "bg-bg-tertiary text-text-tertiary"
            : "bg-bg-secondary text-text-primary"
        }`}
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying && !musicMuted ? "🎵" : "🎵"}
        {(!isPlaying || musicMuted) && (
          <span className="absolute text-xs">❌</span>
        )}
      </motion.button>
    </div>
  );
}
