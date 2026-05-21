import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TournamentCta() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-accent/20 blur-[100px]"
          />
          <div className="relative max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
              Tournaments and LANs
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-5xl">
              Compete Every Week
            </h2>
            <p className="mt-4 text-muted">
              Weekly tournaments and LAN nights across all three locations.
              Bring your crew, climb the bracket and play for the win.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/tournaments">See the Schedule</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#locations">Book a Practice Session</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
