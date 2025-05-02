"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
  { name: "周刊", path: "/weekly" },
  { name: "组件", path: "/components" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 right-0 left-0 z-10 px-4 py-6">
      <div className="mx-auto max-w-screen-xl rounded-full border border-white/[0.05] bg-white/[0.02] px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
            我的博客
          </div>
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`group relative transition-all duration-300 ${
                    pathname === item.path ? "font-medium text-blue-400" : "text-gray-300/90 hover:text-blue-300"
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    <span
                      className={`absolute right-0 -bottom-1 left-0 h-px origin-left transform bg-blue-400 transition-transform duration-300 ${
                        pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
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
