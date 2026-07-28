import Image from "next/image";

const FALLBACK_IMAGE = "/images/editorial/article-shadows.png";
const APPROVED_REMOTE_HOSTS = new Set([
  "avatars.githubusercontent.com",
  "camo.githubusercontent.com",
  "github.com",
  "private-user-images.githubusercontent.com",
  "raw.githubusercontent.com",
  "user-images.githubusercontent.com",
]);

function resolveArticleImage(source?: string | null): { source: string; isFallback: boolean } {
  if (!source) {
    return { source: FALLBACK_IMAGE, isFallback: true };
  }

  if (source.startsWith("/")) {
    return { source, isFallback: false };
  }

  try {
    const url = new URL(source);

    if (url.protocol === "https:" && APPROVED_REMOTE_HOSTS.has(url.hostname)) {
      return { source, isFallback: false };
    }
  } catch {
    return { source: FALLBACK_IMAGE, isFallback: true };
  }

  return { source: FALLBACK_IMAGE, isFallback: true };
}

interface ArticleImageProps {
  source?: string | null;
  alt: string;
  fallbackAlt?: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function ArticleImage({
  source,
  alt,
  fallbackAlt = "树影落在墙面上的编辑照片",
  sizes,
  className,
  imageClassName,
  priority = false,
}: ArticleImageProps) {
  const resolvedImage = resolveArticleImage(source);

  return (
    <figure className={className} data-image-source={resolvedImage.isFallback ? "editorial-fallback" : "article"}>
      <Image
        src={resolvedImage.source}
        alt={resolvedImage.isFallback ? fallbackAlt : alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imageClassName}
        unoptimized={resolvedImage.source.startsWith("https://")}
      />
    </figure>
  );
}
