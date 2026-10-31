import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { defaultPortfolio } from "@/lib/seed";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: defaultPortfolio.settings.siteTitle,
    template: `%s — ${defaultPortfolio.profile.name}`,
  },
  description: defaultPortfolio.settings.siteDescription,
  openGraph: {
    title: defaultPortfolio.settings.siteTitle,
    description: defaultPortfolio.settings.siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultPortfolio.settings.siteTitle,
    description: defaultPortfolio.settings.siteDescription,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
