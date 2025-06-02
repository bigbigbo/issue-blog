import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogDetail } from "../_components/blog-detail";

import { getQueryClient } from "@/utils/get-query-client";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";
import { infiniteIssueListOptions, issueDetailQueryOptions } from "@/stories/github-issue";

export const revalidate = 300;

export async function generateStaticParams() {
  const queryClient = getQueryClient();
  const posts = await queryClient.fetchInfiniteQuery(
    infiniteIssueListOptions({ perPage: 999, isServerInitialLoad: true }),
  );
  return posts.pages.flatMap((page) => page.map((post) => ({ id: post.number.toString() })));
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const queryClient = getQueryClient();

  const post = await queryClient.fetchQuery(issueDetailQueryOptions({ issueNumber: parseInt(id) }));

  if (!post) {
    notFound();
  }

  // 获取当前节气主题色
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const themeColor = currentSolarTerm.themeColor;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="relative min-h-screen pb-20">
        {/* 装饰性背景 */}
        <div
          className="absolute top-0 left-0 h-96 w-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${themeColor}40 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-4xl px-6 pt-8 md:px-8">
          {/* 返回按钮 */}
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center rounded-full border border-gray-200 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white hover:text-gray-900"
            style={{
              boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            返回博客列表
          </Link>

          <BlogDetail issueNumber={parseInt(id)} initialPost={post} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
