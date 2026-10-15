import type { Metadata } from "next";
import { LoveStoryExperience } from "@/components/story/LoveStoryExperience";

export const metadata: Metadata = {
  title: "Our Story | Obinasom",
  description:
    "Obinna + Munachisom. A story told in four voices. #Obinasom",
};

export default function StoryPage() {
  return <LoveStoryExperience />;
}
