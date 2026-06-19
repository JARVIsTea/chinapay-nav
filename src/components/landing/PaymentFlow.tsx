import { useEffect, useRef, useState } from "react";
import { Building2, ShieldCheck, Banknote, FileBadge, Landmark } from "lucide-react";

type Stage = {
  side: "ru" | "cn";
  label: string;
  sub: string;
  icon: typeof Building2;
};

const stages: Stage[] = [
  { side: "ru", label: "Договор и инвойс", sub: "Россия · ₽", icon: Building2 },
  { side: "ru", label: "Проверка сделки", sub: "Россия · ₽", icon: ShieldCheck },
  { side: "ru", label: "Зачисление средств", sub: "Россия · ₽", icon: Banknote },
  { side: "cn", label: "Конвертация в юани", sub: "Китай · ¥", icon: Landmark },
  { side: "cn", label: "Оплата поставщику", sub: "Китай · ¥", icon: FileBadge },
];

export function PaymentFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timers.forEach(clearTimeout);
            timers = stages.map((_, i) =>
              setTimeout(() => setActive(i), 350 + i * 650),
            );
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="reveal relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10"
    >
      {/* Country headers */}
      <div className="mb-8 grid grid-cols-2 gap-6 md:mb-10">
        <CountryHeader flag="🇷🇺" name="Россия" currency="Рубли · ₽" />
        <CountryHeader flag="🇨🇳" name="Китай" currency="Юани · ¥" align="right" />
      </div>

      {/* Animated track */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-300 via-[--color-emerald] to-amber-300 transition-[width] duration-[650ms] ease-out"
          style={{ width: `${Math.max(0, ((active + 1) / stages.length) * 100)}%` }}
        />
        {/* Moving packet */}
        <div
          className="absolute -top-2 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-white/80 bg-[--color-emerald] shadow-emerald transition-[left] duration-[650ms] ease-out"
          style={{
            left: `${Math.max(0, ((active + 1) / stages.length) * 100)}%`,
            opacity: active >= 0 ? 1 : 0,
          }}
          aria-hidden
        />
      </div>

      {/* Steps grid */}
      <ol className="mt-8 grid gap-3 md:grid-cols-5 md:gap-4">
        {stages.map(({ icon: Icon, label, sub, side }, i) => {
          const isActive = i <= active;
          const ruSide = side === "ru";
          return (
            <li
              key={label}
              className={[
                "group relative rounded-2xl border p-4 transition-all duration-500",
                isActive
                  ? ruSide
                    ? "border-sky-300/40 bg-sky-300/10"
                    : "border-amber-300/40 bg-amber-300/10"
                  : "border-white/10 bg-white/[0.02]",
              ].join(" ")}
              style={{ transform: isActive ? "translateY(-2px)" : "translateY(0)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                    isActive
                      ? ruSide
                        ? "bg-sky-300/20 text-sky-200"
                        : "bg-amber-300/20 text-amber-200"
                      : "bg-white/5 text-white/50",
                  ].join(" ")}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors",
                    ruSide
                      ? isActive
                        ? "bg-sky-300/15 text-sky-100"
                        : "bg-white/5 text-white/40"
                      : isActive
                        ? "bg-amber-300/15 text-amber-100"
                        : "bg-white/5 text-white/40",
                  ].join(" ")}
                >
                  {ruSide ? "₽ RU" : "¥ CN"}
                </span>
              </div>
              <div className="mt-3 text-sm font-semibold text-white">{label}</div>
              <div className="mt-1 text-xs text-white/55">{sub}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CountryHeader({
  flag,
  name,
  currency,
  align = "left",
}: {
  flag: string;
  name: string;
  currency: string;
  align?: "left" | "right";
}) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        align === "right" ? "justify-end text-right" : "",
      ].join(" ")}
    >
      {align === "left" && (
        <span className="text-2xl" aria-hidden>
          {flag}
        </span>
      )}
      <div>
        <div className="text-xs uppercase tracking-widest text-white/50">{name}</div>
        <div className="font-display text-lg font-semibold text-white">{currency}</div>
      </div>
      {align === "right" && (
        <span className="text-2xl" aria-hidden>
          {flag}
        </span>
      )}
    </div>
  );
}
