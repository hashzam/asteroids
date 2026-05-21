export const SITE = {
  name: "Gamers Guild",
  fullName: "Gamers Guild Hyderabad",
  url: "https://gamersguild.vercel.app",
  tagline: "Hyderabad's #1 Competitive & Social Gaming Cafe",
  description:
    "Premium gaming cafe chain in Hyderabad. 240Hz rigs, RTX GPUs, PS5, racing sims and VR across Madhapur, Begumpet and Banjara Hills.",
  since: 2018,
} as const;

export const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Birthdays", href: "/birthdays" },
  { label: "Tournaments", href: "/tournaments" },
  { label: "Blog", href: "/blog" },
] as const;

export const SOCIALS = {
  instagram: "https://instagram.com/gamersguildhyd",
  facebook: "https://facebook.com/GamersGuildHyd",
  youtube: "https://youtube.com/@GamersGuildhyd",
} as const;
