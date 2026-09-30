'use client';
import { useEffect, useRef } from 'react';
import { useTheme, type Theme } from './ThemeProvider';

const THEME_BG: Record<Theme, string> = {
  light: '#EEE9DF',
  dark: '#060F22',
};

const PX = 7;
const WAVE_MS = 500;
const FILL_F = 0.28; // wider fade zone for softer dissolve per pixel

// Ease-out quint: sharp initial reveal, long silky tail
function easeOut(t: number) {
  return 1 - (1 - t) ** 5;
}

export default function ThemeTransition() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const prevThemeRef = useRef<Theme | null>(null);
  // Don't animate the initial hydration restore from localStorage
  const armedRef = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => { armedRef.current = true; }, 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const prev = prevThemeRef.current;
    prevThemeRef.current = theme;

    if (!armedRef.current || prev === null || prev === theme) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Cover the whole screen with the OLD theme's bg before clearing
    const oldBg = THEME_BG[prev];
    ctx.fillStyle = oldBg;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, W, H);

    // Theme committed instantly — new theme is already applied underneath.
    // Wipe old-bg canvas away from several random hotspots simultaneously.
    const cols = Math.ceil(W / PX);
    const rows = Math.ceil(H / PX);

    // 3–5 random origin points scattered across the grid
    const numHotspots = 3 + Math.floor(Math.random() * 3);
    const hotspots = Array.from({ length: numHotspots }, () => ({
      c: Math.random() * cols,
      r: Math.random() * rows,
    }));

    const pixels: { x: number; y: number; nd: number }[] = [];
    let maxD = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Distance to nearest hotspot determines wave-front timing
        let minD = Infinity;
        for (const h of hotspots) {
          const d = Math.sqrt((c - h.c) ** 2 + (r - h.r) ** 2);
          if (d < minD) minD = d;
        }
        if (minD > maxD) maxD = minD;
        pixels.push({ x: c * PX, y: r * PX, nd: minD });
      }
    }
    for (const p of pixels) {
      p.nd = p.nd / maxD + (Math.random() - 0.5) * 0.02;
      if (p.nd < 0) p.nd = 0;
    }

    let t0: number | null = null;

    function draw(ts: number) {
      if (t0 === null) t0 = ts;
      const prog = (ts - t0) / WAVE_MS;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = oldBg;

      let allCleared = true;
      for (const p of pixels) {
        if (prog < p.nd) {
          // Wave hasn't reached — old bg at full opacity
          ctx.globalAlpha = 1;
          ctx.fillRect(p.x, p.y, PX, PX);
          allCleared = false;
        } else if (prog < p.nd + FILL_F) {
          // Wave passing through — fade old bg out
          const a = 1 - easeOut((prog - p.nd) / FILL_F);
          if (a > 0.005) {
            ctx.globalAlpha = a;
            ctx.fillRect(p.x, p.y, PX, PX);
          }
          allCleared = false;
        }
        // else: cleared — don't draw, new theme visible underneath
      }

      if (!allCleared) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
        rafRef.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}
    />
  );
}
