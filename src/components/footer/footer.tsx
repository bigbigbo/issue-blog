import { ArrowUp, ArrowUpRight, CircleDot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "首页", href: "/" },
  { label: "博客", href: "/blog" },
] as const;

export function Footer() {
  return (
    <footer className="editorial-footer" aria-labelledby="editorial-footer-title">
      <div className="editorial-footer__grid">
        <div className="editorial-footer__index" aria-hidden="true">
          <span>END / 页尾</span>
          <strong data-shadow="续">续</strong>
          <small>TO BE CONTINUED</small>
        </div>

        <section className="editorial-footer__statement">
          <Image
            className="editorial-footer__artwork"
            src="/images/editorial/footer-collage.png"
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 60vw"
            loading="eager"
            aria-hidden="true"
          />
          <p className="editorial-footer__eyebrow">BIGBIGBO / ISSUE BLOG</p>
          <h2 id="editorial-footer-title">
            <span
              className="editorial-footer__title-shadow editorial-footer__title-shadow--vermilion"
              aria-hidden="true"
            >
              记录仍在
              <br />
              继续。
            </span>
            <span className="editorial-footer__title-shadow editorial-footer__title-shadow--acid" aria-hidden="true">
              记录仍在
              <br />
              继续。
            </span>
            <span className="editorial-footer__title-text">
              记录仍在
              <br />
              继续。
            </span>
          </h2>
          <p className="editorial-footer__description">把技术、思想与生活，写进时间的纹理。</p>
        </section>

        <nav className="editorial-footer__nav" aria-label="页脚导航">
          <p>CONTINUE / 继续阅读</p>
          <ol>
            {footerLinks.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <a className="editorial-footer__back-to-top" href="#main-content">
            <span>TOP</span>
            <strong>回到正文顶部</strong>
            <ArrowUp aria-hidden="true" />
          </a>
        </nav>
      </div>

      <div className="editorial-footer__meta">
        <p className="editorial-footer__identity">
          <CircleDot aria-hidden="true" strokeWidth={3} />
          <strong>Bigbigbo</strong>
          <span>记录技术、思想与生活的节律。</span>
        </p>
        <p className="editorial-footer__accent">STAY CURIOUS / 保持好奇</p>
      </div>
    </footer>
  );
}
