import { ArrowUpRight, CreditCard, Briefcase, MessagesSquare, Package, FileSearch, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";

const items = [
  { icon: CreditCard, title: "Оплата инвойсов в Китай", text: "Переводы поставщикам в юанях и долларах с полным документальным сопровождением." },
  { icon: Send, title: "SWIFT-переводы — от 0.6%", text: "Принимаем и отправляем SWIFT-платежи для юридических и физических лиц. Комиссия от 0.6%, валюты USD, EUR, CNY, AED, HKD." },
  { icon: Briefcase, title: "Сопровождение ВЭД", text: "Полный цикл внешнеэкономической деятельности: контракты, валютный контроль, отчётность." },
  { icon: MessagesSquare, title: "Консультации по международным расчётам", text: "Подбираем оптимальную схему расчётов под вашу сделку и юрисдикцию." },
  { icon: Package, title: "Поддержка импортных сделок", text: "Помогаем выстроить процесс закупки и платежей при работе с азиатскими поставщиками." },
  { icon: FileSearch, title: "Проверка документов", text: "Аудит инвойсов, контрактов и реквизитов поставщика до проведения оплаты." },
];

export function Services() {
  return (
    <section id="services" className="relative py-14 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="reveal max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Услуги
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Наши услуги
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Закрываем все задачи, связанные с международными расчётами и оплатой китайским поставщикам.
            </p>
          </div>
          <Link
            to="/contacts"
            className="reveal group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-elev-1 transition-all hover:border-foreground/20"
          >
            Обсудить задачу
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, i) => {
            const featured = i === 0;
            return (
              <article
                key={title}
                className={`reveal group relative flex flex-col gap-4 rounded-2xl border p-7 shadow-elev-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-elev-2 ${
                  featured
                    ? "lg:col-span-2 border-white/10 text-white"
                    : "border-border bg-card"
                }`}
                style={{
                  transitionDelay: `${i * 50}ms`,
                  ...(featured ? { backgroundImage: "var(--gradient-navy)" } : {}),
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      featured ? "bg-white/10 text-(--color-emerald)" : "bg-gradient-navy text-(--color-emerald) shadow-elev-2"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-display text-base font-semibold ${featured ? "text-white" : "text-foreground"}`}>{title}</h3>
                      <ArrowUpRight className={`h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${featured ? "text-white/60" : "text-muted-foreground"}`} />
                    </div>
                    <p className={`mt-1.5 text-sm leading-relaxed ${featured ? "text-white/70" : "text-muted-foreground"}`}>{text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
