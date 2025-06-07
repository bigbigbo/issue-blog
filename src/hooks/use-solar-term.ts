"use client";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";

function getSeason(solarTermKey: string): string {
  if (["lichun", "yushui", "jingzhe", "chunfen", "qingming", "guyu"].includes(solarTermKey)) {
    return "spring";
  }
  if (["lixia", "xiaoman", "mangzhong", "xiazhi", "xiaoshu", "dashu"].includes(solarTermKey)) {
    return "summer";
  }
  if (["liqiu", "chushu", "bailu", "qiufen", "hanlu", "shuangjiang"].includes(solarTermKey)) {
    return "autumn";
  }
  return "winter";
}

export function useSolarTerm() {
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const season = getSeason(currentSolarTermKey);
  const themeColor = currentSolarTerm.themeColor;

  return {
    currentSolarTermKey,
    currentSolarTerm,
    season,
    themeColor,
  };
}
