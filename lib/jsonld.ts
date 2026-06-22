import type { Article, FaqItem } from "./content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "조각닷컴",
    description:
      "강남 라운지·클럽 등 고가 경험을 같이 갈 일행과 비용을 나눠(전 가격 ÷ 인원 = 1인 분담금) 즐기는 모임 매칭 서비스.",
    url: SITE_URL,
    provider: {
      "@type": "Organization",
      name: "조각닷컴",
      url: SITE_URL,
      sameAs: ["https://www.instagram.com/jogak_note", "https://t.me/jogakdotcom"],
    },
    areaServed: { "@type": "City", name: "서울" },
    serviceType: "모임 매칭",
    offers: {
      "@type": "Offer",
      description: "테이블 전 가격을 인원수로 나눈 1인 분담금 공개 구조. 강남 라운지 40만원 테이블 기준 4인 참여 시 1인 10만원.",
      priceCurrency: "KRW",
      eligibleRegion: { "@type": "City", name: "서울" },
    },
  };
}

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
