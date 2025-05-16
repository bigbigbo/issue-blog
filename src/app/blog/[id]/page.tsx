import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogDetail } from "../_components/blog-detail";

import { getQueryClient } from "@/utils/get-query-client";

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pb-20">
        <div className="absolute top-0 left-0 h-72 w-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-30 blur-3xl" />

        <div className="relative mx-auto w-full max-w-4xl px-6 pt-12 md:px-8">
          <Link
            href="/blog"
            className="group mb-12 inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm transition hover:bg-white/10 hover:text-blue-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            返回博客列表
          </Link>

          <BlogDetail issueNumber={parseInt(id)} initialPost={post} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
