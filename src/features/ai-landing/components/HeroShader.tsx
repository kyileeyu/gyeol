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

  // 결 sky-blue 5단 (DESIGN.md)
  const vec3 cCanvas = vec3(0.988, 1.000, 1.000);
  const vec3 cSoft   = vec3(0.769, 0.855, 0.980);
  const vec3 cSky    = vec3(0.518, 0.714, 0.957);
  const vec3 cSteel  = vec3(0.302, 0.510, 0.737);
  const vec3 cDeep   = vec3(0.000, 0.318, 0.529);

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
    }),
    []
  );

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
