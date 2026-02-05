"use client";

import React from "react";
import { Navigation } from "./Navigation";
import { AutoSaveProvider } from "@/hooks/useAutoSave";
import { SoundControls } from "@/components/ui/SoundControls";

interface GameLayoutProps {
  children: React.ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <AutoSaveProvider>
      <div className="min-h-screen bg-bg-primary flex flex-col">
        <SoundControls />
        <main className="flex-1 pb-20">{children}</main>
        <Navigation />
      </div>
    </AutoSaveProvider>
  );
}
