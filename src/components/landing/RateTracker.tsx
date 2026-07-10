import { useEffect, useMemo, useState } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

type Point = { date: string; value: number };

const CBR_URL = "https://www.cbr-xml-daily.ru/daily_json.js";
const ARCHIVE = (d: Date) =>
  `https://www.cbr-xml-daily.ru/archive/${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/daily_json.js`;

function fmt(v: number) {
  return v.toLocaleString("ru-RU", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function fetchDay(url: string): Promise<Point | null> {
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return null;
    const j = await r.json();
    const cny = j?.Valute?.CNY;
    if (!cny) return null;
    return { date: j.Date, value: cny.Value / cny.Nominal };
  } catch {
    return null;
  }
}

export function RateTracker() {
  const [series, setSeries] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    const today = await fetchDay(CBR_URL);
    if (!today) {
      setError(true);
      setLoading(false);
      return;
    }
    const base = new Date(today.date);
    const days: Promise<Point | null>[] = [];
    for (let i = 1; i <= 13; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() - i);
      days.push(fetchDay(ARCHIVE(d)));
    }
    const history = (await Promise.all(days)).filter(Boolean) as Point[];
    const all = [...history.reverse(), today];
    // dedupe by date
    const map = new Map<string, Point>();
    all.forEach((p) => map.set(p.date.slice(0, 10), p));
    setSeries(Array.from(map.values()));
    setUpdatedAt(new Date().toISOString());
    setLoading(false);
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { current, prev, delta, deltaPct, min, max, path, area } = useMemo(() => {
    if (series.length < 2) {
      return { current: 0, prev: 0, delta: 0, deltaPct: 0, min: 0, max: 0, path: "", area: "" };
    }
    const cur = series[series.length - 1].value;
    const pr = series[series.length - 2].value;
    const values = series.map((p) => p.value);
    const mn = Math.min(...values);
    const mx = Math.max(...values);
    const W = 600;
    const H = 120;
    const pad = 6;
    const span = mx - mn || 1;
    const pts = series.map((p, i) => {
      const x = pad + (i * (W - pad * 2)) / (series.length - 1);
      const y = H - pad - ((p.value - mn) / span) * (H - pad * 2);
      return [x, y] as const;
    });
    const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const area = `${path} L${pts[pts.length - 1][0].toFixed(1)} ${H} L${pts[0][0].toFixed(1)} ${H} Z`;
    return {
      current: cur,
      prev: pr,
      delta: cur - pr,
      deltaPct: ((cur - pr) / pr) * 100,
      min: mn,
      max: mx,
      path,
      area,
    };
  }, [series]);

  const up = delta >= 0;

  return (
    <section id="rate-tracker" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Онлайн-курс ЦБ РФ
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">Курс юаня к рублю</h2>
              <p className="mt-2 text-muted-foreground">
                Официальные данные Центробанка России, обновление каждые 5 минут.
              </p>
            </div>
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
              aria-label="Обновить курс"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Обновить
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8">
              <div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">1 CNY</div>
                <div className="mt-1 flex items-baseline gap-3">
                  <div className="text-5xl font-bold tabular-nums md:text-6xl">
                    {error ? "—" : fmt(current)} <span className="text-2xl text-muted-foreground md:text-3xl">₽</span>
                  </div>
                </div>
                {!error && series.length > 1 && (
                  <div
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                      up ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {up ? "+" : ""}
                    {delta.toFixed(4)} ₽ ({up ? "+" : ""}
                    {deltaPct.toFixed(2)}%) за сутки
                  </div>
                )}
                {updatedAt && (
                  <div className="mt-3 text-xs text-muted-foreground">
                    Обновлено: {fmtTime(updatedAt)}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 md:min-w-[280px] md:grid-cols-1 md:gap-2">
                <Stat label="Вчера" value={error ? "—" : fmt(prev) + " ₽"} />
                <Stat label="Мин. за 14 дн." value={error ? "—" : fmt(min) + " ₽"} />
                <Stat label="Макс. за 14 дн." value={error ? "—" : fmt(max) + " ₽"} />
              </div>
            </div>

            {!error && series.length > 2 && (
              <div className="border-t border-border bg-muted/30 p-4 md:p-6">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Динамика за 14 дней</span>
                  <span>{fmtDate(series[0].date)} — {fmtDate(series[series.length - 1].date)}</span>
                </div>
                <svg viewBox="0 0 600 120" className="h-28 w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="rateGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={up ? "rgb(16 185 129)" : "rgb(244 63 94)"} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={up ? "rgb(16 185 129)" : "rgb(244 63 94)"} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={area} fill="url(#rateGrad)" />
                  <path
                    d={path}
                    fill="none"
                    stroke={up ? "rgb(16 185 129)" : "rgb(244 63 94)"}
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}

            <div className="grid grid-cols-2 gap-px border-t border-border bg-border md:grid-cols-4">
              {[1, 10, 100, 1000].map((n) => (
                <div key={n} className="bg-card p-4 text-center">
                  <div className="text-xs text-muted-foreground">{n} ¥</div>
                  <div className="mt-1 font-semibold tabular-nums">
                    {error ? "—" : (n * current).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Данные предоставлены API ЦБ РФ (cbr-xml-daily.ru). Курс Pay to China фиксируется на момент оплаты инвойса.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/50 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-semibold tabular-nums">{value}</div>
    </div>
  );
}
