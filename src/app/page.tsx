import { HeroSection } from "@/components/hero/HeroSection";
import { DetailsSection } from "@/components/hero/DetailsSection";
import { StorySection } from "@/components/experience/StorySection";
import { VenueSection } from "@/components/experience/VenueSection";
import { DressCodeSection } from "@/components/experience/DressCodeSection";
import { ShareActions } from "@/components/experience/ShareActions";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DetailsSection />
      <StorySection />
      <VenueSection />
      <DressCodeSection />
      <ShareActions />
    </>
  );
}
