import { AtSign, Github, Twitter } from "lucide-react";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center rounded-2xl border border-white/[0.05] bg-white/[0.02] px-8 py-10 text-center shadow-[0_0_50px_rgba(0,0,0,0.1)]">
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"></div>
          <Image
            src="/avatar.svg"
            alt="头像"
            width={128}
            height={128}
            className="relative rounded-full border-2 border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          />
        </div>
      </div>

      <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
        Issues 博客
      </h1>

      <h2 className="mb-4 text-xl text-gray-300/90">基于 GitHub Issues 的个人博客系统</h2>

      <p className="mb-6 max-w-lg leading-relaxed text-gray-400/90">
        这是一个使用 GitHub Issues 作为内容管理系统的博客平台。直接在 GitHub
        上创建、编辑和管理文章，自动同步到网站。利用 Issues 的评论、标签和 Markdown 支持，轻松构建个人博客。
      </p>

      <div className="flex space-x-6">
        <a
          href="https://github.com/bigbigbo/issue-blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400/90 transition-all duration-300 hover:scale-110 hover:text-white"
        >
          <Github size={24} />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400/90 transition-all duration-300 hover:scale-110 hover:text-white"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://weibo.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400/90 transition-all duration-300 hover:scale-110 hover:text-white"
        >
          <AtSign size={24} />
        </a>
      </div>
    </div>
  );
}
