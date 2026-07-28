import Image from "next/image";

import { LatestArticle } from "./latest-article";
import { SolarTermExperience } from "./solar-term-experience";

import type { DevelopmentFixture } from "@/core/utils/development-fixtures";

interface EditorialHomeProps {
  dateIso: string;
  fixture: DevelopmentFixture | null;
  forceReducedMotion: boolean;
}

export function EditorialHome({ dateIso, fixture, forceReducedMotion }: EditorialHomeProps) {
  const signatureDate = new Date(dateIso);
  const dateParts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(signatureDate);
  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const day = dateParts.find((part) => part.type === "day")?.value;

  return (
    <div className="home-editorial-grid" data-reduced-motion={forceReducedMotion || undefined}>
      <SolarTermExperience dateIso={dateIso} forceReducedMotion={forceReducedMotion} />
      <LatestArticle fixture={fixture} forceReducedMotion={forceReducedMotion} />

      <aside className="author-signature" aria-label="作者署名">
        <p className="author-signature__label">AUTHOR / 署名</p>
        <time className="author-signature__date" dateTime={dateIso}>
          <span>{year}</span>
          <strong>
            {month}.{day}
          </strong>
        </time>
        <div className="author-signature__identity">
          <Image
            src="/images/avatar.jpg"
            alt="Bigbigbo 的头像"
            width={58}
            height={58}
            className="author-signature__avatar"
          />
          <strong>Bigbigbo</strong>
        </div>
        <p>记录技术、思想与生活的节律。</p>
      </aside>
    </div>
  );
}
