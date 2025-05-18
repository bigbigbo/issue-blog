"use client";

import { AtSign, Github, Twitter } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md px-8 py-10 text-left"
    >
      <div className="mb-4 flex items-center gap-4">
        <Image className="rounded-full" src="/images/avatar.jpg" alt="avatar" width={42} height={42} />

        <h1 className="text-4xl font-bold text-gray-950">Bigbigbo</h1>
      </div>

      <h2 className="mb-5 text-xl text-black">这个人很懒，什么都还没留下</h2>

      <div className="flex space-x-6">
        <a
          href="https://github.com/bigbigbo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-all duration-300 hover:scale-110 hover:text-gray-400"
        >
          <Github size={24} />
        </a>
        <a
          href="https://x.com/hibobo233"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-all duration-300 hover:scale-110 hover:text-gray-400"
        >
          <Twitter size={24} />
        </a>
        <a
          href="mailto:zxb141242@gmail.com"
          className="text-black transition-all duration-300 hover:scale-110 hover:text-gray-400"
        >
          <AtSign size={24} />
        </a>
      </div>
    </motion.div>
  );
}
