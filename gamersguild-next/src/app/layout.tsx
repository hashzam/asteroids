import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gamers Guild Hyderabad",
    template: "%s · Gamers Guild Hyderabad",
  },
  description:
    "Hyderabad's #1 competitive and social gaming cafe. Three locations, premium rigs, racing sims, VR, esports tournaments.",
  openGraph: {
    title: "Gamers Guild Hyderabad",
    description:
      "Built by gamers, for gamers. Three Hyderabad locations, premium rigs, esports tournaments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${chakra.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
        >
          <Nav />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
