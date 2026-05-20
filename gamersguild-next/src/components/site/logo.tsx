import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Gamers Guild Hyderabad home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span className="grid size-9 place-items-center rounded-md bg-primary font-display text-base font-bold tracking-tight text-primary-foreground shadow-[0_0_18px_-4px_var(--primary)]">
        GG
      </span>
      <span className="flex flex-col font-display leading-none">
        <span className="text-sm font-bold tracking-[0.18em]">GAMERS GUILD</span>
        <span className="text-[0.6rem] font-medium tracking-[0.4em] text-muted-foreground">
          HYDERABAD
        </span>
      </span>
    </Link>
  );
}
