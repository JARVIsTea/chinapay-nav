import { FileText, SearchCheck, Handshake, Banknote, FileBadge } from "lucide-react";
import { PaymentFlow } from "./PaymentFlow";

const steps = [
  { icon: FileText, title: "Вы отправляете инвойс", text: "Передаёте нам инвойс от поставщика и краткое описание сделки." },
  { icon: SearchCheck, title: "Мы анализируем документы", text: "Проверяем поставщика, реквизиты и комплектность документов." },
  { icon: Handshake, title: "Согласовываем условия", text: "Фиксируем курс, комиссию, сроки и формат документооборота." },
  { icon: Banknote, title: "Проводим оплату", text: "Отправляем средства поставщику и контролируем зачисление." },
  { icon: FileBadge, title: "Передаём документы", text: "Передаём подтверждающие документы для бухгалтерии и ВЭД." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden py-24 text-white lg:py-32" style={{ background: "var(--background)" }}>
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-(--color-emerald)/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-(--color-navy-soft)/40 blur-[120px]" />

      <div className="container-page relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/70">
            Процесс
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl text-balance">
            Как проходит оплата
          </h2>
          <p className="mt-4 text-lg text-white/70 text-pretty">
            Пять прозрачных шагов от получения инвойса до закрывающих документов.
          </p>
        </div>

        <div className="mt-14">
          <PaymentFlow />
        </div>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-(--color-emerald) via-white/15 to-transparent lg:hidden"
            aria-hidden
          />
          {/* Horizontal connector for desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block" />

          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="reveal relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <div className="relative z-10 flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur">
                    <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-emerald text-xs font-bold text-accent-foreground shadow-emerald">
                      {i + 1}
                    </span>
                    <Icon className="h-7 w-7 text-(--color-emerald)" />
                  </div>
                  <div className="lg:mt-5">
                    <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/65">{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
