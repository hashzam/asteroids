"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site";
import { LOCATIONS } from "@/lib/locations";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface",
              isActive(pathname, "/") && "text-accent-text",
            )}
          >
            Home
          </Link>

          <div className="group relative">
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface"
              aria-haspopup="true"
            >
              Locations
              <ChevronDown className="size-4" />
            </button>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-60 rounded-lg border border-border bg-surface p-1.5 shadow-xl">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface-2"
                  >
                    {loc.shortName}
                    {loc.isFlagship && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent-text">
                        Flagship
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface",
                isActive(pathname, link.href) && "text-accent-text",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/#locations">Book Now</Link>
          </Button>
          <button
            className="grid size-10 place-items-center rounded-md text-foreground transition-colors hover:bg-surface lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-surface"
            >
              Home
            </Link>
            <p className="px-3 pt-3 font-mono text-xs uppercase tracking-wider text-muted">
              Locations
            </p>
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                onClick={closeMenu}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-surface"
              >
                {loc.shortName}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-surface"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-3">
              <Link href="/#locations" onClick={closeMenu}>
                Book Now
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
