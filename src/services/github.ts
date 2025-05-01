import { githubClient } from "@/libs/request/github-client";

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

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

const OWNER = process.env.GITHUB_REPO_OWNER || "bigbigbo";
const REPO = process.env.GITHUB_REPO_NAME || "issue-blog";

export async function getIssues(page = 1, perPage = 10): Promise<Issue[]> {
  try {
    const issues = await githubClient
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

    return issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
}

export async function getIssueById(issueNumber: number): Promise<Issue | null> {
  try {
    const issue = await githubClient.get(`repos/${OWNER}/${REPO}/issues/${issueNumber}`).json<Issue>();
    return issue;
  } catch (error) {
    console.error(`Error fetching issue #${issueNumber}:`, error);
    return null;
  }
}

export async function getRepoInfo(): Promise<GithubRepo | null> {
  try {
    return await githubClient.get(`repos/${OWNER}/${REPO}`).json<GithubRepo>();
  } catch (error) {
    console.error("Error fetching repo info:", error);
    return null;
  }
}

export async function getUserInfo(username: string): Promise<GithubUser | null> {
  try {
    return await githubClient.get(`users/${username}`).json<GithubUser>();
  } catch (error) {
    console.error(`Error fetching user info for ${username}:`, error);
    return null;
  }
}
