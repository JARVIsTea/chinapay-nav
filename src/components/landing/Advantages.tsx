import {
  Building2,
  Globe2,
  FileCheck2,
  ShieldCheck,
  UserRoundCheck,
  LifeBuoy,
} from "lucide-react";

const items = [
  {
    icon: Building2,
    title: "Оплата со счёта компании",
    text: "Проводим расчёты официально с расчётного счёта вашей компании — без серых схем и посредников.",
  },
  {
    icon: Globe2,
    title: "Работа с китайскими поставщиками",
    text: "Принимаем инвойсы от заводов и трейдеров по всему Китаю — Гуанчжоу, Иу, Шэньчжэнь, Шанхай.",
  },
  {
    icon: FileCheck2,
    title: "Документальное сопровождение",
    text: "Готовим и проверяем весь пакет документов: инвойсы, контракты, спецификации, подтверждения.",
  },
  {
    icon: ShieldCheck,
    title: "Прозрачные условия",
    text: "Фиксированная комиссия и понятный курс. Все условия закрепляем письменно до начала сделки.",
  },
  {
    icon: UserRoundCheck,
    title: "Персональный подход",
    text: "За каждой компанией закреплён менеджер, который знает специфику вашего бизнеса.",
  },
  {
    icon: LifeBuoy,
    title: "Поддержка на всех этапах",
    text: "От первого звонка поставщику до получения подтверждающих документов — мы рядом.",
  },
];

export function Advantages() {
  return (
    <section id="advantages" className="relative py-14 lg:py-20">
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Преимущества
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Почему выбирают нас
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Шесть причин, по которым импортёры и торговые компании доверяют нам международные расчёты.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-elev-2"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--gradient-hero-glow)" }} />
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-navy text-(--color-emerald) shadow-elev-2">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
