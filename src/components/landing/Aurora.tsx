"use client";
import { useEffect, useRef } from "react";

/**
 * Subtle global ambience: slow-drifting aurora blobs + a soft
 * cursor spotlight. Fixed, pointer-events:none, screen blend.
 */
export function Aurora() {
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`;
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden mix-blend-screen">
      <div className="aurora-blob aurora-a" />
      <div className="aurora-blob aurora-b" />
      <div className="aurora-blob aurora-c" />
      <div
        ref={spotRef}
        className="absolute hidden h-[520px] w-[520px] rounded-full opacity-[0.28] blur-3xl md:block"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.78 0.14 158 / 0.75), oklch(0.66 0.18 245 / 0.35) 45%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
