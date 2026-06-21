import { Reveal } from "./Reveal";

const nodes = [
  { flag: "🇷🇺", title: "Россия", sub: "Ваш расчётный счёт в РФ", note: "Платёж в рублях" },
  { flag: "RUB", title: "А7А5", sub: "Клиринговый партнёр", note: "Стейблкоин-расчёт ₽" },
  { flag: "CNY", title: "ВТБ Шанхай", sub: "Корр-счёт в юанях", note: "Конвертация ₽ → ¥" },
  { flag: "🇨🇳", title: "Китай", sub: "Счёт поставщика", note: "Зачисление в юанях" },
];

export function Corridor() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: "#000" }}>
      {/* gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 30%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(50% 45% at 85% 70%, rgba(239,68,68,0.18), transparent 60%), radial-gradient(45% 40% at 50% 100%, rgba(16,185,129,0.16), transparent 65%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            Маршрут платежа
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
            От{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #60a5fa, #38bdf8)" }}>
              рубля в России
            </span>{" "}
            до{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #fbbf24, #ef4444)" }}>
              юаня в Китае
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65 text-pretty">
            Прозрачная цепочка расчётов: ваш российский счёт → клиринг через А7А5 → конвертация
            в ВТБ Шанхай → счёт поставщика в Китае.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div aria-hidden className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-px -translate-y-1/2 md:block" style={{ background: "linear-gradient(90deg, rgba(96,165,250,0) 0%, rgba(96,165,250,.6) 12%, rgba(56,189,248,.6) 38%, rgba(251,191,36,.6) 62%, rgba(239,68,68,.6) 88%, rgba(239,68,68,0) 100%)" }} />

          <div className="relative grid gap-5 md:grid-cols-4">
            {nodes.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.08} className="relative">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 font-display text-base font-semibold text-white">
                      {n.flag}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{n.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{n.sub}</p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/45">
                      {n.note}
                    </p>
                  </div>
                  {/* shimmer */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100" style={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)" }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
          <span className="rounded-full border border-white/10 px-3 py-1.5">SWIFT-подтверждение</span>
          <span className="rounded-full border border-white/10 px-3 py-1.5">Валютный контроль РФ</span>
          <span className="rounded-full border border-white/10 px-3 py-1.5">CNY · RUB · USDT</span>
          <span className="rounded-full border border-white/10 px-3 py-1.5">1–3 банковских дня</span>
        </Reveal>
      </div>
    </section>
  );
}
