"use client";

import { motion } from "motion/react";

interface SolarTermDisplayProps {
  name: string;
  poem: {
    content: string;
    author: string;
    title: string;
  };
}

export function SolarTermDisplay({ name, poem }: SolarTermDisplayProps) {
  return (
    <div className="relative flex flex-row-reverse items-start gap-6">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-end"
      >
        <h1
          className="font-lxgw-wenkai mb-2 text-9xl tracking-widest text-gray-600"
          style={{
            writingMode: "vertical-rl",
            textShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
          }}
        >
          {name}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative top-32 flex flex-col items-end"
      >
        <p
          className="mb-4 text-2xl text-gray-500"
          style={{
            writingMode: "vertical-rl",
            lineHeight: "1.7",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
          }}
        >
          {poem.content}
        </p>
        <p className="text-sm text-gray-400" style={{ writingMode: "vertical-rl" }}>
          《{poem.title}》 <span className="rounded-sm bg-orange-600 px-1 py-1 text-white">{poem.author}</span>
        </p>
      </motion.div>
    </div>
  );
}
