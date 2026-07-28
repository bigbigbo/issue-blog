import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { EditorialHome } from "@/components/home";

import { getQueryClient } from "@/utils/get-query-client";

import { getAllBlogPosts } from "@/core/services/blog-content";
import {
  resolveDevelopmentDate,
  resolveDevelopmentFixture,
  resolveDevelopmentReducedMotion,
} from "@/core/utils/development-fixtures";
import { createPageMetadata } from "@/core/utils/seo";
import { githubIssueQueryKey } from "@/stories/github-issue";

export const metadata: Metadata = createPageMetadata({
  title: "Bigbigbo｜技术笔记、产品思考与二十四节气",
  description: "以二十四节气为时间线索，阅读 Bigbigbo 关于软件工程、AI 编程、产品思考与生活观察的最新文章。",
  path: "/",
  absoluteTitle: true,
});

export const revalidate = 300;

interface HomePageProps {
  searchParams: Promise<{
    date?: string | string[];
    fixture?: string | string[];
    motion?: string | string[];
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const fixture = resolveDevelopmentFixture(resolvedSearchParams.fixture);
  const deterministicDate = resolveDevelopmentDate(resolvedSearchParams.date);
  const forceReducedMotion = resolveDevelopmentReducedMotion(resolvedSearchParams.motion);
  const viewDate = deterministicDate ?? new Date();
  const queryClient = getQueryClient();

  if (fixture === null || fixture === "exhausted") {
    try {
      const posts = await getAllBlogPosts();
      queryClient.setQueryData(githubIssueQueryKey.issueInfiniteList(6), {
        pages: [posts.slice(0, 6)],
        pageParams: [1],
      });
    } catch {}
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main id="main-content" className="editorial-main">
        <EditorialHome dateIso={viewDate.toISOString()} fixture={fixture} forceReducedMotion={forceReducedMotion} />
      </main>
    </HydrationBoundary>
  );
}
