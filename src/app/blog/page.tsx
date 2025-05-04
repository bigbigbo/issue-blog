import { BlogList } from "@/components/blog-list";

import { GithubIssueService } from "@/core/services/github-issue";

export const revalidate = 5 * 60;

const perPage = 10;

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const searchParams = await props.searchParams;
  const initialPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const initialIssues = await GithubIssueService.getIssueList({ page: 1, perPage: initialPage * perPage });

  return (
    <main className="blog-page flex min-h-screen flex-col items-center justify-between p-6 md:p-12">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-12 text-center text-4xl font-bold">我的博客</h1>

        <BlogList initialIssues={initialIssues} initialPage={initialPage} />
      </div>
    </main>
  );
}
