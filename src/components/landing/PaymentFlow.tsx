"use client";
import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Building2, ShieldCheck, Banknote, FileBadge, Landmark } from "lucide-react";

type Stage = {
  side: "ru" | "cn";
  label: string;
  sub: string;
  icon: typeof Building2;
};

const stages: Stage[] = [
  { side: "ru", label: "Договор и инвойс", sub: "Россия · ₽", icon: Building2 },
  { side: "ru", label: "Проверка сделки", sub: "Россия · ₽", icon: ShieldCheck },
  { side: "ru", label: "Зачисление средств", sub: "Россия · ₽", icon: Banknote },
  { side: "cn", label: "Конвертация в юани", sub: "Китай · ¥", icon: Landmark },
  { side: "cn", label: "Оплата поставщику", sub: "Китай · ¥", icon: FileBadge },
];

export function PaymentFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setActive(stages.length - 1);
      return;
    }
    const timers = stages.map((_, i) =>
      setTimeout(() => setActive(i), 350 + i * 600),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const progress = Math.max(0, ((active + 1) / stages.length) * 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10"
    >
      {/* Ambient glow that follows the packet */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -z-0 h-full w-[280px] rounded-full opacity-50 blur-3xl"
        animate={{
          left: `calc(${progress}% - 140px)`,
          background:
            active >= 3
              ? "radial-gradient(closest-side, oklch(0.82 0.14 80 / 0.6), transparent)"
              : "radial-gradient(closest-side, oklch(0.72 0.16 158 / 0.55), transparent)",
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Country headers */}
      <div className="relative mb-8 grid grid-cols-2 gap-6 md:mb-10">
        <CountryHeader flag="🇷🇺" name="Россия" currency="Рубли · ₽" />
        <CountryHeader flag="🇨🇳" name="Китай" currency="Юани · ¥" align="right" />
      </div>

      {/* Animated track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(to right, oklch(0.78 0.13 230), oklch(0.72 0.16 158) 60%, oklch(0.82 0.14 80))",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Moving packet */}
      <motion.div
        aria-hidden
        className="relative h-0"
      >
        <motion.div
          className="absolute -top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/90 text-[11px] font-bold text-white shadow-emerald"
          animate={{
            left: `${progress}%`,
            opacity: active >= 0 ? 1 : 0,
            backgroundColor: active >= 3 ? "oklch(0.82 0.14 80)" : "oklch(0.72 0.16 158)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {active >= 3 ? "¥" : "₽"}
        </motion.div>
      </motion.div>

      {/* Steps grid */}
      <ol className="relative mt-10 grid gap-3 md:grid-cols-5 md:gap-4">
        {stages.map(({ icon: Icon, label, sub, side }, i) => {
          const isActive = i <= active;
          const ruSide = side === "ru";
          return (
            <motion.li
              key={label}
              initial={false}
              animate={{
                y: isActive ? -2 : 0,
                opacity: isActive ? 1 : 0.55,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={[
                "group relative rounded-2xl border p-4 transition-colors duration-500",
                isActive
                  ? ruSide
                    ? "border-sky-300/40 bg-sky-300/10"
                    : "border-amber-300/40 bg-amber-300/10"
                  : "border-white/10 bg-white/[0.02]",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <motion.span
                  initial={false}
                  animate={{ scale: isActive ? 1 : 0.92 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    isActive
                      ? ruSide
                        ? "bg-sky-300/20 text-sky-200"
                        : "bg-amber-300/20 text-amber-200"
                      : "bg-white/5 text-white/50",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                </motion.span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors",
                    ruSide
                      ? isActive
                        ? "bg-sky-300/15 text-sky-100"
                        : "bg-white/5 text-white/40"
                      : isActive
                        ? "bg-amber-300/15 text-amber-100"
                        : "bg-white/5 text-white/40",
                  ].join(" ")}
                >
                  {ruSide ? "₽ RU" : "¥ CN"}
                </span>
              </div>
              <div className="mt-3 text-sm font-semibold text-white">{label}</div>
              <div className="mt-1 text-xs text-white/55">{sub}</div>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
}

function CountryHeader({
  flag,
  name,
  currency,
  align = "left",
}: {
  flag: string;
  name: string;
  currency: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        align === "right" ? "justify-end text-right" : "",
      ].join(" ")}
    >
      {align === "left" && (
        <span className="text-2xl" aria-hidden>
          {flag}
        </span>
      )}
      <div>
        <div className="text-xs uppercase tracking-widest text-white/50">{name}</div>
        <div className="font-display text-lg font-semibold text-white">{currency}</div>
      </div>
      {align === "right" && (
        <span className="text-2xl" aria-hidden>
          {flag}
        </span>
      )}
    </div>
  );
}
