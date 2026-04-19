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
};

// 결 팔레트: 박무 단색
function createSilkTexture(): string {
  const size = 2048;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#F0F4F8";
  ctx.fillRect(0, 0, size, size);

  return c.toDataURL("image/png");
}

export default function LiquidCanvas({
  imageUrl,
  envMapUrl,
  metalness = 0.75,
  roughness = 0.25,
  displacement = 5,
  attenuation = 0.95,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<LiquidApp | null>(null);

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
    <div className="absolute -inset-[20%] z-0">
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
