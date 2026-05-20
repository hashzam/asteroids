import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Three Gamers Guild Hyderabad locations: Banjara Hills (flagship), Madhapur (HITEC City), and Begumpet.",
};

export default function LocationsIndexPage() {
  return (
    <Container className="py-24">
      <h1 className="font-display text-4xl font-bold tracking-tight">
        Locations
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Three branches across Hyderabad. Pick one for full details.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <li key={loc.slug}>
            <Link
              href={`/locations/${loc.slug}`}
              className="block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {loc.flagship ? "Flagship" : "Branch"}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                {loc.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{loc.tagline}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
