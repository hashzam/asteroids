import type { Metadata } from "next";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Birthdays",
  description:
    "Private event hosting at Gamers Guild Banjara Hills. Custom packages, half-cafe buyouts, call for a quote.",
};

export default function BirthdaysPage() {
  return (
    <Container className="py-24">
      <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
        Banjara Hills exclusive
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
        Birthdays at the Guild
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Private event page builds last in the plan. Inquiry form and gallery
        slots are wired into the scaffold.
      </p>
    </Container>
  );
}
