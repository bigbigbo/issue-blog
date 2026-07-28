function seededValue(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

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
                width: `${seededValue(i, 1) * 20 + 10}px`,
                height: `${seededValue(i, 2) * 10 + 5}px`,
                backgroundColor: themeColor,
                borderRadius: "50%",
                left: `${seededValue(i, 3) * 100}%`,
                top: `${seededValue(i, 4) * 100}%`,
                transform: `rotate(${seededValue(i, 5) * 360}deg)`,
                animation: `float-around ${seededValue(i, 6) * 40 + 20}s linear infinite`,
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
                borderLeft: `${seededValue(i, 11) * 10 + 5}px solid transparent`,
                borderRight: `${seededValue(i, 12) * 10 + 5}px solid transparent`,
                borderBottom: `${seededValue(i, 13) * 20 + 15}px solid ${themeColor}20`,
                left: `${seededValue(i, 14) * 100}%`,
                top: `${seededValue(i, 15) * 100}%`,
                transform: `rotate(${seededValue(i, 16) * 360}deg)`,
                animation: `float-around ${seededValue(i, 17) * 50 + 30}s linear infinite`,
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
                width: `${seededValue(i, 21) * 30 + 20}px`,
                height: `${seededValue(i, 22) * 2 + 1}px`,
                backgroundColor: themeColor,
                left: `${seededValue(i, 23) * 100}%`,
                top: `${seededValue(i, 24) * 100}%`,
                transform: `rotate(${seededValue(i, 25) * 360}deg)`,
                animation: `float-around ${seededValue(i, 26) * 60 + 40}s linear infinite`,
              }}
            />
          ))}
          {/* 水波纹：多个同心圆 */}
          {Array.from({ length: 5 }).map((_, i) => {
            const size = seededValue(i, 31) * 100 + 50;
            return (
              <div
                key={`ripple-${i}`}
                className="absolute opacity-5"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  border: `1px solid ${themeColor}`,
                  borderRadius: "50%",
                  left: `${seededValue(i, 32) * 100}%`,
                  top: `${seededValue(i, 33) * 100}%`,
                  animation: `ripple ${seededValue(i, 34) * 20 + 10}s ease-out infinite`,
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
                width: `${seededValue(i, 41) * 15 + 10}px`,
                height: `${seededValue(i, 42) * 15 + 10}px`,
                backgroundColor: `${themeColor}40`,
                borderRadius: "2px 15px 2px 15px",
                left: `${seededValue(i, 43) * 100}%`,
                top: `${seededValue(i, 44) * 100}%`,
                transform: `rotate(${seededValue(i, 45) * 360}deg)`,
                animation: `falling ${seededValue(i, 46) * 50 + 30}s linear infinite`,
              }}
            />
          ))}
          {/* 枫叶图案：简化表示 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`maple-${i}`}
              className="absolute opacity-8"
              style={{
                width: `${seededValue(i, 51) * 20 + 15}px`,
                height: `${seededValue(i, 52) * 20 + 15}px`,
                borderRadius: "0 50% 50% 50%",
                border: `1px solid ${themeColor}`,
                left: `${seededValue(i, 53) * 100}%`,
                top: `${seededValue(i, 54) * 100}%`,
                transform: `rotate(${seededValue(i, 55) * 360}deg)`,
                animation: `float-around ${seededValue(i, 56) * 40 + 30}s linear infinite`,
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
                width: `${seededValue(i, 61) * 5 + 2}px`,
                height: `${seededValue(i, 62) * 5 + 2}px`,
                backgroundColor: themeColor,
                borderRadius: "50%",
                left: `${seededValue(i, 63) * 100}%`,
                top: `${seededValue(i, 64) * 100}%`,
                animation: `snowfall ${seededValue(i, 65) * 60 + 30}s linear infinite`,
              }}
            />
          ))}
          {/* 冰晶：简化为六角星 */}
          {Array.from({ length: 8 }).map((_, i) => {
            const size = seededValue(i, 71) * 15 + 10;
            return (
              <div
                key={`crystal-${i}`}
                className="absolute opacity-5"
                style={{
                  width: size,
                  height: size,
                  position: "absolute",
                  left: `${seededValue(i, 72) * 100}%`,
                  top: `${seededValue(i, 73) * 100}%`,
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

export default function BackgroundDecorations({ themeColor, season }: { themeColor: string; season: string }) {
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
              width: `${seededValue(i, 81) * 8 + 2}px`,
              height: `${seededValue(i, 82) * 8 + 2}px`,
              left: `${seededValue(i, 83) * 100}%`,
              top: `${seededValue(i, 84) * 100}%`,
              animationDuration: `${seededValue(i, 85) * 50 + 50}s`,
              animationDelay: `${seededValue(i, 86) * 5}s`,
              animation: `float-around ${seededValue(i, 87) * 30 + 30}s linear infinite`,
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
