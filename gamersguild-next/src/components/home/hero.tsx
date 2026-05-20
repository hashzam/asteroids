"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin } from "lucide-react";
import { Container } from "@/components/site/container";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.18] [background-image:radial-gradient(circle_at_top_left,var(--primary)_0%,transparent_45%),radial-gradient(circle_at_bottom_right,var(--accent)_0%,transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <Container className="relative grid min-h-[min(80vh,720px)] place-items-center py-24 sm:py-32">
        <div className="max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-[0.7rem] font-bold uppercase tracking-[0.45em] text-accent"
          >
            Hyderabad · Three locations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          >
            This is where{" "}
            <span className="relative inline-block text-primary">
              Hyderabad
              <svg
                aria-hidden
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2 w-full text-primary/70"
              >
                <path
                  d="M2 8 Q 50 2, 100 6 T 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            plays.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            240Hz panels, RTX rigs, a Simagic racing sim, VR, weekly
            tournaments. Three branches across the city, and the community to
            make it worth showing up for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/locations"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition hover:opacity-90"
            >
              Book a station
              <ChevronRight className="size-4" />
            </Link>
            <Link
              href="#locations"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card/60 px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground transition hover:border-primary/50"
            >
              <MapPin className="size-4" />
              Find a location
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
