"use client";

import { useEffect, useMemo, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ArticleImage } from "@/components/editorial";

import { isBlogAuthor } from "@/core/utils/blog-authors";
import type { DevelopmentFixture } from "@/core/utils/development-fixtures";
import { useInfiniteIssueList } from "@/stories/github-issue";

interface LatestArticleProps {
  fixture: DevelopmentFixture | null;
  forceReducedMotion?: boolean;
}

const articleDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function LatestArticle({ fixture, forceReducedMotion = false }: LatestArticleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const systemPrefersReducedMotion = useReducedMotion();
  const prefersReducedMotion = forceReducedMotion || systemPrefersReducedMotion;
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isLoading, isError, refetch } = useInfiniteIssueList({
    initialPage: 1,
    perPage: 6,
    enabled: fixture === null || fixture === "exhausted",
  });

  const articles = useMemo(() => {
    return (data?.pages ?? [])
      .flatMap((page) => page)
      .filter((issue) => isBlogAuthor(issue.user.login))
      .slice(0, 6);
  }, [data?.pages]);

  useEffect(() => {
    if (activeIndex >= articles.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, articles.length]);

  const clearFixture = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("fixture");
    const query = nextSearchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    router.refresh();
  };

  const handleRetry = () => {
    if (fixture === "error") {
      clearFixture();
      return;
    }

    void refetch();
  };

  if (fixture === "loading" || (isLoading && fixture !== "empty")) {
    return (
      <section className="latest-article latest-article--state" aria-busy="true" aria-label="最新文章正在加载">
        <div className="latest-article__heading">
          <span>最新文章</span>
          <span className="state-copy">正在加载文章内容</span>
        </div>
        <div className="editorial-skeleton editorial-skeleton--index" aria-hidden="true" />
        <div className="editorial-skeleton editorial-skeleton--copy" aria-hidden="true" />
        <div className="editorial-skeleton editorial-skeleton--image" aria-hidden="true" />
      </section>
    );
  }

  if (fixture === "error" || isError) {
    return (
      <section className="latest-article latest-article--message" role="alert">
        <p className="latest-article__eyebrow">01 / 最新</p>
        <h2>文章暂时没有抵达</h2>
        <p>请重新获取最新文章，现有导航仍可继续使用。</p>
        <button type="button" className="editorial-action" onClick={handleRetry}>
          重新获取
          <ArrowRight aria-hidden="true" />
        </button>
      </section>
    );
  }

  if (fixture === "empty" || articles.length === 0) {
    return (
      <section className="latest-article latest-article--message">
        <p className="latest-article__eyebrow">01 / 最新</p>
        <h2>暂无文章</h2>
        <p>新的技术笔记与生活观察会在这里出现。</p>
        <Link href="/blog" className="editorial-action">
          前往博客
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    );
  }

  const activeArticle = articles[activeIndex];
  const canCycle = articles.length > 1;
  const activeImageSource = activeIndex === 0 ? "/images/editorial/article-shadows.png" : activeArticle.leadImage;
  const activeImageAlt = activeIndex === 0 ? "树影落在墙面上的编辑照片" : `${activeArticle.title}的文章题图`;
  const liveMessage =
    activeIndex === 0
      ? `当前显示最新文章：${activeArticle.title}`
      : `已切换至第 ${String(activeIndex + 1).padStart(2, "0")} 篇：${activeArticle.title}`;

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + articles.length) % articles.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % articles.length);
  };

  return (
    <section className="latest-article" aria-labelledby="latest-article-title">
      <div className="latest-article__heading" aria-hidden="true">
        <span>最新文章</span>
        <span>RECENT NOTE</span>
      </div>

      <div className="latest-article__index">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <small>{activeIndex === 0 ? "/ 最新" : `/ ${String(articles.length).padStart(2, "0")}`}</small>
        <div className="latest-article__controls">
          <button type="button" onClick={showPrevious} disabled={!canCycle} aria-label="上一篇文章">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={showNext} disabled={!canCycle} aria-label="下一篇文章">
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeArticle.id}
          className="latest-article__copy"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
        >
          <p className="latest-article__meta">
            <time dateTime={activeArticle.created_at}>
              {articleDateFormatter.format(new Date(activeArticle.created_at))}
            </time>
            <span>{activeArticle.user.login}</span>
          </p>
          <h2 id="latest-article-title">{activeArticle.title}</h2>
          <p className="latest-article__excerpt">{activeArticle.excerpt || "一篇关于技术、观察与日常节律的记录。"}</p>
          <Link href={`/blog/${activeArticle.number}`} className="editorial-action">
            阅读全文
            <ArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`image-${activeArticle.id}`}
          className="latest-article__visual"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }}
        >
          <ArticleImage
            source={activeImageSource}
            alt={activeImageAlt}
            sizes="(max-width: 767px) 100vw, 37vw"
            className="latest-article__image"
            imageClassName="latest-article__image-asset"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <p className="latest-article__announcement" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </p>
    </section>
  );
}
