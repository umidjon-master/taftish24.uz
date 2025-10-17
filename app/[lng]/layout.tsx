import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { languages } from "@/i18n/settings";
import "../globals.css";
import { Providers } from "@/components/providers/providers";
import { ReactNode } from "react";
import { dir } from "i18next";
import CookieWrapper from "@/components/providers/CookiesProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// 🌍 Sayt domeni (.env orqali boshqariladigan)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://taftish24.uz";

// 🌟 Asosiy SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Taftish24.uz — Eng so‘nggi yangiliklar va tahlillar",
    template: "%s | Taftish24.uz",
  },
  description:
    "Taftish24.uz — O‘zbekiston va dunyo bo‘ylab eng so‘nggi yangiliklar, tahliliy maqolalar va ishonchli manbalar portali.",
  keywords: [
    "yangiliklar",
    "O‘zbekiston yangiliklari",
    "taftish",
    "tahlil",
    "news",
    "uzbekistan news",
  ],
  authors: [{ name: "Taftish24.uz", url: siteUrl }],
  creator: "Taftish24.uz",
  publisher: "Taftish24.uz",
  alternates: {
    canonical: siteUrl,
    languages: {
      "uz-UZ": `${siteUrl}/uz`,
      "ru-RU": `${siteUrl}/ru`,
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: "ru_RU",
    url: siteUrl,
    siteName: "Taftish24.uz",
    title: "Taftish24.uz — Eng so‘nggi yangiliklar va tahlillar",
    description:
      "O‘zbekiston va dunyo bo‘yicha dolzarb yangiliklar, faktlar va tahlillarni o‘qing.",
    images: [
      {
        url: `https://858yhjxxl1.ufs.sh/f/IyD1Ckboyepae9ZMFIsP1ZuOf23DLTVwHX4YnCPNsAy7kUIo`,
        width: 1200,
        height: 630,
        alt: "Taftish24.uz — Yangiliklar portali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taftish24.uz — Eng so‘nggi yangiliklar va tahlillar",
    description:
      "Taftish24.uz — O‘zbekiston va dunyo yangiliklari uchun ishonchli manba.",
    images: [
      `https://858yhjxxl1.ufs.sh/f/IyD1Ckboyepae9ZMFIsP1ZuOf23DLTVwHX4YnCPNsAy7kUIo`,
    ],
    creator: "@taftish24",
  },
  icons: {
    icon: "/favicon.svg",
  },
  category: "news",
};

interface ChildProps {
  children: ReactNode;
}

interface Props extends ChildProps {
  params: Promise<{ lng: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { lng } = await params;

  return (
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <CookieWrapper>{children}</CookieWrapper>
        </Providers>
      </body>
    </html>
  );
}
