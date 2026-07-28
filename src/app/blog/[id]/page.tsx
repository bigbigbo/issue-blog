import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { HTTPError } from "ky";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo";

import { BlogDetail } from "../_components/blog-detail";
import { BlogDetailState } from "../_components/blog-detail-state";

import { getQueryClient } from "@/utils/get-query-client";

import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";
import type { IssueDetail } from "@/core/entities/github-issue";
import { getAllBlogPosts, getBlogPost } from "@/core/services/blog-content";
import { resolveDevelopmentFixture } from "@/core/utils/development-fixtures";
import { resolveSeoImage } from "@/core/utils/seo";
import { githubIssueQueryKey } from "@/stories/github-issue";

export const revalidate = 300;
export const dynamicParams = true;

function parseIssueNumber(id: string): number | null {
  if (!/^\d+$/.test(id)) {
    return null;
  }

  const issueNumber = Number(id);
  return Number.isSafeInteger(issueNumber) && issueNumber > 0 ? issueNumber : null;
}

function isNotFoundError(error: unknown): boolean {
  return error instanceof HTTPError && error.response.status === 404;
}

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();

    return posts.map((post) => ({ id: post.number.toString() }));
  } catch {
    return [];
  }
}

interface BlogPostProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fixture?: string | string[] }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { id } = await params;
  const issueNumber = parseIssueNumber(id);

  if (!issueNumber) {
    notFound();
  }

  let post: IssueDetail;

  try {
    post = await getBlogPost(issueNumber);
  } catch (error) {
    if (isNotFoundError(error)) {
      notFound();
    }

    return {
      title: "文章暂时不可用",
      description: "这篇文章暂时无法读取，请稍后再试。",
      alternates: {
        canonical: absoluteUrl(`/blog/${issueNumber}`),
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = absoluteUrl(`/blog/${post.number}`);
  const socialImage = resolveSeoImage(post.leadImage);
  const labels = post.labels.map((label) => label.name);

  return {
    title: post.title,
    description: post.excerpt,
    keywords: labels,
    authors: [
      {
        name: post.user.login,
        url: `https://github.com/${post.user.login}`,
      },
    ],
    category: labels[0],
    alternates: {
      canonical: canonicalUrl,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
        "text/plain": absoluteUrl("/llms.txt"),
      },
    },
    openGraph: {
      type: "article",
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [`https://github.com/${post.user.login}`],
      tags: labels,
      images: [
        {
          url: socialImage,
          alt: `${post.title}的文章题图`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: SITE_CONFIG.author.xHandle,
      title: post.title,
      description: post.excerpt,
      images: [socialImage],
    },
  };
}

export default async function BlogPost({ params, searchParams }: BlogPostProps) {
  const { id } = await params;
  const issueNumber = parseIssueNumber(id);

  if (!issueNumber) {
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
    post = await getBlogPost(issueNumber);
  } catch (error) {
    if (isNotFoundError(error)) {
      notFound();
    }

    return (
      <main id="main-content" className="editorial-main reader-page">
        <BlogDetailState state="error" />
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  queryClient.setQueryData(githubIssueQueryKey.issueDetail(issueNumber), post);

  const canonicalUrl = absoluteUrl(`/blog/${post.number}`);
  const labels = post.labels.map((label) => label.name);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: [resolveSeoImage(post.leadImage)],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    inLanguage: SITE_CONFIG.language,
    author: {
      "@type": "Person",
      name: post.user.login,
      url: `https://github.com/${post.user.login}`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#person`,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${absoluteUrl("/blog")}#blog`,
      name: `博客归档 | ${SITE_CONFIG.name}`,
    },
    keywords: labels,
    articleSection: labels[0],
    sameAs: post.html_url,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "博客归档",
        item: absoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main id="main-content" className="editorial-main reader-page">
        <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
        <BlogDetail issueNumber={issueNumber} initialPost={post} />
      </main>
    </HydrationBoundary>
  );
}
