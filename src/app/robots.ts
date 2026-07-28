import type { MetadataRoute } from "next";

import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_CONFIG.url,
  };
}
