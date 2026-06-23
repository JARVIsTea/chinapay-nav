import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/services", label: "Услуги" },
  { to: "/how-it-works", label: "Как работает" },
  { to: "/cases", label: "Кейсы" },
  { to: "/blog", label: "Блог" },
  { to: "/faq", label: "Вопросы" },
  { to: "/contacts", label: "Контакты" },
] as const;

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
        <Link
          to="/"
          className="font-display text-[15px] font-semibold tracking-tight bg-[linear-gradient(90deg,#60a5fa_0%,#a78bfa_50%,#f87171_100%)] bg-clip-text text-transparent"
        >
          Pay to China
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[12px] font-normal text-white/75 transition-colors hover:text-white"
              activeProps={{ className: "text-[12px] font-medium text-white" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contacts"
          className="hidden text-[12px] font-normal text-white/75 transition-colors hover:text-white lg:inline"
        >
          Связаться ›
        </Link>

        <Link
          to="/contacts"
          className="inline-flex h-8 items-center rounded-full bg-(--color-emerald) px-3 text-[12px] font-semibold text-white lg:hidden"
        >
          Связаться
        </Link>
      </div>
    </header>
  );
}
