"use client";

import { useEffect } from "react";

import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";

import type { IssueListItem } from "@/core/entities/github-issue";
import { useInfiniteIssueList } from "@/stories/github-issue";

interface BlogListClientProps {
  initialIssues?: IssueListItem[];
  initialPage: number;
}

export function BlogList({ initialPage }: BlogListClientProps) {
  const [page, setPage] = useQueryState("page", { defaultValue: String(initialPage) });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteIssueList({
    initialPage: initialPage,
    perPage: 10,
  });

  useEffect(() => {
    if (data?.pageParams?.length) {
      const lastPageParam = data.pageParams[data.pageParams.length - 1];

      if (typeof lastPageParam === "number" && String(lastPageParam) !== page) {
        setPage(String(lastPageParam));
      }
    }
  }, [data?.pageParams, page, setPage]);

  const issues = data?.pages.flatMap((pageData) => pageData) || [];

  const handleLoadMore = async () => {
    if (isFetchingNextPage || !hasNextPage) return;
    await fetchNextPage();
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
        <p className="mt-2 text-gray-400">加载中...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl text-red-500">获取博客列表失败</h3>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl text-gray-500">暂无博客内容</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="mb-6 text-center text-4xl font-bold">我的博客</h1>
      <div className="space-y-6">
        {issues.map((issue) => (
          <Link
            href={`/blog/${issue.number}`}
            key={issue.id}
            className="block rounded-lg bg-white/5 p-6 shadow transition-colors hover:bg-white/10"
          >
            <h3 className="mb-2 text-xl font-semibold">{issue.title}</h3>
            <div className="mb-2 flex items-center text-sm text-gray-400">
              <div className="mr-4 flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(issue.created_at).toLocaleDateString("zh-CN")}</span>
              </div>
              <div className="flex items-center">
                <Image
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  className="mr-1 h-5 w-5 rounded-full"
                  width={20}
                  height={20}
                />
                <span>{issue.user.login}</span>
              </div>
            </div>
            {issue.labels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {issue.labels.map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center rounded px-2 py-1 text-xs"
                    style={{ backgroundColor: `#${label.color}20`, color: `#${label.color}` }}
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        {hasNextPage ? (
          <button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="rounded-full bg-blue-600 px-8 py-3 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFetchingNextPage ? (
              <span className="flex items-center">
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
                加载中...
              </span>
            ) : (
              "加载更多"
            )}
          </button>
        ) : (
          <div className="text-center text-gray-400">没有更多内容了</div>
        )}
      </div>
    </div>
  );
}
