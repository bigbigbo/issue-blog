"use client";

import { useEffect, useState } from "react";

import { SolarTermDisplay } from "./solar-term-display";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";

interface SolarTermData {
  name: string;
  poem: {
    content: string;
    author: string;
    title: string;
  };
}

export function DynamicSolarTermDisplay() {
  const [solarTermData, setSolarTermData] = useState<SolarTermData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 在客户端动态获取当前节气信息
    const getCurrentSolarTermData = () => {
      try {
        const currentSolarTermKey = getCurrentSolarTerm();
        const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];

        if (currentSolarTerm) {
          setSolarTermData({
            name: currentSolarTerm.name,
            poem: currentSolarTerm.poem,
          });
        }
      } catch (error) {
        console.error("获取节气信息失败:", error);
        // 如果出错，使用立春作为默认值
        setSolarTermData({
          name: SOLAR_TERMS.lichun.name,
          poem: SOLAR_TERMS.lichun.poem,
        });
      } finally {
        setIsLoading(false);
      }
    };

    // 使用 setTimeout 确保在客户端渲染后执行
    const timeoutId = setTimeout(getCurrentSolarTermData, 0);

    // 设置定时器，每小时检查一次节气是否变化
    const interval = setInterval(getCurrentSolarTermData, 60 * 60 * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  // 加载状态
  if (isLoading || !solarTermData) {
    return (
      <div className="relative flex flex-row-reverse items-start gap-6">
        <div className="flex flex-col items-end">
          <div
            className="mb-2 h-32 w-16 animate-pulse rounded bg-gray-200"
            style={{
              writingMode: "vertical-rl",
            }}
          />
        </div>
        <div className="relative top-32 flex flex-col items-end">
          <div
            className="mb-4 h-24 w-8 animate-pulse rounded bg-gray-200"
            style={{
              writingMode: "vertical-rl",
            }}
          />
          <div
            className="h-6 w-6 animate-pulse rounded bg-gray-200"
            style={{
              writingMode: "vertical-rl",
            }}
          />
        </div>
      </div>
    );
  }

  return <SolarTermDisplay name={solarTermData.name} poem={solarTermData.poem} />;
}
