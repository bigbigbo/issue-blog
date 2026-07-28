const markdownImagePattern = /!\[([^\]]*)\]\(\s*<?((?:https?:\/\/|\/)[^)\s>]+)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/i;
const htmlImagePattern = /<img[^>]+src=["']((?:https?:\/\/|\/)[^"']+)["'][^>]*>/i;
const publishedAtPattern = /<!--\s*published_at:\s*(\d{4}-\d{2}-\d{2})\s*-->/i;

export function extractFirstMarkdownImage(markdown: string): string | null {
  const markdownMatch = markdown.match(markdownImagePattern);

  if (markdownMatch?.[2]) {
    return markdownMatch[2];
  }

  return markdown.match(htmlImagePattern)?.[1] ?? null;
}

function decodeCommonEntities(value: string): string {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

export function extractPlainTextExcerpt(markdown: string, maximumLength = 152): string {
  const plainText = decodeCommonEntities(
    markdown
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/<img[^>]*>/gi, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, " ")
      .replace(/^ {0,3}#{1,6}\s+/gm, "")
      .replace(/^ {0,3}(?:>|[-*+]|\d+\.)\s+/gm, "")
      .replace(/[*_~`|]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );

  if (plainText.length <= maximumLength) {
    return plainText;
  }

  return `${Array.from(plainText).slice(0, maximumLength).join("").trimEnd()}…`;
}

export function extractPublishedAt(markdown: string, fallback: string): string {
  const publishedAt = markdown.match(publishedAtPattern)?.[1];

  if (!publishedAt) {
    return fallback;
  }

  const parsedDate = new Date(`${publishedAt}T00:00:00+08:00`);

  return Number.isNaN(parsedDate.valueOf()) ? fallback : parsedDate.toISOString();
}
