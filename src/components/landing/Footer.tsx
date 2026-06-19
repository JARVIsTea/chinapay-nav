import { Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[--color-navy-deep] text-[--color-mist]">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-display text-lg font-bold tracking-tight text-white">PayChina</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Помогаем компаниям проводить международные расчёты с китайскими поставщиками
              быстро, безопасно и с полным документальным сопровождением.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-4">
            <FooterCol
              title="Услуги"
              links={[
                ["#services", "Оплата инвойсов"],
                ["#services", "Сопровождение ВЭД"],
                ["#services", "Проверка документов"],
              ]}
            />
            <FooterCol
              title="Компания"
              links={[
                ["#advantages", "О нас"],
                ["#how", "Как работаем"],
                ["#faq", "Вопросы"],
              ]}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Контакты</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="tel:+78005005050" className="flex items-center gap-2.5 text-white/85 hover:text-[--color-emerald-soft]">
                  <Phone className="h-4 w-4 text-[--color-emerald]" />
                  +7 (800) 500-50-50
                </a>
              </li>
              <li>
                <a href="mailto:hello@paychina.ru" className="flex items-center gap-2.5 text-white/85 hover:text-[--color-emerald-soft]">
                  <Mail className="h-4 w-4 text-[--color-emerald]" />
                  hello@paychina.ru
                </a>
              </li>
              <li>
                <a href="https://t.me/paychina" className="flex items-center gap-2.5 text-white/85 hover:text-[--color-emerald-soft]">
                  <MessageCircle className="h-4 w-4 text-[--color-emerald]" />
                  @paychina
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} PayChina. Все права защищены.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-white/50">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([href, label]) => (
          <li key={label}>
            <a href={href} className="text-white/85 transition-colors hover:text-[--color-emerald-soft]">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
