import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { DynamicBackground } from "@/components/background-decorations";
import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lxgwWenKai = localFont({
  src: "../../public/fonts/LXGWWenKai-Medium.woff2",
  variable: "--font-lxgw-wenkai",
  display: "swap",
  weight: "500",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Bigbigb's Blog",
  description: "Bigbigb's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lxgwWenKai.variable} relative antialiased`}>
        <DynamicBackground />

        <Providers>
          <Navbar />
          <div className="relative z-10 pt-20">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
