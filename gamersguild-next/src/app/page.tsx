import { Container } from "@/components/site/container";

export default function HomePage() {
  return (
    <Container className="py-24">
      <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
        Scaffold ready
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Gamers Guild Hyderabad
      </h1>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Foundation in place: theme tokens, fonts, layout shell, navigation,
        footer, location and pricing data. Next step is the home page build,
        starting with copy options for the hero.
      </p>
    </Container>
  );
}
