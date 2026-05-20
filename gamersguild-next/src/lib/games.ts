export type Game = {
  title: string;
  short?: string;
  category:
    | "FPS"
    | "Battle Royale"
    | "MOBA"
    | "Fighting"
    | "Sports"
    | "Co-op"
    | "Racing"
    | "Open World"
    | "Sandbox"
    | "Hero Shooter";
  platform: "pc" | "ps5" | "both";
};

export const gameLibrary: Game[] = [
  { title: "Valorant", category: "FPS", platform: "pc" },
  { title: "Counter-Strike 2", short: "CS2", category: "FPS", platform: "pc" },
  { title: "Apex Legends", category: "Battle Royale", platform: "pc" },
  { title: "BGMI", category: "Battle Royale", platform: "pc" },
  { title: "Call of Duty: MW3", short: "COD MW3", category: "FPS", platform: "pc" },
  { title: "Fortnite", category: "Battle Royale", platform: "pc" },
  { title: "Marvel Rivals", category: "Hero Shooter", platform: "pc" },
  { title: "League of Legends", short: "LoL", category: "MOBA", platform: "pc" },
  { title: "EA Sports FC", category: "Sports", platform: "both" },
  { title: "Tekken 8", category: "Fighting", platform: "both" },
  { title: "Mortal Kombat 1", category: "Fighting", platform: "ps5" },
  { title: "Grand Theft Auto V", short: "GTA V", category: "Open World", platform: "pc" },
  { title: "Minecraft", category: "Sandbox", platform: "pc" },
  { title: "Spider-Man 2", category: "Open World", platform: "ps5" },
  { title: "God of War: Ragnarok", category: "Open World", platform: "ps5" },
  { title: "Gran Turismo 7", category: "Racing", platform: "ps5" },
];
