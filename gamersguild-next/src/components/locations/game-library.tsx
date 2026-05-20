import { gameLibrary, type Game } from "@/lib/games";
import type { DeviceType } from "@/lib/locations";

function platformsForDevices(devices: readonly DeviceType[]) {
  const hasPc = devices.includes("pc");
  const hasPs5 = devices.includes("ps5");
  return { hasPc, hasPs5 };
}

function gameFitsLocation(game: Game, devices: readonly DeviceType[]) {
  const { hasPc, hasPs5 } = platformsForDevices(devices);
  if (game.platform === "both") return hasPc || hasPs5;
  if (game.platform === "pc") return hasPc;
  if (game.platform === "ps5") return hasPs5;
  return false;
}

export function LocationGameLibrary({
  devices,
}: {
  devices: readonly DeviceType[];
}) {
  const games = gameLibrary.filter((g) => gameFitsLocation(g, devices));
  return (
    <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((g) => (
        <li
          key={g.title}
          className="flex items-start justify-between gap-3 rounded-md border border-border bg-card/60 px-4 py-3"
        >
          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold tracking-tight">
              {g.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{g.category}</p>
          </div>
          <span className="shrink-0 rounded-sm border border-border bg-background/60 px-1.5 py-0.5 font-display text-[0.55rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {platformLabel(g.platform)}
          </span>
        </li>
      ))}
    </ul>
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
