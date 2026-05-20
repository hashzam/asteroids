import { Container } from "@/components/site/container";

const stats = [
  { value: "3", label: "Locations" },
  { value: "90", suffix: "+", label: "Premium PCs" },
  { value: "240", suffix: "Hz", label: "Competitive panels" },
  { value: "1", label: "Simagic racing sim" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-card/40">
      <Container className="grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative bg-background/60 px-6 py-10 text-center"
          >
            <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {s.value}
              {s.suffix ? (
                <span className="text-accent">{s.suffix}</span>
              ) : null}
            </p>
            <p className="mt-2 font-display text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
