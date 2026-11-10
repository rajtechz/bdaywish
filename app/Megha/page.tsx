import React from "react";
import type { Metadata } from "next";
import BirthdayExperience from "@/components/BirthdayExperience";

export const metadata: Metadata = {
  title: "Happy Birthday Megha! ✨🎂 | A Magical Surprise",
  description: "A magical, heartfelt birthday surprise crafted especially for Megha.",
};

export default function MeghaPage() {
  return <BirthdayExperience />;
}

