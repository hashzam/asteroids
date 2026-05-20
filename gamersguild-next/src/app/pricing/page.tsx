import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield } from "lucide-react";
import { Container } from "@/components/site/container";
import { PriceCard } from "@/components/pricing/price-card";
import {
  consolePricing,
  pcPricing,
  policies,
  specialtyPricing,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Hourly rates, day packs, power packs and hardcore packs. Plus PS5, racing sim, VR and Switch pricing at Banjara Hills.",
};

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border bg-card/40">
        <Container className="py-20 sm:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Pricing
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Pay by the hour. Or pack in the hours.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Hourly rates start at ₹175 at Madhapur and Begumpet, ₹200 at
            Banjara Hills. Pack hours save up to 63%. Specialty rigs (sim, VR,
            Switch) are Banjara only. All prices include taxes.
          </p>
        </Container>
      </section>

      {/* PC Pricing */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              PC stations
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              From a single hour to one hundred
            </h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {pcPricing.map((group) => (
              <PriceCard key={group.id} group={group} />
            ))}
          </div>
        </Container>
      </section>

      {/* Console */}
      <section className="border-t border-border bg-card/30 py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Console
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              PlayStation 5 lounge
            </h2>
            <p className="mt-4 text-muted-foreground">
              Hourly only. Available at all three branches. Bring up to four
              controllers and start a riot.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <PriceCard group={consolePricing} />
          </div>
        </Container>
      </section>

      {/* Specialty */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Banjara Hills only
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Racing sim, VR and Switch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Specialty rigs live at the flagship. Off-peak racing sim slots
              (weekday mornings) are the steal of the city.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {specialtyPricing.map((group) => (
              <PriceCard key={group.id} group={group} />
            ))}
          </div>
        </Container>
      </section>

      {/* Policy + CTA */}
      <section className="border-t border-border bg-card/30 py-16">
        <Container className="grid gap-8 sm:grid-cols-2 sm:items-center">
          <div className="flex items-start gap-4">
            <div className="grid size-10 shrink-0 place-items-center rounded-md border border-accent/30 bg-accent/10 text-accent">
              <Shield className="size-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold tracking-tight">
                Fair refund policy
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {policies.refund} No questions, just bring your booking
                reference.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/locations"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition hover:opacity-90"
            >
              Book a station
              <ChevronRight className="size-4" />
            </Link>
            <Link
              href="/birthdays"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground transition hover:border-primary/50"
            >
              Private event quote
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
