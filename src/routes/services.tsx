import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { Services } from "@/components/landing/Services";
import { Acceptance } from "@/components/landing/Acceptance";
import { LeadForm } from "@/components/landing/LeadForm";
import { breadcrumbJsonLd, serviceJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Услуги — оплата инвойсов в Китай, сопровождение ВЭД | Pay to China";
const DESC =
  "Услуги Pay to China: оплата инвойсов поставщикам в Китай в юанях и долларах, сопровождение ВЭД, проверка документов, консультации по международным расчётам.";
const PATH = "/services";

export const Route = createFileRoute("/services")({
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
          serviceJsonLd(
            "Оплата инвойсов в Китай и сопровождение ВЭД",
            DESC,
            PATH,
          ),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageLayout breadcrumbs={[{ label: "Главная", to: "/" }, { label: "Услуги" }]}>
      <h1 className="sr-only">Услуги Pay to China — оплата инвойсов в Китай и сопровождение ВЭД</h1>
      <Services />
      <Acceptance />
      <LeadForm />
    </PageLayout>
  );
}
