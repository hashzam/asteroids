import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { locations, getLocation } from "@/lib/locations";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug as never);
  if (!loc) return {};
  return {
    title: loc.name,
    description: loc.tagline,
  };
}

export default async function LocationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const loc = getLocation(slug as never);
  if (!loc) notFound();

  return (
    <Container className="py-24">
      <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
        {loc.flagship ? "Flagship · " : ""}
        {loc.area}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Gamers Guild {loc.name}
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">{loc.tagline}</p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {loc.highlights.map((h) => (
          <li
            key={h}
            className="rounded-md border border-border bg-card px-4 py-3 text-sm"
          >
            {h}
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted-foreground">
        Full location page (hero, specs, game library, booking form, gallery)
        builds next.
      </p>
    </Container>
  );
}
