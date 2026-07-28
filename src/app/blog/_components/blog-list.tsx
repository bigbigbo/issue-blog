"use client";

import { useEffect } from "react";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";

import { ArticleImage } from "@/components/editorial";

import { isBlogAuthor } from "@/core/utils/blog-authors";
import type { DevelopmentFixture } from "@/core/utils/development-fixtures";
import { useInfiniteIssueList } from "@/stories/github-issue";

interface BlogListProps {
  initialPage: number;
  fixture: DevelopmentFixture | null;
}

const archiveDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function ArchiveMasthead({ articleCount }: { articleCount: number }) {
  return (
    <header className="archive-masthead">
      <p className="archive-masthead__eyebrow">ARCHIVE / 文章索引</p>
      <h1>博客归档</h1>
      <p className="archive-masthead__intro">技术实践、产品思考，以及在四季之间留下的日常观察。</p>
      <p className="archive-masthead__count">
        <span>{String(articleCount).padStart(2, "0")}</span>
        <small>篇已载入</small>
      </p>
    </header>
  );
}

function ArchiveLoading() {
  return (
    <section className="archive-state" aria-busy="true" aria-label="博客归档正在加载">
      <p className="state-copy">正在加载文章归档</p>
      {[0, 1, 2].map((row) => (
        <div className="archive-skeleton-row" key={row} aria-hidden="true">
          <div className="editorial-skeleton archive-skeleton-row__index" />
          <div className="editorial-skeleton archive-skeleton-row__copy" />
          <div className="editorial-skeleton archive-skeleton-row__image" />
        </div>
      ))}
    </section>
  );
}

export function BlogList({ initialPage, fixture }: BlogListProps) {
  const [page, setPage] = useQueryState("page", { defaultValue: String(initialPage) });
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = useInfiniteIssueList({
    initialPage,
    perPage: 10,
    enabled: fixture === null || fixture === "exhausted",
  });

  useEffect(() => {
    if (data?.pageParams?.length) {
      const lastPageParam = data.pageParams[data.pageParams.length - 1];

      if (typeof lastPageParam === "number" && String(lastPageParam) !== page) {
        void setPage(String(lastPageParam));
      }
    }
  }, [data?.pageParams, page, setPage]);

  const issues = (data?.pages ?? []).flatMap((pageData) => pageData).filter((issue) => isBlogAuthor(issue.user.login));

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

  const handleLoadMore = async (fallbackHref: string) => {
    if (isFetchingNextPage || !hasNextPage || fixture === "exhausted") return;

    try {
      const result = await fetchNextPage();

      if (result.isError) {
        router.push(fallbackHref);
      }
    } catch {
      router.push(fallbackHref);
    }
  };

  if (fixture === "loading" || (isLoading && fixture !== "empty")) {
    return (
      <>
        <ArchiveMasthead articleCount={0} />
        <ArchiveLoading />
      </>
    );
  }

  if (fixture === "error" || isError) {
    return (
      <>
        <ArchiveMasthead articleCount={0} />
        <section className="archive-message" role="alert">
          <p className="archive-message__index">ERR / 文章索引</p>
          <h2>博客归档暂时无法读取</h2>
          <p>请重新获取文章列表。</p>
          <button type="button" className="editorial-action" onClick={handleRetry}>
            重新获取
            <ArrowRight aria-hidden="true" />
          </button>
        </section>
      </>
    );
  }

  if (fixture === "empty" || issues.length === 0) {
    return (
      <>
        <ArchiveMasthead articleCount={0} />
        <section className="archive-message archive-message--empty">
          <p className="archive-message__index">00 / 文章索引</p>
          <h2>暂无博客内容</h2>
          <p>下一篇记录正在酝酿。</p>
        </section>
      </>
    );
  }

  const isExhausted = fixture === "exhausted" || !hasNextPage;
  const nextPageSearchParams = new URLSearchParams(searchParams.toString());
  const nextPage = Number.parseInt(page, 10) + 1;
  nextPageSearchParams.set("page", String(Number.isFinite(nextPage) ? nextPage : initialPage + 1));
  const nextPageHref = `${pathname}?${nextPageSearchParams.toString()}`;

  return (
    <>
      <ArchiveMasthead articleCount={issues.length} />

      <section className="archive-list" aria-label="博客文章列表">
        {issues.map((issue, index) => (
          <motion.article
            key={issue.id}
            className="archive-entry"
            data-reverse={index % 2 === 1}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.32, delay: Math.min(index, 4) * 0.04, ease: "easeOut" }
            }
          >
            <Link href={`/blog/${issue.number}`} className="archive-entry__link">
              <div className="archive-entry__index" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{index === 0 ? "/ 最新" : "/ 文章"}</small>
              </div>

              <div className="archive-entry__copy">
                <p className="archive-entry__meta">
                  <time dateTime={issue.created_at}>{archiveDateFormatter.format(new Date(issue.created_at))}</time>
                  <span>{issue.user.login}</span>
                </p>
                <h2>{issue.title}</h2>
                <p className="archive-entry__excerpt">{issue.excerpt || "一篇关于技术、观察与日常节律的记录。"}</p>
                {issue.labels.length > 0 && (
                  <ul className="archive-entry__labels" aria-label="文章标签">
                    {issue.labels.map((label) => (
                      <li key={label.id}>{label.name}</li>
                    ))}
                  </ul>
                )}
                <span className="archive-entry__read">
                  阅读文章
                  <ArrowRight aria-hidden="true" />
                </span>
              </div>

              <ArticleImage
                source={issue.leadImage}
                alt={`${issue.title}的文章题图`}
                sizes="(max-width: 767px) 100vw, 42vw"
                className="archive-entry__image"
                imageClassName="archive-entry__image-asset"
                priority={index === 0}
              />
            </Link>
          </motion.article>
        ))}
      </section>

      <footer className="archive-pagination" aria-live="polite" aria-atomic="true">
        {isExhausted ? (
          <p>
            <span>END</span>
            已载入全部文章，没有更多内容了
          </p>
        ) : (
          <>
            <a
              href={nextPageHref}
              className="editorial-action editorial-action--solid"
              onClick={(event) => {
                event.preventDefault();
                void handleLoadMore(nextPageHref);
              }}
              aria-disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "正在加载更多文章" : "加载更多"}
              {!isFetchingNextPage && <ArrowRight aria-hidden="true" />}
            </a>
            <p className="archive-pagination__status">
              {isFetchingNextPage ? "新文章正在加入当前列表" : `当前第 ${page} 页`}
            </p>
          </>
        )}
      </footer>
    </>
  );
}
