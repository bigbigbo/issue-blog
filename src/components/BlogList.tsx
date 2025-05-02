"use client";

import { Issue, getIssues } from "@/services/github";
import { Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    async function fetchIssues() {
      try {
        setLoading(true);
        const data = await getIssues(page, perPage);
        setIssues(data);
        setError(null);
      } catch (err) {
        setError("获取博客列表失败");
        console.error("Failed to fetch issues:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, [page]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl text-red-500">{error}</h3>
        <button onClick={() => setPage(1)} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          重试
        </button>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl text-gray-500">暂无博客内容</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold">博客列表</h2>
      <div className="space-y-6">
        {issues.map((issue) => (
          <Link
            href={`/blog/${issue.number}`}
            key={issue.id}
            className="block rounded-lg bg-white/5 p-6 transition-colors hover:bg-white/10"
          >
            <h3 className="mb-2 text-xl font-semibold">{issue.title}</h3>
            <div className="mb-2 flex items-center text-sm text-gray-400">
              <div className="mr-4 flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{new Date(issue.created_at).toLocaleDateString("zh-CN")}</span>
              </div>
              <div className="flex items-center">
                <img src={issue.user.avatar_url} alt={issue.user.login} className="mr-1 h-5 w-5 rounded-full" />
                <span>{issue.user.login}</span>
              </div>
            </div>
            {issue.labels.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {issue.labels.map((label) => (
                  <span
                    key={label.id}
                    className="inline-flex items-center rounded px-2 py-1 text-xs"
                    style={{ backgroundColor: `#${label.color}20`, color: `#${label.color}` }}
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          上一页
        </button>
        <span className="px-4 py-2">第 {page} 页</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={issues.length < perPage}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          下一页
        </button>
      </div>
    </div>
  );
}
