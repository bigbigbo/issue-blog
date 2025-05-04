import { githubClient } from "@/libs/request/github-client";

const OWNER = "bigbigbo";
const REPO = "issue-blog";

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
