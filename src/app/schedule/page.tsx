import type { Metadata } from "next";
import { ScheduleExperience } from "@/components/schedule/ScheduleExperience";

export const metadata: Metadata = {
  title: "Schedule | Obinasom",
  description:
    "The Iba Nkwu ceremony, cocktail hour and reception for Princess Munachi-Obinna & Victor Obinna Chibuzo at The Pavilion Event Hub, Norcross, GA.",
};

export default function SchedulePage() {
  return <ScheduleExperience />;
}
