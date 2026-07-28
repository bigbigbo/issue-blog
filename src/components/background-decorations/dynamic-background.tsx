"use client";

import { useEffect, useState } from "react";

import { useSolarTerm } from "@/hooks/use-solar-term";

import { SEASONAL_THEME_EVENT, type SeasonalThemeDetail } from "@/core/constants/seasonal-theme";
import type { SolarTermSeason } from "@/core/constants/solar-terms";

export function DynamicBackground() {
  const { season, themeColor } = useSolarTerm();
  const [activeTheme, setActiveTheme] = useState<SeasonalThemeDetail>({
    season: season as SolarTermSeason,
    themeColor,
  });

  useEffect(() => {
    setActiveTheme({
      season: season as SolarTermSeason,
      themeColor,
    });
  }, [season, themeColor]);

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const { detail } = event as CustomEvent<SeasonalThemeDetail>;

      if (detail?.season && detail?.themeColor) {
        setActiveTheme(detail);
      }
    };

    window.addEventListener(SEASONAL_THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(SEASONAL_THEME_EVENT, handleThemeChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.season = activeTheme.season;
    root.style.setProperty("--season-accent", activeTheme.themeColor);
  }, [activeTheme]);

  return <div className="seasonal-backdrop" data-season={activeTheme.season} aria-hidden="true" />;
}
