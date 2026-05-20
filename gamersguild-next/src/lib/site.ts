export const site = {
  name: "Gamers Guild",
  fullName: "Gamers Guild Hyderabad",
  city: "Hyderabad",
  email: "hello@gamersguild.in",
  socials: {
    instagram: "https://instagram.com/gamersguildhyd",
    facebook: "https://facebook.com/GamersGuildHyd",
    youtube: "https://youtube.com/@GamersGuildhyd",
  },
} as const;

export const nav = {
  primary: [
    { href: "/", label: "Home" },
    { href: "/locations", label: "Locations" },
    { href: "/pricing", label: "Pricing" },
    { href: "/birthdays", label: "Birthdays" },
    { href: "/lans", label: "Tournaments" },
  ],
  cta: { href: "/locations#book", label: "Book a Station" },
} as const;
