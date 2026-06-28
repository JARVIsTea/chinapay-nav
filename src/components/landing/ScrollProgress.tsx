"use client";
import { useEffect, useRef } from "react";

/**
 * Slim gradient bar at the very top showing scroll progress.
 * Sits above the marquee, ~2px tall, GPU-only (scaleX).
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-9 z-[61] h-[2px] origin-left"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.66 0.18 245) 0%, oklch(0.72 0.17 158) 50%, oklch(0.82 0.14 80) 100%)",
        transform: "scaleX(0)",
        transition: "transform 80ms linear",
      }}
      ref={ref}
    />
  );
}
