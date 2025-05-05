import { infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { GithubIssueService } from "@/core/services/github-issue";

export const githubIssueQueryKey = {
  issueInfiniteList: (perPage: number) => ["issues", "infinite", perPage],
  issueDetail: (issueId: number) => ["issue", issueId],
} as const;

export interface UseInfiniteIssueListOptions {
  perPage?: number;
  initialPage?: number;
  enabled?: boolean;
  isServerInitialLoad?: boolean;
}

export const infiniteIssueListOptions = (options: UseInfiniteIssueListOptions = {}) => {
  const { perPage = 10, initialPage = 1, enabled = true, isServerInitialLoad = false } = options;

  return infiniteQueryOptions({
    queryKey: githubIssueQueryKey.issueInfiniteList(perPage),
    queryFn: ({ pageParam }) => {
      if (isServerInitialLoad) {
        const serverPageSize = initialPage * perPage;
        return GithubIssueService.getIssueList({ page: 1, perPage: serverPageSize });
      }

      const page = typeof pageParam === "number" ? pageParam : initialPage;
      return GithubIssueService.getIssueList({ page, perPage });
    },
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const expectedItemsCount = lastPageParam * perPage;
      const actualItemsCount = allPages.reduce((acc, page) => acc + page.length, 0);

      const hasNextPage = actualItemsCount === expectedItemsCount;
      const nextPage = typeof lastPageParam === "number" ? lastPageParam + 1 : initialPage + 1;

      return hasNextPage ? nextPage : undefined;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export function useInfiniteIssueList(options: UseInfiniteIssueListOptions = {}) {
  const infiniteOptions = infiniteIssueListOptions({ ...options, isServerInitialLoad: false });
  return useInfiniteQuery(infiniteOptions);
}

export interface UseIssueDetailOptions {
  issueNumber: number;
  enabled?: boolean;
}

export const issueDetailQueryOptions = ({ issueNumber, enabled = true }: UseIssueDetailOptions) =>
  queryOptions({
    queryKey: githubIssueQueryKey.issueDetail(issueNumber),
    queryFn: () => GithubIssueService.getIssueDetail(issueNumber),
    enabled: enabled && !!issueNumber,
    staleTime: 1000 * 60 * 5,
  });

export function useIssueDetail({ issueNumber: issueId, enabled = true }: UseIssueDetailOptions) {
  const detailOptions = issueDetailQueryOptions({ issueNumber: issueId, enabled: enabled && !!issueId });
  return useQuery(detailOptions);
}
