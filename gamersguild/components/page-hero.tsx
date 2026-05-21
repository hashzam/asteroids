export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-40 size-[480px] rounded-full bg-accent/15 blur-[130px]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase tracking-tight text-balance sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-xl text-lg text-muted">{description}</p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
