import { useEffect, useState } from "react";

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
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-9 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-black/30 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-12 items-center justify-between text-white">
        <a href="#top" className="font-display text-[15px] font-semibold tracking-tight text-white">
          Pay to China .ru
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

        <a
          href="#contact"
          className="inline-flex h-8 items-center rounded-full bg-(--color-emerald) px-3 text-[12px] font-semibold text-white lg:hidden"
        >
          Связаться
        </a>
      </div>
    </header>
  );
}
