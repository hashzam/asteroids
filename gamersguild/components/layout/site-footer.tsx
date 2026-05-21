import Link from "next/link";
import { Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons";
import { Logo } from "./logo";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/site";
import { LOCATIONS } from "@/lib/locations";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">{SITE.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:bg-surface-2"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:bg-surface-2"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid size-9 place-items-center rounded-md border border-border transition-colors hover:bg-surface-2"
              >
                <YoutubeIcon className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Locations
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="font-medium transition-colors hover:text-accent-text"
                  >
                    {loc.shortName}
                  </Link>
                  <a
                    href={`tel:${loc.phoneTel}`}
                    className="mt-0.5 flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
                  >
                    <Phone className="size-3" />
                    {loc.phoneDisplay}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="font-medium transition-colors hover:text-accent-text"
                >
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium transition-colors hover:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Visit
            </h3>
            <p className="mt-4 text-sm text-muted">
              Three locations across Hyderabad. Walk in or book ahead, your rig
              is ready when you are.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE.fullName}. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-wider">
            Built by Gamers, for Gamers
          </p>
        </div>
      </div>
    </footer>
  );
}
