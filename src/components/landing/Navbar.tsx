import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

const links = [
  { href: "#advantages", label: "Преимущества" },
  { href: "#how", label: "Как работает" },
  { href: "#services", label: "Услуги" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contact", label: "Контакты" },
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
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-18">
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            PayChina
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Получить консультацию
          </a>
          <Button asChild className="bg-gradient-emerald text-accent-foreground shadow-emerald hover:opacity-95">
            <a href="#contact">Оставить заявку</a>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Открыть меню"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 bg-gradient-emerald text-accent-foreground shadow-emerald"
              onClick={() => setOpen(false)}
            >
              <a href="#contact">Оставить заявку</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
