import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { LocationCards } from "@/components/sections/location-cards";
import { HardwareShowcase } from "@/components/sections/hardware-showcase";
import { AudienceTypes } from "@/components/sections/audience-types";
import { TournamentCta } from "@/components/sections/tournament-cta";
import { Reels } from "@/components/sections/reels";
import { Faq } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <LocationCards />
      <HardwareShowcase />
      <AudienceTypes />
      <TournamentCta />
      <Reels />
      <Faq />
    </>
  );
}
