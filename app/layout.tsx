import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const serif = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Paper Foundation — Love Paper, use Paper without Hesitation",
    template: "%s · Paper Foundation",
  },
  description:
    "Paper Foundation is a registered society (Telangana, 2025) advocating evidence-based understanding of paper, printing, recycling and circularity in India.",
  keywords: [
    "Paper Foundation",
    "paper sustainability India",
    "paper recycling",
    "circular economy",
    "pulp and paper",
    "EPR paper packaging",
    "agri-residue paper",
    "think planet think print",
  ],
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: {
    type: "website",
    title: "Paper Foundation",
    description:
      "Love Paper, use Paper without Hesitation. Evidence-based understanding of paper, recycling and circularity in India.",
    url: siteUrl,
    siteName: "Paper Foundation",
    locale: "en_IN",
    images: ["/brand/logo-wide.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Foundation",
    description: "Love Paper, use Paper without Hesitation.",
    images: ["/brand/logo-wide.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
