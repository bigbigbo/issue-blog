"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { ArticleImage } from "@/components/editorial";
import { MarkdownRenderer } from "@/components/markdown-renderer";

import type { IssueDetail } from "@/core/entities/github-issue";
import { useIssueDetail } from "@/stories/github-issue";

interface BlogDetailProps {
  issueNumber: number;
  initialPost: IssueDetail;
}

const readerDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function BlogDetail({ issueNumber, initialPost }: BlogDetailProps) {
  const prefersReducedMotion = useReducedMotion();
  const { data } = useIssueDetail({ issueNumber });
  const post = data ?? initialPost;
  const readTime = Math.max(1, Math.ceil(post.body.length / 400));

  return (
    <motion.article
      className="article-reader"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: "easeOut" }}
    >
      <header className="reader-masthead">
        <Link href="/blog" className="reader-back-link">
          <ArrowLeft aria-hidden="true" />
          返回博客归档
        </Link>

        <p className="reader-masthead__index">ISSUE / {String(post.number).padStart(3, "0")}</p>
        <h1>{post.title}</h1>
        <p className="reader-masthead__dek">{post.excerpt || "一篇关于技术、观察与日常节律的记录。"}</p>

        <ArticleImage
          source={post.leadImage}
          alt={`${post.title}的文章题图`}
          sizes="(max-width: 767px) 100vw, 92vw"
          className="reader-masthead__image"
          imageClassName="reader-masthead__image-asset"
          priority
        />
      </header>

      <div className="reader-layout">
        <aside className="reader-meta" aria-label="文章元数据">
          <dl>
            <div>
              <dt>发布日期</dt>
              <dd>
                <time dateTime={post.created_at}>{readerDateFormatter.format(new Date(post.created_at))}</time>
              </dd>
            </div>
            <div>
              <dt>阅读时间</dt>
              <dd>{readTime} 分钟</dd>
            </div>
            <div>
              <dt>作者</dt>
              <dd className="reader-meta__author">
                <Image src={post.user.avatar_url} alt="" width={34} height={34} className="reader-meta__avatar" />
                {post.user.login}
              </dd>
            </div>
          </dl>

          {post.labels.length > 0 && (
            <div className="reader-meta__labels">
              <h2>标签</h2>
              <ul>
                {post.labels.map((label) => (
                  <li key={label.id}>{label.name}</li>
                ))}
              </ul>
            </div>
          )}

          <a href={post.html_url} target="_blank" rel="noreferrer" className="reader-source-link">
            在 GitHub 查看原文
            <ArrowUpRight aria-hidden="true" />
          </a>
        </aside>

        <div className="reader-content">
          <MarkdownRenderer content={post.body} />
        </div>
      </div>

      <footer className="reader-footer">
        <Link href="/blog" className="editorial-action">
          <ArrowLeft aria-hidden="true" />
          返回博客归档
        </Link>
        <p>BIGBIGBO / EDITORIAL NOTES</p>
      </footer>
    </motion.article>
  );
}
