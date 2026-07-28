import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { BlogDetail } from "../_components/blog-detail";
import { BlogDetailState } from "../_components/blog-detail-state";

import { getQueryClient } from "@/utils/get-query-client";

import type { IssueDetail } from "@/core/entities/github-issue";
import { resolveDevelopmentFixture } from "@/core/utils/development-fixtures";
import { infiniteIssueListOptions, issueDetailQueryOptions } from "@/stories/github-issue";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const queryClient = getQueryClient();

  try {
    const posts = await queryClient.fetchInfiniteQuery(
      infiniteIssueListOptions({ perPage: 999, isServerInitialLoad: true }),
    );

    return posts.pages.flatMap((page) => page.map((post) => ({ id: post.number.toString() })));
  } catch {
    return [];
  }
}

interface BlogPostProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fixture?: string | string[] }>;
}

export default async function BlogPost({ params, searchParams }: BlogPostProps) {
  const { id } = await params;
  const issueNumber = Number.parseInt(id, 10);

  if (!Number.isFinite(issueNumber)) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const fixture = resolveDevelopmentFixture(resolvedSearchParams.fixture);

  if (fixture === "loading" || fixture === "error") {
    return (
      <main id="main-content" className="editorial-main reader-page">
        <BlogDetailState state={fixture} />
      </main>
    );
  }

  const queryClient = getQueryClient();
  let post: IssueDetail;

  try {
    post = await queryClient.fetchQuery(issueDetailQueryOptions({ issueNumber }));
  } catch {
    return (
      <main id="main-content" className="editorial-main reader-page">
        <BlogDetailState state="error" />
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main id="main-content" className="editorial-main reader-page">
        <BlogDetail issueNumber={issueNumber} initialPost={post} />
      </main>
    </HydrationBoundary>
  );
}
