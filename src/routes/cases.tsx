import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { Cases } from "@/components/landing/Cases";
import { TrustBlock } from "@/components/landing/TrustBlock";
import { LeadForm } from "@/components/landing/LeadForm";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Кейсы оплаты в Китай — реальные сделки и результаты | Pay to China";
const DESC =
  "Кейсы Pay to China: примеры оплаты инвойсов китайским поставщикам — экономия на курсе, скорость переводов, закрытие документов для бухгалтерии и валютного контроля.";
const PATH = "/cases";

export const Route = createFileRoute("/cases")({
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
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Кейсы", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Кейсы" }]}>
      <h1 className="sr-only">Кейсы оплаты в Китай — реальные сделки Pay to China</h1>
      <Cases />
      <TrustBlock />
      <LeadForm />
    </PageLayout>
  );
}
