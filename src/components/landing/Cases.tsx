import { TrendingDown, Clock, ShieldCheck, Wallet } from "lucide-react";

type Case = {
  tag: string;
  title: string;
  challenge: string;
  solution: string;
  rate: string;
  metrics: { value: string; label: string; icon: typeof TrendingDown }[];
};

const cases: Case[] = [
  {
    tag: "Электроника · Маркетплейс",
    title: "Импортёр электроники, 28 поставщиков в Шэньчжэне",
    challenge:
      "Зависшие платежи в банке, срыв сроков отгрузки, скрытые комиссии посредников.",
    rate: "1 ¥ = 12.59 ₽ · +0.7%",
    solution:
      "Перевели расчёты на сопровождение PayChina с фиксированной комиссией и поэтапными выплатами.",
    metrics: [
      { value: "−2.1%", label: "снижение стоимости перевода", icon: TrendingDown },
      { value: "1.5 дня", label: "средний срок зачисления", icon: Clock },
      { value: "100%", label: "сделок с закрывающими документами", icon: ShieldCheck },
    ],
  },
  {
    tag: "Производство · Оборудование",
    title: "Производитель оборудования, контракты на ¥4–12 млн",
    challenge:
      "Крупные авансы поставщикам, валютный риск, требования банка к комплекту документов.",
    rate: "1 ¥ = 12.59 ₽ · +0.7%",
    solution:
      "Дробление платежа на 3 транша, фиксация курса на каждом этапе, полное досье на сделку.",
    metrics: [
      { value: "1.8%", label: "экономия на курсе за квартал", icon: Wallet },
      { value: "−40%", label: "времени CFO на сделку", icon: Clock },
      { value: "0", label: "возвратов и блокировок платежа", icon: ShieldCheck },
    ],
  },
  {
    tag: "FMCG · Торговый дом",
    title: "Торговый дом, 60+ платежей в месяц",
    challenge:
      "Высокая нагрузка на бухгалтерию, разрозненные платежи, отсутствие единой отчётности.",
    rate: "1 ¥ = 12.59 ₽ · +0.7%",
    solution:
      "Личный кабинет со статусами по каждому инвойсу и единый пакет документов в конце месяца.",
    metrics: [
      { value: "×3", label: "рост числа платежей без расширения штата", icon: TrendingDown },
      { value: "2 ч", label: "вместо 2 дней на закрытие месяца", icon: Clock },
      { value: "1", label: "контактное лицо вместо 5 банков", icon: ShieldCheck },
    ],
  },
  {
    tag: "Fashion · Розничная сеть",
    title: "Розничная сеть одежды, сезонные закупки",
    challenge:
      "Пиковые нагрузки на закупки, давление сроков коллекции, штрафы за просрочку оплаты фабрикам.",
    rate: "1 ¥ = 12.59 ₽ · +0.7%",
    solution:
      "Приоритетная очередь платежей в сезон, резерв юаней и круглосуточная поддержка менеджера.",
    metrics: [
      { value: "−92%", label: "штрафов за просрочку оплаты", icon: ShieldCheck },
      { value: "+18%", label: "оборота за сезон", icon: TrendingDown },
      { value: "24/7", label: "поддержка в пиковые недели", icon: Clock },
    ],
  },
];

export function Cases() {
  return (
    <section id="cases" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.92 0.008 250), transparent)",
        }}
      />
      <div className="container-page">
        <div className="reveal mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Кейсы и результаты
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Измеримые эффекты для CFO и импортёров
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Реальные сценарии сотрудничества — с цифрами по срокам, стоимости и
            прозрачности расчётов.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cases.map((c, i) => (
            <article
              key={c.title}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-elev-1 transition-all duration-500 hover:-translate-y-1 hover:shadow-elev-3 md:p-8"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-emerald)" }}
              />

              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-(--color-emerald)/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-(--color-emerald)">
                  {c.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
                  {c.title}
                </h3>

                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Задача
                    </dt>
                    <dd className="mt-1 text-foreground/85">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Решение
                    </dt>
                    <dd className="mt-1 text-foreground/85">{c.solution}</dd>
                  </div>
                </dl>

                <ul className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
                  {c.metrics.map(({ value, label, icon: Icon }) => (
                    <li key={label} className="text-left">
                      <div className="flex items-center gap-1.5 text-(--color-emerald)">
                        <Icon className="h-3.5 w-3.5" />
                        <span className="font-display text-xl font-bold tracking-tight text-foreground">
                          {value}
                        </span>
                      </div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground">
                        {label}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
