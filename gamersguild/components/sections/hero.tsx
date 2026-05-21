import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PhoneMockup, ReelPlaceholder } from "@/components/phone-mockup";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-40 size-[520px] rounded-full bg-accent/15 blur-[130px]"
      />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
            {SITE.tagline}
          </p>
          <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-tight text-balance sm:text-7xl">
            Where Hyderabad <span className="text-accent-text">Competes</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Premium 240Hz rigs, PS5, racing sims and VR. Built by gamers, for
            gamers since {SITE.since}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="#locations">Find Your Arena</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PhoneMockup>
            <ReelPlaceholder label={"Vertical reel\ncoming soon"} />
          </PhoneMockup>
        </div>
      </div>
    </section>
  );
}
