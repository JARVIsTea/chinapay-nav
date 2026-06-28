import { createFileRoute } from "@tanstack/react-router";
import { Repeat } from "lucide-react";
import { PageLayout } from "@/components/landing/PageLayout";
import { LeadForm } from "@/components/landing/LeadForm";
import { ServiceDetail } from "@/components/landing/ServiceDetail";
import { breadcrumbJsonLd, serviceJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Приём и отправка платежей внутри Китая (CNY → CNY) | Pay to China";
const DESC =
  "Локальные расчёты между китайскими счетами и кошельками: оплата фабрикам, поставщикам и логистам внутри Китая. CNY → CNY, без конвертации, от 0.4%.";
const PATH = "/services/china-local-payments";

export const Route = createFileRoute("/services/china-local-payments")({
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
          serviceJsonLd("Приём и отправка платежей внутри Китая", DESC, PATH),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: "/services" },
            { name: "Платежи внутри Китая", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: ChinaLocalPage,
});

function ChinaLocalPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Услуги", to: "/services" },
        { label: "Платежи внутри Китая" },
      ]}
    >
      <ServiceDetail
        eyebrow="Локальные расчёты"
        title="Приём и отправка платежей внутри Китая"
        lead="Закрываем оплаты между китайскими счетами и кошельками без конвертации. Оплачиваем фабрикам, поставщикам, складам и логистам в юанях — деньги остаются внутри КНР."
        icon={Repeat}
        bullets={[
          "Перевод CNY → CNY без потери на конвертации",
          "Оплата на банковские счета и Alipay/WeChat",
          "Принимаем входящие платежи на свой счёт в КНР",
          "Подтверждение оплаты с печатью банка",
          "Поддержка нескольких выплат одним пакетом",
          "Комиссия от 0.4% от суммы",
        ]}
        steps={[
          {
            title: "Согласование",
            text: "Присылаете реквизиты получателя в Китае и сумму в юанях. Подтверждаем курс и комиссию.",
          },
          {
            title: "Зачисление средств",
            text: "Получаем рубли в РФ или юани на наш китайский счёт — на выбор.",
          },
          {
            title: "Локальная выплата",
            text: "Делаем платёж внутри Китая в день обращения и присылаем платёжное подтверждение.",
          },
        ]}
        facts={[
          { label: "Валюта", value: "CNY → CNY" },
          { label: "Комиссия", value: "от 0.4%" },
          { label: "Сроки", value: "в день обращения" },
          { label: "Документы", value: "Платёжка китайского банка" },
        ]}
        forWho={[
          "Импортёрам с поставщиками в КНР",
          "Закупщикам на 1688 и в Иу",
          "Карго- и логистическим компаниям",
          "Производствам с подрядчиками в Китае",
          "Агентам и закупочным офисам",
          "Маркетплейс-селлерам Wildberries / Ozon",
        ]}
      />
      <LeadForm />
    </PageLayout>
  );
}
