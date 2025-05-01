"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
  { name: "周刊", path: "/weekly" },
  { name: "组件", path: "/components" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 px-4 py-6">
      <div className="max-w-screen-xl mx-auto bg-white/[0.02] rounded-full px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.1)] border border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            我的博客
          </div>
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`transition-all duration-300 relative group ${
                    pathname === item.path
                      ? "text-blue-400 font-medium"
                      : "text-gray-300/90 hover:text-blue-300"
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-px bg-blue-400 transform origin-left transition-transform duration-300 ${
                        pathname === item.path
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
