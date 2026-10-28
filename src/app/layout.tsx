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

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransitionCurtain from "@/components/layout/PageTransitionCurtain";
import MaintenanceScreen from "@/components/maintenance/MaintenanceScreen";
import { IS_MAINTENANCE_MODE } from "@/config/maintenance";

export const metadata: Metadata = IS_MAINTENANCE_MODE
  ? {
      title: "Scheduled Maintenance | Uvicon Technologies",
      description:
        "Uvicon Technologies is currently undergoing scheduled infrastructure upgrades. We will be back online shortly.",
      robots: { index: false, follow: false },
      icons: {
        icon: "/assets/icons/uvicon-technologies-logo.webp",
      },
    }
  : {
      title: "Premium Web, App & Trading Solutions | Uvicon",
      description:
        "Uvicon Technologies builds custom websites, mobile apps, games, and algorithmic trading software with premium design. Explore our products and services.",
      icons: {
        icon: "/assets/icons/uvicon-technologies-logo.webp",
      },
      openGraph: {
        title: "Premium Web, App & Trading Solutions | Uvicon",
        description:
          "Uvicon Technologies builds custom websites, mobile apps, games, and algorithmic trading software with premium design.",
        url: "https://uvicon.in",
        siteName: "Uvicon Technologies",
        locale: "en_IN",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Premium Web, App & Trading Solutions | Uvicon",
        description:
          "Uvicon Technologies builds custom websites, mobile apps, games, and algorithmic trading software with premium design.",
      },
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
      <body className="bg-background text-text-primary antialiased selection:bg-brand-accent selection:text-text-primary">
        {IS_MAINTENANCE_MODE ? (
          <MaintenanceScreen />
        ) : (
          <>
            <PageTransitionCurtain />
            <Header />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}

