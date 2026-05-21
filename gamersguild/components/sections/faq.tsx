import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const FAQS = [
  {
    q: "Do I need to book ahead, or can I walk in?",
    a: "Walk-ins are always welcome. For peak hours, weekends and group sessions we recommend booking ahead so your rigs are reserved and ready.",
  },
  {
    q: "How do the hour packs work?",
    a: "Buy a bulk pack and use the hours whenever you like. The bigger the pack, the lower the effective rate, up to 63 percent off hourly with the 100 hour pack.",
  },
  {
    q: "Can I get a refund on a pack?",
    a: "Yes. Unused packs are refundable within 7 days of purchase.",
  },
  {
    q: "What hardware do you run?",
    a: "240Hz monitors, RTX graphics, Logitech and HyperX peripherals and Cybeart chairs at every location, backed by fast WiFi and low ping.",
  },
  {
    q: "Do you have racing sims and VR?",
    a: "Our Banjara Hills flagship has a Simagic Alpha Mini F1 racing sim on triple monitors, a Meta Quest 3 VR zone and a Nintendo Switch zone.",
  },
  {
    q: "Can I host a birthday or private event?",
    a: "Yes, at Banjara Hills. You can reserve up to half the cafe for your crew. Call us and we will put together a custom quote.",
  },
];

export function Faq() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-24">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently Asked Questions"
          align="center"
        />
        <div className="mt-10">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-base font-bold uppercase tracking-tight [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="size-5 shrink-0 text-accent-text transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
