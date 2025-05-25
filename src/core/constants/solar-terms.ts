export interface SolarTerm {
  name: string;
  poem: {
    content: string;
    author: string;
    title: string;
  };
  themeColor: string;
}

export const SOLAR_TERMS: Record<string, SolarTerm> = {
  // 春季节气 - 浅绿色系列，逐渐加深
  lichun: {
    name: "立春",
    poem: {
      content: "律回岁晚冰霜少，春到人间草木知。",
      author: "张栻",
      title: "立春偶成",
    },
    themeColor: "#e0ffd1",
  },
  yushui: {
    name: "雨水",
    poem: {
      content: "春雨断桥人不渡，小舟撑出绿荫来。",
      author: "韦应物",
      title: "小雨夜行",
    },
    themeColor: "#d0f7c0",
  },
  jingzhe: {
    name: "惊蛰",
    poem: {
      content: "惊蛰雷声催栗发，春分雨脚引梅开。",
      author: "黄景仁",
      title: "绝句",
    },
    themeColor: "#bff0af",
  },
  chunfen: {
    name: "春分",
    poem: {
      content: "春分日月开，万物各有好。",
      author: "佚名",
      title: "古诗",
    },
    themeColor: "#aae99e",
  },
  qingming: {
    name: "清明",
    poem: {
      content: "清明时节雨纷纷，路上行人欲断魂。",
      author: "杜牧",
      title: "清明",
    },
    themeColor: "#95e28c",
  },
  guyu: {
    name: "谷雨",
    poem: {
      content: "风雨如晦，鸡鸣不已，既见君子，云胡不喜？",
      author: "佚名",
      title: "诗经·风雨",
    },
    themeColor: "#7fdb7b",
  },

  // 夏季节气 - 浅红色系列，逐渐加深
  lixia: {
    name: "立夏",
    poem: {
      content: "天地始交，万物并秀。",
      author: "佚名",
      title: "礼记·月令",
    },
    themeColor: "#ffeded",
  },
  xiaoman: {
    name: "小满",
    poem: {
      content: "小满江村好，榴花忽已繁。",
      author: "戴复古",
      title: "大历三年闰五月",
    },
    themeColor: "#ffe0e0",
  },
  mangzhong: {
    name: "芒种",
    poem: {
      content: "梅子金黄杏子肥，麦花雪白菜花稀。",
      author: "范成大",
      title: "四时田园杂兴",
    },
    themeColor: "#ffd1d1",
  },
  xiazhi: {
    name: "夏至",
    poem: {
      content: "夏至深长昼，江村似梦中。",
      author: "钱起",
      title: "夏景",
    },
    themeColor: "#ffc2c2",
  },
  xiaoshu: {
    name: "小暑",
    poem: {
      content: "小暑江村事，收庭纳夏凉。",
      author: "辛弃疾",
      title: "浣溪沙",
    },
    themeColor: "#ffb3b3",
  },
  dashu: {
    name: "大暑",
    poem: {
      content: "大暑时节须贪凉，炎炎暑热煞熬人。",
      author: "佚名",
      title: "民谚",
    },
    themeColor: "#ffa4a4",
  },

  // 秋季节气 - 浅黄色系列，逐渐加深
  liqiu: {
    name: "立秋",
    poem: {
      content: "乳鸦啼散玉屏空，暗数感君肠断处。",
      author: "李商隐",
      title: "暮秋独游曲江",
    },
    themeColor: "#fff9d9",
  },
  chushu: {
    name: "处暑",
    poem: {
      content: "林外鸣蝉近报秋，何堪处暑与长愁。",
      author: "僧志南",
      title: "早秋",
    },
    themeColor: "#fff4ba",
  },
  bailu: {
    name: "白露",
    poem: {
      content: "白露早凋伤，丹枫晚更红。",
      author: "杜甫",
      title: "题玄武禅师屋壁",
    },
    themeColor: "#ffef99",
  },
  qiufen: {
    name: "秋分",
    poem: {
      content: "秋分天气新，秋月洒金晖。",
      author: "佚名",
      title: "古诗",
    },
    themeColor: "#ffe97d",
  },
  hanlu: {
    name: "寒露",
    poem: {
      content: "寒露下，草木黄落。",
      author: "佚名",
      title: "礼记·月令",
    },
    themeColor: "#ffe35e",
  },
  shuangjiang: {
    name: "霜降",
    poem: {
      content: "霜落水返壑，风落木归山。",
      author: "李白",
      title: "秋浦歌十七首",
    },
    themeColor: "#ffdd3e",
  },

  // 冬季节气 - 浅蓝色系列，逐渐加深
  lidong: {
    name: "立冬",
    poem: {
      content: "立冬之日天渐寒，日短夜长人增膘。",
      author: "佚名",
      title: "民谚",
    },
    themeColor: "#e5f4ff",
  },
  xiaoxue: {
    name: "小雪",
    poem: {
      content: "小雪纷纷下楼台，飒飒寒风何处来。",
      author: "佚名",
      title: "古诗",
    },
    themeColor: "#d6ebff",
  },
  daxue: {
    name: "大雪",
    poem: {
      content: "大雪满弓刀，短策留营燧。",
      author: "高适",
      title: "除夜河亭留别皇甫冉",
    },
    themeColor: "#c6e2ff",
  },
  dongzhi: {
    name: "冬至",
    poem: {
      content: "冬至阳生春又来，年年常斗严凝雪。",
      author: "戴复古",
      title: "冬至",
    },
    themeColor: "#b5d9ff",
  },
  xiaohan: {
    name: "小寒",
    poem: {
      content: "小寒胜大寒，蚕虫化作蝴蝶飞。",
      author: "佚名",
      title: "民谚",
    },
    themeColor: "#a5d0ff",
  },
  dahan: {
    name: "大寒",
    poem: {
      content: "大寒正合三冬候，晓窗欹枕惊微霰。",
      author: "周密",
      title: "苏堤清月",
    },
    themeColor: "#94c6ff",
  },
};

