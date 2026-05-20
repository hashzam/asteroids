import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Cpu,
  Monitor,
  Keyboard,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/site/container";
import { LocationGameLibrary } from "@/components/locations/game-library";
import { locations, getLocation, type Location } from "@/lib/locations";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug as Location["slug"]);
  if (!loc) return {};
  return {
    title: `${loc.name} — ${loc.area}`,
    description: loc.tagline,
  };
}

const deviceLabels: Record<string, string> = {
  pc: "PC",
  ps5: "PS5",
  "racing-sim": "Racing Sim",
  vr: "VR",
  switch: "Switch",
};

export default async function LocationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const loc = getLocation(slug as Location["slug"]);
  if (!loc) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.18] [background-image:radial-gradient(circle_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(circle_at_bottom_right,var(--accent)_0%,transparent_50%)]"
        />
        <Container className="py-20 sm:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {loc.flagship ? "Flagship · " : ""}
            {loc.area}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
            Gamers Guild {loc.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            {loc.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`tel:${loc.phone}`}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition hover:opacity-90"
            >
              <Phone className="size-4" />
              Call {loc.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${loc.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent transition hover:bg-accent/20"
            >
              <MessageCircle className="size-4" />
              WhatsApp to book
            </a>
            <a
              href={loc.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card/60 px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground transition hover:border-primary/50"
            >
              <MapPin className="size-4" />
              Get directions
            </a>
          </div>
        </Container>
      </section>

      {/* Quick facts */}
      <section className="border-b border-border bg-card/30">
        <Container className="grid gap-px overflow-hidden py-0 sm:grid-cols-3">
          <Fact icon={<Clock className="size-4" />} label="Hours" value={loc.hours} />
          <Fact
            icon={<MapPin className="size-4" />}
            label="Address"
            value={loc.address}
          />
          <Fact
            icon={<Phone className="size-4" />}
            label="Book by phone"
            value={loc.phoneDisplay}
            href={`tel:${loc.phone}`}
          />
        </Container>
      </section>

      {/* Highlights */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
                What's on the floor
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {loc.tagline}
              </h2>
              <ul className="mt-8 flex flex-wrap gap-2">
                {loc.devices.map((d) => (
                  <li
                    key={d}
                    className="rounded-md border border-border bg-background/60 px-3 py-1.5 font-display text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {deviceLabels[d] ?? d}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {loc.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-md border border-border bg-card/60 px-4 py-3 text-sm"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Hardware */}
      <section className="border-y border-border bg-card/30 py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Hardware
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built for the players who notice the frames
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <SpecCard
              icon={<Cpu className="size-5" />}
              label="GPU"
              value={loc.pcSpecs.gpu}
            />
            <SpecCard
              icon={<Monitor className="size-5" />}
              label="Monitors"
              value={loc.pcSpecs.monitor}
            />
            <SpecCard
              icon={<Keyboard className="size-5" />}
              label="Peripherals"
              value={loc.pcSpecs.peripherals}
            />
          </div>
        </Container>
      </section>

      {/* Game library (per-location, filtered to this branch's platforms) */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Game library
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Pre-installed and signed in
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every account, every launcher, every patch already done. Sit
                down and queue up.
              </p>
            </div>
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Full library
              <ChevronRight className="size-4" />
            </Link>
          </div>
          <LocationGameLibrary devices={loc.devices} />
        </Container>
      </section>

      {/* Map */}
      <section className="border-t border-border bg-card/30 py-20 sm:py-24">
        <Container>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Find us
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {loc.area}, Hyderabad
          </h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
            <iframe
              title={`Map of Gamers Guild ${loc.name}`}
              src={loc.mapsEmbedUrl}
              className="block aspect-[16/9] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      {/* Booking CTA */}
      <section id="book" className="border-t border-border py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Book a station
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Skip the queue. Call the branch.
            </h2>
            <p className="mt-4 max-w-prose text-muted-foreground">
              Booking is fastest over phone or WhatsApp. Tell us the time, the
              squad size, and the game — we'll keep the stations ready.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-card p-6">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {loc.name} booking line
            </p>
            <a
              href={`tel:${loc.phone}`}
              className="flex items-center justify-between gap-4 rounded-md border border-border bg-background/60 px-4 py-4 transition hover:border-primary/50"
            >
              <span className="flex items-center gap-3">
                <Phone className="size-5 text-primary" />
                <span className="font-display text-lg font-bold tracking-tight">
                  {loc.phoneDisplay}
                </span>
              </span>
              <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Call
              </span>
            </a>
            <a
              href={`https://wa.me/${loc.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-md border border-border bg-background/60 px-4 py-4 transition hover:border-accent/60"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="size-5 text-accent" />
                <span className="font-display text-lg font-bold tracking-tight">
                  WhatsApp
                </span>
              </span>
              <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Chat
              </span>
            </a>
            <p className="pt-1 text-xs text-muted-foreground">
              {loc.hours}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

function Fact({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="bg-background/60 px-6 py-6">
      <p className="flex items-center gap-2 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
  if (href)
    return (
      <a href={href} className="block transition hover:bg-card">
        {inner}
      </a>
    );
  return inner;
}

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-6">
      <div className="grid size-10 place-items-center rounded-md border border-border bg-card text-primary">
        {icon}
      </div>
      <p className="mt-5 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 font-medium">{value}</p>
    </div>
  );
}
