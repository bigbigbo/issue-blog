"use client";

import { useEffect, useState } from "react";

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
  const [solarTermData, setSolarTermData] = useState(() => {
    // 初始化时使用立春作为默认值，避免水合不匹配
    return {
      currentSolarTermKey: "lichun",
      currentSolarTerm: SOLAR_TERMS.lichun,
      season: "spring",
      themeColor: SOLAR_TERMS.lichun.themeColor,
    };
  });

  useEffect(() => {
    // 在客户端动态获取当前节气信息
    const updateSolarTerm = () => {
      try {
        const currentSolarTermKey = getCurrentSolarTerm();
        const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
        const season = getSeason(currentSolarTermKey);
        const themeColor = currentSolarTerm.themeColor;

        setSolarTermData({
          currentSolarTermKey,
          currentSolarTerm,
          season,
          themeColor,
        });
      } catch (error) {
        console.error("获取节气信息失败:", error);
        // 保持默认值
      }
    };

    updateSolarTerm();

    // 设置定时器，每小时检查一次节气是否变化
    const interval = setInterval(updateSolarTerm, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return solarTermData;
}
