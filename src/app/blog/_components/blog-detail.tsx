"use client";

import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

import { MarkdownRenderer } from "@/components/markdown-renderer";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";
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

  // 获取当前节气主题色
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const themeColor = currentSolarTerm.themeColor;

  const formattedDate = new Date(post.created_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 计算阅读时间（假设200字/分钟）
  const wordCount = post.body.length / 2; // 粗略估计中文字数
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-gray-200 backdrop-blur-sm"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 20px ${themeColor}15`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.header
        className="border-b border-gray-200 px-8 py-10 md:px-12"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)`,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="mb-6 text-3xl font-bold text-black md:text-4xl lg:text-5xl">
          <span
            className="block"
            style={{
              textShadow: `0 1px 2px rgba(0,0,0,0.1)`,
            }}
          >
            {post.title}
          </span>
        </h1>

        <div className="mb-6 flex flex-wrap items-center gap-6 text-black">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Calendar className="mr-2 h-4 w-4" style={{ color: themeColor }} />
            <span>{formattedDate}</span>
          </motion.div>

          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Clock className="mr-2 h-4 w-4" style={{ color: themeColor }} />
            <span>{readTime} 分钟阅读</span>
          </motion.div>

          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Image
              src={post.user.avatar_url}
              alt={post.user.login}
              className="mr-2 h-6 w-6 rounded-full"
              style={{
                boxShadow: `0 0 0 2px ${themeColor}30`,
              }}
              width={24}
              height={24}
            />
            <span>{post.user.login}</span>
          </motion.div>
        </div>

        {post.labels.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.labels.map((label, index) => (
              <motion.span
                key={label.id}
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  backgroundColor: `#${label.color}15`,
                  color: `#${label.color}`,
                  border: `1px solid #${label.color}30`,
                  boxShadow: `0 2px 4px #${label.color}10`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 4px 8px #${label.color}20`,
                }}
              >
                <Tag className="mr-1.5 h-3.5 w-3.5" />
                {label.name}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.header>

      <motion.div
        className="px-8 py-10 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div
          className="prose prose-lg max-w-none"
          style={
            {
              "--tw-prose-body": "rgb(0, 0, 0)",
              "--tw-prose-headings": "rgb(0, 0, 0)",
              "--tw-prose-lead": "rgb(31, 41, 55)",
              "--tw-prose-links": themeColor,
              "--tw-prose-bold": "rgb(0, 0, 0)",
              "--tw-prose-counters": "rgb(55, 65, 81)",
              "--tw-prose-bullets": themeColor,
              "--tw-prose-hr": "rgb(229, 231, 235)",
              "--tw-prose-quotes": "rgb(17, 24, 39)",
              "--tw-prose-quote-borders": themeColor,
              "--tw-prose-captions": "rgb(107, 114, 128)",
              "--tw-prose-code": themeColor,
              "--tw-prose-pre-code": "rgb(229, 231, 235)",
              "--tw-prose-pre-bg": "rgb(31, 41, 55)",
              "--tw-prose-th-borders": "rgb(229, 231, 235)",
              "--tw-prose-td-borders": "rgb(243, 244, 246)",
            } as React.CSSProperties
          }
        >
          <MarkdownRenderer content={post.body} />
        </div>
      </motion.div>
    </motion.article>
  );
}
