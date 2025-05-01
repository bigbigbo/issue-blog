import { FaGithub, FaTwitter, FaWeibo } from "react-icons/fa";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-8 py-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)] bg-white/[0.02] border border-white/[0.05]">
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
          <Image
            src="/avatar.svg"
            alt="头像"
            width={128}
            height={128}
            className="relative rounded-full border-2 border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
          />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        bigbigbo
      </h1>

      <h2 className="text-xl text-gray-300/90 mb-4">mmmmmmmmmmmmmmmmmm</h2>

      <p className="text-gray-400/90 mb-6 max-w-lg leading-relaxed">
        这里是你的个人简介。你可以介绍你的技能、经验、兴趣爱好等。这段文字应该简洁明了，让访问者快速了解你是谁，你做什么。
      </p>

      <div className="flex space-x-6">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400/90 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400/90 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://weibo.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400/90 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <FaWeibo size={24} />
        </a>
      </div>
    </div>
  );
}
