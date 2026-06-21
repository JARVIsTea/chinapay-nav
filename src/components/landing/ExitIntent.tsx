"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, X, MessageCircle, Clock } from "lucide-react";

const TELEGRAM_URL = "https://t.me/paytochina_ru";
const STORAGE_KEY = "p2c_exit_intent_shown";

export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 8000);

    const trigger = () => {
      if (!armed) return;
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget || (e as MouseEvent).clientY > 10) return;
      trigger();
    };

    let lastY = 0;
    const onTouch = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (lastY && y - lastY > 60 && window.scrollY < 40) trigger();
      lastY = y;
    };

    // Fallback after long idle
    const idleTimer = window.setTimeout(trigger, 45000);

    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      window.clearTimeout(armTimer);
      window.clearTimeout(idleTimer);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("touchmove", onTouch);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-(--color-emerald)/30 bg-[oklch(0.16_0.02_240)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            {/* Animated glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--gradient-emerald)" }}
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-7 sm:p-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-(--color-emerald)/30 bg-(--color-emerald)/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-(--color-emerald)">
                <MessageCircle className="h-3 w-3" />
                Прямой контакт
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Остались вопросы?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
                Задайте их{" "}
                <span className="font-semibold text-white">руководителю напрямую</span>{" "}
                в Telegram — курс, сроки, документы. Ответим быстро и по делу.
              </p>

              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#229ED9] to-[#1a7fb3] px-5 py-3.5 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(34,158,217,0.6)] transition hover:scale-[1.02] hover:shadow-[0_14px_36px_-10px_rgba(34,158,217,0.8)] active:scale-[0.99]"
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                Написать в Telegram
              </a>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/50">
                <Clock className="h-3 w-3" />
                Среднее время ответа — до 15 минут
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
