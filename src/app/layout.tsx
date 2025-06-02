import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { Navbar } from "@/components/navbar";
import Providers from "@/components/providers";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lxgwWenKai = localFont({
  src: "../../public/fonts/LXGWWenKai-Medium.woff2",
  variable: "--font-lxgw-wenkai",
  display: "swap",
  weight: "500",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Bigbigb's Blog",
  description: "Bigbigb's Blog",
};

function getSeasonalElements(season: string, themeColor: string) {
  switch (season) {
    case "spring":
      // 春季：花瓣和新芽
      return (
        <>
          {/* 花瓣 */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`petal-${i}`}
              className="absolute opacity-10"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: themeColor,
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float-around ${Math.random() * 40 + 20}s linear infinite`,
              }}
            />
          ))}
          {/* 新芽形状 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`bud-${i}`}
              className="absolute opacity-15"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${Math.random() * 10 + 5}px solid transparent`,
                borderRight: `${Math.random() * 10 + 5}px solid transparent`,
                borderBottom: `${Math.random() * 20 + 15}px solid ${themeColor}20`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float-around ${Math.random() * 50 + 30}s linear infinite`,
              }}
            />
          ))}
        </>
      );
    case "summer":
      // 夏季：圆形阳光和水波纹
      return (
        <>
          {/* 太阳光芒 */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`sunray-${i}`}
              className="absolute opacity-10"
              style={{
                width: `${Math.random() * 30 + 20}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: themeColor,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float-around ${Math.random() * 60 + 40}s linear infinite`,
              }}
            />
          ))}
          {/* 水波纹：多个同心圆 */}
          {Array.from({ length: 5 }).map((_, i) => {
            const size = Math.random() * 100 + 50;
            return (
              <div
                key={`ripple-${i}`}
                className="absolute opacity-5"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  border: `1px solid ${themeColor}`,
                  borderRadius: "50%",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `ripple ${Math.random() * 20 + 10}s ease-out infinite`,
                }}
              />
            );
          })}
        </>
      );
    case "autumn":
      // 秋季：落叶和枫叶形状
      return (
        <>
          {/* 落叶 */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`leaf-${i}`}
              className="absolute opacity-10"
              style={{
                width: `${Math.random() * 15 + 10}px`,
                height: `${Math.random() * 15 + 10}px`,
                backgroundColor: `${themeColor}40`,
                borderRadius: "2px 15px 2px 15px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `falling ${Math.random() * 50 + 30}s linear infinite`,
              }}
            />
          ))}
          {/* 枫叶图案：简化表示 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`maple-${i}`}
              className="absolute opacity-8"
              style={{
                width: `${Math.random() * 20 + 15}px`,
                height: `${Math.random() * 20 + 15}px`,
                borderRadius: "0 50% 50% 50%",
                border: `1px solid ${themeColor}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float-around ${Math.random() * 40 + 30}s linear infinite`,
              }}
            />
          ))}
        </>
      );
    case "winter":
      // 冬季：雪花和冰晶
      return (
        <>
          {/* 雪花点 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute opacity-20"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                backgroundColor: themeColor,
                borderRadius: "50%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `snowfall ${Math.random() * 60 + 30}s linear infinite`,
              }}
            />
          ))}
          {/* 冰晶：简化为六角星 */}
          {Array.from({ length: 8 }).map((_, i) => {
            const size = Math.random() * 15 + 10;
            return (
              <div
                key={`crystal-${i}`}
                className="absolute opacity-5"
                style={{
                  width: size,
                  height: size,
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    backgroundColor: themeColor,
                    transform: "rotate(0deg)",
                    top: "50%",
                    left: 0,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    backgroundColor: themeColor,
                    transform: "rotate(60deg)",
                    top: "50%",
                    left: 0,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    backgroundColor: themeColor,
                    transform: "rotate(120deg)",
                    top: "50%",
                    left: 0,
                  }}
                />
              </div>
            );
          })}
        </>
      );
    default:
      return null;
  }
}

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

// 背景装饰组件
function BackgroundDecorations({ themeColor, season }: { themeColor: string; season: string }) {
  return (
    <>
      {/* 季节特定图案 */}
      <div className="absolute inset-0 z-0 overflow-hidden">{getSeasonalElements(season, themeColor)}</div>

      {/* 背景圆点 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              backgroundColor: themeColor,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 50 + 50}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float-around ${Math.random() * 30 + 30}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* 背景几何形状 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 大圆 */}
        <div
          className="absolute rounded-full opacity-5"
          style={{
            border: `1px solid ${themeColor}`,
            width: "40vw",
            height: "40vw",
            right: "-10vw",
            top: "20vh",
          }}
        />
        {/* 小圆 */}
        <div
          className="absolute rounded-full opacity-5"
          style={{
            border: `1px solid ${themeColor}`,
            width: "15vw",
            height: "15vw",
            left: "10vw",
            bottom: "15vh",
          }}
        />
        {/* 三角形 - 使用边框技巧创建 */}
        <div
          className="absolute opacity-5"
          style={{
            width: 0,
            height: 0,
            borderLeft: "15vw solid transparent",
            borderRight: "15vw solid transparent",
            borderBottom: `30vw solid ${themeColor}10`,
            left: "60vw",
            top: "5vh",
            transform: "rotate(10deg)",
          }}
        />
        {/* 长方形 */}
        <div
          className="absolute opacity-5"
          style={{
            border: `1px solid ${themeColor}`,
            width: "25vw",
            height: "15vh",
            left: "5vw",
            top: "20vh",
            transform: "rotate(-5deg)",
          }}
        />
      </div>

      {/* 附加的背景装饰：半圆 */}
      <div
        className="absolute opacity-5"
        style={{
          width: "30vw",
          height: "15vw",
          border: `1px solid ${themeColor}`,
          borderBottom: "none",
          borderRadius: "30vw 30vw 0 0",
          bottom: "5vh",
          right: "20vw",
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const season = getSeason(currentSolarTermKey);
  const themeColor = currentSolarTerm.themeColor;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lxgwWenKai.variable} relative antialiased`}>
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

        <Providers>
          <Navbar />
          <div className="relative z-10 pt-20">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
