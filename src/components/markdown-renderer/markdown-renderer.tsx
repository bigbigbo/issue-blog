"use client";

import Markdown from "markdown-to-jsx";

import "./markdown-renderer.css";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <Markdown>{content}</Markdown>
    </div>
  );
}