import { SearchSunLongitude } from "astronomy-engine";

// 节气定义 - 黄经度数与名称的映射
const SOLAR_TERM_DEGREES: Record<number, string> = {
  315: "lichun", // 立春，黄经315°
  330: "yushui", // 雨水，黄经330°
  345: "jingzhe", // 惊蛰，黄经345°
  0: "chunfen", // 春分，黄经0°
  15: "qingming", // 清明，黄经15°
  30: "guyu", // 谷雨，黄经30°
  45: "lixia", // 立夏，黄经45°
  60: "xiaoman", // 小满，黄经60°
  75: "mangzhong", // 芒种，黄经75°
  90: "xiazhi", // 夏至，黄经90°
  105: "xiaoshu", // 小暑，黄经105°
  120: "dashu", // 大暑，黄经120°
  135: "liqiu", // 立秋，黄经135°
  150: "chushu", // 处暑，黄经150°
  165: "bailu", // 白露，黄经165°
  180: "qiufen", // 秋分，黄经180°
  195: "hanlu", // 寒露，黄经195°
  210: "shuangjiang", // 霜降，黄经210°
  225: "lidong", // 立冬，黄经225°
  240: "xiaoxue", // 小雪，黄经240°
  255: "daxue", // 大雪，黄经255°
  270: "dongzhi", // 冬至，黄经270°
  285: "xiaohan", // 小寒，黄经285°
  300: "dahan", // 大寒，黄经300°
};

// 获取指定年份的所有节气日期
export function getSolarTermsForYear(year: number): Record<string, Date> {
  const result: Record<string, Date> = {};

  // 遍历所有节气
  Object.entries(SOLAR_TERM_DEGREES).forEach(([degree, termKey]) => {
    // 搜索太阳到达特定黄经的时间
    // 设置搜索开始时间为当年1月1日
    const startDate = new Date(year, 0, 1);

    // 搜索太阳到达特定黄经的时间点
    const time = SearchSunLongitude(parseFloat(degree), startDate, 366);

    if (time) {
      // 获取UTC日期并转换为本地日期
      const date = new Date(time.date.getTime());

      // 存储节气日期
      result[termKey] = date;
    }
  });

  return result;
}

// 获取两个节气之间的间隔天数
function getDaysBetweenSolarTerms(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
}

