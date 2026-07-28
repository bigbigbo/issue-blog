"use client";

import { CircleDot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
  { name: "节气", path: "/solar-term" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="editorial-header">
      <nav className="editorial-nav" aria-label="主导航">
        <Link href="/" className="editorial-brand" aria-label="Bigbigbo 首页">
          <CircleDot aria-hidden="true" className="editorial-brand__mark" strokeWidth={3} />
          <span>Bigbigbo</span>
        </Link>

        <ul className="editorial-nav__links">
          {navItems.map((item) => {
            const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="editorial-nav__link"
                  data-active={isActive}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
