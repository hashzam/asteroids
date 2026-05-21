export type DeviceType = "PC" | "PS5" | "Racing Sim" | "VR" | "Switch";

export interface Location {
  slug: string;
  name: string;
  shortName: string;
  area: string;
  isFlagship: boolean;
  tagline: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  pcCount: number;
  hourlyPC: number;
  hourlyPS5: number;
  devices: DeviceType[];
  highlights: string[];
}

export const COMMON_SPECS = [
  "240Hz monitors",
  "RTX graphics across every rig",
  "Logitech and HyperX peripherals",
  "Cybeart gaming chairs",
  "Fast WiFi, low ping",
] as const;

export const LOCATIONS: Location[] = [
  {
    slug: "banjara-hills",
    name: "Gamers Guild Banjara Hills",
    shortName: "Banjara Hills",
    area: "Banjara Hills, Hyderabad",
    isFlagship: true,
    tagline: "The flagship. Every device we run, under one roof.",
    phoneDisplay: "+91 86397 13524",
    phoneTel: "+918639713524",
    whatsapp: "918639713524",
    pcCount: 25,
    hourlyPC: 200,
    hourlyPS5: 250,
    devices: ["PC", "PS5", "Racing Sim", "VR", "Switch"],
    highlights: [
      "25 high-end gaming PCs",
      "PlayStation 5 lounge",
      "Simagic Alpha Mini F1 racing sim, triple monitor",
      "VR zone with Meta Quest 3",
      "Nintendo Switch zone",
    ],
  },
  {
    slug: "madhapur",
    name: "Gamers Guild Madhapur",
    shortName: "Madhapur",
    area: "HITEC City, Madhapur, Hyderabad",
    isFlagship: false,
    tagline: "Where it all started. The original Gamers Guild.",
    phoneDisplay: "+91 75696 13318",
    phoneTel: "+917569613318",
    whatsapp: "917569613318",
    pcCount: 35,
    hourlyPC: 175,
    hourlyPS5: 200,
    devices: ["PC", "PS5"],
    highlights: [
      "35 high-end gaming PCs, our largest floor",
      "PlayStation 5 lounge",
      "The original HITEC City branch, running since 2018",
    ],
  },
  {
    slug: "begumpet",
    name: "Gamers Guild Begumpet",
    shortName: "Begumpet",
    area: "Begumpet, Hyderabad",
    isFlagship: false,
    tagline: "Built for esports. 240Hz, RTX 5060, zero compromise.",
    phoneDisplay: "+91 89786 61707",
    phoneTel: "+918978661707",
    whatsapp: "918978661707",
    pcCount: 30,
    hourlyPC: 175,
    hourlyPS5: 200,
    devices: ["PC", "PS5"],
    highlights: [
      "30 esports-grade gaming PCs",
      "240Hz monitors paired with RTX 5060 graphics",
      "PlayStation 5 lounge",
    ],
  },
];

export function getLocation(slug: string) {
  return LOCATIONS.find((l) => l.slug === slug);
}

export const TOTAL_SETUPS = LOCATIONS.reduce((sum, l) => sum + l.pcCount, 0);
