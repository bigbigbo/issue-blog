import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "首页", href: "/" },
  { label: "博客", href: "/blog" },
  { label: "节气", href: "/solar-term" },
] as const;

export function Footer() {
  return (
    <>
      <footer className="editorial-footer" aria-label="站点页脚">
        <Image
          className="editorial-footer__artwork"
          src="/images/editorial/footer-collage.png"
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          aria-hidden="true"
        />

        <div className="editorial-footer__content">
          <div className="editorial-footer__identity">
            <p>BIGBIGBO / ISSUE BLOG</p>
            <strong>Bigbigbo</strong>
            <span>记录技术、思想与生活的节律。</span>
          </div>

          <nav className="editorial-footer__nav" aria-label="页脚导航">
            <ul>
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>

      <a className="site-back-to-top" href="#site-top" aria-label="回到页面顶部" title="回到页面顶部">
        <ArrowUp aria-hidden="true" />
      </a>
    </>
  );
}
