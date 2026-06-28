import { useEffect, useRef } from "react";

/**
 * Magnetic attraction: element subtly follows the cursor when it's near.
 * Pure transform — no layout, no paint. Disabled on touch / reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35, radius = 120) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(mx, my);
      if (dist > radius) {
        tx = 0;
        ty = 0;
      } else {
        const k = (1 - dist / radius) * strength;
        tx = mx * k;
        ty = my * k;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return ref;
}
