import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#advantages", label: "Преимущества" },
  { href: "#how", label: "Как работает" },
  { href: "#acceptance", label: "Документы" },
  { href: "#cases", label: "Кейсы" },
  { href: "#services", label: "Услуги" },
  { href: "#faq", label: "Вопросы" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-black/30 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-12 items-center justify-between text-white">
        <a href="#top" className="font-display text-[15px] font-semibold tracking-tight text-white">
          PayChina
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[12px] font-normal text-white/75 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden text-[12px] font-normal text-white/75 transition-colors hover:text-white lg:inline"
        >
          Связаться ›
        </a>

        <button
          type="button"
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/85 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-(--color-emerald) text-sm font-semibold text-white"
            >
              Оставить заявку
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
