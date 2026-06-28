import { Send, Building2, UserRound, Globe2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SwiftBanner() {
  return (
    <section id="swift" className="relative py-10 lg:py-14">
      <div className="container-page">
        <div
          className="reveal relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8 text-white shadow-elev-2"
          style={{ backgroundImage: "var(--gradient-navy)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--color-emerald)" }}
          />
          <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-(--color-emerald)">
              <Send className="h-7 w-7" />
            </div>

            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/80">
                SWIFT-переводы
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                Принимаем и отправляем SWIFT — комиссия от 0.6%
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
                Входящие и исходящие SWIFT-платежи в USD, EUR, CNY, AED, HKD. Работаем
                как с юридическими, так и с физическими лицами — с полным валютным
                контролем и документами для банка.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                  <Building2 className="h-3.5 w-3.5 text-(--color-emerald)" /> Юр. лица
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                  <UserRound className="h-3.5 w-3.5 text-(--color-emerald)" /> Физ. лица
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                  <Globe2 className="h-3.5 w-3.5 text-(--color-emerald)" /> Входящие и исходящие
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-emerald)/15 px-3 py-1 text-xs font-semibold text-(--color-emerald)">
                  от 0.6%
                </span>
              </div>
            </div>

            <Link
              to="/contacts"
              className="inline-flex items-center justify-center rounded-full bg-(--color-emerald) px-5 py-2.5 text-sm font-semibold text-black shadow-elev-2 transition-transform hover:-translate-y-0.5"
            >
              Рассчитать SWIFT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
