"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  MAX_RIPPLES,
  waterFragmentShader,
  waterVertexShader,
} from "./shaders";

type RippleBuffer = {
  // flat ring buffer of Vector4 — (x, y, t0, _)
  slots: THREE.Vector4[];
  head: number;
  count: number;
  lastEmitTime: number;
  lastEmitPos: { x: number; y: number };
};

function WaterPlane({
  ripples,
  timeRef,
}: {
  ripples: React.MutableRefObject<RippleBuffer>;
  timeRef: React.MutableRefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, clock } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uRipples: { value: ripples.current.slots },
      uRippleCount: { value: 0 },
    }),
    [ripples],
  );

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms]);

  // idle auto-pulse: when no mouse input for a while, emit soft ripples
  // from drifting anchor points so the surface never goes dead
  useEffect(() => {
    const driftA = { x: 0.35, y: 0.4 };
    const driftB = { x: 0.7, y: 0.65 };
    let cancelled = false;
    let timeoutId: number;

    function schedule(delay: number) {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        const idle = clock.elapsedTime - ripples.current.lastEmitTime;
        if (idle > 1.6) {
          emitRipple(
            ripples.current,
            driftA.x + Math.cos(clock.elapsedTime * 0.25) * 0.08,
            driftA.y + Math.sin(clock.elapsedTime * 0.22) * 0.08,
            clock.elapsedTime,
          );
          emitRipple(
            ripples.current,
            driftB.x + Math.cos(clock.elapsedTime * 0.18 + 1.3) * 0.08,
            driftB.y + Math.sin(clock.elapsedTime * 0.3 + 0.7) * 0.08,
            clock.elapsedTime + 0.35,
          );
        }
        schedule(1600 + Math.random() * 800);
      }, delay);
    }
    schedule(600);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [clock, ripples]);

  useFrame((state) => {
    const u = materialRef.current?.uniforms;
    if (!u) return;
    const t = state.clock.elapsedTime;
    timeRef.current = t;
    u.uTime.value = t;
    u.uRippleCount.value = ripples.current.count;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={waterVertexShader}
        fragmentShader={waterFragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function emitRipple(buf: RippleBuffer, x: number, y: number, t: number) {
  buf.slots[buf.head].set(x, y, t, 0);
  buf.head = (buf.head + 1) % MAX_RIPPLES;
  if (buf.count < MAX_RIPPLES) buf.count += 1;
  buf.lastEmitTime = t;
  buf.lastEmitPos.x = x;
  buf.lastEmitPos.y = y;
}

export default function WaterShader() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<number>(0);

  const ripples = useRef<RippleBuffer>({
    slots: (() => {
      const arr: THREE.Vector4[] = [];
      for (let i = 0; i < MAX_RIPPLES; i++) {
        // initial t0 = -1000 keeps them invisible (age > lifetime)
        arr.push(new THREE.Vector4(0, 0, -1000, 0));
      }
      return arr;
    })(),
    head: 0,
    count: 0,
    lastEmitTime: -1000,
    lastEmitPos: { x: 0.5, y: 0.5 },
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // throttle: emit at most every 35ms, OR when mouse has moved > 0.02 uv since last emit
    const MIN_INTERVAL = 0.035;
    const MIN_DISTANCE = 0.02;

    function onPointerMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;

      const t = timeRef.current;
      const buf = ripples.current;
      const dt = t - buf.lastEmitTime;
      const dx = x - buf.lastEmitPos.x;
      const dy = y - buf.lastEmitPos.y;
      const d = Math.hypot(dx, dy);

      if (dt >= MIN_INTERVAL || d >= MIN_DISTANCE) {
        emitRipple(buf, x, y, t);
      }
    }

    function onPointerDown(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      const t = timeRef.current;
      // click = bigger splash — emit 3 ripples staggered for a stronger pulse
      emitRipple(ripples.current, x, y, t);
      emitRipple(ripples.current, x, y, t + 0.08);
      emitRipple(ripples.current, x, y, t + 0.18);
    }

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerdown", onPointerDown);
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], near: 0, far: 1, zoom: 1 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <WaterPlane ripples={ripples} timeRef={timeRef} />
      </Canvas>
    </div>
  );
}
