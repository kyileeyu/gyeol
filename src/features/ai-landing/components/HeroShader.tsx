"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMotionValue, useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uBlur;
  uniform float uAngle;
  uniform float uAspect;
  varying vec2 vUv;

  // 결 인디고·페리윙클 5단 — globals.css(--gy-*) 토큰에서 런타임 주입
  uniform vec3 cCanvas;
  uniform vec3 cSoft;
  uniform vec3 cSky;
  uniform vec3 cSteel;
  uniform vec3 cDeep;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.55;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 puv = uv;
    puv.x *= uAspect;

    // directional blur: angle 방향으로 N개 샘플의 noise를 평균
    vec2 dir = vec2(cos(uAngle), sin(uAngle));
    float spread = uBlur * 0.22;

    float n = 0.0;
    const int TAPS = 9;
    for (int i = 0; i < TAPS; i++) {
      float t = (float(i) / float(TAPS - 1)) - 0.5;
      vec2 s = puv + dir * t * spread;
      n += fbm(s * 2.4 + vec2(uTime * 0.035, -uTime * 0.02));
    }
    n /= float(TAPS);

    // dispersion: blur 클수록 channel 분리 (subtle)
    float disp = uBlur * 0.018;
    float nR = fbm((puv + dir * disp) * 2.4 + uTime * 0.035);
    float nB = fbm((puv - dir * disp) * 2.4 + uTime * 0.035);
    n = mix(n, (nR + n + nB) / 3.0, 0.4);

    // color ladder (sky-blue 5단)
    vec3 col;
    if (n < 0.32) {
      col = mix(cCanvas, cSoft, smoothstep(0.05, 0.32, n));
    } else if (n < 0.55) {
      col = mix(cSoft, cSky, smoothstep(0.32, 0.55, n));
    } else if (n < 0.78) {
      col = mix(cSky, cSteel, smoothstep(0.55, 0.78, n));
    } else {
      col = mix(cSteel, cDeep, smoothstep(0.78, 1.0, n));
    }

    // vignette → 외곽은 canvas로 페이드 (텍스트 가독성 보호)
    float vig = smoothstep(1.05, 0.25, length(uv - 0.5));
    col = mix(cCanvas, col, vig * 0.92);

    // 위에서 아래로 fade-down (다음 섹션과 자연스럽게 연결)
    float fade = smoothstep(0.65, 1.0, uv.y);
    col = mix(col, cCanvas, fade * 0.85);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// hex(#RRGGBB / #RGB) → 정규화 vec3 (0~1). CSS 토큰을 셰이더 uniform으로 옮길 때 사용.
function hexToVec3(hex: string): THREE.Vector3 {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return new THREE.Vector3(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255
  );
}

function ShaderPlane({ blurMv }: { blurMv: MotionValue<number> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const reducedRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBlur: { value: 1.0 },
      uAngle: { value: Math.PI * 0.25 },
      uAspect: { value: 1.0 },
      // DESIGN.md 인디고 5단 — fallback 기본값, 마운트 시 CSS 토큰으로 덮어씀
      cCanvas: { value: hexToVec3("#FCFDFF") },
      cSoft: { value: hexToVec3("#B6C2F7") },
      cSky: { value: hexToVec3("#7B93F4") },
      cSteel: { value: hexToVec3("#1F49ED") },
      cDeep: { value: hexToVec3("#0142A0") },
    }),
    []
  );

  // globals.css --gy-* 토큰을 읽어 색 uniform을 채움 — 색 결정은 globals.css 한 곳에서만
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const sync = (name: string, target: THREE.Vector3) => {
      const v = cs.getPropertyValue(name).trim();
      if (v) target.copy(hexToVec3(v));
    };
    sync("--gy-canvas", uniforms.cCanvas.value);
    sync("--gy-soft", uniforms.cSoft.value);
    sync("--gy-sky", uniforms.cSky.value);
    sync("--gy-steel", uniforms.cSteel.value);
    sync("--gy-deep", uniforms.cDeep.value);
  }, [uniforms]);

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    if (!reducedRef.current) {
      m.uniforms.uTime.value = state.clock.elapsedTime;
    }
    m.uniforms.uBlur.value = blurMv.get();
    const size = state.size;
    m.uniforms.uAspect.value = size.width / Math.max(size.height, 1);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function HeroShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const blur = useMotionValue(reducedMotion ? 0.2 : 1.0);

  useEffect(() => {
    if (reducedMotion) {
      blur.set(0.2);
      return;
    }

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const height = rect.height || window.innerHeight;
      // element top이 viewport top과 일치할 때 progress=0
      // element bottom이 viewport top과 일치할 때 progress=1
      const p = Math.min(1, Math.max(0, -rect.top / height));
      blur.set(1 - p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [blur, reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: -8,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ShaderPlane blurMv={blur} />
      </Canvas>
    </div>
  );
}
