import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/landing/PageLayout";
import { Faq } from "@/components/landing/Faq";
import { LeadForm } from "@/components/landing/LeadForm";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Вопросы и ответы об оплате счетов в Китай | Pay to China";
const DESC =
  "Частые вопросы об оплате инвойсов в Китай: документы, сроки переводов, валюты, поставщики, сопровождение ВЭД. Ответы экспертов Pay to China.";
const PATH = "/faq";

const FAQS = [
  {
    q: "Какие документы необходимы для оплаты?",
    a: "Минимальный пакет — инвойс от поставщика и реквизиты вашей компании. В зависимости от суммы и характера сделки потребуется внешнеторговый контракт, спецификация, упаковочный лист и подтверждение цели платежа.",
  },
  {
    q: "С какими поставщиками вы работаете?",
    a: "Работаем с заводами, трейдерами и торговыми компаниями по всему Китаю — Гуанчжоу, Иу, Шэньчжэнь, Шанхай, Нинбо. Принимаем платежи в юанях и долларах США.",
  },
  {
    q: "Сколько времени занимает процесс?",
    a: "Согласование условий и подготовка документов обычно занимают 1 рабочий день. Сам платёж проходит за 1–3 рабочих дня в зависимости от валюты и банка получателя.",
  },
  {
    q: "Как проходит сопровождение сделки?",
    a: "За вашей компанией закрепляется персональный менеджер. Он проверяет документы, согласует условия, контролирует проведение платежа и передаёт закрывающие документы для бухгалтерии и валютного контроля.",
  },
];

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
          mainEntity: FAQS.map((f) => ({
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
      <Faq />
      <LeadForm />
    </PageLayout>
  );
}
