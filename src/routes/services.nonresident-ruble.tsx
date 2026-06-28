import { createFileRoute } from "@tanstack/react-router";
import { Banknote } from "lucide-react";
import { PageLayout } from "@/components/landing/PageLayout";
import { LeadForm } from "@/components/landing/LeadForm";
import { ServiceDetail } from "@/components/landing/ServiceDetail";
import { breadcrumbJsonLd, serviceJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Отправка нерезидентского рубля — переводы на счета типа «Н» | Pay to China";
const DESC =
  "Переводы в рублях на нерезидентские счета и обратно. Агентские схемы расчётов с зарубежными контрагентами, валютный контроль и документы на нашей стороне.";
const PATH = "/services/nonresident-ruble";

export const Route = createFileRoute("/services/nonresident-ruble")({
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
          serviceJsonLd("Отправка нерезидентского рубля", DESC, PATH),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: "/services" },
            { name: "Нерезидентский рубль", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: NonresidentRubPage,
});

function NonresidentRubPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Услуги", to: "/services" },
        { label: "Нерезидентский рубль" },
      ]}
    >
      <ServiceDetail
        eyebrow="Агентские схемы"
        title="Отправка нерезидентского рубля"
        lead="Переводим рубли на нерезидентские счета зарубежных компаний и принимаем входящие. Подходит для агентских и трёхсторонних расчётов с поставщиками в Китае, ОАЭ, Гонконге и СНГ."
        icon={Banknote}
        bullets={[
          "Переводы на счета типа «Н» в РФ и за рубежом",
          "Зачисление в день обращения",
          "Договор поручения и агентский комплект",
          "Сопровождение валютного контроля",
          "Закрывающие документы для бухгалтерии",
          "Работаем с банками РФ, КНР, ОАЭ, HK",
        ]}
        steps={[
          {
            title: "Заявка и схема",
            text: "Уточняем плательщика, получателя и назначение. Подбираем безопасную агентскую схему.",
          },
          {
            title: "Договор и оплата",
            text: "Подписываем договор поручения. Получаем рубли по реквизитам нашего нерезидентского счёта.",
          },
          {
            title: "Зачисление и документы",
            text: "Отправляем рубли конечному получателю и передаём полный комплект закрывающих документов.",
          },
        ]}
        facts={[
          { label: "Валюта", value: "RUB → RUB (нерезидент)" },
          { label: "Сроки", value: "в течение 1 рабочего дня" },
          { label: "Комиссия", value: "обсуждается по сделке" },
          { label: "Документы", value: "Договор, инвойс, акт" },
        ]}
        forWho={[
          "Импортёрам и экспортёрам РФ",
          "Агентам по ВЭД",
          "Производствам с зарубежными подрядчиками",
          "Расчётам с поставщиками в КНР и СНГ",
          "Сделкам через ОАЭ и Гонконг",
          "Услугам и роялти за рубежом",
        ]}
      />
      <LeadForm />
    </PageLayout>
  );
}
