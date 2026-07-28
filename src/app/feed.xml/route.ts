import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";
import type { IssueListItem } from "@/core/entities/github-issue";
import { getAllBlogPosts } from "@/core/services/blog-content";

export const revalidate = 300;

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  let posts: IssueListItem[] = [];

  try {
    posts = await getAllBlogPosts();
  } catch {
    posts = [];
  }

  const feedUrl = absoluteUrl("/feed.xml");
  const lastBuildDate = new Date(posts[0]?.updated_at ?? Date.now()).toUTCString();
  const items = posts
    .slice(0, 30)
    .map((post) => {
      const postUrl = absoluteUrl(`/blog/${post.number}`);
      const categories = post.labels.map((label) => `<category>${escapeXml(label.name)}</category>`).join("");

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(postUrl)}</link>`,
        `<guid isPermaLink="true">${escapeXml(postUrl)}</guid>`,
        `<pubDate>${new Date(post.created_at).toUTCString()}</pubDate>`,
        `<dc:creator>${escapeXml(post.user.login)}</dc:creator>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        categories,
        "</item>",
      ].join("");
    })
    .join("");
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "<channel>",
    `<title>${escapeXml(SITE_CONFIG.title)}</title>`,
    `<link>${escapeXml(absoluteUrl("/"))}</link>`,
    `<description>${escapeXml(SITE_CONFIG.description)}</description>`,
    `<language>${SITE_CONFIG.language}</language>`,
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      "Content-Type": "application/rss+xml; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
