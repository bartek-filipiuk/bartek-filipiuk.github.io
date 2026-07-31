import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bartek-filipiuk.github.io"),
  title: "Bartek Filipiuk — Software Architect & AI-Assisted Builder",
  description:
    "Software architect and senior developer building AI tools, developer infrastructure and production-ready web systems.",
  keywords: [
    "software architect",
    "AI-assisted development",
    "Drupal",
    "PHP",
    "Python",
    "developer tools",
  ],
  authors: [{ name: "Bartek Filipiuk", url: "https://devince.dev" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Bartek Filipiuk — Software Architect & AI-Assisted Builder",
    description:
      "I design software systems. AI helps me build them.",
    siteName: "Bartek Filipiuk",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Bartek Filipiuk — I design software systems. AI helps me build them.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bartek Filipiuk — Software Architect & AI-Assisted Builder",
    description: "I design software systems. AI helps me build them.",
    images: ["/og-image.svg"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
