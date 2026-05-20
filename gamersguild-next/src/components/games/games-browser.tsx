"use client";

import { useMemo, useState } from "react";
import { gameLibrary, type Game } from "@/lib/games";

type PlatformFilter = "all" | "pc" | "ps5";

const categories = Array.from(
  new Set(gameLibrary.map((g) => g.category))
).sort();

export function GamesBrowser() {
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [category, setCategory] = useState<Game["category"] | "all">("all");

  const games = useMemo(() => {
    return gameLibrary.filter((g) => {
      if (platform !== "all") {
        if (platform === "pc" && g.platform === "ps5") return false;
        if (platform === "ps5" && g.platform === "pc") return false;
      }
      if (category !== "all" && g.category !== category) return false;
      return true;
    });
  }, [platform, category]);

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Platform
          </span>
          <Pill active={platform === "all"} onClick={() => setPlatform("all")}>
            All
          </Pill>
          <Pill active={platform === "pc"} onClick={() => setPlatform("pc")}>
            PC
          </Pill>
          <Pill active={platform === "ps5"} onClick={() => setPlatform("ps5")}>
            PS5
          </Pill>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Genre
          </span>
          <Pill active={category === "all"} onClick={() => setCategory("all")}>
            All
          </Pill>
          {categories.map((c) => (
            <Pill
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </Pill>
          ))}
        </div>
      </div>

      <p className="mt-6 font-display text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {games.length} {games.length === 1 ? "title" : "titles"}
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((g) => (
          <li
            key={g.title}
            className="flex items-start justify-between gap-3 rounded-lg border border-border bg-card/60 px-4 py-4 transition-colors hover:border-primary/40"
          >
            <div className="min-w-0">
              <p className="font-display text-base font-bold tracking-tight">
                {g.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {g.category}
              </p>
            </div>
            <span className="shrink-0 rounded-sm border border-border bg-background/60 px-1.5 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {platformLabel(g.platform)}
            </span>
          </li>
        ))}
      </ul>

      {games.length === 0 && (
        <p className="mt-8 rounded-md border border-dashed border-border bg-card/40 px-4 py-6 text-center text-sm text-muted-foreground">
          No titles match this combination. Try clearing a filter.
        </p>
      )}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

function platformLabel(p: Game["platform"]) {
  switch (p) {
    case "pc":
      return "PC";
    case "ps5":
      return "PS5";
    case "both":
      return "PC · PS5";
  }
}
