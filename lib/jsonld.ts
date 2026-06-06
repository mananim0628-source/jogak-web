import type { Article, FaqItem } from "./content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}/guide/${article.slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: article.author,
      description: article.author_note,
      url: "https://www.instagram.com/jogak_note",
    },
    publisher: {
      "@type": "Organization",
      name: "조각닷컴",
      url: SITE_URL,
    },
    datePublished: `${article.published_at}T00:00:00+09:00`,
    url: `${SITE_URL}/guide/${article.slug}`,
    inLanguage: "ko",
  };
}

export function breadcrumbJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "가이드",
        item: `${SITE_URL}/guide`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/guide/${article.slug}`,
      },
    ],
  };
}
