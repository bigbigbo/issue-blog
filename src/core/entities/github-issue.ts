import type { Issue } from "@/core/datasources/github-issue";

export function createIssue(data: Issue) {
  return {
    id: data.id,
    number: data.number,
    title: data.title,
    body: data.body,
    created_at: data.created_at,
    updated_at: data.updated_at,
    html_url: data.html_url,
    user: {
      login: data.user.login,
      avatar_url: data.user.avatar_url,
    },
    labels: data.labels.map((label: any) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
  };
}

export function createIssueListItem(data: Issue) {
  return {
    id: data.id,
    number: data.number,
    title: data.title,
    created_at: data.created_at,
    updated_at: data.updated_at,
    html_url: data.html_url,
    user: {
      login: data.user.login,
      avatar_url: data.user.avatar_url,
    },
    labels: data.labels.map((label: any) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
  };
}

export type IssueListItem = ReturnType<typeof createIssueListItem>;

export type IssueDetail = ReturnType<typeof createIssue>;
