import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/site/container";
import { locations } from "@/lib/locations";

export function LocationsGrid() {
  return (
    <section id="locations" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Pick your branch
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Three locations across Hyderabad
            </h2>
          </div>
          <Link
            href="/locations"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            All locations
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-7 transition-all hover:border-primary/60 hover:shadow-[0_0_40px_-12px_var(--primary)]"
            >
              {loc.flagship && (
                <span className="absolute right-5 top-5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-display text-[0.6rem] font-bold uppercase tracking-[0.25em] text-accent">
                  Flagship
                </span>
              )}

              <p className="font-display text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Gamers Guild
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold tracking-tight">
                {loc.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{loc.area}</p>

              <p className="mt-5 text-sm leading-relaxed text-foreground/90">
                {loc.tagline}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {loc.devices.map((d) => (
                  <li
                    key={d}
                    className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-display text-[0.65rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
                  >
                    {deviceLabel(d)}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center justify-between border-t border-border pt-5 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="size-3.5" />
                  {loc.phoneDisplay}
                </span>
                <span className="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary transition group-hover:gap-2">
                  Visit
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function deviceLabel(d: string) {
  switch (d) {
    case "pc":
      return "PC";
    case "ps5":
      return "PS5";
    case "racing-sim":
      return "Racing Sim";
    case "vr":
      return "VR";
    case "switch":
      return "Switch";
    default:
      return d;
  }
}
