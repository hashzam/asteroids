import { Armchair, Cpu, Monitor, Mouse, Wifi } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

const HARDWARE = [
  {
    icon: Monitor,
    title: "240Hz Monitors",
    text: "Every rig, every location. Buttery motion clarity for competitive play.",
  },
  {
    icon: Cpu,
    title: "RTX Graphics",
    text: "NVIDIA RTX GPUs across the floor. Max settings are the default here.",
  },
  {
    icon: Mouse,
    title: "Logitech and HyperX Gear",
    text: "Pro-grade keyboards, mice and headsets you can actually trust.",
  },
  {
    icon: Armchair,
    title: "Cybeart Chairs",
    text: "Built for marathon sessions. Comfort that outlasts a 100 hour pack.",
  },
  {
    icon: Wifi,
    title: "Fast WiFi, Low Ping",
    text: "Rock-solid connections so lag never costs you the round.",
  },
];

export function HardwareShowcase() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="The hardware"
          title="Engineered to Win"
          description="No weak links. The same elite spec runs at all three locations."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HARDWARE.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
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
          <Reveal delay={HARDWARE.length * 0.06} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-xl border border-accent bg-accent/10 p-6">
              <p className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight">
                Elite.
                <br />
                Engineered.
                <br />
                <span className="text-accent-text">Zero Compromise.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
