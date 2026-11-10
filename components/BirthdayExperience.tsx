"use client";

import React, { useState, useEffect } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import BirthdayIntro from "@/components/BirthdayIntro";
import BirthdayHero from "@/components/BirthdayHero";
import MemoryGallery from "@/components/MemoryGallery";
import BirthdayMessage from "@/components/BirthdayMessage";
import BirthdayWishes from "@/components/BirthdayWishes";
import FinalCelebration from "@/components/FinalCelebration";
import MusicToggle from "@/components/MusicToggle";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function BirthdayExperience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative min-h-screen text-blush-50 overflow-x-hidden selection:bg-pink-500 selection:text-white"
      style={{
        backgroundColor: "#0d031a",
        backgroundImage: "radial-gradient(circle at 50% 10%, #360b45 0%, #1e052d 35%, #0d031a 100%)",
      }}
    >
      {/* Floating Canvas Particles: Rose petals, hearts, flowers, golden dust, stars */}
      {mounted && <ParticleBackground />}

      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-[35rem] h-[35rem] rounded-full bg-pink-600/15 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[35rem] h-[35rem] rounded-full bg-purple-700/15 blur-[160px] pointer-events-none z-0" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-gold-500/10 blur-[180px] pointer-events-none z-0" />

      {/* Floating Audio Toggle (Top Right) */}
      <ErrorBoundary fallbackTitle="Music Controller">
        <MusicToggle />
      </ErrorBoundary>

      <div className="relative z-10 w-full flex flex-col">
        {/* 1. Opening Surprise Section with 3D Animated Gift Box */}
        <ErrorBoundary fallbackTitle="Birthday Surprise Gift">
          <BirthdayIntro />
        </ErrorBoundary>

        {/* 2. Birthday Hero with Animated Typography & Interactive Cake */}
        <ErrorBoundary fallbackTitle="Birthday Celebration Hero">
          <BirthdayHero />
        </ErrorBoundary>

        {/* 3. Photo Gallery with Megha's Memories */}
        <ErrorBoundary fallbackTitle="Beautiful Memories With Megha">
          <MemoryGallery />
        </ErrorBoundary>

        {/* 4. Heartfelt Handwritten Letter */}
        <ErrorBoundary fallbackTitle="Personal Letter For Megha">
          <BirthdayMessage />
        </ErrorBoundary>

        {/* 5. Floating Birthday Wishes Cards */}
        <ErrorBoundary fallbackTitle="Birthday Wishes For Megha">
          <BirthdayWishes />
        </ErrorBoundary>

        {/* 6. Grand Finale with Fireworks & Celebration */}
        <ErrorBoundary fallbackTitle="Celebration Finale">
          <FinalCelebration />
        </ErrorBoundary>
      </div>
    </main>
  );
}

