import type { Metadata } from "next";

import { JsonLd } from "@/components/seo";

import { absoluteUrl, SITE_CONFIG } from "@/core/constants/site";
import {
  getCurrentSolarTerm,
  getSolarTermInfo,
  getSolarTermsForYear,
  SOLAR_TERM_KEYS,
  SOLAR_TERMS,
} from "@/core/constants/solar-terms";
import { createPageMetadata } from "@/core/utils/seo";

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "二十四节气日期表",
  description: "查看今年二十四节气的准确日期、当前节气、下一个节气和相关诗句。",
  path: "/solar-term",
  keywords: ["二十四节气日期", "当前节气", "节气表", "传统文化"],
  image: "/images/editorial/solar-summer-v2.png",
});

const fullDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  month: "2-digit",
  day: "2-digit",
});

export default function SolarTermPage() {
  const now = new Date();
  const year = now.getFullYear();
  const termInfo = getSolarTermInfo(now);
  const currentTerm = termInfo.current.key || getCurrentSolarTerm(now);
  const currentSolarTerm = SOLAR_TERMS[currentTerm];
  const allTermDates = getSolarTermsForYear(year);
  const solarTermItems = SOLAR_TERM_KEYS.flatMap((key, index) => {
    const date = allTermDates[key];

    if (!date) {
      return [];
    }

    return [
      {
        "@type": "ListItem",
        position: index + 1,
        name: SOLAR_TERMS[key].name,
        description: `${year} 年${SOLAR_TERMS[key].name}日期为${fullDateFormatter.format(date)}`,
        item: {
          "@type": "Thing",
          name: `${year} 年${SOLAR_TERMS[key].name}`,
          description: `${SOLAR_TERMS[key].name}开始于${date.toISOString()}`,
        },
      },
    ];
  });
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/solar-term"),
    url: absoluteUrl("/solar-term"),
    name: `${year} 年二十四节气日期表`,
    description: `查看 ${year} 年二十四节气日期、当前节气和下一个节气。`,
    inLanguage: SITE_CONFIG.language,
    isPartOf: {
      "@id": `${SITE_CONFIG.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: solarTermItems.length,
      itemListElement: solarTermItems,
    },
  };

  return (
    <main id="main-content" className="mx-auto max-w-4xl p-6">
      <JsonLd data={pageJsonLd} />
      <h1 className="mb-8 text-center text-3xl font-bold">{year} 年二十四节气日期表</h1>

      <section
        className="mb-8 rounded-lg p-6 shadow-md"
        style={{ backgroundColor: `${currentSolarTerm.themeColor}30` }}
        aria-labelledby="current-solar-term"
      >
        <h2 id="current-solar-term" className="mb-4 text-2xl font-bold">
          当前节气：{currentSolarTerm.name}
        </h2>
        <blockquote className="mb-4">
          <p className="mb-2 text-lg italic">&ldquo;{currentSolarTerm.poem.content}&rdquo;</p>
          <footer className="text-right">
            <cite>
              {currentSolarTerm.poem.author}《{currentSolarTerm.poem.title}》
            </cite>
          </footer>
        </blockquote>
        <div className="mt-4 flex justify-between gap-6">
          <p className="text-sm text-gray-600">
            本节气始于
            <time dateTime={termInfo.current.date.toISOString()}>
              {fullDateFormatter.format(termInfo.current.date)}
            </time>
          </p>
          <p className="text-sm text-gray-600">
            距离下一个节气「{termInfo.next.name}」还有 {termInfo.next.daysUntil} 天
          </p>
        </div>
      </section>

      <section aria-labelledby="solar-term-calendar">
        <h2 id="solar-term-calendar" className="mb-4 text-xl font-bold">
          {year} 年全部节气
        </h2>
        <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {SOLAR_TERM_KEYS.map((key) => {
            const date = allTermDates[key];

            if (!date) {
              return null;
            }

            return (
              <li
                key={key}
                className={`rounded-md p-3 text-center ${currentTerm === key ? "ring-2 ring-offset-2" : ""}`}
                style={{
                  backgroundColor: `${SOLAR_TERMS[key].themeColor}40`,
                  borderColor: SOLAR_TERMS[key].themeColor,
                }}
              >
                <strong>{SOLAR_TERMS[key].name}</strong>
                <time className="block text-sm" dateTime={date.toISOString()}>
                  {shortDateFormatter.format(date)}
                </time>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
