import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Source_Serif_4 } from "next/font/google";
import { Providers } from "@/providers/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Princess Munachi-Obinna & Victor Obinna Chibuzo | Obinasom",
  description:
    "A luxury digital wedding invitation for Princess Munachi-Obinna and Victor Obinna Chibuzo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourceSerif.variable} ${greatVibes.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
