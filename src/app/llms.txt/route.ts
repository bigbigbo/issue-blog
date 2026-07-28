import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";
import { getAllBlogPosts } from "@/core/services/blog-content";

export const revalidate = 300;

function escapeMarkdownText(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]").replace(/\s+/g, " ").trim();
}

export async function GET() {
  let articleLines: string[] = [];

  try {
    const posts = await getAllBlogPosts();
    articleLines = posts.map(
      (post) =>
        `- [${escapeMarkdownText(post.title)}](${absoluteUrl(`/blog/${post.number}`)}): ${escapeMarkdownText(post.excerpt)}`,
    );
  } catch {
    articleLines = ["- [博客归档](" + absoluteUrl("/blog") + "): 文章列表暂时无法展开，请访问博客归档。"];
  }

  const content = [
    `# ${SITE_CONFIG.name}`,
    "",
    `> ${SITE_CONFIG.description}`,
    "",
    `Canonical site: ${absoluteUrl("/")}`,
    `Primary language: ${SITE_CONFIG.language}`,
    `Author: ${SITE_CONFIG.author.name}`,
    "",
    "## Main pages",
    "",
    `- [Home](${absoluteUrl("/")}): 最新文章、作者信息和当前节气。`,
    `- [Blog archive](${absoluteUrl("/blog")}): 全部技术与生活文章。`,
    `- [24 Solar Terms](${absoluteUrl("/solar-term")}): 今年节气日期、当前节气和相关诗句。`,
    "",
    "## Articles",
    "",
    ...articleLines,
    "",
    "## Feeds and discovery",
    "",
    `- [RSS feed](${absoluteUrl("/feed.xml")})`,
    `- [XML sitemap](${absoluteUrl("/sitemap.xml")})`,
    `- [Source repository](${SITE_CONFIG.repository})`,
    "",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
