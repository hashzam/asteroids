import type { Metadata } from "next";
import { ComingTogether } from "@/components/coming-together";
import { getLocation } from "@/lib/locations";

const location = getLocation("madhapur")!;

export const metadata: Metadata = {
  title: location.shortName,
};

export default function MadhapurPage() {
  return (
    <ComingTogether
      eyebrow={location.area}
      title={location.name}
      blurb={location.tagline}
    />
  );
}
