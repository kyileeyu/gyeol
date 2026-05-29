"use client";

import { useEffect, useRef } from "react";
// @ts-expect-error — threejs-components ships as a bundled ES module without types
import LiquidBackground from "threejs-components/build/backgrounds/liquid1.min.js";

type LiquidApp = {
  three: { dispose: () => void };
  liquidPlane: {
    material: { metalness: number; roughness: number };
    uniforms: { displacementScale: { value: number } };
    attenuation: number;
    update: () => void;
  };
  loadImage: (url: string | null | undefined) => Promise<void>;
  loadEnvMap: (url: string | null | undefined) => Promise<void>;
  setRain: (enable: boolean) => void;
  setRainTime: (seconds: number) => void;
  dispose: () => void;
};

type LiquidFactory = (canvas: HTMLCanvasElement) => LiquidApp;

type Props = {
  imageUrl?: string;
  envMapUrl?: string;
  metalness?: number;
  roughness?: number;
  displacement?: number;
  /** 0~1 — 낮을수록 물결이 빨리 사라짐 (라이브러리 기본 0.995) */
  attenuation?: number;
  /** 0~1 — 낮을수록 파동이 천천히 퍼짐. 1 = 기본 속도 */
  waveSpeed?: number;
};

// 결 팔레트: 대각선 결 — 설백(밝음)↔은박(어두움) 교차 밴드
function createSilkTexture(): string {
  const size = 2048;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return "";

  // 좌상 → 우하 대각선 그라디언트. 대비가 확실해야 금속 반사 밑에서도 보임.
  const grad = ctx.createLinearGradient(0, 0, size, size);
  const bands: Array<[number, string]> = [
    [0.00, "#FCFDFF"],
    [0.12, "#B6C2F7"],
    [0.24, "#FCFDFF"],
    [0.38, "#B6C2F7"],
    [0.50, "#FCFDFF"],
    [0.62, "#B6C2F7"],
    [0.76, "#FCFDFF"],
    [0.88, "#B6C2F7"],
    [1.00, "#FCFDFF"],
  ];
  for (const [pos, col] of bands) grad.addColorStop(pos, col);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return c.toDataURL("image/png");
}

export default function LiquidCanvas({
  imageUrl,
  envMapUrl,
  metalness = 0.3,
  roughness = 0.45,
  displacement = 5,
  attenuation = 0.98,
  waveSpeed = 0.45,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<LiquidApp | null>(null);
  const waveSpeedRef = useRef(waveSpeed);
  waveSpeedRef.current = waveSpeed;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const app = (LiquidBackground as LiquidFactory)(canvas);
    appRef.current = app;
    app.loadImage(imageUrl ?? createSilkTexture());
    app.liquidPlane.material.metalness = metalness;
    app.liquidPlane.material.roughness = roughness;
    app.liquidPlane.uniforms.displacementScale.value = displacement;
    app.liquidPlane.attenuation = attenuation;
    app.setRain(false);

    // 매 프레임마다 liquidPlane.update()를 호출하면 파동이 라이브러리 기본 속도(2.0)로 퍼짐.
    // waveSpeedRef에 따라 업데이트 빈도를 낮추면 그 비율만큼 천천히 퍼지게 됨.
    const originalUpdate = app.liquidPlane.update.bind(app.liquidPlane);
    let accumulator = 0;
    app.liquidPlane.update = () => {
      accumulator += waveSpeedRef.current;
      if (accumulator >= 1) {
        accumulator -= 1;
        originalUpdate();
      }
    };

    return () => {
      app.dispose();
      appRef.current = null;
    };
    // 마운트 시 한 번만 — Framer 원본과 동일 구조
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!appRef.current || !imageUrl) return;
    appRef.current.loadImage(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    if (!appRef.current || !envMapUrl) return;
    appRef.current.loadEnvMap(envMapUrl);
  }, [envMapUrl]);

  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    app.liquidPlane.material.metalness = metalness;
    app.liquidPlane.material.roughness = roughness;
    app.liquidPlane.uniforms.displacementScale.value = displacement;
    app.liquidPlane.attenuation = attenuation;
  }, [metalness, roughness, displacement, attenuation]);

  return (
    <div className="absolute -inset-[8%] z-0">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
