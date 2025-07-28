"use client";

import { useEffect } from "react";

import { Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useQueryState } from "nuqs";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";
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

  // 获取当前节气主题色
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const themeColor = currentSolarTerm.themeColor;

  useEffect(() => {
    if (data?.pageParams?.length) {
      const lastPageParam = data.pageParams[data.pageParams.length - 1];

      if (typeof lastPageParam === "number" && String(lastPageParam) !== page) {
        setPage(String(lastPageParam));
      }
    }
  }, [data?.pageParams, page, setPage]);

  const issues = (data?.pages || [])
    .flatMap((pageData) => pageData)
    .filter((issue) => {
      return issue.user.login === process.env.NEXT_PUBLIC_BLOG_AUTHOR;
    });

  const handleLoadMore = async () => {
    if (isFetchingNextPage || !hasNextPage) return;
    await fetchNextPage();
  };

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <motion.div
          className="mx-auto h-8 w-8 rounded-full border-2 border-gray-300"
          style={{
            borderTopColor: themeColor,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 text-gray-600">加载中...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl text-red-600">获取博客列表失败</h3>
        <p className="mt-2 text-gray-500">请稍后重试</p>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl text-gray-700">暂无博客内容</h3>
        <p className="mt-2 text-gray-500">敬请期待更多精彩内容</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* 标题 */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-4 text-5xl font-bold text-gray-800">我的博客</h1>
        <div className="mx-auto h-1 w-20 rounded-full" style={{ backgroundColor: themeColor }} />
        <p className="mt-4 text-lg text-gray-600">记录技术学习与生活感悟</p>
      </motion.div>

      {/* 博客列表 */}
      <div className="space-y-6">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${issue.number}`} className="group block transition-all duration-300">
              <motion.article
                className="rounded-xl border border-gray-200 bg-white/90 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-lg"
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 20px ${themeColor}20`,
                }}
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
                }}
              >
                <h3 className="mb-4 text-2xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                  {issue.title}
                </h3>

                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" style={{ color: themeColor }} />
                    <span>{new Date(issue.created_at).toLocaleDateString("zh-CN")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={issue.user.avatar_url}
                      alt={issue.user.login}
                      className="h-5 w-5 rounded-full"
                      width={20}
                      height={20}
                    />
                    <span>{issue.user.login}</span>
                  </div>
                </div>

                {issue.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {issue.labels.map((label) => (
                      <motion.span
                        key={label.id}
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `#${label.color}15`,
                          color: `#${label.color}`,
                          border: `1px solid #${label.color}30`,
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {label.name}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 加载更多按钮 */}
      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {hasNextPage ? (
          <motion.button
            onClick={handleLoadMore}
            disabled={isFetchingNextPage}
            className="rounded-full px-8 py-3 font-medium text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${themeColor}90, ${themeColor})`,
              boxShadow: `0 8px 20px ${themeColor}30`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 12px 25px ${themeColor}40`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isFetchingNextPage ? (
              <span className="flex items-center gap-2">
                <motion.span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                加载中...
              </span>
            ) : (
              "加载更多"
            )}
          </motion.button>
        ) : (
          <div className="text-center text-gray-500">
            <div className="mx-auto mb-2 h-px w-16" style={{ backgroundColor: themeColor }} />
            没有更多内容了
          </div>
        )}
      </motion.div>
    </div>
  );
}
