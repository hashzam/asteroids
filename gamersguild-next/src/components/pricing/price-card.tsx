import type { PriceGroup, PriceRow } from "@/lib/pricing";

function rupee(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatPrice(row: PriceRow) {
  if (typeof row.flat === "number") {
    return (
      <span className="font-display text-xl font-bold tracking-tight">
        {rupee(row.flat)}
      </span>
    );
  }
  return (
    <span className="flex flex-col items-end gap-0.5 font-display">
      {typeof row.banjara === "number" && (
        <span className="text-base font-bold">
          {rupee(row.banjara)}
          <span className="ml-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Banjara
          </span>
        </span>
      )}
      {typeof row.mb === "number" && (
        <span className="text-base font-bold">
          {rupee(row.mb)}
          <span className="ml-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Madhapur / Begumpet
          </span>
        </span>
      )}
    </span>
  );
}

export function PriceCard({ group }: { group: PriceGroup }) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 ${
        group.badge
          ? "border-primary/60 bg-card shadow-[0_0_40px_-14px_var(--primary)]"
          : "border-border bg-card/60"
      }`}
    >
      {group.badge && (
        <span className="absolute -top-3 left-6 rounded-full border border-primary/40 bg-primary px-3 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.25em] text-primary-foreground">
          {group.badge}
        </span>
      )}

      <h3 className="font-display text-lg font-bold tracking-tight">
        {group.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{group.pitch}</p>

      {group.savings && (
        <p className="mt-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-accent">
          {group.savings}
        </p>
      )}

      <ul className="mt-6 space-y-3 border-t border-border pt-5">
        {group.rows.map((row) => (
          <li
            key={row.label}
            className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium">{row.label}</p>
              {row.note && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {row.note}
                </p>
              )}
              {row.validity && (
                <p className="mt-0.5 font-display text-[0.6rem] font-bold uppercase tracking-[0.2em] text-accent">
                  Valid {row.validity}
                </p>
              )}
            </div>
            <div className="shrink-0 text-right">{formatPrice(row)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
