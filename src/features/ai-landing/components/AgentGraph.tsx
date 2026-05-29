"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const VIEW = 600;
const CENTER = { x: VIEW / 2, y: VIEW / 2 };

// 메인 4 agent — 각자 다른 거리·각도로 비대칭 배치
const AGENTS: Array<{ x: number; y: number; label: string }> = [
  { x: 172, y: 200, label: "Sense" },
  { x: 418, y: 208, label: "Shape" },
  { x: 164, y: 408, label: "Refine" },
  { x: 398, y: 424, label: "Connect" },
];

function distance(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

// deterministic pseudo-random (0~1)
function rand(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

type Dot = { x: number; y: number; r: number; alpha: number };

function generateDots(): Dot[] {
  const result: Dot[] = [];

  // inner cluster — 빽빽한 중심
  for (let i = 0; i < 60; i++) {
    const angle = rand(i * 7 + 1) * Math.PI * 2;
    const radius = 25 + rand(i * 11 + 3) * 140;
    result.push({
      x: CENTER.x + Math.cos(angle) * radius,
      y: CENTER.y + Math.sin(angle) * radius,
      r: 2.1 + rand(i * 13 + 5) * 1.5,
      alpha: 0.6 + rand(i * 17 + 7) * 0.25,
    });
  }

  // middle ring — 균등 분포 + jitter
  for (let i = 0; i < 56; i++) {
    const angle = (i / 56) * Math.PI * 2 + (rand(i * 19 + 11) - 0.5) * 0.18;
    const radius = 220 + (rand(i * 23 + 13) - 0.5) * 26;
    result.push({
      x: CENTER.x + Math.cos(angle) * radius,
      y: CENTER.y + Math.sin(angle) * radius,
      r: 1.8 + rand(i * 29 + 17) * 1.1,
      alpha: 0.4 + rand(i * 31 + 19) * 0.2,
    });
  }

  // outer ring — 가장 많은 점, 살짝 옅게
  for (let i = 0; i < 96; i++) {
    const angle = (i / 96) * Math.PI * 2 + (rand(i * 37 + 23) - 0.5) * 0.12;
    const radius = 286 + (rand(i * 41 + 29) - 0.5) * 22;
    result.push({
      x: CENTER.x + Math.cos(angle) * radius,
      y: CENTER.y + Math.sin(angle) * radius,
      r: 1.5 + rand(i * 43 + 31) * 0.8,
      alpha: 0.28 + rand(i * 47 + 37) * 0.2,
    });
  }

  return result;
}

// 색은 모두 globals.css 토큰(--gy-*)에서 결정 — DESIGN.md 인디고·페리윙클 5단
const C = {
  lineFrom: "var(--gy-deep)",
  lineTo: "var(--gy-sky)",
  lineHotFrom: "var(--gy-deep)",
  lineHotTo: "var(--gy-steel)",
  agentFill: "var(--gy-deep)",
  agentCore: "var(--gy-canvas)",
  agentGlow: "var(--gy-steel)",
  centerFill: "var(--gy-deep)",
  centerStroke: "var(--gy-deep)",
  centerText: "var(--gy-canvas)",
  centerGlow: "var(--gy-sky)",
  labelFill: "var(--gy-ink-muted)",
} as const;

export function AgentGraph() {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [m, setM] = useState({ x: CENTER.x, y: CENTER.y, inside: false });

  const dots = useMemo(() => generateDots(), []);

  // dot 간 proximity mesh — 거리 threshold 안의 쌍만 연결
  const edges = useMemo(() => {
    const e: Array<{ from: number; to: number }> = [];
    const threshold = 78;
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        if (dx * dx + dy * dy < threshold * threshold) {
          e.push({ from: i, to: j });
        }
      }
    }
    return e;
  }, [dots]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const move = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * VIEW;
      const y = ((e.clientY - rect.top) / rect.height) * VIEW;
      setM({ x, y, inside: true });
    };
    const leave = () => setM({ x: CENTER.x, y: CENTER.y, inside: false });

    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", leave);
    return () => {
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes gy-line-flow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -16; }
        }
        @keyframes gy-node-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gy-flow-line { animation: none !important; }
          .gy-pulse-ring { animation: none !important; }
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        style={{
          width: "min(600px, 100%)",
          height: "auto",
          aspectRatio: "1 / 1",
          cursor: "crosshair",
        }}
      >
        <defs>
          <linearGradient
            id="gy-agent-line"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={C.lineFrom} stopOpacity="0.85" />
            <stop offset="100%" stopColor={C.lineTo} stopOpacity="0.35" />
          </linearGradient>
          <linearGradient
            id="gy-agent-line-hot"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={C.lineHotFrom} stopOpacity="1" />
            <stop offset="100%" stopColor={C.lineHotTo} stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="gy-agent-node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.agentGlow} stopOpacity="0.55" />
            <stop offset="100%" stopColor={C.agentGlow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gy-agent-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.centerGlow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={C.centerGlow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {AGENTS.map((a, i) => {
          const midX = (CENTER.x + a.x) / 2;
          const midY = (CENTER.y + a.y) / 2;
          const d = distance(m.x, m.y, midX, midY);
          const hot = m.inside ? Math.max(0, 1 - d / 180) : 0;
          return (
            <line
              key={`line-${i}`}
              className="gy-flow-line"
              x1={CENTER.x}
              y1={CENTER.y}
              x2={a.x}
              y2={a.y}
              stroke={
                hot > 0.5 ? "url(#gy-agent-line-hot)" : "url(#gy-agent-line)"
              }
              strokeWidth={1.4 + hot * 2.4}
              strokeDasharray="4 4"
              style={{
                animation: reduced
                  ? undefined
                  : `gy-line-flow ${2.8 + i * 0.3 - hot * 1.6}s linear infinite`,
                transition: "stroke-width 220ms cubic-bezier(0,0,0.2,1)",
              }}
            />
          );
        })}

        {edges.map((e, i) => {
          const a = dots[e.from];
          const b = dots[e.to];
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const dist = distance(m.x, m.y, midX, midY);
          const hot = m.inside ? Math.max(0, 1 - dist / 90) : 0;
          const baseAlpha = Math.min(a.alpha, b.alpha) * 0.55;
          return (
            <line
              key={`edge-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={C.agentFill}
              strokeWidth={0.5 + hot * 0.6}
              opacity={Math.min(0.7, baseAlpha + hot * 0.35)}
              style={{
                transition: "stroke-width 220ms cubic-bezier(0,0,0.2,1)",
              }}
            />
          );
        })}

        {dots.map((d, i) => {
          const dist = distance(m.x, m.y, d.x, d.y);
          const hot = m.inside ? Math.max(0, 1 - dist / 100) : 0;
          const r = d.r + hot * 1.8;
          const alpha = d.alpha + hot * 0.35;
          return (
            <circle
              key={`dot-${i}`}
              cx={d.x}
              cy={d.y}
              r={r}
              fill={C.agentFill}
              opacity={Math.min(1, alpha)}
              style={{ transition: "r 240ms cubic-bezier(0,0,0.2,1)" }}
            />
          );
        })}

        {AGENTS.map((a, i) => {
          const d = distance(m.x, m.y, a.x, a.y);
          const hot = m.inside ? Math.max(0, 1 - d / 140) : 0;
          const lift = -hot * 5;
          const r = 9 + hot * 3.5;
          return (
            <g
              key={`agent-${i}`}
              style={{
                transform: `translate(0px, ${lift}px)`,
                transition: "transform 260ms cubic-bezier(0,0,0.2,1)",
              }}
            >
              <circle
                className="gy-pulse-ring"
                cx={a.x}
                cy={a.y}
                r={26 + hot * 6}
                fill="url(#gy-agent-node-glow)"
                style={{
                  transformOrigin: `${a.x}px ${a.y}px`,
                  animation: reduced
                    ? undefined
                    : `gy-node-pulse ${3.2 + i * 0.4}s ease-in-out infinite`,
                  opacity: 0.15 + hot * 0.45,
                  transition: "opacity 260ms, r 260ms",
                }}
              />
              <circle
                cx={a.x}
                cy={a.y}
                r={r}
                fill={C.agentFill}
                style={{ transition: "r 260ms cubic-bezier(0,0,0.2,1)" }}
              />
              <text
                x={a.x}
                y={a.y + (a.y < CENTER.y ? -28 : 38)}
                textAnchor="middle"
                fontSize="11"
                fill={C.labelFill}
                opacity={0.5 + hot * 0.5}
                fontFamily="Inter, sans-serif"
                fontWeight={500}
                letterSpacing="0.1em"
                style={{
                  textTransform: "uppercase",
                  transition: "opacity 260ms",
                }}
              >
                {a.label}
              </text>
            </g>
          );
        })}

        <g
          style={{
            transform: m.inside
              ? `translate(${(m.x - CENTER.x) * 0.04}px, ${(m.y - CENTER.y) * 0.04}px)`
              : "translate(0px, 0px)",
            transition: "transform 360ms cubic-bezier(0,0,0.2,1)",
          }}
        >
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="50"
            fill="url(#gy-agent-center-glow)"
          />
          <circle cx={CENTER.x} cy={CENTER.y} r="26" fill={C.centerFill} />
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="26"
            fill="none"
            stroke={C.centerStroke}
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <text
            x={CENTER.x}
            y={CENTER.y + 4}
            textAnchor="middle"
            fontSize="13"
            fill={C.centerText}
            fontWeight="600"
            fontFamily="Pretendard, sans-serif"
          >
            결
          </text>
        </g>
      </svg>
    </div>
  );
}
