import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/site/container";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_center,var(--primary)_0%,transparent_55%)]"
      />
      <Container className="relative py-24 text-center sm:py-32">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Built by gamers, for gamers
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          See you at the Guild.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Pick a branch, pick a time, and we'll have the station warmed up.
          Walk-ins welcome, but bookings beat the queue.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/locations"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition hover:opacity-90"
          >
            Book a station
            <ChevronRight className="size-4" />
          </Link>
          <Link
            href="/birthdays"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card/60 px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground transition hover:border-primary/50"
          >
            Plan a private event
          </Link>
        </div>
      </Container>
    </section>
  );
}
