"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface LoadMoreButtonProps {
  currentPage: number;
  hasMore: boolean;
  isLoading?: boolean;
}

export function LoadMoreButton({ currentPage, hasMore, isLoading = false }: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (currentPage + 1).toString());
    router.push(`/blog?${params.toString()}`);
  };

  if (!hasMore) {
    return <div className="mt-12 text-center text-gray-400">没有更多内容了</div>;
  }

  return (
    <div className="mt-12 flex justify-center">
      <button
        onClick={handleLoadMore}
        disabled={isLoading}
        className="rounded-full bg-blue-600 px-8 py-3 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center">
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
            加载中...
          </span>
        ) : (
          "加载更多"
        )}
      </button>
    </div>
  );
}
