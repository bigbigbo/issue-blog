"use client";

import { useEffect, useRef, useState } from "react";

import { Check, Copy } from "lucide-react";
import { Highlight, Prism, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const LANGUAGE_ALIASES: Record<string, string> = {
  html: "markup",
  js: "javascript",
  md: "markdown",
  py: "python",
  sh: "bash",
  shell: "bash",
  ts: "typescript",
  yml: "yaml",
};

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Shell",
  css: "CSS",
  javascript: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  markup: "HTML",
  markdown: "Markdown",
  python: "Python",
  text: "Plain text",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
};

function resolveLanguage(language?: string) {
  const requestedLanguage = language?.trim().toLowerCase().split(/\s+/)[0] || "text";
  const normalizedLanguage = LANGUAGE_ALIASES[requestedLanguage] ?? requestedLanguage;

  return {
    highlightLanguage: Prism.languages[normalizedLanguage] ? normalizedLanguage : "text",
    label: LANGUAGE_LABELS[normalizedLanguage] ?? normalizedLanguage,
  };
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const source = code.replace(/\n$/, "");
  const { highlightLanguage, label } = resolveLanguage(language);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);

      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }

      resetTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="code-block">
      <figcaption className="code-block__toolbar">
        <span className="code-block__language">{label}</span>
        <button
          type="button"
          className="code-block__copy"
          aria-label={copied ? "代码已复制" : "复制代码"}
          onClick={copyCode}
        >
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          <span aria-live="polite">{copied ? "已复制" : "复制"}</span>
        </button>
      </figcaption>

      <Highlight theme={themes.oneDark} code={source} language={highlightLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} code-block__pre`} style={{ ...style, background: "transparent" }}>
            <code className="code-block__code">
              {tokens.map((line, lineIndex) => (
                <span
                  key={lineIndex}
                  {...getLineProps({
                    line,
                    className: "code-block__line",
                  })}
                >
                  <span className="code-block__line-number" aria-hidden="true">
                    {lineIndex + 1}
                  </span>
                  <span className="code-block__line-content">
                    {line.map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  );
}
