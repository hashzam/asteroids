import type { Metadata } from "next";
import { ComingTogether } from "@/components/coming-together";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <ComingTogether
      title="Pricing That Rewards Real Gamers"
      blurb="Pay as you go, or lock in the bulk packs for serious savings. The full tiered breakdown is being built next."
    />
  );
}
