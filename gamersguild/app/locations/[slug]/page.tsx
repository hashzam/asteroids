import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Clock,
  Cpu,
  Gamepad,
  ImageIcon,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { BookingForm } from "@/components/booking/booking-form";
import { COMMON_SPECS, getLocation, LOCATIONS } from "@/lib/locations";
import { GAME_LIBRARY } from "@/lib/games";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return LOCATIONS.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return {
    title: location.shortName,
    description: `${location.name}, ${location.address}. ${location.tagline}`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const stats = [
    { value: `${location.pcCount}`, label: "Gaming PCs" },
    { value: `${formatINR(location.hourlyPC)}/hr`, label: "PC from" },
    { value: `${location.devices.length}`, label: "Device types" },
  ];

  return (
    <>
      <PageHero
        eyebrow={location.area}
        title={location.name}
        description={location.tagline}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="#book">Book a Session</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`tel:${location.phoneTel}`}>Call {location.phoneDisplay}</a>
          </Button>
        </div>
      </PageHero>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-px px-6 py-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-extrabold tracking-tight text-accent-text sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What you get"
              title="Inside This Arena"
            />
            <ul className="mt-6 space-y-3">
              {location.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-accent-text" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h3 className="font-display text-lg font-extrabold uppercase tracking-tight">
              Standard at every location
            </h3>
            <ul className="mt-4 space-y-3">
              {COMMON_SPECS.map((spec) => (
                <li key={spec} className="flex gap-3 text-sm">
                  <Cpu className="mt-0.5 size-4 shrink-0 text-accent-text" />
                  <span className="text-muted">{spec}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/pricing">
                See full pricing
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Game library"
            title="What's On the Rigs"
            description="A rotating library of the biggest competitive and party titles. Ask the crew to load anything you do not see."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {GAME_LIBRARY.map((game) => (
              <span
                key={game}
                className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs"
              >
                {game}
              </span>
            ))}
            <span className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted">
              and many more
            </span>
          </div>
        </div>
      </section>

      <section id="book" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Reserve a rig"
              title={`Book at ${location.shortName}`}
              description="Send a booking request and our crew calls you back to lock the slot. No online payment needed."
            />
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <span className="text-muted">{location.address}</span>
              </p>
              <p className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <span className="text-muted">{location.hours}</span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <a
                  href={`tel:${location.phoneTel}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {location.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
          <BookingForm location={location} />
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="The space"
            title="Gallery"
            description="Real photos of this location are on the way."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-gradient-to-br from-accent/10 to-background">
                  <ImageIcon className="size-7 text-muted" />
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Photo coming soon
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
                  Visit {location.shortName}
                </h2>
                <p className="mt-4 flex gap-3 text-muted">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent-text" />
                  {location.address}
                </p>
                <p className="mt-2 flex gap-3 text-muted">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent-text" />
                  {location.hours}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={`tel:${location.phoneTel}`}>
                      <Phone className="size-4" />
                      Call
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={`https://wa.me/${location.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background">
                <Gamepad className="size-8 text-muted" />
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Map embed coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
