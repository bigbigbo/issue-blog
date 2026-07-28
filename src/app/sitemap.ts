import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/core/constants/site";
import type { IssueListItem } from "@/core/entities/github-issue";
import { getAllBlogPosts } from "@/core/services/blog-content";
import { resolveSeoImage } from "@/core/utils/seo";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: IssueListItem[] = [];

  try {
    posts = await getAllBlogPosts();
  } catch {
    posts = [];
  }

  const latestPostUpdate = posts.reduce<string | undefined>((latest, post) => {
    if (!latest || Date.parse(post.updated_at) > Date.parse(latest)) {
      return post.updated_at;
    }

    return latest;
  }, undefined);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPostUpdate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPostUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/solar-term"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.number}`),
      lastModified: post.updated_at,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(post.leadImage ? { images: [resolveSeoImage(post.leadImage)] } : {}),
    })),
  ];
}
