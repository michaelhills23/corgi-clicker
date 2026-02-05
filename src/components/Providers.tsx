"use client";

import { SoundProvider } from "@/contexts/SoundContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <SoundProvider>{children}</SoundProvider>;
}
