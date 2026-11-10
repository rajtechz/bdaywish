import React from "react";
import type { Metadata } from "next";
import BirthdayExperience from "@/components/BirthdayExperience";

export const metadata: Metadata = {
  title: "Birthday Surprise For My Best! ✨🎂 | 3 Days To Go",
  description: "A playful, multi-slide birthday countdown surprise crafted especially for my best friend.",
};

export default function MeghaPage() {
  return <BirthdayExperience />;
}
