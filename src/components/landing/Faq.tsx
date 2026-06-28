import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Какие документы необходимы для оплаты?",
    a: "Минимальный пакет — инвойс от поставщика и реквизиты вашей компании. В зависимости от суммы и характера сделки потребуется внешнеторговый контракт, спецификация, упаковочный лист и подтверждение цели платежа. Полный перечень мы согласуем индивидуально после анализа инвойса.",
  },
  {
    q: "С какими поставщиками вы работаете?",
    a: "Работаем с заводами, трейдерами и торговыми компаниями по всему Китаю — Гуанчжоу, Иу, Шэньчжэнь, Шанхай, Нинбо и другими регионами. Принимаем платежи в юанях и долларах США. Каждого поставщика проверяем перед оплатой.",
  },
  {
    q: "Сколько времени занимает процесс?",
    a: "Согласование условий и подготовка документов обычно занимают 1 рабочий день. Сам платёж проходит за 1–3 рабочих дня в зависимости от валюты и банка получателя. Срочные сделки рассматриваем в индивидуальном порядке.",
  },
  {
    q: "Как проходит сопровождение сделки?",
    a: "За вашей компанией закрепляется персональный менеджер. Он проверяет документы, согласует условия, контролирует проведение платежа и передаёт закрывающие документы для бухгалтерии и валютного контроля. Связь — по удобному вам каналу: телефон, email или Telegram.",
  },
  {
    q: "Как пополнить Alipay или WeChat Pay через вас?",
    a: "Оставляете заявку с суммой и Alipay ID (номер телефона или email аккаунта) либо WeChat ID. Мы выставляем счёт по курсу 11.25 ₽ за 1 ¥ + 0.5%, вы оплачиваете на карту российского банка — и средства поступают на ваш китайский кошелёк. Минимальная сумма — от 1000 CNY.",
  },
  {
    q: "Сколько времени занимает пополнение Alipay/WeChat?",
    a: "Стандартный срок зачисления — 15 минут с момента поступления оплаты. В редких случаях при загруженности банков-партнёров может занять до 1 часа. Работаем 7 дней в неделю, включая праздники в Китае и России.",
  },
  {
    q: "Какие данные нужны для пополнения кошелька?",
    a: "Для Alipay — привязанный номер телефона аккаунта или Alipay ID и ФИО владельца на пиньине (как в аккаунте). Для WeChat Pay — WeChat ID или номер телефона и имя получателя. Перед отправкой мы сверяем данные, чтобы исключить ошибку зачисления.",
  },
  {
    q: "Какими картами можно оплатить пополнение?",
    a: "Принимаем переводы с карт всех российских банков: Сбербанк, Т-Банк, Альфа-Банк, ВТБ, Райффайзен, Озон Банк, Газпромбанк и других. Оплата по СБП или по номеру карты. Для юрлиц — безналичный перевод на расчётный счёт с закрывающими документами.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-14 lg:py-20">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Вопросы и ответы
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Отвечаем на главные вопросы
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Не нашли свой вопрос? Напишите нам — ответим в течение рабочего дня.
          </p>
        </div>

        <div className="reveal lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-6 shadow-elev-1 data-[state=open]:shadow-elev-2"
              >
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
