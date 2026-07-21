import type { Metadata } from "next";
import { Alegreya_Sans_SC, Tourney, Open_Sans } from "next/font/google";
import "./globals.css";

const alegreyaSansSC = Alegreya_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-heading-main",
  display: "swap",
});

const tourney = Tourney({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading-section",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glassmorphism UI Design | Uvicon Technologies",
  description:
    "Uvicon Technologies builds high-performance websites, custom software, mobile applications, games, and algo trading solutions with modern Glassmorphism UI.",
};

import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hi"
      className={`${alegreyaSansSC.variable} ${tourney.variable} ${openSans.variable}`}
    >
      <body className="antialiased selection:bg-purple-500 selection:text-white">
        {/* Background Animating Blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        
        <Header />
        {children}
      </body>
    </html>
  );
}
