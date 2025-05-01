import ky from "ky";

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

const GITHUB_API_BASE = "https://api.github.com";
const OWNER = process.env.GITHUB_REPO_OWNER || "bigbigbo";
const REPO = process.env.GITHUB_REPO_NAME || "issue-blog";
const TOKEN = process.env.GITHUB_ACCESS_TOKEN;

export async function getIssues(page = 1, perPage = 10): Promise<Issue[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (TOKEN) {
      headers["Authorization"] = `token ${TOKEN}`;
    }

    const issues = await ky
      .get(`${GITHUB_API_BASE}/repos/${OWNER}/${REPO}/issues`, {
        searchParams: {
          state: "open",
          sort: "created",
          direction: "desc",
          page: String(page),
          per_page: String(perPage),
        },
        headers,
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
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (TOKEN) {
      headers["Authorization"] = `token ${TOKEN}`;
    }

    const issue = await ky
      .get(`${GITHUB_API_BASE}/repos/${OWNER}/${REPO}/issues/${issueNumber}`, { headers })
      .json<Issue>();

    return issue;
  } catch (error) {
    console.error(`Error fetching issue #${issueNumber}:`, error);
    return null;
  }
}
