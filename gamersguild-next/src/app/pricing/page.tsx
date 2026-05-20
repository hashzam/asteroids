import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle, Phone, Shield } from "lucide-react";
import { Container } from "@/components/site/container";
import { PriceCard } from "@/components/pricing/price-card";
import { locations } from "@/lib/locations";
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

      {/* Booking lines */}
      <section className="border-t border-border py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Booking lines
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Call the branch. Skip the queue.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every branch has its own booking line. Phone is fastest, WhatsApp
              works too. Tell us the time, the squad, the game.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {locations.map((loc) => (
              <div
                key={loc.slug}
                className="rounded-xl border border-border bg-card/60 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {loc.name}
                  </h3>
                  {loc.flagship && (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.25em] text-accent">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{loc.area}</p>

                <div className="mt-5 space-y-2">
                  <a
                    href={`tel:${loc.phone}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-background/60 px-3 py-3 transition hover:border-primary/50"
                  >
                    <span className="flex items-center gap-2.5">
                      <Phone className="size-4 text-primary" />
                      <span className="font-display text-sm font-bold tracking-tight">
                        {loc.phoneDisplay}
                      </span>
                    </span>
                    <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Call
                    </span>
                  </a>
                  <a
                    href={`https://wa.me/${loc.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-background/60 px-3 py-3 transition hover:border-accent/60"
                  >
                    <span className="flex items-center gap-2.5">
                      <MessageCircle className="size-4 text-accent" />
                      <span className="font-display text-sm font-bold tracking-tight">
                        WhatsApp
                      </span>
                    </span>
                    <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Chat
                    </span>
                  </a>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">{loc.hours}</p>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="mt-4 inline-flex items-center gap-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary transition hover:gap-1.5"
                >
                  Branch details
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
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
