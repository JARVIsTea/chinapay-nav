"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();
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
      {/* ambient glow */}
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
          className="text-[13px] font-semibold uppercase tracking-[0.18em] text-(--color-emerald)"
        >
          PayChina · B2B
        </motion.span>

        <motion.h1
          {...fade(0.06)}
          className="mt-5 max-w-[14ch] font-display text-[44px] font-bold leading-[0.98] tracking-[-0.045em] text-white text-balance sm:text-[64px] md:max-w-[16ch] md:text-[88px] lg:text-[112px]"
        >
          Платежи в Китай.
          <span className="block bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">
            Без границ.
          </span>
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
            href="#contact"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-(--color-emerald) px-7 text-[15px] font-semibold text-white shadow-emerald transition-transform hover:scale-[1.02] active:scale-[0.98]"
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

        {/* Product moment: currency orb */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
          className="relative mt-20 w-full max-w-[1080px]"
        >
          <div className="absolute -inset-x-20 -top-20 bottom-0 -z-10 rounded-[60px] bg-[radial-gradient(60%_50%_at_50%_30%,oklch(0.62_0.18_250/0.35),transparent_70%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:rounded-[40px] md:p-12">
            <div className="grid items-center gap-10 md:grid-cols-3">
              <CurrencyOrb symbol="₽" label="Россия" sub="Рубли" hue="white" />
              <FlowBar />
              <CurrencyOrb symbol="¥" label="Китай" sub="Юани" hue="blue" />
            </div>

            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-center">
              <Stat value="1–3 дня" label="срок зачисления" />
              <Stat value="100%" label="закрывающих документов" />
              <Stat value="24/7" label="персональный менеджер" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CurrencyOrb({
  symbol,
  label,
  sub,
  hue,
}: {
  symbol: string;
  label: string;
  sub: string;
  hue: "white" | "blue";
}) {
  const gradient =
    hue === "white"
      ? "radial-gradient(circle at 35% 30%, #ffffff 0%, #d0d4dc 45%, #4a4d55 100%)"
      : "radial-gradient(circle at 35% 30%, oklch(0.78 0.14 250) 0%, oklch(0.55 0.22 255) 45%, oklch(0.25 0.15 260) 100%)";
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-40 w-40 rounded-full md:h-52 md:w-52"
        style={{
          background: gradient,
          boxShadow:
            hue === "blue"
              ? "0 30px 80px -20px oklch(0.55 0.22 255 / 0.6), inset 0 -10px 30px oklch(0 0 0 / 0.3)"
              : "0 30px 80px -20px oklch(0 0 0 / 0.6), inset 0 -10px 30px oklch(0 0 0 / 0.25)",
        }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center font-display text-6xl font-bold md:text-7xl"
          style={{ color: hue === "white" ? "#1d1d1f" : "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          {symbol}
        </span>
        <span className="absolute -inset-2 -z-10 rounded-full opacity-60 blur-2xl" style={{ background: gradient }} />
      </div>
      <div className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="mt-1 font-display text-lg font-semibold text-white">{sub}</div>
    </div>
  );
}

function FlowBar() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative h-[2px] w-full max-w-[220px] overflow-hidden rounded-full bg-white/10 md:max-w-none">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 rounded-full"
          style={{ background: "linear-gradient(to right, transparent, oklch(0.62 0.18 250), transparent)" }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        Прямой канал
      </div>
    </div>
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
