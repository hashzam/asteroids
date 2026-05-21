import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { LOCATIONS } from "@/lib/locations";
import { formatINR } from "@/lib/utils";

export function LocationCards() {
  return (
    <section id="locations" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Three arenas"
          title="Find Your Arena"
          description="Three locations across Hyderabad, each tuned for a different kind of session."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {LOCATIONS.map((loc, index) => (
            <Reveal key={loc.slug} delay={index * 0.08} className="h-full">
              <Link
                href={`/locations/${loc.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">
                    {loc.shortName}
                  </h3>
                  {loc.isFlagship && (
                    <span className="rounded-md bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{loc.area}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {loc.devices.map((device) => (
                    <span
                      key={device}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {device}
                    </span>
                  ))}
                </div>

                <ul className="mt-5 space-y-2 text-sm">
                  {loc.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-text" />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <p className="font-mono text-sm">
                    from{" "}
                    <span className="font-display text-lg font-extrabold text-foreground">
                      {formatINR(loc.hourlyPC)}
                    </span>
                    /hr
                  </p>
                  <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent-text">
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
