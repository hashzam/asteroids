import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/site/container";

type Tier = {
  name: string;
  pitch: string;
  price: string;
  unit: string;
  perks: string[];
  badge?: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Hourly",
    pitch: "Walk in, grab a station, get out.",
    price: "₹175",
    unit: "/hour",
    perks: [
      "From ₹175 at Madhapur and Begumpet",
      "₹200 at Banjara Hills",
      "No commitment, ever",
    ],
  },
  {
    name: "27 hour pack",
    pitch: "Sweet-spot value for regular drop-ins.",
    price: "₹2,000",
    unit: "for 27 hours",
    perks: [
      "Roughly ₹74 per hour",
      "Use across multiple visits",
      "Valid at all three branches",
    ],
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "100 hour pack",
    pitch: "For the people who basically live here.",
    price: "₹6,500",
    unit: "for 100 hours",
    perks: [
      "63% off hourly",
      "Best per-hour rate in the city",
      "7-day refund on unused hours",
    ],
    badge: "Best value",
  },
];

export function PricingTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Pricing
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Pay as you go, or pack in the hours
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three of the most popular options. Full lineup including 3, 5, 8,
              10 and 50 hour packs, plus PS5, racing sim and VR pricing, lives
              on the pricing page.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See full pricing
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-xl border p-7 ${
                t.highlight
                  ? "border-primary/60 bg-card shadow-[0_0_40px_-12px_var(--primary)]"
                  : "border-border bg-card/60"
              }`}
            >
              {t.badge && (
                <span
                  className={`absolute -top-3 left-7 rounded-full border px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.25em] ${
                    t.highlight
                      ? "border-primary/40 bg-primary text-primary-foreground"
                      : "border-accent/40 bg-accent/10 text-accent"
                  }`}
                >
                  {t.badge}
                </span>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight">
                {t.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.pitch}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight">
                  {t.price}
                </span>
                <span className="text-sm text-muted-foreground">{t.unit}</span>
              </div>

              <ul className="mt-6 space-y-2.5 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
