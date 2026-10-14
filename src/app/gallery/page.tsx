import type { Metadata } from "next";
import { GalleryReels } from "@/components/gallery/GalleryReels";

export const metadata: Metadata = {
  title: "Gallery | Obinasom",
  description: "Moments of Princess & Victor — swipe through our story. #Obinasom",
};

export default function GalleryPage() {
  return <GalleryReels />;
}
