import type { Metadata } from "next";
import { StayTunedPage } from "@/components/layout/StayTunedPage";

export const metadata: Metadata = {
  title: "The Day | Obinasom",
  description: "Stay tuned — celebration details coming soon.",
};

/**
 * Merged page (Celebration, Story, Venue, Dress Code, Save & Share).
 * Coming soon for now — unlock later by replacing StayTuned with the sections.
 */
export default function TheDayPage() {
  return <StayTunedPage title="The Day" />;
}
