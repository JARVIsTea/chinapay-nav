"use client";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const nodes = [
  { code: "RU", label: "Россия", sub: "₽ рубли", tone: "sky" as const },
  { code: "P2C", label: "Pay to China", sub: "агент · нерезидент", tone: "emerald" as const },
  { code: "CN", label: "Китай", sub: "¥ юани", tone: "amber" as const },
];

const toneMap = {
  sky: "border-sky-300/30 bg-sky-300/10 text-sky-100",
  emerald: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  amber: "border-amber-300/30 bg-amber-300/10 text-amber-100",
};

export function PaymentFlow() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm md:p-6"
    >
      <div className="flex items-center justify-between gap-2 md:gap-4">
        {nodes.map((n, i) => (
          <div key={n.code} className="flex flex-1 items-center gap-2 md:gap-4">
            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-xs font-bold tracking-wider md:h-14 md:w-14 md:text-sm ${toneMap[n.tone]}`}
              >
                {n.code}
              </div>
              <div className="mt-2 truncate text-xs font-semibold text-white md:text-sm">
                {n.label}
              </div>
              <div className="mt-0.5 truncate text-[10px] uppercase tracking-wider text-white/50 md:text-[11px]">
                {n.sub}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <motion.div
                aria-hidden
                className="flex shrink-0 items-center text-white/40"
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
