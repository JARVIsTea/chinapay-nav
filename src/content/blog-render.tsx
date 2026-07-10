import { Link } from "@tanstack/react-router";

export type Block =
  | { type: "p" | "h3" | "note"; text: string }
  | { type: "ul" | "ol"; items: string[] };

export type Section = { id: string; heading: string; blocks: Block[] };

export type PostData = {
  intro: string;
  sections: Section[];
  faq: { q: string; a: string }[];
};

// Render text with allowed inline tags (<b>, <i>) safely.
function html(text: string) {
  return { __html: text.replace(/<(?!\/?(b|i|strong|em)\b)[^>]*>/gi, "") };
}

export function renderSections(data: PostData, _slug: string) {
  return (
    <>
      <p
        className="mt-4 text-[15px] leading-[1.75] text-muted-foreground"
        dangerouslySetInnerHTML={html(data.intro)}
      />
      {data.sections.map((s) => (
        <section key={s.id}>
          <h2
            id={s.id}
            className="mt-12 scroll-mt-28 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            {s.heading}
          </h2>
          {s.blocks.map((b, i) => {
            if (b.type === "p")
              return (
                <p
                  key={i}
                  className="mt-4 text-[15px] leading-[1.75] text-muted-foreground"
                  dangerouslySetInnerHTML={html(b.text)}
                />
              );
            if (b.type === "h3")
              return (
                <h3
                  key={i}
                  className="mt-8 font-display text-xl font-semibold text-foreground"
                >
                  {b.text}
                </h3>
              );
            if (b.type === "note")
              return (
                <div
                  key={i}
                  className="mt-6 rounded-2xl border border-(--color-emerald)/30 bg-(--color-emerald)/5 p-5 text-[14px] leading-relaxed text-foreground/85"
                  dangerouslySetInnerHTML={html(b.text)}
                />
              );
            if (b.type === "ul")
              return (
                <ul
                  key={i}
                  className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-[1.75] text-muted-foreground marker:text-(--color-emerald)"
                >
                  {b.items.map((it, j) => (
                    <li key={j} dangerouslySetInnerHTML={html(it)} />
                  ))}
                </ul>
              );
            if (b.type === "ol")
              return (
                <ol
                  key={i}
                  className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-[1.75] text-muted-foreground marker:font-semibold marker:text-(--color-emerald)"
                >
                  {b.items.map((it, j) => (
                    <li key={j} dangerouslySetInnerHTML={html(it)} />
                  ))}
                </ol>
              );
            return null;
          })}
        </section>
      ))}
      {data.faq.length > 0 && (
        <section>
          <h2 className="mt-12 scroll-mt-28 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Частые вопросы
          </h2>
          <div className="mt-4 space-y-4">
            {data.faq.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <div className="font-semibold text-foreground">{f.q}</div>
                <p
                  className="mt-2 text-[15px] leading-[1.7] text-muted-foreground"
                  dangerouslySetInnerHTML={html(f.a)}
                />
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div className="font-display text-xl font-bold text-foreground sm:text-2xl">
          Нужна оплата инвойса в Китай?
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Рассчитаем курс и комиссию за 15 минут. Оплата поставщику — за 24 часа, с
          полным пакетом документов для валютного контроля.
        </p>
        <Link
          to="/contacts"
          className="mt-5 inline-flex h-11 items-center rounded-full bg-(--color-emerald) px-6 text-sm font-semibold text-white transition-colors hover:bg-(--color-emerald-soft)"
        >
          Получить расчёт по вашему инвойсу →
        </Link>
      </div>
    </>
  );
}
