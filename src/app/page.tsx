import type { Metadata } from "next";

import Profile from "@/components/profile";
import { SolarTermDisplay } from "@/components/solar-term";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";

export const metadata: Metadata = {
  title: "二十四节气",
  description: "展示当前节气、诗词和季节信息",
};

export default function SolarTermPage() {
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-12 p-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Profile />
        </div>

        <div className="flex w-full justify-end lg:w-1/2">
          <SolarTermDisplay name={currentSolarTerm.name} poem={currentSolarTerm.poem} />
        </div>
      </div>
    </main>
  );
}
