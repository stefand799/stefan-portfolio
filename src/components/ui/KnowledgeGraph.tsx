"use client";

import { useEffect, useRef } from "react";

// Background for the About page: a slowly rotating 3D graph of fields of
// knowledge. Nodes sit on a sphere, each linked to its nearest neighbours;
// now and then a signal travels along one of the links.
const FIELDS = [
  "math", "physics", "chemistry", "biology", "neuroscience",
  "computer science", "logic", "language", "literature", "philosophy",
  "music", "art", "history", "time", "space",
];
const NODES = 56; // labeled fields + unlabeled "ideas"
const NEIGHBOURS = 3;
const ROTATION_PER_SECOND = 0.06; // radians around the vertical axis
const TILT = 0.35; // radians, fixed tilt so the sphere is seen slightly from above
const SIGNAL_SECONDS = 2.2; // time for a signal to cross one link

type Vec3 = { x: number; y: number; z: number };

// Small seeded PRNG so the layout is the same on every visit.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(7);
  const nodes: Vec3[] = [];
  // Fibonacci sphere with a little jitter: evenly spread, not too regular.
  for (let i = 0; i < NODES; i++) {
    const y = 1 - (2 * (i + 0.5)) / NODES;
    const r = Math.sqrt(1 - y * y);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    const k = 0.85 + rand() * 0.3;
    nodes.push({ x: Math.cos(phi) * r * k, y: y * k, z: Math.sin(phi) * r * k });
  }
  // Shuffle so labeled fields are spread over the sphere, not stacked at the top.
  const order = nodes.map((_, i) => i).sort(() => rand() - 0.5);
  const labels = new Map<number, string>();
  FIELDS.forEach((f, i) => labels.set(order[i], f));

  const edges: [number, number][] = [];
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, NEIGHBOURS)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  return { nodes, edges, labels, rand };
}

function readColors() {
  const css = getComputedStyle(document.documentElement);
  return {
    line: css.getPropertyValue("--color-muted").trim() || "#6B6B6B",
    node: css.getPropertyValue("--color-fg").trim() || "#1A1A1A",
    signal: css.getPropertyValue("--color-prompt").trim() || "#4A7C59",
  };
}

export function KnowledgeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { nodes, edges, labels, rand } = buildGraph();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let width = 0;
    let height = 0;
    let signal = { edge: 0, start: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);
      const wide = width >= 768;
      const radius = Math.min(width, height) * (wide ? 0.32 : 0.4);
      // Desktop: leaning on the right edge, away from the text column.
      // Mobile: centered and much fainter, without labels.
      const cx = wide ? width - radius * 0.6 : width * 0.5;
      const cy = height * 0.55;
      const fade = wide ? 0.75 : 0.4;

      const angle = seconds * ROTATION_PER_SECOND;
      const cosA = Math.cos(angle), sinA = Math.sin(angle);
      const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
      const camera = 3;

      // Rotate (vertical axis, then tilt) and project with perspective.
      const projected = nodes.map((p) => {
        const x1 = p.x * cosA + p.z * sinA;
        const z1 = -p.x * sinA + p.z * cosA;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        const s = camera / (camera + z2);
        // depth: 1 = closest to the viewer, 0 = farthest
        const depth = (1 - z2) / 2;
        return { x: cx + x1 * radius * s, y: cy + y2 * radius * s, s, depth };
      });

      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      for (const [a, b] of edges) {
        const pa = projected[a], pb = projected[b];
        ctx.globalAlpha = (0.03 + 0.15 * ((pa.depth + pb.depth) / 2)) * fade;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      ctx.font = "11px var(--font-jetbrains-mono), monospace";
      ctx.textBaseline = "middle";
      projected.forEach((p, i) => {
        const label = labels.get(i);
        ctx.globalAlpha = (0.1 + 0.4 * p.depth) * fade;
        ctx.fillStyle = colors.node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (label ? 2.6 : 1.6) * p.s, 0, Math.PI * 2);
        ctx.fill();
        if (label && wide) {
          ctx.globalAlpha = (0.06 + 0.45 * p.depth) * fade;
          ctx.fillStyle = colors.line;
          ctx.fillText(label, p.x + 6, p.y);
        }
      });

      // A signal travelling along one link at a time.
      if (!reduceMotion && edges.length > 0) {
        let progress = (seconds - signal.start) / SIGNAL_SECONDS;
        if (progress >= 1) {
          signal = { edge: Math.floor(rand() * edges.length), start: seconds };
          progress = 0;
        }
        const [a, b] = edges[signal.edge];
        const pa = projected[a], pb = projected[b];
        ctx.globalAlpha = 0.8 * fade;
        ctx.fillStyle = colors.signal;
        ctx.beginPath();
        ctx.arc(pa.x + (pb.x - pa.x) * progress, pa.y + (pb.y - pa.y) * progress, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    resize();

    const observer = new MutationObserver(() => {
      colors = readColors();
      if (reduceMotion) draw(0);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (reduceMotion) {
      draw(0);
      const onResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener("resize", onResize);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      draw((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
