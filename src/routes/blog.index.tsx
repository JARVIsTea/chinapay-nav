import { Link, createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { BLOG_POSTS } from "@/content/blog";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const PAGE_TITLE = "Блог про оплату в Китай — Pay to China";
const PAGE_DESC =
  "Экспертные статьи про оплату инвойсов в Китай, ВЭД, валютный контроль, расчёты в юанях, Alipay и WeChat. Практические инструкции для импортёров.";
const URL = `${SITE_URL}/blog`;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "блог оплата в китай, статьи вэд, оплата инвойса китай, юани, валютный контроль, alipay, wechat",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Блог", path: "/blog" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Блог Pay to China",
          description: PAGE_DESC,
          url: URL,
          publisher: {
            "@type": "Organization",
            name: "Pay to China",
            url: SITE_URL,
          },
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
            dateModified: p.updated ?? p.date,
            description: p.description,
            image: `${SITE_URL}${p.cover}`,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Блог" },
      ]}
    >
      <section className="container-page pt-8 pb-20 sm:pt-12">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-(--color-emerald)">
            Блог
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Оплата в Китай: гайды, инструкции и аналитика
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Разбираем рабочие способы оплаты инвойсов в Китай, валютный контроль, юани,
            Alipay/WeChat и документы ВЭД. Материалы написаны на практике сотен сделок.
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-(--color-emerald)/50"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block aspect-[16/10] overflow-hidden bg-muted"
              >
                <img
                  src={post.cover}
                  alt={post.coverAlt}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {post.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-(--color-emerald)/10 px-2.5 py-1 text-(--color-emerald)"
                    >
                      {t}
                    </span>
                  ))}
                  <span>· {post.readingMinutes} мин</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="transition-colors hover:text-(--color-emerald)"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-(--color-emerald)"
                >
                  Читать статью →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
