import { getIssueDetail, getIssueList } from "../datasources/github-issue";
import { createIssue, createIssueListItem } from "../entities/github-issue";

export class GithubIssueService {
  static async getIssueList({ page, perPage }: { page: number; perPage: number }) {
    const response = await getIssueList({ page, perPage });
    return response.map(createIssueListItem);
  }

  static async getIssueDetail(issueNumber: number) {
    const response = await getIssueDetail(issueNumber);
    return createIssue(response);
  }
}
