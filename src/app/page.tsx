import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { EditorialHome } from "@/components/home";

import { getQueryClient } from "@/utils/get-query-client";

import {
  resolveDevelopmentDate,
  resolveDevelopmentFixture,
  resolveDevelopmentReducedMotion,
} from "@/core/utils/development-fixtures";
import { infiniteIssueListOptions } from "@/stories/github-issue";

export const metadata: Metadata = {
  title: "二十四节气",
  description: "以二十四节气为线索，阅读 Bigbigbo 的技术笔记与生活观察。",
};

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
    await queryClient.prefetchInfiniteQuery(
      infiniteIssueListOptions({
        initialPage: 1,
        perPage: 6,
        isServerInitialLoad: true,
      }),
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main id="main-content" className="editorial-main">
        <EditorialHome dateIso={viewDate.toISOString()} fixture={fixture} forceReducedMotion={forceReducedMotion} />
      </main>
    </HydrationBoundary>
  );
}
