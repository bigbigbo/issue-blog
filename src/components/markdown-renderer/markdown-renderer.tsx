"use client";

import Markdown, { RuleType } from "markdown-to-jsx";

import { CodeBlock } from "./code-block";

import "./markdown-renderer.css";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <Markdown
        options={{
          renderRule(next, node, _renderChildren, state) {
            if (node.type === RuleType.codeBlock) {
              return <CodeBlock key={state.key} code={node.text} language={node.lang} />;
            }

            return next();
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
