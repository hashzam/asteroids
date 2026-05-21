import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { PhoneMockup, ReelPlaceholder } from "@/components/phone-mockup";
import { SOCIALS } from "@/lib/site";

const REEL_SLOTS = [
  "Reel slot one\nembed coming soon",
  "Reel slot two\nembed coming soon",
  "Reel slot three\nembed coming soon",
];

export function Reels() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="On the feed"
            title="Straight from the Floor"
            description="The latest reels from @gamersguildhyd. Real sessions, real squads."
          />
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-accent-text hover:underline"
          >
            Follow on Instagram
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="mt-10 grid justify-items-center gap-6 sm:grid-cols-3">
          {REEL_SLOTS.map((label, index) => (
            <Reveal key={label} delay={index * 0.08}>
              <PhoneMockup>
                <ReelPlaceholder label={label} />
              </PhoneMockup>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
