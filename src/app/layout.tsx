import type { Metadata } from "next";
import localFont from "next/font/local";

import { DynamicBackground } from "@/components/background-decorations";
import { PaperTexture } from "@/components/editorial";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers";

import "./globals.css";
import "@/components/footer/footer.css";

const lxgwWenKai = localFont({
  src: "../../public/fonts/LXGWWenKai-Medium.woff2",
  variable: "--font-lxgw-wenkai",
  display: "swap",
  weight: "500",
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    default: "Bigbigbo",
    template: "%s | Bigbigbo",
  },
  description: "Bigbigbo 的技术笔记、生活观察与二十四节气。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${lxgwWenKai.variable} antialiased`}>
        <DynamicBackground />
        <PaperTexture />
        <Providers>
          <a className="skip-link" href="#main-content">
            跳到主要内容
          </a>
          <Navbar />
          <div className="site-content">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
