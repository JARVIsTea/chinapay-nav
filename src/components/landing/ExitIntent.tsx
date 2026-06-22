"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, X, MessageCircle, Clock, Phone } from "lucide-react";
import { Logo } from "./Logo";

const PHONE = "+79968457051";
const PHONE_DISPLAY = "+7 (996) 845-70-51";
const TELEGRAM_URL = "https://t.me/sup_port_best";
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}`;
const MAX_URL = `https://max.ru/${PHONE.replace("+", "")}`;
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
              <div className="flex items-center gap-2.5">
                <Logo />
                <span className="font-display text-base font-bold tracking-tight bg-[linear-gradient(90deg,#60a5fa_0%,#a78bfa_50%,#f87171_100%)] bg-clip-text text-transparent">
                  Pay to China
                </span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-(--color-emerald)/30 bg-(--color-emerald)/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-(--color-emerald)">
                <MessageCircle className="h-3 w-3" />
                Связь с менеджером
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Остались вопросы?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Свяжитесь с Максом напрямую — курс, сроки, документы.
                Выберите удобный мессенджер.
              </p>

              <a
                href={`tel:${PHONE}`}
                onClick={close}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-(--color-emerald)" />
                {PHONE_DISPLAY}
              </a>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] px-3 py-3 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(37,211,102,0.6)] transition hover:scale-[1.03]"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1c-.9-.4-1.7-.9-2.4-1.7-.5-.7-1.2-1.7-1.3-1.9-.1-.3 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4s.1-.3 0-.4-.6-1.5-.9-2.1c-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.5 1 2.9 1.2 3.1.1.2 2.1 3.4 5.2 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.5-.4M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>
                  WhatsApp
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-[#229ED9] to-[#1a7fb3] px-3 py-3 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(34,158,217,0.6)] transition hover:scale-[1.03]"
                >
                  <Send className="h-5 w-5" />
                  Telegram
                </a>
                <a
                  href={MAX_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-[#7C5CFF] to-[#4F2BFF] px-3 py-3 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(124,92,255,0.6)] transition hover:scale-[1.03]"
                >
                  <MessageCircle className="h-5 w-5" />
                  MAX
                </a>
              </div>

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
