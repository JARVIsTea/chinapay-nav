import { createFileRoute } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { PageLayout } from "@/components/landing/PageLayout";
import { LeadForm } from "@/components/landing/LeadForm";
import { ServiceDetail } from "@/components/landing/ServiceDetail";
import { breadcrumbJsonLd, serviceJsonLd, SITE_URL } from "@/lib/seo";

const TITLE = "Пополнение Alipay и WeChat из России для физлиц | Pay to China";
const DESC =
  "Пополним Alipay и WeChat Pay с российской карты за 15 минут. Для туристов, студентов и покупок на Taobao, 1688, Pinduoduo. Курс юаня 11.25 ₽ + 0.5%.";
const PATH = "/services/alipay-wechat";

export const Route = createFileRoute("/services/alipay-wechat")({
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
          serviceJsonLd("Пополнение Alipay и WeChat для физлиц", DESC, PATH),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: "/services" },
            { name: "Alipay и WeChat", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: AlipayWechatPage,
});

function AlipayWechatPage() {
  return (
    <PageLayout
      breadcrumbs={[
        { label: "Главная", to: "/" },
        { label: "Услуги", to: "/services" },
        { label: "Alipay и WeChat" },
      ]}
    >
      <ServiceDetail
        eyebrow="Для физлиц"
        title="Пополнение Alipay и WeChat Pay из России"
        lead="Зачисляем юани на ваш китайский кошелёк за 15 минут. Подходит туристам в Китае, студентам и для оплаты заказов на Taobao, 1688, Pinduoduo, JD."
        icon={Smartphone}
        bullets={[
          "Минимальная сумма — от 1 000 ₽",
          "Курс ЦБ + 0.5% — без скрытых комиссий",
          "Оплата с карт РФ, СБП и наличными",
          "Поддержка любого Alipay / WeChat ID",
          "Чек об операции в Telegram",
          "Возврат, если зачисление не прошло",
        ]}
        steps={[
          {
            title: "Заявка и расчёт",
            text: "Присылаете сумму и Alipay/WeChat ID. Фиксируем курс 11.25 ₽ за юань + 0.5%.",
          },
          {
            title: "Оплата в рублях",
            text: "Переводите рубли на карту или через СБП. Без визитов в офис.",
          },
          {
            title: "Зачисление в Китае",
            text: "В течение 15 минут юани приходят на ваш Alipay или WeChat. Присылаем подтверждение.",
          },
        ]}
        facts={[
          { label: "Курс", value: "11.25 ₽ / ¥ + 0.5%" },
          { label: "Сроки", value: "до 15 минут" },
          { label: "Минимум", value: "от 1 000 ₽" },
          { label: "Способы оплаты", value: "Карты РФ, СБП, наличные" },
        ]}
        forWho={[
          "Туристам в Китае",
          "Студентам по обмену",
          "Покупателям Taobao / 1688",
          "Заказам на Pinduoduo и JD",
          "Оплате гостиниц и транспорта",
          "Подаркам родственникам в КНР",
        ]}
      />
      <LeadForm />
    </PageLayout>
  );
}
