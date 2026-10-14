import type { Metadata } from "next";
import { RsvpExperience } from "@/components/rsvp/RsvpExperience";

export const metadata: Metadata = {
  title: "RSVP | Obinasom",
  description:
    "RSVP for the wedding of Princess Munachi-Obinna & Victor Obinna Chibuzo on Friday, November 20, 2026.",
};

export default function RsvpPage() {
  return <RsvpExperience />;
}
