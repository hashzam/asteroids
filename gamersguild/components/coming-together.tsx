export function ComingTogether({
  eyebrow = "Gamers Guild",
  title,
  blurb,
}: {
  eyebrow?: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-text">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase tracking-tight text-balance sm:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-muted">{blurb}</p>
      <p className="mt-8 inline-flex rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
        This page is being built
      </p>
    </section>
  );
}
