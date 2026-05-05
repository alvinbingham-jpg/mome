import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mome — Chains disappear. Yield appears.",
  description:
    "The savings app where DeFi got out of the way. One balance. One mood. Yield, quietly. Built on Particle Universal Accounts + EIP-7702.",
  openGraph: {
    title: "Mome — Chains disappear. Yield appears.",
    description:
      "The savings app where DeFi got out of the way. One balance. One mood. Yield, quietly.",
    type: "website",
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
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-mome-cream text-mome-forest">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
