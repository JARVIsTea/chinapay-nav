import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { Faq, faqs } from "@/components/landing/Faq";
import { LeadForm } from "@/components/landing/LeadForm";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Вопросы и ответы об оплате счетов в Китай | Pay to China";
const DESC =
  "Частые вопросы об оплате в Китай: инвойсы, Alipay, WeChat Pay, сроки 15 минут, карты РФ, документы и сопровождение ВЭД.";
const PATH = "/faq";

export const Route = createFileRoute("/faq")({
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
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Вопросы", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Вопросы" }]}>
      <h1 className="sr-only">Вопросы и ответы об оплате счетов в Китай — Pay to China</h1>
      <Faq />
      <LeadForm />
    </PageLayout>
  );
}
