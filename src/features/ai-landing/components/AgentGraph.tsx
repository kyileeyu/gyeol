"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const AGENTS: Array<{ x: number; y: number; label: string }> = [
  { x: 80, y: 80, label: "Research" },
  { x: 320, y: 80, label: "Draft" },
  { x: 80, y: 320, label: "Verify" },
  { x: 320, y: 320, label: "Deliver" },
];

const CENTER = { x: 200, y: 200 };

function distance(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

// DESIGN.md sky-blue 5단 (mist baseline)
const C = {
  lineFrom: "#005187",
  lineTo: "#84B6F4",
  lineHotFrom: "#005187",
  lineHotTo: "#4D82BC",
  agentFill: "#005187",
  agentCore: "#FCFFFF",
  agentGlow: "#4D82BC",
  centerFill: "#005187",
  centerStroke: "#005187",
  centerText: "#FCFFFF",
  centerGlow: "#84B6F4",
  labelFill: "#5A6B78",
} as const;

export function AgentGraph() {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [m, setM] = useState({ x: CENTER.x, y: CENTER.y, inside: false });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const move = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 400;
      const y = ((e.clientY - rect.top) / rect.height) * 400;
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
        viewBox="0 0 400 400"
        style={{
          width: "min(440px, 92%)",
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
          <radialGradient
            id="gy-agent-center-glow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor={C.centerGlow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={C.centerGlow} stopOpacity="0" />
          </radialGradient>
        </defs>

        {AGENTS.map((a, i) => {
          const midX = (CENTER.x + a.x) / 2;
          const midY = (CENTER.y + a.y) / 2;
          const d = distance(m.x, m.y, midX, midY);
          const hot = m.inside ? Math.max(0, 1 - d / 140) : 0;
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

        {AGENTS.map((a, i) => {
          const d = distance(m.x, m.y, a.x, a.y);
          const hot = m.inside ? Math.max(0, 1 - d / 120) : 0;
          const lift = -hot * 6;
          const r = 14 + hot * 5;
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
                r={34 + hot * 8}
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
                opacity={0.95}
                style={{ transition: "r 260ms cubic-bezier(0,0,0.2,1)" }}
              />
              <circle cx={a.x} cy={a.y} r="5" fill={C.agentCore} />
              <text
                x={a.x}
                y={a.y + (a.y < CENTER.y ? -28 : 38)}
                textAnchor="middle"
                fontSize="10"
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
            r="48"
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
            당신
          </text>
        </g>
      </svg>
    </div>
  );
}
