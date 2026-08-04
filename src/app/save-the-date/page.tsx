import type { Metadata } from "next";
import { SaveTheDateExperience } from "@/components/save-the-date/SaveTheDateExperience";

export const metadata: Metadata = {
  title: "Save The Date | Obinasom",
  description:
    "Open a sealed invitation and save the date for Princess Munachi-Obinna & Victor Obinna Chibuzo.",
};

export default function SaveTheDatePage() {
  return <SaveTheDateExperience />;
}
