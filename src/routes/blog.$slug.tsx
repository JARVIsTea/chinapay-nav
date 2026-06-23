import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { BLOG_POSTS, getPost, getRelated } from "@/content/blog";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post ?? getPost(params.slug);
    if (!post) {
      return { meta: [{ title: "Статья не найдена — Pay to China" }] };
    }
    const url = `${SITE_URL}/blog/${post.slug}`;
    const image = `${SITE_URL}${post.cover}`;
    return {
      meta: [
        { title: `${post.title} — Pay to China` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords },
        { name: "author", content: "Pay to China" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: post.updated ?? post.date },
        { property: "article:section", content: post.tags[0] ?? "ВЭД" },
        ...post.tags.map((t) => ({ property: "article:tag", content: t })),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: [image],
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { "@type": "Organization", name: "Pay to China", url: SITE_URL },
            publisher: {
              "@type": "Organization",
              name: "Pay to China",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/favicon.svg`,
              },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            keywords: post.keywords,
            inLanguage: "ru-RU",
            articleSection: post.tags.join(", "),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Главная", path: "/" },
              { name: "Блог", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Блог", to: "/blog" },
        { label: "Не найдено" },
      ]}
    >
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Статья не найдена</h1>
        <p className="mt-3 text-muted-foreground">
          Возможно, материал переехал. Загляните в{" "}
          <Link to="/blog" className="text-(--color-emerald) underline">
            список статей
          </Link>
          .
        </p>
      </section>
    </PageLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Блог", to: "/blog" },
        { label: "Ошибка" },
      ]}
    >
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Не удалось загрузить статью
        </h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-(--color-emerald) px-5 py-2 text-sm font-semibold text-white"
        >
          Попробовать снова
        </button>
      </section>
    </PageLayout>
  ),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = getRelated(post.related);
  const dateLabel = new Date(post.updated ?? post.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Блог", to: "/blog" },
        { label: post.title },
      ]}
    >
      <article className="container-page max-w-3xl pt-6 pb-20">
        <header>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-(--color-emerald)/10 px-2.5 py-1 text-(--color-emerald)"
              >
                {t}
              </span>
            ))}
            <span>· {post.readingMinutes} мин чтения</span>
            <span>· {dateLabel}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </header>

        <figure className="mt-8 overflow-hidden rounded-3xl border border-border">
          <img
            src={post.cover}
            alt={post.coverAlt}
            width={1024}
            height={640}
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>

        <div className="mt-2">{post.content}</div>

        {related.length > 0 && (
          <aside className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-xl font-bold text-foreground">
              Читайте также
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-(--color-emerald)/50"
                >
                  <img
                    src={r.cover}
                    alt={r.coverAlt}
                    loading="lazy"
                    width={120}
                    height={80}
                    className="h-20 w-28 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {r.tags[0]} · {r.readingMinutes} мин
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-(--color-emerald)">
                      {r.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </PageLayout>
  );
}

// Ensure all posts are reachable; keeps tree-shaking safe.
export const __postSlugs = BLOG_POSTS.map((p) => p.slug);
