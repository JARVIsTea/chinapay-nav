"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useTilt } from "@/hooks/use-tilt";

const TYPED_WORDS = ["Платежи в Китай.", "Без границ."];

function useTypewriter(words: string[], speed = 55, holdAfter = 600) {
  const [text, setText] = useState("");
  const [line, setLine] = useState(0);
  useEffect(() => {
    if (line >= words.length) return;
    const target = words[line];
    if (text.length < target.length) {
      const id = setTimeout(() => setText(target.slice(0, text.length + 1)), speed);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setLine((l) => l + 1);
      setText("");
    }, holdAfter);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, line]);

  return { line, text };
}

export function Hero() {
  const reduce = useReducedMotion();
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.4, 140);
  const tiltRef = useTilt<HTMLDivElement>(4);

  const typing = useTypewriter(reduce ? [] : TYPED_WORDS);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const, delay },
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 text-white md:pt-32"
      style={{ background: "#000" }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] bg-hero-glow opacity-90" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />

      <div className="container-page flex flex-col items-center pb-24 text-center md:pb-32">
        <motion.span
          {...fade(0)}
          className="text-[13px] font-semibold uppercase tracking-[0.18em]"
        >
          <span className="bg-[linear-gradient(90deg,#60a5fa_0%,#a78bfa_50%,#f87171_100%)] bg-clip-text text-transparent">
            Pay to China
          </span>
          <span className="text-(--color-emerald)"> · B2B</span>
        </motion.span>

        <motion.h1
          {...fade(0.06)}
          className="mt-5 max-w-[14ch] font-display text-[44px] font-bold leading-[0.98] tracking-[-0.045em] text-white text-balance sm:text-[64px] md:max-w-[16ch] md:text-[88px] lg:text-[112px]"
        >
          {reduce ? (
            <>
              Платежи в Китай.
              <span className="block bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">
                Без границ.
              </span>
            </>
          ) : (
            <>
              <span className={typing.line === 0 ? "typing-caret" : undefined}>
                {typing.line === 0 ? typing.text : "Платежи в Китай."}
              </span>
              <span className="block bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">
                <span className={typing.line === 1 ? "typing-caret" : undefined}>
                  {typing.line < 1 ? "\u00A0" : typing.line === 1 ? typing.text : "Без границ."}
                </span>
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          {...fade(0.14)}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
        >
          Оплата инвойсов китайским поставщикам со счёта вашей компании.
          Документы, валютный контроль и персональный менеджер — под ключ.
        </motion.p>

        <motion.div
          {...fade(0.22)}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            ref={magneticRef}
            href="#contact"
            className="glow-pulse group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-(--color-emerald) px-7 text-[15px] font-semibold text-white shadow-emerald transition-transform active:scale-[0.98]"
          >
            Оставить заявку
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how"
            className="inline-flex h-12 items-center justify-center px-3 text-[15px] font-semibold text-(--color-emerald-soft) hover:text-white"
          >
            Как это работает ›
          </a>
        </motion.div>

        <motion.div
          {...fade(0.3)}
          ref={tiltRef}
          className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-center backdrop-blur-xl"
        >
          <Stat value="1–3 дня" label="срок зачисления" />
          <Stat value="100%" label="закрывающих документов" />
          <Stat value="24/7" label="персональный менеджер" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-(--color-navy-deep)/40 px-3 py-5">
      <div className="font-display text-xl font-bold text-white md:text-2xl">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-white/50 md:text-xs">{label}</div>
    </div>
  );
}
