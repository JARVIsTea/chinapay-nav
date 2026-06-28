"use client";
import { motion, useReducedMotion } from "motion/react";
import { Ship, Banknote, FileCheck2, ShieldCheck, Clock, Globe2, TrendingUp, Smartphone, MessageCircle } from "lucide-react";

const items = [
  { icon: Banknote, text: "Курс ¥ → ₽: 11.25 + 0.5%" },
  { icon: Clock, text: "Зачисление 1–2 рабочих дня" },
  { icon: Smartphone, text: "Alipay и WeChat Pay — от 1000 CNY за 15 минут" },
  { icon: Globe2, text: "SWIFT-переводы от 0.6% — юр. и физ. лица" },
  { icon: Ship, text: "CNY · USD · AED · HKD" },
  { icon: FileCheck2, text: "Полный пакет документов" },
  { icon: ShieldCheck, text: "Валютный контроль под ключ" },
  { icon: Globe2, text: "Поставщики по всему Китаю" },
  { icon: TrendingUp, text: "Сделки от 100 000 ₽" },
];

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center overflow-hidden border-b border-(--color-emerald)/20 bg-black/85 backdrop-blur-md">
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
      >
        {row.map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 text-[12px] font-medium tracking-wide text-white/75"
          >
            <Icon className="h-3.5 w-3.5 text-(--color-emerald)" />
            <span>{text}</span>
            <span className="text-white/20">·</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
