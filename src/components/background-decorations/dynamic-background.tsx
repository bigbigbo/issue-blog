"use client";

import { BackgroundDecorations } from "@/components/background-decorations";

import { useSolarTerm } from "@/hooks/use-solar-term";

export function DynamicBackground() {
  const { season, themeColor } = useSolarTerm();

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 30%, ${themeColor}30 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, ${themeColor}20 0%, transparent 60%)
        `,
      }}
    >
      <BackgroundDecorations themeColor={"#000000"} season={season} />

      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right bottom, transparent, ${themeColor}20),
            radial-gradient(circle at 60% 40%, ${themeColor}25, transparent 70%)
          `,
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
