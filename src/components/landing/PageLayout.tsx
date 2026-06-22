import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Marquee } from "./Marquee";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useReveal } from "@/hooks/use-reveal";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export function PageLayout({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  breadcrumbs?: Crumb[];
}) {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Marquee />
      <Navbar />
      <div className="h-[84px]" />
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          aria-label="Хлебные крошки"
          className="container-page pt-4 text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 opacity-50" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground/80">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
