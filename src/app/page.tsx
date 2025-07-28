import type { Metadata } from "next";

import Profile from "@/components/profile";
import { DynamicSolarTermDisplay } from "@/components/solar-term";

export const metadata: Metadata = {
  title: "二十四节气",
  description: "展示当前节气、诗词和季节信息",
};

export default function SolarTermPage() {
  return (
    <main className="relative w-full">
      {/* 主要内容区域 */}
      <section className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center px-4 py-8">
        <div className="z-10 flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-4 lg:flex-row lg:gap-12">
          <div className="w-full lg:w-1/2">
            <Profile />
          </div>

          <div className="flex w-full justify-end lg:w-1/2">
            <DynamicSolarTermDisplay />
          </div>
        </div>
      </section>
    </main>
  );
}
