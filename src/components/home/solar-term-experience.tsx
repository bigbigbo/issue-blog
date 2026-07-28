"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import { ArrowRight, CircleDot } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { SEASONAL_THEME_EVENT } from "@/core/constants/seasonal-theme";
import {
  getCurrentSolarTerm,
  getSolarTermSeason,
  getSolarTermsForYear,
  SOLAR_TERM_KEYS,
  SOLAR_TERMS,
  type SolarTermKey,
  type SolarTermSeason,
} from "@/core/constants/solar-terms";

const seasonImages: Record<SolarTermSeason, { source: string; alt: string }> = {
  spring: {
    source: "/images/editorial/solar-spring-v2.png",
    alt: "春雨后阳光下盛开的粉色玉兰与嫩绿枝叶",
  },
  summer: {
    source: "/images/editorial/solar-summer-v2.png",
    alt: "盛夏阳光下荷塘中盛开的粉色荷花",
  },
  autumn: {
    source: "/images/editorial/solar-autumn-v2.png",
    alt: "秋日阳光中挂满橙红柿子的枝头",
  },
  winter: {
    source: "/images/editorial/solar-winter-v2.png",
    alt: "冬日晴空下覆雪绽放的红梅",
  },
};

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const shortDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  month: "2-digit",
  day: "2-digit",
});

const weekdayFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  weekday: "long",
});

function formatNumericDate(date: Date): string {
  return dateFormatter.format(date).replaceAll("/", ".");
}

function formatShortDate(date: Date): string {
  return shortDateFormatter.format(date).replaceAll("/", ".");
}

