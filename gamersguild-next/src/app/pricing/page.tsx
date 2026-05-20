import type { Metadata } from "next";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Hourly rates, day packs, power packs and hardcore packs. Plus PS5, racing sim, VR and Switch pricing at Banjara Hills.",
};

export default function PricingPage() {
  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Pricing
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Full pricing page builds out next. Data already lives in
        <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          src/lib/pricing.ts
        </code>
        ready to render.
      </p>
    </Container>
  );
}
