import type { Metadata } from "next";
import { ComingTogether } from "@/components/coming-together";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <ComingTogether
      title="From the Guild"
      blurb="News, build guides and event recaps. The MDX-powered blog is scaffolded and posts will migrate here from the old site."
    />
  );
}
