import type { Metadata } from "next";
import { StayTunedPage } from "@/components/layout/StayTunedPage";

export const metadata: Metadata = {
  title: "Save The Date | Obinasom",
  description: "Stay tuned — this page is coming soon.",
};

export default function SaveTheDatePage() {
  return <StayTunedPage title="Save The Date" />;
}
