import type { Metadata } from "next";

import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";

const DEFAULT_KEYWORDS = ["Bigbigbo", "软件工程", "人工智能", "AI 编程", "产品思考", "技术博客", "二十四节气"];

interface CreatePageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  image?: string | null;
}

export function resolveSeoImage(source?: string | null): string {
  if (!source) {
    return absoluteUrl(SITE_CONFIG.defaultImage);
  }

  try {
    const url = new URL(source, `${SITE_CONFIG.url}/`);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return absoluteUrl(SITE_CONFIG.defaultImage);
  }

  return absoluteUrl(SITE_CONFIG.defaultImage);
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  absoluteTitle = false,
  image,
}: CreatePageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const socialImage = resolveSeoImage(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])),
    alternates: {
      canonical: canonicalUrl,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
        "text/plain": absoluteUrl("/llms.txt"),
      },
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: socialImage,
          alt: `${title}的社交分享图`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: SITE_CONFIG.author.xHandle,
      title,
      description,
      images: [socialImage],
    },
  };
}
