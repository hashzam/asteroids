import type { PcPack } from "@/lib/pricing";
import { cn, formatINR } from "@/lib/utils";

function resolvePrice(pack: PcPack) {
  const banjara = pack.priceBanjara;
  const other = pack.priceMadhapurBegumpet;

  if (banjara !== null && other !== null) {
    if (banjara === other) return { amount: other, note: "All locations" };
    return { amount: other, note: `${formatINR(banjara)} at Banjara Hills` };
  }
  if (other !== null) return { amount: other, note: "Madhapur and Begumpet" };
  return { amount: banjara as number, note: "Banjara Hills" };
}

export function PackCard({ pack }: { pack: PcPack }) {
  const { amount, note } = resolvePrice(pack);
  const effectiveRate = Math.round(amount / pack.hours);
  const highlight = pack.group === "hardcore";

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border p-6",
        highlight ? "border-accent bg-accent/10" : "border-border bg-surface",
      )}
    >
      {pack.badge ? (
        <span className="mb-3 inline-flex w-fit rounded-md bg-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
          {pack.badge}
        </span>
      ) : (
        <span className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
          {pack.hours} hours
        </span>
      )}

      <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">
        {pack.name}
      </h3>

      <p className="mt-3 font-display text-4xl font-extrabold tracking-tight">
        {formatINR(amount)}
      </p>
      <p className="mt-1 text-sm text-muted">{note}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
          {pack.hours} hours
        </span>
        <span className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
          approx {formatINR(effectiveRate)}/hr
        </span>
      </div>

      {pack.savingsLabel && (
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-accent-text">
          {pack.savingsLabel}
        </p>
      )}
      {pack.validity && (
        <p className="mt-3 text-xs text-muted">{pack.validity}</p>
      )}
    </div>
  );
}
