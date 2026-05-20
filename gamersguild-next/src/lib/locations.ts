export type DeviceType = "pc" | "ps5" | "racing-sim" | "vr" | "switch";

export type Location = {
  slug: "banjara-hills" | "madhapur" | "begumpet";
  name: string;
  shortName: string;
  area: string;
  flagship: boolean;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  hourlyRate: { pc: number; ps5?: number };
  devices: DeviceType[];
  stats: { pcs: number; ps5?: number; sims?: number; vr?: number; switch?: number };
  highlights: string[];
};

export const locations: Location[] = [
  {
    slug: "banjara-hills",
    name: "Banjara Hills",
    shortName: "Banjara",
    area: "Banjara Hills",
    flagship: true,
    tagline: "The flagship. Racing sims, VR, Switch, and the works.",
    phone: "+918639713524",
    phoneDisplay: "+91 86397 13524",
    whatsapp: "918639713524",
    hourlyRate: { pc: 200, ps5: 250 },
    devices: ["pc", "ps5", "racing-sim", "vr", "switch"],
    stats: { pcs: 25, ps5: 1, sims: 1, vr: 1, switch: 1 },
    highlights: [
      "25 premium PCs",
      "PS5 lounge",
      "Simagic Alpha Mini F1 racing sim (triple monitor)",
      "Meta Quest 3 VR zone",
      "Nintendo Switch zone",
      "Private events / birthdays venue",
    ],
  },
  {
    slug: "madhapur",
    name: "Madhapur",
    shortName: "Madhapur",
    area: "HITEC City",
    flagship: false,
    tagline: "The original. Where Gamers Guild started, in the heart of HITEC City.",
    phone: "+917569613318",
    phoneDisplay: "+91 75696 13318",
    whatsapp: "917569613318",
    hourlyRate: { pc: 175, ps5: 200 },
    devices: ["pc", "ps5"],
    stats: { pcs: 35, ps5: 1 },
    highlights: [
      "35 premium PCs",
      "PS5 lounge",
      "240Hz monitors, RTX GPUs",
      "HITEC City location",
    ],
  },
  {
    slug: "begumpet",
    name: "Begumpet",
    shortName: "Begumpet",
    area: "Begumpet",
    flagship: false,
    tagline: "Esports-focused. 240Hz everything, RTX 5060, ranked-grind energy.",
    phone: "+918978661707",
    phoneDisplay: "+91 89786 61707",
    whatsapp: "918978661707",
    hourlyRate: { pc: 175, ps5: 200 },
    devices: ["pc", "ps5"],
    stats: { pcs: 30, ps5: 1 },
    highlights: [
      "30 PCs with RTX 5060",
      "240Hz competitive panels",
      "Tournament-ready setup",
      "Built for ranked grind",
    ],
  },
];

export function getLocation(slug: Location["slug"]) {
  return locations.find((l) => l.slug === slug);
}
