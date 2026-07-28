import { githubClient } from "@/libs/request/github-client";

import { extractPublishedAt } from "@/core/utils/article-content";
import { blogAuthors } from "@/core/utils/blog-authors";

const OWNER = process.env.GITHUB_REPO_OWNER;
const REPO = process.env.GITHUB_REPO_NAME;

if (!OWNER || !REPO) {
  throw new Error(
    "请在环境变量中设置 GITHUB_REPO_OWNER 和 GITHUB_REPO_NAME。\n" +
      "请在 .env.development 文件中添加：\n" +
      "GITHUB_REPO_OWNER=你的GitHub用户名\n" +
      "GITHUB_REPO_NAME=你的仓库名称",
  );
}

const REPOSITORY_OWNER = OWNER;
const REPOSITORY_NAME = REPO;

export interface Issue {
  id: number;
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: {
    id: number;
    name: string;
    color: string;
  }[];
}

export async function getIssueList({ page, perPage }: { page: number; perPage: number }) {
  const authors = blogAuthors.length > 0 ? blogAuthors : [REPOSITORY_OWNER];
  const requestedCount = page * perPage;
  const pageCount = Math.ceil(requestedCount / 100);
  const responses = await Promise.all(
    authors.flatMap((creator) =>
      Array.from({ length: pageCount }, (_, pageIndex) =>
        githubClient
          .get(`repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/issues`, {
            params: {
              state: "open",
              sort: "created",
              direction: "desc",
              page: String(pageIndex + 1),
              per_page: "100",
              creator,
            },
          })
          .json<Issue[]>(),
      ),
    ),
  );

  const uniqueIssues = new Map<number, Issue>();

  responses.flat().forEach((issue) => {
    uniqueIssues.set(issue.id, issue);
  });

  const startIndex = (page - 1) * perPage;
  const response = Array.from(uniqueIssues.values())
    .sort(
      (left, right) =>
        Date.parse(extractPublishedAt(right.body, right.created_at)) -
        Date.parse(extractPublishedAt(left.body, left.created_at)),
    )
    .slice(startIndex, startIndex + perPage);

  return response;
}

export async function getIssueDetail(issueNumber: number) {
  const response = await githubClient
    .get(`repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}/issues/${issueNumber}`)
    .json<Issue>();

  return response;
}
