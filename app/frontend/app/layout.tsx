import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Font "di marca" calligrafico (orientaleggiante) per il logotipo Mandari.
const brand = Ma_Shan_Zheng({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
});

// Font editoriale per il claim (diverso dal logo).
const claim = Fraunces({
  variable: "--font-claim",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Mandari — Scopri cosa ti spetta",
  description:
    "Con SPETTA scopri in un minuto diritti, bonus e agevolazioni che ti riguardano.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${brand.variable} ${claim.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
