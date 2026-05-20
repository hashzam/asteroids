export type DeviceType = "pc" | "ps5" | "racing-sim" | "vr" | "switch";

export type Location = {
  slug: "banjara-hills" | "madhapur" | "begumpet";
  name: string;
  shortName: string;
  area: string;
  flagship: boolean;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  address: string;
  hours: string;
  mapsEmbedUrl: string;
  mapsLink: string;
  hourlyRate: { pc: number; ps5?: number };
  devices: DeviceType[];
  stats: { pcs: number; ps5?: number; sims?: number; vr?: number; switch?: number };
  highlights: string[];
  pcSpecs: {
    gpu: string;
    monitor: string;
    peripherals: string;
    cpu?: string;
  };
};

export const locations: Location[] = [
  {
    slug: "banjara-hills",
    name: "Banjara Hills",
    shortName: "Banjara",
    area: "Banjara Hills",
    flagship: true,
    tagline: "The flagship. Racing sims, VR, Switch, and the works.",
    description:
      "Our biggest venue, built to host everything from a solo grind session to a sixty-person birthday. 25 premium PCs, a Simagic racing cockpit, a Meta Quest VR zone, a Nintendo Switch lounge, and a PS5 setup. Private event ready.",
    phone: "+918639713524",
    phoneDisplay: "+91 86397 13524",
    whatsapp: "918639713524",
    address: "Banjara Hills, Hyderabad, Telangana",
    hours: "Open daily, 11:00 AM to 1:00 AM",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Gamers+Guild+Banjara+Hills+Hyderabad&output=embed",
    mapsLink: "https://www.google.com/maps?q=Gamers+Guild+Banjara+Hills+Hyderabad",
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
    pcSpecs: {
      gpu: "NVIDIA RTX class",
      monitor: "144Hz competitive panels",
      peripherals: "Mechanical keyboards, gaming mice, premium headsets",
    },
  },
  {
    slug: "madhapur",
    name: "Madhapur",
    shortName: "Madhapur",
    area: "HITEC City",
    flagship: false,
    tagline: "The original. Where Gamers Guild started, in the heart of HITEC City.",
    description:
      "The OG Gamers Guild and our biggest PC floor. 35 stations packed into a HITEC City venue that's been hosting Hyderabad's grind sessions for years.",
    phone: "+917569613318",
    phoneDisplay: "+91 75696 13318",
    whatsapp: "917569613318",
    address: "HITEC City, Madhapur, Hyderabad, Telangana",
    hours: "Open daily, 11:00 AM to 1:00 AM",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Gamers+Guild+Madhapur+HITEC+City+Hyderabad&output=embed",
    mapsLink: "https://www.google.com/maps?q=Gamers+Guild+Madhapur+HITEC+City+Hyderabad",
    hourlyRate: { pc: 175, ps5: 200 },
    devices: ["pc", "ps5"],
    stats: { pcs: 35, ps5: 1 },
    highlights: [
      "35 premium PCs",
      "PS5 lounge",
      "High-refresh competitive panels",
      "HITEC City location",
    ],
    pcSpecs: {
      gpu: "NVIDIA RTX class",
      monitor: "High-refresh competitive panels",
      peripherals: "Mechanical keyboards, gaming mice, premium headsets",
    },
  },
  {
    slug: "begumpet",
    name: "Begumpet",
    shortName: "Begumpet",
    area: "Begumpet",
    flagship: false,
    tagline: "Esports-focused. 240Hz everything, RTX 5060, ranked-grind energy.",
    description:
      "Built for the players who care about every frame. 30 stations on RTX 5060 rigs, 240Hz panels across the floor, low-latency peripherals. Tournament-ready by default.",
    phone: "+918978661707",
    phoneDisplay: "+91 89786 61707",
    whatsapp: "918978661707",
    address: "Begumpet, Hyderabad, Telangana",
    hours: "Open daily, 11:00 AM to 1:00 AM",
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Gamers+Guild+Begumpet+Hyderabad&output=embed",
    mapsLink: "https://www.google.com/maps?q=Gamers+Guild+Begumpet+Hyderabad",
    hourlyRate: { pc: 175, ps5: 200 },
    devices: ["pc", "ps5"],
    stats: { pcs: 30, ps5: 1 },
    highlights: [
      "30 PCs with RTX 5060",
      "240Hz competitive panels",
      "Tournament-ready setup",
      "Built for ranked grind",
    ],
    pcSpecs: {
      gpu: "NVIDIA RTX 5060",
      monitor: "240Hz competitive panels",
      peripherals: "Mechanical keyboards, gaming mice, premium headsets",
    },
  },
];

export function getLocation(slug: Location["slug"]) {
  return locations.find((l) => l.slug === slug);
}
