import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.png";

const trustItems = [
  "Работаем с юридическими лицами",
  "Сопровождение ВЭД",
  "Персональный менеджер",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-32 lg:pt-40">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-mist" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy) 1px, transparent 1px), linear-gradient(to bottom, var(--navy) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />

      <div className="container-page grid items-center gap-12 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-[--color-emerald]" />
            Международные расчёты с Китаем под ключ
          </div>

          <h1 className="animate-rise mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl" style={{ animationDelay: "60ms" }}>
            Оплата счетов <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[--color-navy] via-[--color-navy-soft] to-[--color-emerald] bg-clip-text text-transparent">в Китай</span>{" "}
            для бизнеса
          </h1>

          <p className="animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl" style={{ animationDelay: "120ms" }}>
            Помогаем компаниям оплачивать инвойсы китайским поставщикам с документальным
            сопровождением и персональным сопровождением сделки.
          </p>

          <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
            <Button asChild size="lg" className="h-12 bg-gradient-emerald px-6 text-base font-semibold text-accent-foreground shadow-emerald hover:opacity-95">
              <a href="#contact">
                Получить консультацию
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-foreground/15 bg-background px-6 text-base font-semibold text-foreground hover:bg-muted">
              <a href="#contact">Оставить заявку</a>
            </Button>
          </div>

          <ul className="animate-rise mt-10 flex flex-wrap gap-x-6 gap-y-3" style={{ animationDelay: "240ms" }}>
            {trustItems.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[--color-emerald]/15 text-[--color-emerald]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="absolute -inset-10 -z-10 rounded-[40px] bg-gradient-to-br from-[--color-emerald]/15 via-transparent to-[--color-navy]/10 blur-3xl" />
          <div className="relative animate-rise rounded-[28px] border border-border bg-card p-3 shadow-elev-3" style={{ animationDelay: "200ms" }}>
            <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[--color-navy-deep] to-[--color-navy] p-6">
              <img
                src={heroImg}
                alt="Иллюстрация международных расчётов с Китаем"
                width={1024}
                height={1024}
                className="animate-float mx-auto h-auto w-full max-w-md drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
              />
            </div>

            {/* Floating mini cards */}
            <div className="absolute -left-6 top-10 hidden rounded-2xl border border-border bg-background/95 p-3 shadow-elev-2 backdrop-blur md:flex md:items-center md:gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[--color-emerald]/15 text-[--color-emerald]">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <div>
                <div className="text-xs text-muted-foreground">Платёж проведён</div>
                <div className="text-sm font-semibold text-foreground">¥ 248 500</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-border bg-background/95 px-4 py-3 shadow-elev-2 backdrop-blur md:block">
              <div className="text-xs text-muted-foreground">Срок</div>
              <div className="text-sm font-semibold text-foreground">1–3 рабочих дня</div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo strip */}
      <div className="container-page pb-16">
        <div className="rounded-2xl border border-border bg-background/60 px-6 py-5 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-widest">Нам доверяют</span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-display text-base font-semibold text-foreground/60">
              <span>Импортёры</span>
              <span className="opacity-40">•</span>
              <span>Маркетплейсы</span>
              <span className="opacity-40">•</span>
              <span>Производство</span>
              <span className="opacity-40">•</span>
              <span>Торговые дома</span>
              <span className="opacity-40">•</span>
              <span>CFO &amp; финансисты</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
