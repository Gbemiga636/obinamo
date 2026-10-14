import type { Metadata } from "next";
import { ThingsAndFaqsExperience } from "@/components/faqs/ThingsAndFaqsExperience";

export const metadata: Metadata = {
  title: "Things to Do & FAQs | Obinasom",
  description:
    "Atlanta favourites to explore and answers to your questions about the wedding of Princess Munachi-Obinna & Victor Obinna Chibuzo.",
};

export default function FaqsPage() {
  return <ThingsAndFaqsExperience />;
}
