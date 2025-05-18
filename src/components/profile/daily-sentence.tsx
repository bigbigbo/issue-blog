import { Terminal } from "lucide-react";

import requestClient from "@/libs/request";

interface WeatherIcons {
  day: string;
  night: string;
}

interface Weather {
  city_name: string;
  date: string;
  temperature: string;
  humidity: string;
  climate: string;
  wind_direction: string;
  hurricane: string;
  icons: WeatherIcons;
}

interface ApiResponse {
  res: number;
  data: {
    id: string;
    weather: Weather;
    date: string;
    content_list: any[];
    menu: any;
    ad: any[];
  };
}

// 服务器组件
export default async function DailySentence() {
  const response = await requestClient
    .get<ApiResponse>("http://v3.wufazhuce.com:8000/api/channel/one/0/0", {
      next: {
        revalidate: 60 * 60,
      },
    })
    .json();

  const { data } = response as ApiResponse;
  const { weather } = data;

  // 提取要显示的天气数据
  const weatherData = {
    city_name: weather.city_name,
    date: weather.date,
    temperature: `${weather.temperature}°C`,
    humidity: `${weather.humidity}%`,
    climate: weather.climate,
    wind_direction: weather.wind_direction,
    hurricane: `${weather.hurricane}`,
  };

  // 将对象转换为格式化的JSON字符串
  const formattedWeather = JSON.stringify(weatherData, null, 2);

  // 获取当前时间
  const now = new Date();
  const timeString = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 简单的语法高亮函数
  const highlightJson = (json: string) => {
    // 高亮键
    let highlightedJson = json.replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:');

    // 高亮字符串值
    highlightedJson = highlightedJson.replace(/: "([^"]+)"/g, ': <span class="text-green-400">"$1"</span>');

    // 高亮数字
    highlightedJson = highlightedJson.replace(/: (-?\d+\.?\d*)/g, ': <span class="text-yellow-400">$1</span>');

    return highlightedJson;
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-700 bg-slate-900 text-white">
      {/* 终端标题栏 */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 p-2">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-green-400" />
          <span className="text-xs font-medium">weather_data.json - bash</span>
        </div>
        <div className="flex space-x-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* 终端内容 */}
      <div className="p-4 font-mono text-sm">
        {/* 命令行提示符和命令 */}
        <div className="mb-2 flex items-start">
          <span className="mr-2 text-green-400">user@server:~$</span>
          <span className="text-white">cat weather_data.json</span>
        </div>

        {/* 命令输出 - 语法高亮的JSON */}
        <pre
          className="overflow-auto rounded-md bg-slate-900 p-4 font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: highlightJson(formattedWeather) }}
        />

        {/* 新命令行提示符 */}
        <div className="mt-2 flex items-center">
          <span className="mr-2 text-green-400">user@server:~$</span>
          <span className="animate-pulse text-white">_</span>
        </div>

        {/* 时间标记 */}
        <div className="mt-4 text-right text-xs text-slate-500">Last updated: {timeString}</div>
      </div>
    </div>
  );
}
