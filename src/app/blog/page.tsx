import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo";

import { BlogList } from "./_components/blog-list";

import { getQueryClient } from "@/utils/get-query-client";

import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";
import type { IssueListItem } from "@/core/entities/github-issue";
import { getAllBlogPosts } from "@/core/services/blog-content";
import { resolveDevelopmentFixture } from "@/core/utils/development-fixtures";
import { createPageMetadata, resolveSeoImage } from "@/core/utils/seo";
import { githubIssueQueryKey } from "@/stories/github-issue";

export const metadata: Metadata = createPageMetadata({
  title: "博客归档",
  description: "浏览 Bigbigbo 关于软件工程、人工智能、AI 编程、产品设计与生活观察的全部文章。",
  path: "/blog",
  keywords: ["文章归档", "Harness Engineering", "Agentic Coding"],
});

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
  let prefetchedPosts: IssueListItem[] = [];

  if (fixture === null || fixture === "exhausted") {
    try {
      const posts = await getAllBlogPosts();
      prefetchedPosts = posts.slice(0, initialPage * perPage);
      queryClient.setQueryData(githubIssueQueryKey.issueInfiniteList(perPage), {
        pages: [prefetchedPosts],
        pageParams: [initialPage],
      });
    } catch {}
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    url: absoluteUrl("/blog"),
    name: `博客归档 | ${SITE_CONFIG.name}`,
    description: "Bigbigbo 关于软件工程、人工智能、AI 编程、产品设计与生活观察的文章归档。",
    inLanguage: SITE_CONFIG.language,
    author: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    blogPost: prefetchedPosts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${post.number}`)}#article`,
      url: absoluteUrl(`/blog/${post.number}`),
      headline: post.title,
      description: post.excerpt,
      datePublished: post.created_at,
      dateModified: post.updated_at,
      image: resolveSeoImage(post.leadImage),
      author: {
        "@type": "Person",
        name: post.user.login,
        url: `https://github.com/${post.user.login}`,
      },
    })),
  };

  return (
    <main id="main-content" className="editorial-main archive-page">
      <JsonLd data={blogJsonLd} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogList initialPage={initialPage} fixture={fixture} />
      </HydrationBoundary>
    </main>
  );
}
