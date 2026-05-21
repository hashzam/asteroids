import type { Metadata } from "next";
import { ComingTogether } from "@/components/coming-together";

export const metadata: Metadata = {
  title: "Birthdays",
};

export default function BirthdaysPage() {
  return (
    <ComingTogether
      title="A Private Event for Your Crew"
      blurb="Reserve half the Banjara Hills floor for your squad. Custom quotes, no kid-party energy. Full page coming soon."
    />
  );
}
