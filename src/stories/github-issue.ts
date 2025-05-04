import { useQuery } from "@tanstack/react-query";

import type { IssueDetail, IssueListItem } from "@/core/entities/github-issue";
import { GithubIssueService } from "@/core/services/github-issue";

export const githubIssueQueryKey = {
  issueList: (page: number, perPage: number) => ["issues", page, perPage],
  issueDetail: (issueId: number) => ["issue", issueId],
} as const;

interface UseIssueListOptions {
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export function useIssueList({ page = 1, perPage = 10, enabled = true }: UseIssueListOptions = {}) {
  return useQuery<IssueListItem[]>({
    queryKey: githubIssueQueryKey.issueList(page, perPage),
    queryFn: () => GithubIssueService.getIssueList({ page, perPage }),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
}

interface UseIssueDetailOptions {
  issueId: number;
  enabled?: boolean;
}

export function useIssueDetail({ issueId, enabled = true }: UseIssueDetailOptions) {
  return useQuery<IssueDetail | null>({
    queryKey: githubIssueQueryKey.issueDetail(issueId),
    queryFn: () => GithubIssueService.getIssueDetail(issueId),
    enabled: enabled && !!issueId,
    staleTime: 1000 * 60 * 5,
  });
}
