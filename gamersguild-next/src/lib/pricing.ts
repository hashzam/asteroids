/**
 * Pricing tiers as published by Gamers Guild.
 * Rupee prices stored as numbers; format at the render site.
 * 7-day refund on unused pack hours is store policy across the board.
 */

export type LocationKey = "all" | "banjara" | "mb"; // mb = Madhapur + Begumpet

export type PriceRow = {
  label: string;
  duration?: string;
  banjara?: number;
  mb?: number;
  flat?: number;
  note?: string;
  validity?: string;
};

export type PriceGroup = {
  id: string;
  title: string;
  pitch: string;
  rows: PriceRow[];
  badge?: string;
  savings?: string;
};

export const pcPricing: PriceGroup[] = [
  {
    id: "pay-as-you-go",
    title: "Pay as you go",
    pitch: "No commitment. Walk in, grab a station, get out.",
    rows: [
      { label: "Hourly", duration: "1 hr", banjara: 200, mb: 175 },
    ],
  },
  {
    id: "day-packs",
    title: "Day packs",
    pitch: "Marathon sessions or a full afternoon with the squad.",
    rows: [
      { label: "3 hour pack", banjara: 350, mb: 300 },
      { label: "5 hour pack", banjara: 500, mb: 450 },
      { label: "8 hour pack", flat: 650 },
    ],
  },
  {
    id: "power-packs",
    title: "Power packs",
    pitch: "Sweet-spot value. Pack hours, use across multiple visits.",
    rows: [
      {
        label: "10 hour pack",
        mb: 650,
        note: "Madhapur and Begumpet only",
        validity: "1 day",
      },
      { label: "27 hour pack", flat: 2000 },
    ],
  },
  {
    id: "hardcore",
    title: "Hardcore packs",
    pitch: "For the people who basically live here. Massive per-hour savings.",
    badge: "Best Value",
    savings: "Up to 63% off hourly",
    rows: [
      {
        label: "50 hour pack",
        flat: 3500,
        note: "40% off hourly",
      },
      {
        label: "100 hour pack",
        flat: 6500,
        note: "63% off hourly",
      },
    ],
  },
];

export const consolePricing: PriceGroup = {
  id: "ps5",
  title: "PlayStation 5",
  pitch: "Couch co-op, fighting games, single-player binges.",
  rows: [
    { label: "Hourly", banjara: 250, mb: 200 },
  ],
};

export const specialtyPricing: PriceGroup[] = [
  {
    id: "racing-sim",
    title: "Racing Simulator (Banjara Hills)",
    pitch: "Simagic Alpha Mini F1, triple monitor. Closest thing to a real cockpit.",
    rows: [
      { label: "Weekday 30 min", flat: 500 },
      { label: "Weekday 60 min", flat: 800 },
      { label: "Weekend 30 min", flat: 750 },
      { label: "Weekend 60 min", flat: 1100 },
      { label: "Off-peak 30 min", flat: 300, note: "Weekdays 8am to 11am" },
    ],
  },
  {
    id: "vr",
    title: "VR Zone (Banjara Hills)",
    pitch: "Meta Quest 3. Beat Saber, sword fights, escape rooms.",
    rows: [
      { label: "30 min", flat: 399 },
      { label: "60 min", flat: 600 },
    ],
  },
  {
    id: "switch",
    title: "Nintendo Switch (Banjara Hills)",
    pitch: "Mario Kart, Smash, Zelda. Bring four friends, lose three of them.",
    rows: [{ label: "Hourly", flat: 250 }],
  },
];

export const policies = {
  refund: "7-day refund on unused pack hours.",
};
