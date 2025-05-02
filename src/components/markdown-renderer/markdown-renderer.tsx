"use client";

import Markdown from "markdown-to-jsx";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body prose prose-invert prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-code:bg-gray-800 prose-code:text-gray-100 prose-code:p-1 prose-code:rounded prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
