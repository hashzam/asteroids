import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarCheck,
  Gamepad2,
  ImageIcon,
  Lock,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { EventInquiryForm } from "@/components/booking/event-inquiry-form";
import { getLocation } from "@/lib/locations";

const banjara = getLocation("banjara-hills")!;

export const metadata: Metadata = {
  title: "Private Events and Birthdays",
  description:
    "Reserve up to half the Gamers Guild Banjara Hills floor for a private gaming event. Custom quotes for birthdays, squad nights and team celebrations.",
};

const INCLUDED = [
  {
    icon: Lock,
    title: "Half the Cafe, Yours",
    text: "Reserve up to half the Banjara Hills floor exclusively for your group.",
  },
  {
    icon: Gamepad2,
    title: "Every Device Unlocked",
    text: "Gaming PCs, PS5, the F1 racing sim, VR and Nintendo Switch, all in play.",
  },
  {
    icon: Users,
    title: "A Dedicated Crew",
    text: "Our game masters run the session so your only job is to play.",
  },
  {
    icon: CalendarCheck,
    title: "Your Hours, Your Way",
    text: "Daytime or late night, we shape the session around your plan.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Tell Us Your Plan",
    text: "Share your date, crew size and what you want to play.",
  },
  {
    step: "02",
    title: "Get a Custom Quote",
    text: "No fixed packages. You pay for exactly what your crew needs.",
  },
  {
    step: "03",
    title: "We Lock the Floor",
    text: "Up to half the cafe reserved and ready for your group.",
  },
  {
    step: "04",
    title: "Show Up and Play",
    text: "Walk in, gear up and make it a night to remember.",
  },
];

export default function BirthdaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Private events, Banjara Hills"
        title="Book Out the Arena"
        description="Reserve up to half our flagship floor for your crew. Every device we run, locked in for your night. Built for birthdays, squad nights and team celebrations."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="#inquire">Plan Your Event</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`tel:${banjara.phoneTel}`}>
              Call {banjara.phoneDisplay}
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="What you get"
            title="A Private Event for Your Crew"
            description="Not a packaged party. A flagship gaming floor handed over to your group for the night."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6">
                  <span className="grid size-11 place-items-center rounded-md bg-accent/10 text-accent-text">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="How it works"
            title="From Idea to Game Night"
            description="No rigid packages and no fixed price. Every event is quoted around your crew."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
                  <span className="font-display text-3xl font-extrabold text-accent-text">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-extrabold uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="inquire" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Start planning"
              title="Send an Event Inquiry"
              description="Drop your details and our Banjara Hills team will call back with a custom quote."
            />
            <div className="mt-6 space-y-3 text-sm">
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <a
                  href={`tel:${banjara.phoneTel}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {banjara.phoneDisplay}
                </a>
              </p>
              <p className="flex gap-3">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <a
                  href={`https://wa.me/${banjara.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Message us on WhatsApp
                </a>
              </p>
            </div>
          </div>
          <EventInquiryForm />
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Past events"
            title="Gallery"
            description="Photos from recent private events are on the way."
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
          <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
              Got a Date in Mind?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Call the Banjara Hills team and we will build a private event
              around your crew.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <a href={`tel:${banjara.phoneTel}`}>
                  <Phone className="size-4" />
                  Call {banjara.phoneDisplay}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#inquire">Send an Inquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
