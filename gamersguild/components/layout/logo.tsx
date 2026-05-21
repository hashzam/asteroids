import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Gamers Guild, home"
      className={cn("flex items-center gap-2.5", className)}
    >
      <span className="grid size-9 place-items-center rounded-md bg-accent font-display text-base font-extrabold leading-none text-accent-foreground">
        GG
      </span>
      {wordmark && (
        <span className="font-display text-lg font-extrabold uppercase leading-none tracking-tight">
          Gamers<span className="text-accent-text"> Guild</span>
        </span>
      )}
    </Link>
  );
}
