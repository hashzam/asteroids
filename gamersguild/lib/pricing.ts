export const HOURLY_RATES = {
  pc: { madhapurBegumpet: 175, banjara: 200 },
  ps5: { madhapurBegumpet: 200, banjara: 250 },
} as const;

export type PackGroup = "day" | "power" | "hardcore";

export interface PcPack {
  id: string;
  hours: number;
  name: string;
  group: PackGroup;
  priceBanjara: number | null;
  priceMadhapurBegumpet: number | null;
  validity?: string;
  badge?: string;
  savingsLabel?: string;
}

export const PC_PACKS: PcPack[] = [
  {
    id: "3hr",
    hours: 3,
    name: "3 Hour Pack",
    group: "day",
    priceBanjara: 350,
    priceMadhapurBegumpet: 300,
  },
  {
    id: "5hr",
    hours: 5,
    name: "5 Hour Pack",
    group: "day",
    priceBanjara: 500,
    priceMadhapurBegumpet: 450,
  },
  {
    id: "8hr",
    hours: 8,
    name: "8 Hour Pack",
    group: "day",
    priceBanjara: 650,
    priceMadhapurBegumpet: 650,
  },
  {
    id: "10hr",
    hours: 10,
    name: "10 Hour Pack",
    group: "power",
    priceBanjara: null,
    priceMadhapurBegumpet: 650,
    validity: "Madhapur and Begumpet only. 1 day validity.",
  },
  {
    id: "27hr",
    hours: 27,
    name: "27 Hour Pack",
    group: "power",
    priceBanjara: 2000,
    priceMadhapurBegumpet: 2000,
  },
  {
    id: "50hr",
    hours: 50,
    name: "50 Hour Pack",
    group: "hardcore",
    priceBanjara: 3500,
    priceMadhapurBegumpet: 3500,
    badge: "Best Value",
    savingsLabel: "40% off hourly",
  },
  {
    id: "100hr",
    hours: 100,
    name: "100 Hour Pack",
    group: "hardcore",
    priceBanjara: 6500,
    priceMadhapurBegumpet: 6500,
    badge: "Hardcore Mode ON",
    savingsLabel: "63% off hourly",
  },
];

export interface RateTier {
  label: string;
  price: number;
  unit: string;
}

export interface SpecialtyRate {
  id: string;
  name: string;
  location: string;
  tiers: RateTier[];
  note?: string;
}

export const SPECIALTY_RATES: SpecialtyRate[] = [
  {
    id: "vr",
    name: "VR, Meta Quest 3",
    location: "Banjara Hills only",
    tiers: [
      { label: "30 minutes", price: 399, unit: "30 min" },
      { label: "60 minutes", price: 600, unit: "60 min" },
    ],
  },
  {
    id: "racing-sim",
    name: "Racing Sim, Simagic Alpha Mini F1",
    location: "Banjara Hills only",
    tiers: [
      { label: "Weekday, 30 min", price: 500, unit: "30 min" },
      { label: "Weekday, 60 min", price: 800, unit: "60 min" },
      { label: "Weekend, 30 min", price: 750, unit: "30 min" },
      { label: "Weekend, 60 min", price: 1100, unit: "60 min" },
      { label: "Off-peak, 30 min", price: 300, unit: "30 min" },
    ],
    note: "Off-peak rate applies between 8am and 11am.",
  },
  {
    id: "switch",
    name: "Nintendo Switch",
    location: "Banjara Hills only",
    tiers: [{ label: "Per hour", price: 250, unit: "hour" }],
  },
];

export const REFUND_POLICY = "7 day refund on unused packs.";
