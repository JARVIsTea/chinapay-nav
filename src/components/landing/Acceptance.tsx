"use client";
import {
  Landmark,
  FileCheck2,
  Building2,
  Receipt,
  ScrollText,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal, StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const items = [
  {
    icon: Building2,
    title: "Расчётные счета компании в РФ",
    text: "Принимаем оплату по реквизитам российского юрлица — без посредников и наличных переводов.",
  },
  {
    icon: Landmark,
    title: "Нерезидентские счета для расчётов",
    text: "Используем собственные счета в банках-партнёрах для последующей оплаты поставщику в Китае.",
  },
  {
    icon: FileCheck2,
    title: "Полный пакет документов",
    text: "Договор, счёт, акт, инвойс, SWIFT-подтверждение и закрывающие документы — для бухгалтерии и валютного контроля.",
  },
  {
    icon: Receipt,
    title: "НДС и налоговый учёт",
    text: "Документы соответствуют требованиям ФНС и подходят для учёта затрат, возмещения НДС и таможенного оформления.",
  },
  {
    icon: ScrollText,
    title: "Сопровождение валютного контроля",
    text: "Помогаем поставить контракт на учёт, формируем СВО, СПД и работаем с банком в режиме одного окна.",
  },
  {
    icon: ShieldCheck,
    title: "Договорные гарантии и SLA",
    text: "Фиксированные сроки, чёткая ответственность сторон и прозрачные условия в договоре с Pay to China .ru.",
  },
];

const docs = [
  "Договор оказания услуг",
  "Счёт на оплату в рублях",
  "Акт выполненных работ",
  "Инвойс поставщика",
  "SWIFT-подтверждение",
  "Документы для валютного контроля",
];

type Deal = {
  no: string;
  status: "Готов" | "В работе" | "Оплачен";
  rub: string;
  cny: string;
  rate: string;
  category: string;
};

const deals: Deal[] = [
  {
    no: "А-1024",
    status: "Готов",
    rub: "2 480 000 ₽",
    cny: "¥ 198 400",
    rate: "1 ¥ = 12.50 ₽",
    category: "Электроника · Шэньчжэнь",
  },
  {
    no: "А-1187",
    status: "В работе",
    rub: "860 000 ₽",
    cny: "¥ 68 252",
    rate: "1 ¥ = 12.60 ₽",
    category: "Оборудование · Гуанчжоу",
  },
  {
    no: "А-1342",
    status: "Оплачен",
    rub: "5 120 000 ₽",
    cny: "¥ 406 666",
    rate: "1 ¥ = 12.59 ₽",
    category: "Текстиль · Иу",
  },
];

export function Acceptance() {
  return (
    <section id="acceptance" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, oklch(0.78 0.13 230 / 0.10) 0%, transparent 65%), radial-gradient(50% 60% at 90% 100%, oklch(0.72 0.16 158 / 0.10) 0%, transparent 65%)",
        }}
      />
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal direction="up" className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Приём оплаты в России
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Принимаем платежи в РФ и сами рассчитываемся с Китаем
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
              Вы платите в рублях по договору с российской компанией. Мы используем
              собственные нерезидентские счета и предоставляем полный пакет
              документов для бухгалтерии, ФНС и валютного контроля.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.1} className="lg:col-span-5">
            <DocumentMock />
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-elev-1"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-emerald)" }}
              />
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--color-emerald)/12 text-(--color-emerald)">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function DocumentMock() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  return (
    <div className="relative mx-auto max-w-md">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {deals.map((d, i) => (
          <motion.article
            key={d.no}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative w-full shrink-0 snap-center rounded-2xl border border-border bg-card p-6 shadow-elev-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Платёжный пакет
                </div>
                <div className="font-display text-lg font-semibold">Инвойс №{d.no}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{d.category}</div>
              </div>
              <StatusPill status={d.status} />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Сумма к оплате</div>
                <div className="font-display text-base font-bold">{d.rub}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Поставщику</div>
                <div className="font-display text-base font-bold">{d.cny}</div>
              </div>
            </div>

            <RateField rate={d.rate} />

            <ul className="mt-4 space-y-2.5">
              {docs.map((doc) => (
                <li key={doc} className="flex items-center gap-3 text-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--color-emerald)/15 text-(--color-emerald)">
                    <FileCheck2 className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground/85">{doc}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {deals.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Сделка ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-(--color-emerald)" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Назад"
            onClick={() => scrollTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Вперёд"
            onClick={() => scrollTo(Math.min(deals.length - 1, active + 1))}
            disabled={active === deals.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground/70 transition hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Deal["status"] }) {
  const map = {
    Готов: "bg-(--color-emerald)/15 text-(--color-emerald)",
    "В работе": "bg-amber-300/15 text-amber-200",
    Оплачен: "bg-sky-300/15 text-sky-200",
  } as const;
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${map[status]}`}
    >
      {status}
    </span>
  );
}

function RateField({ rate }: { rate: string }) {
  return (
    <div className="mt-3 flex items-center justify-between rounded-xl border border-(--color-emerald)/25 bg-(--color-emerald)/[0.06] px-4 py-2.5">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Курс операции
        </div>
        <div className="mt-0.5 font-mono text-sm font-semibold text-foreground">{rate}</div>
      </div>
      <span className="rounded-full bg-(--color-emerald)/15 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-(--color-emerald)">
        +0.7%
      </span>
    </div>
  );
}
