"use client";

import Markdown from "markdown-to-jsx";

import "./markdown-renderer.css";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body text-white">
      <Markdown>{content}</Markdown>
    </div>
  );
}
