"use client";
import { motion, useReducedMotion } from "motion/react";

const items = [
  { emoji: "💴", text: "Курс ¥ → ₽: 11.25 + 0.5%" },
  { emoji: "⚡", text: "Зачисление 1–2 рабочих дня" },
  { emoji: "📱", text: "Alipay и WeChat Pay — от 1000 CNY за 15 минут" },
  { emoji: "🌐", text: "SWIFT-переводы от 0.6% — юр. и физ. лица" },
  { emoji: "🚢", text: "CNY · USD · AED · HKD" },
  { emoji: "📄", text: "Полный пакет документов" },
  { emoji: "🛡️", text: "Валютный контроль под ключ" },
  { emoji: "🇨🇳", text: "Поставщики по всему Китаю" },
  { emoji: "📈", text: "Сделки от 100 000 ₽" },
];

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="marquee-host group fixed inset-x-0 top-0 z-[60] flex h-9 items-center overflow-hidden border-b border-(--color-emerald)/20 bg-black/85 backdrop-blur-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent"
      />
      <motion.div
        className="flex w-max gap-8"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
        whileHover={reduce ? undefined : { transition: { duration: 120 } }}
      >
        {row.map(({ emoji, text }, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 text-[12px] font-medium tracking-wide text-white/85"
          >
            <span
              aria-hidden
              className="text-base leading-none"
              style={{
                fontFamily:
                  '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif',
              }}
            >
              {emoji}
            </span>
            <span>{text}</span>
            <span className="text-white/20">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