// 获取当前节气
export function getCurrentSolarTerm(): string {
  const now = new Date();
  const currentYear = now.getFullYear();

  // 获取当年和下一年的节气日期
  const thisYearTerms = getSolarTermsForYear(currentYear);
  const nextYearTerms = getSolarTermsForYear(currentYear + 1);

  // 合并当年和下一年的前两个节气（立春和雨水）以处理跨年的情况
  const allTerms = {
    ...thisYearTerms,
    // 仅当当前日期接近年底时才需要考虑下一年的节气
    ...(now.getMonth() >= 11
      ? {
          lichun_next: nextYearTerms.lichun,
          yushui_next: nextYearTerms.yushui,
        }
      : {}),
  };

  // 查找当前所处的节气
  let currentTerm = "";

  // 按日期排序所有节气
  const sortedTerms = Object.entries(allTerms).sort((a, b) => {
    return a[1].getTime() - b[1].getTime();
  });

  // 查找当前日期所在的节气区间
  for (let i = 0; i < sortedTerms.length - 1; i++) {
    const [termKey, termDate] = sortedTerms[i];
    const [, nextTermDateValue] = sortedTerms[i + 1];

    if (now >= termDate && now < nextTermDateValue) {
      currentTerm = termKey.replace("_next", "");
      break;
    }
  }

  // 如果没有找到（可能是今年最后一个节气到明年立春之间）
  if (!currentTerm && sortedTerms.length > 0) {
    const lastTerm = sortedTerms[sortedTerms.length - 1];
    if (now >= lastTerm[1]) {
      currentTerm = lastTerm[0].replace("_next", "");
    }
  }

  // 如果仍然没找到，默认返回立春
  return currentTerm || "lichun";
}

// 获取指定日期的节气信息
export function getSolarTermInfo(date: Date = new Date()): {
  current: {
    key: string;
    name: string;
    date: Date;
  };
  next: {
    key: string;
    name: string;
    date: Date;
    daysUntil: number;
  };
} {
  const currentYear = date.getFullYear();

  // 获取当年和下一年的节气日期
  const thisYearTerms = getSolarTermsForYear(currentYear);
  const nextYearTerms = getSolarTermsForYear(currentYear + 1);

  // 合并节气
  const allTerms = {
    ...thisYearTerms,
    ...(date.getMonth() >= 11
      ? {
          lichun_next: nextYearTerms.lichun,
          yushui_next: nextYearTerms.yushui,
        }
      : {}),
  };

  // 按日期排序所有节气
  const sortedTerms = Object.entries(allTerms).sort((a, b) => {
    return a[1].getTime() - b[1].getTime();
  });

  let currentTerm = "";
  let currentTermDate: Date | null = null;
  let nextTerm = "";
  let nextTermDate: Date | null = null;

  // 查找当前所在节气和下一个节气
  for (let i = 0; i < sortedTerms.length - 1; i++) {
    const [termKey, termDate] = sortedTerms[i];
    const [nextTermKeyRaw, nextTermDateValue] = sortedTerms[i + 1];

    if (date >= termDate && date < nextTermDateValue) {
      currentTerm = termKey.replace("_next", "");
      currentTermDate = termDate;
      nextTerm = nextTermKeyRaw.replace("_next", "");
      nextTermDate = nextTermDateValue;
      break;
    }
  }

  // 如果没有找到（可能是今年最后一个节气到明年立春之间）
  if (!currentTerm && sortedTerms.length > 0) {
    const lastTermIndex = sortedTerms.length - 1;
    const lastTerm = sortedTerms[lastTermIndex];

    if (date >= lastTerm[1]) {
      currentTerm = lastTerm[0].replace("_next", "");
      currentTermDate = lastTerm[1];

      // 下一个节气是明年的第一个节气
      const nextYearFirstTerm = Object.entries(nextYearTerms)[0];
      nextTerm = nextYearFirstTerm[0];
      nextTermDate = nextYearFirstTerm[1];
    }
  }

  // 计算距离下一个节气的天数
  const daysUntilNextTerm = nextTermDate ? getDaysBetweenSolarTerms(date, nextTermDate) : 0;

  return {
    current: {
      key: currentTerm,
      name: SOLAR_TERMS[currentTerm]?.name || "",
      date: currentTermDate || new Date(),
    },
    next: {
      key: nextTerm,
      name: SOLAR_TERMS[nextTerm]?.name || "",
      date: nextTermDate || new Date(),
      daysUntil: daysUntilNextTerm,
    },
  };
}
