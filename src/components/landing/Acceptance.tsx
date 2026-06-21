"use client";
import {
  Landmark,
  FileCheck2,
  Building2,
  Receipt,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { Reveal, StaggerGroup, itemVariants } from "./Reveal";
import { motion } from "motion/react";

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
    text: "Фиксированные сроки, чёткая ответственность сторон и прозрачные условия в договоре с PayChina.",
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
  return (
    <motion.div
      initial={{ rotate: -1 }}
      whileInView={{ rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative mx-auto max-w-md"
    >
      {/* Back card */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-border bg-card/70 shadow-elev-1" />
      {/* Front card */}
      <div className="relative rounded-2xl border border-border bg-card p-6 shadow-elev-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Платёжный пакет
            </div>
            <div className="font-display text-lg font-semibold">Инвойс №А-1024</div>
          </div>
          <span className="rounded-full bg-(--color-emerald)/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-(--color-emerald)">
            Готов
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <div>
            <div className="text-xs text-muted-foreground">Сумма к оплате</div>
            <div className="font-display text-base font-bold">2 480 000 ₽</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Поставщику</div>
            <div className="font-display text-base font-bold">¥ 198 400</div>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {docs.map((d, i) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
              className="flex items-center gap-3 text-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-(--color-emerald)/15 text-(--color-emerald)">
                <FileCheck2 className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-foreground/85">{d}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
