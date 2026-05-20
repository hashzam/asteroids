import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/site/social-icons";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { locations } from "@/lib/locations";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <Container className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Built by gamers, for gamers. Three locations across Hyderabad,
            premium rigs, esports energy.
          </p>
          <div className="flex gap-3 pt-1">
            <Link
              href={site.socials.instagram}
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
            >
              <InstagramIcon className="size-4" />
            </Link>
            <Link
              href={site.socials.facebook}
              aria-label="Facebook"
              className="grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
            >
              <FacebookIcon className="size-4" />
            </Link>
            <Link
              href={site.socials.youtube}
              aria-label="YouTube"
              className="grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
            >
              <YoutubeIcon className="size-4" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground">
            Explore
          </h3>
          <ul className="space-y-2">
            {nav.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-foreground">
            Locations
          </h3>
          <ul className="grid gap-4 sm:grid-cols-3">
            {locations.map((loc) => (
              <li key={loc.slug} className="space-y-1">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="block font-display text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {loc.name}
                </Link>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {loc.area}
                </p>
                <a
                  href={`tel:${loc.phone}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="size-3" />
                  {loc.phoneDisplay}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p>Hyderabad, Telangana. {site.email}</p>
        </Container>
      </div>
    </footer>
  );
}
