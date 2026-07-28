const DEFAULT_SITE_URL = "https://issue-blog-amber.vercel.app";

function resolveSiteUrl(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
    DEFAULT_SITE_URL;

  try {
    const url = new URL(configuredUrl);
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_CONFIG = {
  name: "Bigbigbo",
  alternateName: "Bigbigbo Issue Blog",
  title: "Bigbigbo｜技术笔记、产品思考与二十四节气",
  description: "Bigbigbo 的个人博客，记录软件工程、AI 编程、产品思考、生活观察与中国二十四节气。",
  url: resolveSiteUrl(),
  language: "zh-CN",
  locale: "zh_CN",
  defaultImage: "/images/editorial/article-shadows.png",
  author: {
    name: "Bigbigbo",
    github: "https://github.com/bigbigbo",
    x: "https://x.com/hibobo233",
    xHandle: "@hibobo233",
    avatar: "/images/avatar.jpg",
  },
  repository: "https://github.com/bigbigbo/issue-blog",
} as const;

export function absoluteUrl(path = "/"): string {
  try {
    const url = new URL(path, `${SITE_CONFIG.url}/`);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return `${SITE_CONFIG.url}/`;
  }

  return `${SITE_CONFIG.url}/`;
}
