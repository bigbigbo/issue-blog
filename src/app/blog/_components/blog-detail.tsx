"use client";

import { Calendar, Clock, Tag } from "lucide-react";
import Image from "next/image";

import { MarkdownRenderer } from "@/components/markdown-renderer";

import type { IssueDetail } from "@/core/entities/github-issue";
import { useIssueDetail } from "@/stories/github-issue";

interface BlogDetailProps {
  issueNumber: number;
  initialPost: IssueDetail;
}

export function BlogDetail({ issueNumber, initialPost }: BlogDetailProps) {
  const { data } = useIssueDetail({
    issueNumber,
  });

  const post = data || initialPost;

  const formattedDate = new Date(post.created_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 计算阅读时间（假设200字/分钟）
  const wordCount = post.body.length / 2; // 粗略估计中文字数
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="overflow-hidden rounded-2xl bg-white/[0.03] backdrop-blur-sm">
      <header className="border-b border-white/10 bg-white/[0.05] px-8 py-10 md:px-12">
        <h1 className="mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-6 text-white/70">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-blue-300" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-blue-300" />
            <span>{readTime} 分钟阅读</span>
          </div>

          <div className="flex items-center">
            <Image
              src={post.user.avatar_url}
              alt={post.user.login}
              className="mr-2 h-6 w-6 rounded-full ring-2 ring-white/20"
              width={24}
              height={24}
            />
            <span>{post.user.login}</span>
          </div>
        </div>

        {post.labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.labels.map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-transform hover:scale-105"
                style={{
                  backgroundColor: `#${label.color}30`,
                  color: `#${label.color}`,
                  boxShadow: `0 0 12px #${label.color}30`,
                }}
              >
                <Tag className="mr-1.5 h-3.5 w-3.5" />
                {label.name}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="px-8 py-10 md:px-12">
        <div className="prose prose-lg prose-invert prose-headings:text-white prose-headings:font-bold prose-headings:border-b prose-headings:border-blue-500/20 prose-headings:pb-2 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-p:text-white/90 prose-a:text-blue-300 prose-a:no-underline prose-a:font-medium prose-a:transition-all hover:prose-a:text-blue-200 hover:prose-a:underline prose-strong:text-white prose-strong:font-bold prose-em:text-blue-200 prose-em:italic prose-blockquote:border-l-blue-500 prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-md prose-blockquote:italic prose-blockquote:text-white/80 prose-ul:text-white/90 prose-ol:text-white/90 prose-li:my-1 prose-table:border-separate prose-table:border-spacing-0 prose-th:bg-white/10 prose-th:p-2 prose-th:text-white prose-th:font-medium prose-th:border-b prose-th:border-white/20 prose-td:p-2 prose-td:border-b prose-td:border-white/10 prose-td:text-white/80 prose-img:rounded-md prose-img:shadow-md prose-code:bg-white/10 prose-code:text-blue-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal prose-pre:bg-white/[0.07] prose-pre:rounded-xl prose-pre:shadow-inner prose-pre:border prose-pre:border-white/10 max-w-none">
          <MarkdownRenderer content={post.body} />
        </div>
      </div>
    </article>
  );
}
