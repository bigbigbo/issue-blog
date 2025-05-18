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
      content: "霜降水返壑，风落木归山。",
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

// 获取当前节气
export function getCurrentSolarTerm(): string {
  return "lixia";
}
