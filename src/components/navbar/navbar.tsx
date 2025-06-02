"use client";

import { useEffect, useState } from "react";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCurrentSolarTerm, SOLAR_TERMS } from "@/core/constants/solar-terms";

const navItems = [
  { name: "首页", path: "/" },
  { name: "博客", path: "/blog" },
];

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

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // 获取当前节气信息
  const currentSolarTermKey = getCurrentSolarTerm();
  const currentSolarTerm = SOLAR_TERMS[currentSolarTermKey];
  const season = getSeason(currentSolarTermKey);
  const themeColor = currentSolarTerm.themeColor;

  // 监听滚动
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // 动态变换值
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "95%"]);
  const navPadding = useTransform(scrollY, [0, 100], [24, 16]);
  const navBorderRadius = useTransform(scrollY, [0, 100], [0, 24]);
  const logoSize = useTransform(scrollY, [0, 100], [24, 20]);

  return (
    <motion.nav
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        paddingTop: isScrolled ? "12px" : "0px",
        paddingLeft: isScrolled ? "16px" : "0px",
        paddingRight: isScrolled ? "16px" : "0px",
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="mx-auto shadow-lg transition-all duration-500"
        style={{
          width: navWidth,
          borderRadius: navBorderRadius,
          maxWidth: isScrolled ? "1200px" : "none",
          background: isScrolled ? `rgba(255, 255, 255, 0.9)` : `rgba(255, 255, 255, 0.8)`,
          backdropFilter: "blur(20px)",
          border: isScrolled ? `1px solid rgba(0, 0, 0, 0.1)` : `1px solid rgba(0, 0, 0, 0.05)`,
          boxShadow: isScrolled
            ? `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)`
            : `0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)`,
        }}
      >
        <motion.div
          className="flex items-center justify-between transition-all duration-500"
          style={{
            padding: navPadding,
          }}
        >
          {/* 品牌标识 */}
          <Link href="/" className="group relative flex items-center gap-3">
            {/* 节气装饰点 */}
            <motion.div
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: logoSize,
                height: logoSize,
                background: `linear-gradient(135deg, ${themeColor}80, ${themeColor})`,
                boxShadow: `0 0 20px ${themeColor}60`,
              }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div
                className="h-2 w-2 rounded-full bg-white"
                style={{
                  filter: `drop-shadow(0 0 4px ${themeColor})`,
                }}
              />
            </motion.div>

            <motion.div className="flex flex-col">
              <motion.span
                className="font-bold text-black transition-all duration-300"
                style={{
                  fontSize: isScrolled ? "18px" : "22px",
                  textShadow: `0 1px 2px rgba(255, 255, 255, 0.8)`,
                }}
                whileHover={{
                  scale: 1.02,
                }}
              >
                Bigbigb&apos;s Blog
              </motion.span>
              <motion.span
                className="text-xs transition-all duration-300"
                style={{
                  color: themeColor,
                  fontSize: isScrolled ? "10px" : "12px",
                  fontWeight: "500",
                  opacity: 0.9,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {currentSolarTerm.name} ·{" "}
                {season === "spring" ? "春" : season === "summer" ? "夏" : season === "autumn" ? "秋" : "冬"}
              </motion.span>
            </motion.div>
          </Link>

          {/* 导航菜单 */}
          <ul className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.2 }}
              >
                <Link href={item.path} className="group relative block py-2">
                  <motion.span
                    className={`relative font-medium transition-all duration-300 ${
                      pathname === item.path ? "text-black" : "text-gray-700 group-hover:text-black"
                    }`}
                    style={{
                      fontSize: isScrolled ? "14px" : "16px",
                      fontWeight: pathname === item.path ? "600" : "500",
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}

                    {/* 活跃状态指示器 */}
                    <motion.span
                      className="absolute right-0 -bottom-1 left-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${themeColor}, transparent)`,
                        boxShadow: `0 0 8px ${themeColor}60`,
                      }}
                      initial={false}
                      animate={{
                        scaleX: pathname === item.path ? 1 : 0,
                        opacity: pathname === item.path ? 1 : 0,
                      }}
                      whileHover={{
                        scaleX: 1,
                        opacity: 0.8,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />

                    {/* 悬停背景 */}
                    <motion.span
                      className="absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}10)`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}
