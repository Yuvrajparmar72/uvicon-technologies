import type { Metadata } from "next";
import { Alegreya_Sans_SC, Tourney, Open_Sans } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
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
  title: "Algo Trading Software India | Uvicon",
  description:
    "Uvicon provides high-performance custom websites, software, applications, and algo trading solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alegreyaSansSC.variable} ${tourney.variable} ${openSans.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
