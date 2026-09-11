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
  title: "The Kawoz TV",
  description: "A custom interactive TV experience.",
};

import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        <nav className="w-full flex justify-center items-center py-5 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 fixed top-0 z-50">
          <div className="flex gap-10 text-xs font-bold tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors">Home / TV</Link>
            <Link href="/advice" className="text-zinc-500 hover:text-white transition-colors">Kawoz Advice</Link>
          </div>
        </nav>
        <div className="pt-16 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
