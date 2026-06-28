"use client";
import { useCountUp } from "@/hooks/use-count-up";

const stats = [
  { target: 1000, suffix: "+", label: "обработанных запросов" },
  { target: 100, suffix: "+", label: "компаний-клиентов" },
  { target: 0, label: "персональное сопровождение каждой сделки", staticValue: "1:1" },
] as const;

function StatCard({
  target,
  suffix,
  staticValue,
  label,
}: {
  target: number;
  suffix?: string;
  staticValue?: string;
  label: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="gradient-border rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
    >
      <dt className="bg-gradient-to-br from-(--color-emerald-soft) to-(--color-emerald) bg-clip-text font-display text-4xl font-bold text-transparent tabular-nums md:text-5xl">
        {staticValue ?? `${value.toLocaleString("ru-RU")}${suffix ?? ""}`}
      </dt>
      <dd className="mt-2 text-sm leading-snug text-white/70">{label}</dd>
    </div>
  );
}

export function TrustBlock() {
  return (
    <section className="relative py-14 lg:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-navy p-10 text-(--color-mist) shadow-elev-3 md:p-16">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-(--color-emerald)/30 blur-[140px]" />
          <div className="pointer-events-none absolute -left-32 -bottom-40 h-[420px] w-[420px] rounded-full bg-white/10 blur-[140px]" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/70">
                О нас
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl text-balance">
                Надёжный партнёр для международных расчётов
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75 text-pretty">
                Мы сопровождаем компании на всех этапах взаимодействия с китайскими поставщиками,
                помогая организовать процесс оплаты и документооборота максимально удобно
                и прозрачно.
              </p>
            </div>

            <div className="reveal lg:col-span-5">
              <dl className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
