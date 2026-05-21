import type { Metadata } from "next";
import { ComingTogether } from "@/components/coming-together";

export const metadata: Metadata = {
  title: "Tournaments and LANs",
};

export default function TournamentsPage() {
  return (
    <ComingTogether
      title="Compete. Every Week."
      blurb="Weekly tournaments and LAN events across all three locations. Registration and the events calendar are on the way."
    />
  );
}
