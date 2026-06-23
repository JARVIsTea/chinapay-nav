const SITE = "https://pay-to-china.ru";

// Официальные профили компании для schema.org sameAs.
// Добавьте сюда новые URL (VK, YouTube, Дзен, Instagram, RuTube и т.п.) — они
// автоматически появятся в Organization-разметке на главной и /contacts.
export const SAME_AS: string[] = [
  "https://t.me/sup_port_best",
];

export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pay to China",
  alternateName: "Pay to China .ru",
  url: SITE,
  description:
    "Оплата счетов и инвойсов в Китай для юридических лиц с сопровождением ВЭД.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+7-996-845-70-51",
    contactType: "sales",
    email: "fedorov1991kzn@gmail.com",
    areaServed: "RU",
    availableLanguage: ["Russian"],
  },
  sameAs: SAME_AS,
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE}${path}`,
    provider: { "@type": "Organization", name: "Pay to China", url: SITE },
    areaServed: { "@type": "Country", name: "Russia" },
    serviceType: "Внешнеэкономическая деятельность, оплата инвойсов в Китай",
  };
}

export const SITE_URL = SITE;
