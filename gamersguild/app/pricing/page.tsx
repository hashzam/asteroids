import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PackCard } from "@/components/pricing/pack-card";
import {
  HOURLY_RATES,
  PC_PACKS,
  REFUND_POLICY,
  SPECIALTY_RATES,
} from "@/lib/pricing";
import { formatINR } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Hourly rates and bulk hour packs for Gamers Guild Hyderabad. Pay as you go, or drop your rate to as low as approx 65 rupees per hour.",
};

const PACK_GROUPS = [
  {
    id: "day" as const,
    label: "Day Packs",
    blurb: "Pay once, play right through the day.",
  },
  {
    id: "power" as const,
    label: "Power Packs",
    blurb: "For the regulars who keep coming back.",
  },
  {
    id: "hardcore" as const,
    label: "Hardcore Packs",
    blurb: "Maximum hours, minimum rate. The serious value.",
  },
];

function HourlyCard({
  icon: Icon,
  title,
  rates,
}: {
  icon: typeof Cpu;
  title: string;
  rates: { label: string; price: number }[];
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
      <span className="grid size-11 place-items-center rounded-md bg-accent/10 text-accent-text">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-display text-xl font-extrabold uppercase tracking-tight">
        {title}
      </h3>
      <dl className="mt-4 space-y-2.5">
        {rates.map((rate) => (
          <div
            key={rate.label}
            className="flex items-baseline justify-between gap-4 border-t border-border pt-2.5 text-sm"
          >
            <dt className="text-muted">{rate.label}</dt>
            <dd className="font-mono">
              <span className="font-display text-lg font-extrabold">
                {formatINR(rate.price)}
              </span>
              /hr
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pay Less The More You Play"
        description="Walk in and pay by the hour, or lock in a bulk pack and drop your rate to as low as approx 65 rupees per hour."
      >
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {REFUND_POLICY}
        </p>
      </PageHero>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Pay as you go"
            title="Hourly Rates"
            description="No commitment. Walk in, grab a rig and play."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Reveal className="h-full">
              <HourlyCard
                icon={Cpu}
                title="Gaming PC"
                rates={[
                  {
                    label: "Madhapur and Begumpet",
                    price: HOURLY_RATES.pc.madhapurBegumpet,
                  },
                  {
                    label: "Banjara Hills",
                    price: HOURLY_RATES.pc.banjara,
                  },
                ]}
              />
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <HourlyCard
                icon={Gamepad}
                title="PlayStation 5"
                rates={[
                  {
                    label: "Madhapur and Begumpet",
                    price: HOURLY_RATES.ps5.madhapurBegumpet,
                  },
                  {
                    label: "Banjara Hills",
                    price: HOURLY_RATES.ps5.banjara,
                  },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="PC hour packs"
            title="Buy Hours, Bank The Savings"
            description="Every pack is a block of PC hours. Use them whenever you like. The bigger the pack, the lower your effective rate."
          />
          <div className="mt-10 space-y-12">
            {PACK_GROUPS.map((group) => {
              const packs = PC_PACKS.filter((p) => p.group === group.id);
              return (
                <div key={group.id}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                      {group.label}
                    </h3>
                    <p className="text-sm text-muted">{group.blurb}</p>
                  </div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {packs.map((pack, index) => (
                      <Reveal
                        key={pack.id}
                        delay={index * 0.06}
                        className="h-full"
                      >
                        <PackCard pack={pack} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Banjara Hills exclusive"
            title="Specialty Zones"
            description="Racing sims, VR and Nintendo Switch live only at our Banjara Hills flagship."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {SPECIALTY_RATES.map((rate, index) => (
              <Reveal key={rate.id} delay={index * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent-text">
                    {rate.location}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight">
                    {rate.name}
                  </h3>
                  <dl className="mt-4 space-y-2.5">
                    {rate.tiers.map((tier) => (
                      <div
                        key={tier.label}
                        className="flex items-baseline justify-between gap-4 border-t border-border pt-2.5 text-sm"
                      >
                        <dt className="text-muted">{tier.label}</dt>
                        <dd className="font-display text-lg font-extrabold">
                          {formatINR(tier.price)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {rate.note && (
                    <p className="mt-4 text-xs text-muted">{rate.note}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
              Ready to Lock In Your Hours?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Reserve a rig at any location, or call ahead and our crew will set
              you up with the right pack.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/#locations">Book a Session</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/locations/banjara-hills">Explore Banjara Hills</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
