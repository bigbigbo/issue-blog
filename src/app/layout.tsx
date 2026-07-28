import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { DynamicBackground } from "@/components/background-decorations";
import { PaperTexture } from "@/components/editorial";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers";
import { JsonLd } from "@/components/seo";

import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";

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
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: ["软件工程", "人工智能", "AI 编程", "产品思考", "技术博客", "二十四节气"],
  authors: [
    {
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.github,
    },
  ],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.author.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
      "text/plain": absoluteUrl("/llms.txt"),
    },
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: absoluteUrl("/"),
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: absoluteUrl(SITE_CONFIG.defaultImage),
        width: 1672,
        height: 941,
        alt: "Bigbigbo 的技术笔记、产品思考与生活观察",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE_CONFIG.author.xHandle,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [absoluteUrl(SITE_CONFIG.defaultImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01": process.env.BING_SITE_VERIFICATION,
          },
        }
      : {}),
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2efe8",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: absoluteUrl("/"),
      name: SITE_CONFIG.name,
      alternateName: SITE_CONFIG.alternateName,
      description: SITE_CONFIG.description,
      inLanguage: SITE_CONFIG.language,
      publisher: {
        "@id": `${SITE_CONFIG.url}/#person`,
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_CONFIG.url}/#person`,
      name: SITE_CONFIG.author.name,
      url: absoluteUrl("/"),
      image: absoluteUrl(SITE_CONFIG.author.avatar),
      sameAs: [SITE_CONFIG.author.github, SITE_CONFIG.author.x],
      knowsAbout: ["软件工程", "人工智能", "AI 编程", "产品设计", "二十四节气"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${lxgwWenKai.variable} antialiased`}>
        <JsonLd data={siteJsonLd} />
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
