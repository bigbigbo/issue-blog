import type { Issue } from "@/core/datasources/github-issue";

export interface IssueLabel {
  id: number;
  name: string;
  color: string;
}

export interface IssueUser {
  login: string;
  avatar_url: string;
}

export interface IssueDetail {
  id: number;
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: IssueUser;
  labels: IssueLabel[];
}

export interface IssueListItem {
  id: number;
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: IssueUser;
  labels: IssueLabel[];
}

export function createIssue(data: Issue): IssueDetail {
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
    labels: data.labels.map((label) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
  };
}

export function createIssueListItem(data: Issue): IssueListItem {
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
    labels: data.labels.map((label) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
  };
}
