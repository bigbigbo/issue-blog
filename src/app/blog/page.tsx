import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { BlogList } from "./_components/blog-list";

import { getQueryClient } from "@/utils/get-query-client";

import { infiniteIssueListOptions } from "@/stories/github-issue";

export const revalidate = 300;

const perPage = 10;

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const searchParams = await props.searchParams;
  const initialPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    infiniteIssueListOptions({
      initialPage,
      perPage,
      isServerInitialLoad: true,
    }),
  );

  return (
    <main className="blog-page flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <div className="mx-auto w-full max-w-4xl">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BlogList initialPage={initialPage} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
