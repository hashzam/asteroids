import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { GamesBrowser } from "@/components/games/games-browser";
import { gameLibrary } from "@/lib/games";

export const metadata: Metadata = {
  title: "Game library",
  description:
    "Every PC and PS5 title pre-installed and signed in across Gamers Guild Hyderabad. FPS, Battle Royale, MOBA, Fighting, Sports, Racing — sit down and queue up.",
};

export default function GamesPage() {
  return (
    <>
      <section className="border-b border-border bg-card/40">
        <Container className="py-20 sm:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Library
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {gameLibrary.length} titles. Pre-installed. Signed in.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Every account on every launcher, patches done, sensitivity profiles
            saved per station. Filter by platform or genre, then call a branch
            to book a station.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Not seeing your game? Ask the floor staff — most titles install on
            request.
          </p>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <GamesBrowser />
        </Container>
      </section>

      <section className="border-t border-border bg-card/30 py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Ready to queue up?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pick a branch, give them a call, the station's warm by the time
              you arrive.
            </p>
          </div>
          <Link
            href="/locations"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)] transition hover:opacity-90"
          >
            See locations
            <ChevronRight className="size-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
