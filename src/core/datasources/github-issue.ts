import { githubClient } from "@/libs/request/github-client";

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
  const response = await githubClient
    .get(`repos/${OWNER}/${REPO}/issues`, {
      params: {
        state: "open",
        sort: "created",
        direction: "desc",
        page: String(page),
        per_page: String(perPage),
      },
    })
    .json<Issue[]>();

  return response;
}

export async function getIssueDetail(issueNumber: number) {
  const response = await githubClient.get(`repos/${OWNER}/${REPO}/issues/${issueNumber}`).json<Issue>();

  return response;
}
