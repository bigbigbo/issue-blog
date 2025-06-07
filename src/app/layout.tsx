import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { BackgroundDecorations } from "@/components/background-decorations";
import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";

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

function getSeason(solarTermKey: string): string {
  if (["lichun", "yushui", "jingzhe", "chunfen", "qingming", "guyu"].includes(solarTermKey)) {
    return "spring";
  }
  if (["lixia", "xiaoman", "mangzhong", "xiazhi", "xiaoshu", "dashu"].includes(solarTermKey)) {
    return "summer";
  }
  if (["liqiu", "chushu", "bailu", "qiufen", "hanlu", "shuangjiang"].includes(solarTermKey)) {
    return "autumn";
  }
  return "winter";
}

// 背景装饰组件

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const season = getSeason(currentSolarTermKey);
  const themeColor = currentSolarTerm.themeColor;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lxgwWenKai.variable} relative antialiased`}>
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${themeColor}30 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, ${themeColor}20 0%, transparent 60%)
            `,
          }}
        >
          <BackgroundDecorations themeColor={"#000000"} season={season} />

          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right bottom, transparent, ${themeColor}20),
                radial-gradient(circle at 60% 40%, ${themeColor}25, transparent 70%)
              `,
              filter: "blur(120px)",
            }}
          />
        </div>

        <Providers>
          <Navbar />
          <div className="relative z-10 pt-20">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
