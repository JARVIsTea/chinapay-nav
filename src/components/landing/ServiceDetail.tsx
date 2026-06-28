import { type LucideIcon, Check, ArrowRight, Clock, ShieldCheck, Wallet } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type ServiceDetailProps = {
  eyebrow: string;
  title: string;
  lead: string;
  icon: LucideIcon;
  bullets: string[];
  steps: { title: string; text: string }[];
  facts: { label: string; value: string }[];
  forWho: string[];
};

export function ServiceDetail({
  eyebrow,
  title,
  lead,
  icon: Icon,
  bullets,
  steps,
  facts,
  forWho,
}: ServiceDetailProps) {
  return (
    <>
      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              {title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">{lead}</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--color-emerald)" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contacts"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:opacity-90"
              >
                Оставить заявку
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://t.me/sup_port_best"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-elev-1 transition-all hover:border-foreground/20"
              >
                Написать в Telegram
              </a>
            </div>
          </div>

          <aside
            className="reveal gradient-border rounded-2xl border border-white/10 p-6 text-white shadow-elev-2"
            style={{ backgroundImage: "var(--gradient-navy)" }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-(--color-emerald)">
                <Icon className="h-5 w-5" />
              </span>
              <div className="text-sm font-semibold uppercase tracking-widest text-white/70">
                Параметры услуги
              </div>
            </div>
            <dl className="mt-5 grid gap-4">
              {facts.map((f) => (
                <div key={f.label} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-widest text-white/60">{f.label}</dt>
                  <dd className="mt-1 font-display text-base font-semibold text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/5 p-3 text-xs text-white/80">
              <ShieldCheck className="h-4 w-4 text-(--color-emerald)" />
              Документы и валютный контроль — на нашей стороне
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="reveal flex items-end justify-between gap-6">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Как это работает
          </h2>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <Clock className="h-4 w-4" /> Средний цикл — 1–3 рабочих дня
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="reveal rounded-2xl border border-border bg-card p-6 shadow-elev-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="reveal rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Wallet className="h-4 w-4 text-(--color-emerald)" />
            Кому подходит
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {forWho.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--color-emerald)" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
