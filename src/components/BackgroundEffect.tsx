"use client";

import { useEffect, useRef } from "react";

// 柏林噪声函数实现
const noise = (() => {
  const permutation = [...Array(256)].map(() =>
    Math.floor(Math.random() * 256)
  );
  const p = [...permutation, ...permutation];

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(t: number, a: number, b: number) {
    return a + t * (b - a);
  }

  function grad(hash: number, x: number, y: number) {
    const h = hash & 15;
    const grad = 1 + (h & 7);
    return (h & 8 ? -grad : grad) * x + (h & 4 ? -grad : grad) * y;
  }

  return function (x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y;
    const B = p[X + 1] + Y;
    return lerp(
      v,
      lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
      lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1))
    );
  };
})();

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const timeRef = useRef(0);
  const blobsRef = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      hue: number;
      noiseOffsetX: number;
      noiseOffsetY: number;
      pulsePhase: number;
      pulseSpeed: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布大小为窗口大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 初始化光晕
    const initBlobs = () => {
      const numBlobs = 4;
      blobsRef.current = [];

      for (let i = 0; i < numBlobs; i++) {
        blobsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 100 + Math.random() * 150,
          speed: 0.2 + Math.random() * 0.3,
          angle: Math.random() * Math.PI * 2,
          hue: 180 + Math.random() * 60, // 蓝色到青色范围
          noiseOffsetX: Math.random() * 1000,
          noiseOffsetY: Math.random() * 1000,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        });
      }
    };

    // 绘制有机形状
    const drawOrganicBlob = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      noiseTime: number,
      noiseScale: number,
      hue: number,
      alpha: number
    ) => {
      ctx.beginPath();
      const points: [number, number][] = [];
      const numPoints = 50;

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const noiseX = Math.cos(angle) * noiseScale + noiseTime;
        const noiseY = Math.sin(angle) * noiseScale + noiseTime;
        const distortion = noise(noiseX, noiseY) * 0.5 + 0.5;
        const radius = size * (0.8 + distortion * 0.4);
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        points.push([px, py]);
      }

      // 使用贝塞尔曲线连接点
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 0; i < points.length; i++) {
        const curr = points[i];
        const next = points[(i + 1) % points.length];
        const nextnext = points[(i + 2) % points.length];

        const cp1x =
          curr[0] +
          (next[0] - points[(i - 1 + points.length) % points.length][0]) * 0.15;
        const cp1y =
          curr[1] +
          (next[1] - points[(i - 1 + points.length) % points.length][1]) * 0.15;
        const cp2x = next[0] - (nextnext[0] - curr[0]) * 0.15;
        const cp2y = next[1] - (nextnext[1] - curr[1]) * 0.15;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next[0], next[1]);
      }

      ctx.closePath();

      // 创建渐变
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5);
      gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${alpha * 0.5})`);
      gradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, ${alpha * 0.3})`);
      gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();

      // 添加内部光晕
      const innerGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 0.8);
      innerGlow.addColorStop(0, `hsla(${hue}, 70%, 80%, ${alpha * 0.4})`);
      innerGlow.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);

      ctx.fillStyle = innerGlow;
      ctx.fill();
    };

    // 监听窗口大小变化
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    initBlobs();

    const animate = () => {
      timeRef.current += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 创建渐变背景
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a");
      gradient.addColorStop(1, "#1e293b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 更新和绘制每个光晕
      blobsRef.current.forEach((blob) => {
        // 更新位置
        blob.x += Math.cos(blob.angle) * blob.speed;
        blob.y += Math.sin(blob.angle) * blob.speed;

        // 边界检查和反弹
        if (blob.x < -blob.size) blob.x = canvas.width + blob.size;
        if (blob.x > canvas.width + blob.size) blob.x = -blob.size;
        if (blob.y < -blob.size) blob.y = canvas.height + blob.size;
        if (blob.y > canvas.height + blob.size) blob.y = -blob.size;

        // 更新脉冲
        blob.pulsePhase += blob.pulseSpeed;
        const pulse = Math.sin(blob.pulsePhase) * 0.2 + 1;

        // 更新噪声偏移
        blob.noiseOffsetX += 0.002;
        blob.noiseOffsetY += 0.002;

        // 绘制有机光晕
        drawOrganicBlob(
          ctx,
          blob.x,
          blob.y,
          blob.size * pulse,
          timeRef.current + blob.noiseOffsetX,
          2,
          blob.hue,
          0.6
        );
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20"
    />
  );
}
