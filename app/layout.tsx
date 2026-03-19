import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Explorer",
  description:
    "Discover movies, explore genres, and manage your watchlist with Movie Explorer. Powered by TMDb API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 min-h-screen`}
      >
        <Providers>
          <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
              <Link
                href="/list"
                className="text-sm font-semibold tracking-wide text-zinc-100 hover:text-white transition-colors"
              >
                MOVIE EXPLORER
              </Link>
              <Link
                href="/search"
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Search
              </Link>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
