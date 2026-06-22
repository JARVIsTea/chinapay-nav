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
import { Faq } from "@/components/landing/Faq";
import { LeadForm } from "@/components/landing/LeadForm";
import { Footer } from "@/components/landing/Footer";
import { useReveal } from "@/hooks/use-reveal";

const SITE = "https://chinapay-nav.lovable.app";

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
      { name: "twitter:title", content: "Pay to China — оплата счетов в Китай для бизнеса" },
      {
        name: "twitter:description",
        content: "Оплата инвойсов китайским поставщикам с полным сопровождением ВЭД.",
      },
    ],
    links: [{ rel: "canonical", href: SITE + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pay to China",
          alternateName: "Pay to China .ru",
          description:
            "Оплата счетов и инвойсов в Китай для юридических лиц с сопровождением ВЭД.",
          url: SITE,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+7-996-845-70-51",
            contactType: "sales",
            email: "fedorov1991kzn@gmail.com",
            areaServed: "RU",
            availableLanguage: ["Russian"],
          },
          sameAs: ["https://t.me/sup_port_best"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pay to China",
          url: SITE,
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
