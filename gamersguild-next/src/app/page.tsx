import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { LocationsGrid } from "@/components/home/locations-grid";
import { Offerings } from "@/components/home/offerings";
import { PricingTeaser } from "@/components/home/pricing-teaser";
import { ClosingCta } from "@/components/home/closing-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <LocationsGrid />
      <Offerings />
      <PricingTeaser />
      <ClosingCta />
    </>
  );
}
