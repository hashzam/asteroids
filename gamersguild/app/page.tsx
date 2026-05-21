import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { LOCATIONS, TOTAL_SETUPS } from "@/lib/locations";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            {SITE.tagline}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl">
            Elite. Engineered.
            <br />
            <span className="text-accent-text">Zero Compromise.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Placeholder hero copy. The full home page, with a vertical video
            loop, live stat counters and location cards, is the next build
            step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#locations">Find Your Arena</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="locations"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-6 pb-24"
      >
        <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
          {LOCATIONS.length} Locations, {TOTAL_SETUPS} Setups
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight">
                  {loc.shortName}
                </h3>
                {loc.isFlagship && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent-text">
                    Flagship
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{loc.area}</p>
              <p className="mt-4 font-mono text-sm">
                {loc.pcCount} PCs &middot; from ₹{loc.hourlyPC}/hr
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
