import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Nav from "@/components/ui/Nav";
import Cursor from "@/components/ui/Cursor";
import Grain from "@/components/ui/Grain";
import Starfield from "@/components/ui/Starfield";
import Space from "@/components/three/Space";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Remas Nafea Alsulami — Software Engineer",
};

export const viewport: Viewport = {
  themeColor: "#020204",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-void"
        >
          Skip to content
        </a>
        <Starfield />
        <Space />
        <SmoothScroll />
        <Nav />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Cursor />
        <Grain />
      </body>
    </html>
  );
}
