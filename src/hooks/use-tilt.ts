import { useEffect, useRef } from "react";

/**
 * Subtle 3D tilt on hover. Max ~6deg. Resets smoothly on leave.
 * Disabled on touch / reduced motion.
 */
export function useTilt<T extends HTMLElement>(max = 5) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let trx = 0,
      try_ = 0,
      crx = 0,
      cry = 0;
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      trx = -py * max * 2;
      try_ = px * max * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      trx = 0;
      try_ = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      crx += (trx - crx) * 0.12;
      cry += (try_ - cry) * 0.12;
      el.style.transform = `perspective(900px) rotateX(${crx.toFixed(2)}deg) rotateY(${cry.toFixed(2)}deg)`;
      if (Math.abs(trx - crx) > 0.05 || Math.abs(try_ - cry) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [max]);

  return ref;
}
