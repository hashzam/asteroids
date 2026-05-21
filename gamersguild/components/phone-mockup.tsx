import { cn } from "@/lib/utils";

export function PhoneMockup({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full max-w-[280px] rounded-[2.25rem] border-[6px] border-surface-2 bg-background shadow-2xl",
        className,
      )}
    >
      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-surface-2" />
      <div className="size-full overflow-hidden rounded-[1.7rem]">
        {children}
      </div>
    </div>
  );
}

export function ReelPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-accent/25 via-background to-background">
      <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <p className="px-6 text-center font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted">
        {label}
      </p>
    </div>
  );
}
