"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

interface NumberStat {
  value: number;
  suffix: string;
  label: string;
}

interface TextStat {
  text: string;
  label: string;
}

type Stat = NumberStat | TextStat;

const STATS: Stat[] = [
  { value: 10000, suffix: "+", label: "Gamers served" },
  { value: 90, suffix: "", label: "Gaming setups" },
  { value: 3, suffix: "", label: "Locations in Hyderabad" },
  { text: "Since 2018", label: "Powering Hyderabad gaming" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;

    if (reduceMotion) {
      node.textContent = value.toLocaleString("en-IN") + suffix;
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en-IN") + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, motionValue, reduceMotion]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px overflow-hidden px-6 py-16 sm:py-20 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-2 text-center">
            <p className="font-display text-4xl font-extrabold tracking-tight text-accent-text sm:text-5xl">
              {"value" in stat ? (
                <Counter value={stat.value} suffix={stat.suffix} />
              ) : (
                stat.text
              )}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
