import React from "react";
import type { Metadata } from "next";
import BirthdayExperience from "@/components/BirthdayExperience";

export const metadata: Metadata = {
  title: "Happy Birthday Allen! ✨🎂 | 3 Days To Go",
  description: "A cinematic birthday countdown surprise crafted especially for Allen.",
};

export default function MeghaPage() {
  return <BirthdayExperience />;
}
