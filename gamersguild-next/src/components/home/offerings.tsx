import type { ComponentType, SVGProps } from "react";
import { Monitor, Gamepad2, Car, Glasses, Joystick, Cake } from "lucide-react";
import { Container } from "@/components/site/container";

type Offering = {
  title: string;
  desc: string;
  available: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const offerings: Offering[] = [
  {
    title: "PC stations",
    desc: "RTX rigs on 240Hz panels. Steam, Battle.net, Riot, Epic, Origin signed in and ready.",
    available: "All three branches",
    icon: Monitor,
  },
  {
    title: "PS5 lounge",
    desc: "Couch co-op, fighting games, single-player binges on a 4K big screen.",
    available: "All three branches",
    icon: Gamepad2,
  },
  {
    title: "Racing simulator",
    desc: "Simagic Alpha Mini F1, direct drive wheel, triple monitor. As close to a real cockpit as it gets in the city.",
    available: "Banjara Hills",
    icon: Car,
  },
  {
    title: "VR zone",
    desc: "Meta Quest 3. Beat Saber, sword fights, escape rooms. Best with an audience.",
    available: "Banjara Hills",
    icon: Glasses,
  },
  {
    title: "Nintendo Switch",
    desc: "Mario Kart, Smash, Zelda. Bring four friends, lose three of them.",
    available: "Banjara Hills",
    icon: Joystick,
  },
  {
    title: "Birthdays & private events",
    desc: "Custom packages, half-cafe buyouts, optional cake and pizza. Built for a hosted experience.",
    available: "Banjara Hills",
    icon: Cake,
  },
];

export function Offerings() {
  return (
    <section className="border-t border-border bg-card/30 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            What's on offer
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Six ways to play under one roof
          </h2>
          <p className="mt-4 text-muted-foreground">
            Most spots in Hyderabad give you a PC and call it a day. We run
            sim cockpits, VR, console lounges, and a venue that fits a full
            birthday party.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o) => {
            const Icon = o.icon;
            return (
              <div
                key={o.title}
                className="relative rounded-xl border border-border bg-background/60 p-6 transition-colors hover:border-primary/50"
              >
                <div className="grid size-11 place-items-center rounded-md border border-border bg-card text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {o.desc}
                </p>
                <p className="mt-4 font-display text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">
                  {o.available}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
