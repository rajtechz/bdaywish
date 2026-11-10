"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Flower2, Smile, Award, Heart } from "lucide-react";

interface WishCard {
  id: number;
  text: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
}

const WISHES: WishCard[] = [
  {
    id: 1,
    text: "May your life always sparkle with happiness ✨",
    icon: <Sparkles className="w-6 h-6 text-gold-300" />,
    gradient: "from-amber-500/20 via-pink-500/10 to-transparent",
    borderColor: "border-gold-300/40",
  },
  {
    id: 2,
    text: "May every dream find its way to you 🌸",
    icon: <Flower2 className="w-6 h-6 text-pink-300" />,
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    borderColor: "border-pink-300/40",
  },
  {
    id: 3,
    text: "May you always have reasons to smile ❤️",
    icon: <Smile className="w-6 h-6 text-rose-300" />,
    gradient: "from-blush-500/20 via-red-500/10 to-transparent",
    borderColor: "border-blush-300/40",
  },
  {
    id: 4,
    text: "May success follow you everywhere 🌟",
    icon: <Award className="w-6 h-6 text-amber-300" />,
    gradient: "from-gold-500/20 via-yellow-500/10 to-transparent",
    borderColor: "border-gold-400/40",
  },
  {
    id: 5,
    text: "May your days be filled with endless love 💕",
    icon: <Heart className="w-6 h-6 text-pink-400" />,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderColor: "border-lavender-300/40",
  },
];

export default function BirthdayWishes() {
  return (
    <section className="relative py-20 px-4 max-w-5xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-gold-300/30 text-gold-200 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
          <span>Blessings & Wishes</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-pink-gradient">
          Heartfelt Birthday Wishes 🌟
        </h2>

        <p className="text-lavender-200/80 text-sm sm:text-base max-w-md mx-auto mt-2">
          Every floating card is a prayer sent into the universe for your endless joy.
        </p>
      </div>

      {/* Animated Floating Wishes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WISHES.map((wish, index) => (
          <div
            key={wish.id}
            className={`relative rounded-3xl p-6 sm:p-7 glass-card ${wish.borderColor} bg-gradient-to-br ${wish.gradient} flex flex-col justify-between overflow-hidden shadow-xl group hover:-translate-y-2 transition-transform duration-300`}
          >
            {/* Shimmer reflection */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors pointer-events-none" />

            {/* Icon Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-midnight-950/80 border border-gold-300/30 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-gold-300/80 transition-all">
                {wish.icon}
              </div>
              <span className="text-xs text-gold-300/60 font-serif italic">Wish #{index + 1}</span>
            </div>

            {/* Wish Text */}
            <h3 className="text-lg sm:text-xl font-serif font-medium text-blush-50 leading-relaxed group-hover:text-gold-100 transition-colors">
              {wish.text}
            </h3>

            {/* Bottom Accent */}
            <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-lavender-200/60">
              <span>Always in my prayers</span>
              <Heart className="w-3.5 h-3.5 text-blush-400 fill-blush-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

