import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { CartProvider } from "@/hooks/use-cart";
import { AuthProvider } from "@/hooks/use-auth";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orchard Elixir - Premium Essential Oils & Herbs",
  description:
    "Discover luxury cold-pressed essential oils and premium herbs for wellness and aromatherapy. Royal quality, naturally sourced.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable}`}
      >
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <div className="min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </Suspense>
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
