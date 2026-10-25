import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-big-shoulders",
  adjustFontFallback: false,
});
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "2Crew · Crew técnico para eventos en vivo",
  description:
    "Contrata técnicos de audio, luces, video y rigging para tus eventos. Pago seguro por SPEI y liberación con código al terminar.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: "2Crew", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
