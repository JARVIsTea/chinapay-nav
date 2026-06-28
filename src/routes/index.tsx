import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Marquee } from "@/components/landing/Marquee";
import { Hero } from "@/components/landing/Hero";
import { Advantages } from "@/components/landing/Advantages";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Services } from "@/components/landing/Services";
import { TrustBlock } from "@/components/landing/TrustBlock";
import { Cases } from "@/components/landing/Cases";
import { Acceptance } from "@/components/landing/Acceptance";
import { Corridor } from "@/components/landing/Corridor";
import { SwiftBanner } from "@/components/landing/SwiftBanner";
import { Faq } from "@/components/landing/Faq";
import { LeadForm } from "@/components/landing/LeadForm";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { SAME_AS } from "@/lib/seo";

const SITE = "https://pay-to-china.ru";
const OG_IMAGE = SITE + "/og-image.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Оплата счетов в Китай для бизнеса | Pay to China — сопровождение ВЭД" },
      {
        name: "description",
        content:
          "Pay to China — оплата инвойсов китайским поставщикам для юридических лиц. Сопровождение ВЭД, документы, персональный менеджер. Курс ¥ → ₽ 11.25 + 0.5%.",
      },
      { property: "og:title", content: "Pay to China — оплата счетов в Китай для бизнеса" },
      {
        property: "og:description",
        content:
          "Оплата инвойсов в Китай, сопровождение ВЭД и поддержка импортных сделок. Работаем с юридическими лицами.",
      },
      { property: "og:url", content: SITE + "/" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Pay to China — оплата инвойсов в Китай за 24 часа" },
      { name: "twitter:title", content: "Pay to China — оплата счетов в Китай для бизнеса" },
      {
        name: "twitter:description",
        content: "Оплата инвойсов китайским поставщикам с полным сопровождением ВЭД.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "FinancialService"],
          "@id": SITE + "/#organization",
          name: "Pay to China",
          legalName: "Pay to China",
          alternateName: ["Pay to China .ru", "PayToChina", "Пэй ту Чайна"],
          description:
            "Оплата счетов и инвойсов в Китай для юридических лиц с полным сопровождением ВЭД, валютным контролем и документами для банка.",
          url: SITE,
          logo: {
            "@type": "ImageObject",
            url: SITE + "/favicon.svg",
            width: 512,
            height: 512,
          },
          image: OG_IMAGE,
          slogan: "Оплата инвойсов в Китай за 24 часа",
          knowsAbout: [
            "ВЭД",
            "Оплата инвойсов в Китай",
            "Валютный контроль",
            "Импорт из Китая",
            "Юань",
            "Alipay",
            "WeChat Pay",
          ],
          areaServed: [
            { "@type": "Country", name: "Россия" },
            { "@type": "Country", name: "Китай" },
          ],
          serviceArea: { "@type": "Country", name: "Russia" },
          currenciesAccepted: ["RUB", "CNY", "USD"],
          priceRange: "$$",
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
          sameAs: SAME_AS,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": SITE + "/#website",
          name: "Pay to China",
          url: SITE,
          inLanguage: "ru-RU",
          publisher: { "@id": SITE + "/#organization" },
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Marquee />
      <Navbar />
      <div className="h-[84px]" />
      <main>
        <Hero />
        <Advantages />
        <HowItWorks />
        <SwiftBanner />
        <Corridor />
        <Acceptance />
        <Cases />
        <Services />
        <TrustBlock />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
