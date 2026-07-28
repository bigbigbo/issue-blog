"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface BlogDetailStateProps {
  state: "loading" | "error";
}

export function BlogDetailState({ state }: BlogDetailStateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRetry = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("fixture");
    const query = nextSearchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    router.refresh();
  };

  if (state === "loading") {
    return (
      <article className="reader-state" aria-busy="true" aria-label="文章正在加载">
        <Link href="/blog" className="reader-back-link">
          <ArrowLeft aria-hidden="true" />
          返回博客归档
        </Link>
        <p className="state-copy">正在加载文章正文</p>
        <div className="editorial-skeleton reader-state__title" aria-hidden="true" />
        <div className="editorial-skeleton reader-state__hero" aria-hidden="true" />
        <div className="reader-state__body" aria-hidden="true">
          <div className="editorial-skeleton" />
          <div className="editorial-skeleton" />
          <div className="editorial-skeleton" />
          <div className="editorial-skeleton" />
        </div>
      </article>
    );
  }

  return (
    <article className="reader-message" role="alert">
      <p className="reader-message__index">ERR / READER</p>
      <h1>文章暂时无法读取</h1>
      <p>请重新获取正文，或先返回博客归档。</p>
      <div className="reader-message__actions">
        <button type="button" className="editorial-action editorial-action--solid" onClick={handleRetry}>
          重新获取
          <ArrowRight aria-hidden="true" />
        </button>
        <Link href="/blog" className="editorial-action">
          返回博客归档
          <ArrowLeft aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
