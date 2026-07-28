import { unstable_cache } from "next/cache";

import { GithubIssueService } from "@/core/services/github-issue";

const repositoryCacheKey = [
  process.env.GITHUB_REPO_OWNER ?? "",
  process.env.GITHUB_REPO_NAME ?? "",
  process.env.NEXT_PUBLIC_BLOG_AUTHORS ?? "",
];

export const getAllBlogPosts = unstable_cache(
  () => GithubIssueService.getAllIssueList(),
  ["github-blog-posts-v2", ...repositoryCacheKey],
  {
    revalidate: 300,
    tags: ["blog-posts"],
  },
);

export const getBlogPost = unstable_cache(
  (issueNumber: number) => GithubIssueService.getIssueDetail(issueNumber),
  ["github-blog-post-v2", ...repositoryCacheKey],
  {
    revalidate: 300,
    tags: ["blog-posts"],
  },
);
