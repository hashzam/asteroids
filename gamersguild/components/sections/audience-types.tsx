import Link from "next/link";
import { Cake, Gamepad2, Sparkles, Trophy, Users } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const AUDIENCES = [
  {
    icon: Gamepad2,
    title: "New to PC Gaming",
    text: "Never touched a gaming PC? Our crew gets you set up and shows you the ropes.",
    href: null,
  },
  {
    icon: Trophy,
    title: "Esports Competitors",
    text: "240Hz, low ping and tournament-grade rigs built for the daily grind.",
    href: "/tournaments",
  },
  {
    icon: Users,
    title: "Squads and Crews",
    text: "Rally the team. Bulk hour packs make long sessions seriously cheap.",
    href: "/pricing",
  },
  {
    icon: Cake,
    title: "Birthday Crews",
    text: "Book out half the floor at Banjara Hills for a private celebration.",
    href: "/birthdays",
  },
  {
    icon: Sparkles,
    title: "Experience Seekers",
    text: "Racing sims, VR and Nintendo Switch at our Banjara Hills flagship.",
    href: "/locations/banjara-hills",
  },
];

export function AudienceTypes() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Who plays here"
          title="A Seat for Every Kind of Gamer"
          description="First-timer or seasoned competitor, there is a reason to walk in."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((item, index) => {
            const card = (
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
                <span className="grid size-11 place-items-center rounded-md bg-accent/10 text-accent-text">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.text}</p>
              </div>
            );
            return (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                {item.href ? (
                  <Link href={item.href} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
