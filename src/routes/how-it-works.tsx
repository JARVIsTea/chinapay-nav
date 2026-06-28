import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Corridor } from "@/components/landing/Corridor";
import { PaymentFlow } from "@/components/landing/PaymentFlow";
import { LeadForm } from "@/components/landing/LeadForm";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Как работает оплата счетов в Китай — этапы сделки | Pay to China";
const DESC =
  "Как проходит оплата инвойса в Китай через Pay to China: согласование условий, проверка документов, перевод поставщику, закрывающие документы для бухгалтерии.";
const PATH = "/how-it-works";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: `${SITE_URL}${PATH}` },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Как оплатить инвойс в Китай через Pay to China",
          description: DESC,
          step: [
            { "@type": "HowToStep", position: 1, name: "Согласование условий", text: "Фиксируем курс, комиссию, сроки и формат документооборота." },
            { "@type": "HowToStep", position: 2, name: "Проверка документов", text: "Проверяем инвойс, контракт и реквизиты поставщика." },
            { "@type": "HowToStep", position: 3, name: "Проведение платежа", text: "Перевод в юанях или долларах за 1–3 рабочих дня." },
            { "@type": "HowToStep", position: 4, name: "Закрывающие документы", text: "Передаём пакет для бухгалтерии и валютного контроля." },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Как работает", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Как работает" }]}>
      <h1 className="sr-only">Как работает оплата счетов в Китай — этапы сделки Pay to China</h1>
      <HowItWorks />
      <Corridor />
      <PaymentFlow />
      <LeadForm />
    </PageLayout>
  );
}