function formatLunarDate(date: Date): string | null {
  try {
    return new Intl.DateTimeFormat("zh-CN-u-ca-chinese", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return null;
  }
}

interface SolarTermExperienceProps {
  dateIso: string;
  forceReducedMotion?: boolean;
}

export function SolarTermExperience({ dateIso, forceReducedMotion = false }: SolarTermExperienceProps) {
  const systemPrefersReducedMotion = useReducedMotion();
  const prefersReducedMotion = forceReducedMotion || systemPrefersReducedMotion;
  const viewDate = new Date(dateIso);
  const currentTermKey = getCurrentSolarTerm(viewDate) as SolarTermKey;
  const currentIndex = SOLAR_TERM_KEYS.indexOf(currentTermKey);
  const currentTerm = SOLAR_TERMS[currentTermKey];
  const currentSeason = getSolarTermSeason(currentTermKey);
  const [selectedTermKey, setSelectedTermKey] = useState<SolarTermKey>(currentTermKey);
  const [focusedIndex, setFocusedIndex] = useState(currentIndex);
  const termButtons = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = SOLAR_TERM_KEYS.indexOf(selectedTermKey);
  const selectedTerm = SOLAR_TERMS[selectedTermKey];
  const selectedSeason = getSolarTermSeason(selectedTermKey);
  const selectedImage = seasonImages[selectedSeason];
  const termDate = getSolarTermsForYear(viewDate.getFullYear())[selectedTermKey] ?? viewDate;
  const displayedDate = selectedTermKey === currentTermKey ? viewDate : termDate;
  const lunarDate = formatLunarDate(displayedDate);
  const glyphs = Array.from(selectedTerm.name);

  useEffect(() => {
    const currentButton = termButtons.current[currentIndex];

    currentButton?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "auto",
    });
  }, [currentIndex]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(SEASONAL_THEME_EVENT, {
        detail: {
          season: selectedSeason,
          themeColor: selectedTerm.themeColor,
        },
      }),
    );
  }, [selectedSeason, selectedTerm.themeColor]);

  useEffect(
    () => () => {
      window.dispatchEvent(
        new CustomEvent(SEASONAL_THEME_EVENT, {
          detail: {
            season: currentSeason,
            themeColor: currentTerm.themeColor,
          },
        }),
      );
    },
    [currentSeason, currentTerm.themeColor],
  );

  const focusTerm = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(SOLAR_TERM_KEYS.length - 1, index));
    setFocusedIndex(boundedIndex);
    termButtons.current[boundedIndex]?.focus();
  };

  const handleTermKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusTerm(Math.min(index + 1, SOLAR_TERM_KEYS.length - 1));
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusTerm(Math.max(index - 1, 0));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTerm(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTerm(SOLAR_TERM_KEYS.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedTermKey(SOLAR_TERM_KEYS[index]);
    }
  };

  const selectNextTerm = () => {
    const nextIndex = (selectedIndex + 1) % SOLAR_TERM_KEYS.length;
    setSelectedTermKey(SOLAR_TERM_KEYS[nextIndex]);
  };

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" as const };

  return (
    <>
      <aside className="term-rail" aria-label="二十四节气选择">
        <div className="term-rail__heading" aria-hidden="true">
          <span>24</span>
          <span>节气</span>
        </div>
        <div className="term-rail__scroller">
          {SOLAR_TERM_KEYS.map((termKey, index) => {
            const term = SOLAR_TERMS[termKey];
            const isSelected = termKey === selectedTermKey;
            const isCurrent = termKey === currentTermKey;

            return (
              <button
                key={termKey}
                ref={(node) => {
                  termButtons.current[index] = node;
                }}
                type="button"
                className="term-rail__item"
                data-selected={isSelected}
                data-current={isCurrent}
                aria-pressed={isSelected}
                aria-current={isCurrent ? "date" : undefined}
                aria-label={`${String(index + 1).padStart(2, "0")} / 24 ${term.name}${isCurrent ? "，当前节气" : ""}`}
                tabIndex={focusedIndex === index ? 0 : -1}
                onClick={() => setSelectedTermKey(termKey)}
                onFocus={() => setFocusedIndex(index)}
                onKeyDown={(event) => handleTermKeyDown(event, index)}
              >
                <span className="term-rail__number">
                  {isSelected ? `${String(index + 1).padStart(2, "0")} / 24` : String(index + 1).padStart(2, "0")}
                </span>
                <span className="term-rail__name">{term.name}</span>
                {isCurrent && <span className="term-rail__current">当前</span>}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="term-glyph-field" aria-labelledby="active-term-title">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedTermKey}
            className="term-glyph-field__content"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={transition}
          >
            <h1 id="active-term-title" className="term-glyph-field__glyphs">
              {glyphs.map((glyph, index) => (
                <span key={`${glyph}-${index}`}>{glyph}</span>
              ))}
            </h1>
            <CircleDot className="term-glyph-field__mark" aria-hidden="true" strokeWidth={2.5} />
          </motion.div>
        </AnimatePresence>
      </section>

      <figure className="seasonal-image">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedSeason}
            className="seasonal-image__frame"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={transition}
          >
            <Image
              src={selectedImage.source}
              alt={selectedImage.alt}
              fill
              sizes="(max-width: 767px) 100vw, 34vw"
              priority={selectedSeason === "summer"}
              className="seasonal-image__asset"
            />
          </motion.div>
        </AnimatePresence>
        <figcaption className="seasonal-image__caption">
          {selectedTerm.name} ·{" "}
          {selectedSeason === "spring"
            ? "春"
            : selectedSeason === "summer"
              ? "夏"
              : selectedSeason === "autumn"
                ? "秋"
                : "冬"}
        </figcaption>
      </figure>

      <aside className="term-facts" aria-label={`${selectedTerm.name}节气信息`}>
        <div className="term-facts__index">{String(selectedIndex + 1).padStart(2, "0")} / 24</div>

        <div className="term-facts__poem">
          <p>{selectedTerm.poem.content}</p>
          <cite>
            《{selectedTerm.poem.title}》 · {selectedTerm.poem.author}
          </cite>
        </div>

        <div className="term-facts__date">
          <time dateTime={displayedDate.toISOString()}>{formatNumericDate(displayedDate)}</time>
          {lunarDate && <span>{lunarDate}</span>}
          <span>{weekdayFormatter.format(displayedDate)}</span>
          <small>节气始于 {formatShortDate(termDate)}</small>
        </div>

        <p className="term-facts__announcement" aria-live="polite" aria-atomic="true">
          {selectedTermKey === currentTermKey ? "当前节气" : "已选择"}
          {selectedTerm.name}，{selectedIndex + 1} / 24
        </p>

        <button type="button" className="editorial-action term-facts__action" onClick={selectNextTerm}>
          浏览下一节气
          <ArrowRight aria-hidden="true" />
        </button>
      </aside>
    </>
  );
}
