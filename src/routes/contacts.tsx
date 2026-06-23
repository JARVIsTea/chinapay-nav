import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { LeadForm } from "@/components/landing/LeadForm";
import { breadcrumbJsonLd, SITE_URL, SAME_AS } from "@/lib/seo";
import { Mail, MessageCircle, Phone, MessagesSquare } from "lucide-react";

const TITLE = "Контакты — Pay to China | связаться с менеджером по оплате в Китай";
const DESC =
  "Контакты Pay to China: телефон +7 (996) 845-70-51, Telegram @sup_port_best, e-mail fedorov1991kzn@gmail.com. Ответим в течение рабочего дня.";
const PATH = "/contacts";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}${PATH}` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pay to China",
          url: `${SITE_URL}${PATH}`,
          email: "fedorov1991kzn@gmail.com",
          telephone: "+7-996-845-70-51",
          areaServed: { "@type": "Country", name: "Russia" },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+7-996-845-70-51",
              contactType: "sales",
              email: "fedorov1991kzn@gmail.com",
              areaServed: "RU",
              availableLanguage: ["Russian"],
            },
            {
              "@type": "ContactPoint",
              contactType: "customer support",
              url: "https://t.me/sup_port_best",
              availableLanguage: ["Russian"],
            },
          ],
          sameAs: ["https://t.me/sup_port_best"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Контакты", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Контакты" }]}>
      <section className="container-page py-14 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Контакты
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Свяжитесь с менеджером
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Ответим в течение рабочего дня. Среднее время ответа — до 15 минут.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            href="tel:+79968457051"
            icon={<Phone className="h-5 w-5" />}
            label="Телефон"
            value="+7 (996) 845-70-51"
          />
          <ContactCard
            href="https://wa.me/79968457051"
            icon={<MessageCircle className="h-5 w-5" />}
            label="WhatsApp"
            value="+7 (996) 845-70-51"
          />
          <ContactCard
            href="https://t.me/sup_port_best"
            icon={<MessagesSquare className="h-5 w-5" />}
            label="Telegram"
            value="@sup_port_best"
          />
          <ContactCard
            href="mailto:fedorov1991kzn@gmail.com"
            icon={<Mail className="h-5 w-5" />}
            label="E-mail"
            value="fedorov1991kzn@gmail.com"
          />
        </div>
      </section>
      <LeadForm />
    </PageLayout>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-elev-1 transition-all hover:-translate-y-0.5 hover:shadow-elev-2"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-emerald)/10 text-(--color-emerald)">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 font-display text-sm font-semibold text-foreground break-all">
          {value}
        </div>
      </div>
    </a>
  );
}
