import type { Metadata } from "next";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Tournaments",
  description:
    "Weekly LANs and tournaments at Gamers Guild Hyderabad. Valorant, BGMI, CS2, FC, Tekken.",
};

export default function LansPage() {
  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Tournaments
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Tournament listings and registration build in a later pass.
      </p>
    </Container>
  );
}
