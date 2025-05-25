"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

import { getCurrentSolarTerm, getSolarTermInfo, SOLAR_TERMS } from "@/core/constants/solar-terms";

export default function SolarTermPage() {
  const [currentTerm, setCurrentTerm] = useState<string>("");
  const [termInfo, setTermInfo] = useState<{
    current: { key: string; name: string; date: Date };
    next: { key: string; name: string; date: Date; daysUntil: number };
  } | null>(null);
  const [allTermDates, setAllTermDates] = useState<Record<string, Date>>({});

  useEffect(() => {
    // 获取当前节气
    const term = getCurrentSolarTerm();
    setCurrentTerm(term);

    // 获取详细节气信息
    const info = getSolarTermInfo();
    setTermInfo(info);

    // 获取今年所有节气的日期
    const currentYear = new Date().getFullYear();
    import("@/core/constants/solar-terms").then(({ getSolarTermsForYear }) => {
      const terms = getSolarTermsForYear(currentYear);
      setAllTermDates(terms);
    });
  }, []);

  if (!currentTerm || !termInfo) {
    return <div className="p-6">正在加载节气信息...</div>;
  }

  const currentSolarTerm = SOLAR_TERMS[currentTerm];

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">二十四节气</h1>

      {/* 当前节气信息 */}
      <div className="mb-8 rounded-lg p-6 shadow-md" style={{ backgroundColor: `${currentSolarTerm.themeColor}30` }}>
        <h2 className="mb-4 text-2xl font-bold">当前节气: {currentSolarTerm.name}</h2>
        <div className="mb-4">
          <p className="mb-2 text-lg italic">&ldquo;{currentSolarTerm.poem.content}&rdquo;</p>
          <p className="text-right">
            —— {currentSolarTerm.poem.author}《{currentSolarTerm.poem.title}》
          </p>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-600">当前节气日期：{termInfo.current.date.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              距离下一个节气「{termInfo.next.name}」还有 {termInfo.next.daysUntil} 天
            </p>
          </div>
        </div>
      </div>

      {/* 今年所有节气表 */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold">今年二十四节气日期表</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Object.entries(allTermDates).map(([key, date]) => (
            <div
              key={key}
              className={`rounded-md p-3 text-center ${currentTerm === key ? "ring-2 ring-offset-2" : ""}`}
              style={{
                backgroundColor: `${SOLAR_TERMS[key].themeColor}40`,
                borderColor: SOLAR_TERMS[key].themeColor,
              }}
            >
              <div className="font-bold">{SOLAR_TERMS[key].name}</div>
              <div className="text-sm">{format(date, "MM月dd日", { locale: zhCN })}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
