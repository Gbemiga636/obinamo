import type { Metadata } from "next";
import { TravelExperience } from "@/components/travel/TravelExperience";

export const metadata: Metadata = {
  title: "Travel & Stay | Obinasom",
  description:
    "Book your stay at the Crowne Plaza Norcross for the wedding of Princess Munachi-Obinna & Victor Obinna Chibuzo.",
};

export default function TravelPage() {
  return <TravelExperience />;
}
