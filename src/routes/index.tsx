import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Оплата счетов в Китай для бизнеса | Pay to China .ru — сопровождение ВЭД" },
      {
        name: "description",
        content:
          "Pay to China .ru — оплата инвойсов китайским поставщикам для юридических лиц. Сопровождение ВЭД, документы, персональный менеджер. Прозрачные условия и сроки.",
      },
      { property: "og:title", content: "Pay to China .ru — оплата счетов в Китай для бизнеса" },
      {
        property: "og:description",
        content:
          "Оплата инвойсов в Китай, сопровождение ВЭД и поддержка импортных сделок. Работаем с юридическими лицами.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Pay to China .ru — оплата счетов в Китай для бизнеса" },
      {
        name: "twitter:description",
        content: "Оплата инвойсов китайским поставщикам с полным сопровождением ВЭД.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pay to China .ru",
          description:
            "Оплата счетов и инвойсов в Китай для юридических лиц с сопровождением ВЭД.",
          url: "/",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+7-800-500-50-50",
            contactType: "sales",
            email: "hello@paychina.ru",
            areaServed: "RU",
            availableLanguage: ["Russian"],
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
      <Navbar />
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
