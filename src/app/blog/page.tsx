import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { BlogList } from "./_components/blog-list";

import { getQueryClient } from "@/utils/get-query-client";

import { resolveDevelopmentFixture } from "@/core/utils/development-fixtures";
import { infiniteIssueListOptions } from "@/stories/github-issue";

export const metadata: Metadata = {
  title: "博客归档",
  description: "Bigbigbo 的技术笔记、生活观察与长期记录。",
};

export const revalidate = 300;

const perPage = 10;

interface BlogPageProps {
  searchParams: Promise<{
    fixture?: string | string[];
    page?: string | string[];
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const pageValue = Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page;
  const parsedPage = pageValue ? Number.parseInt(pageValue, 10) : 1;
  const initialPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const fixture = resolveDevelopmentFixture(resolvedSearchParams.fixture);
  const queryClient = getQueryClient();

  if (fixture === null || fixture === "exhausted") {
    await queryClient.prefetchInfiniteQuery(
      infiniteIssueListOptions({
        initialPage,
        perPage,
        isServerInitialLoad: true,
      }),
    );
  }

  return (
    <main id="main-content" className="editorial-main archive-page">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogList initialPage={initialPage} fixture={fixture} />
      </HydrationBoundary>
    </main>
  );
}
