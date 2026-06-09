import { getAllArticles, trackLabel } from "@/lib/content";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";

export const metadata: Metadata = {
  title: "강남 밤문화 가이드 | 조각닷컴",
  description:
    "강남 클럽·라운지·파티 비용분담과 동행, 처음 가는 사람을 위한 실전 가이드 모음. 보틀 가격·드레스코드·입장 절차를 실비용 기준으로 정리합니다.",
  openGraph: {
    title: "강남 밤문화 가이드 | 조각닷컴",
    description:
      "강남 클럽·라운지·파티 비용분담과 동행, 처음 가는 사람을 위한 실전 가이드 모음.",
    url: `${SITE_URL}/guide`,
    siteName: "조각닷컴",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/guide`,
  },
};

const hubFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "조각닷컴은 어떤 서비스인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "조각닷컴은 강남·이태원 클럽·라운지·파티 등 고가 경험을 함께 갈 일행과 비용을 나눠 즐기는 모임 매칭 서비스입니다. 테이블 정가를 인원수로 나눈 1인 분담금을 공개 구조로 운영해 혼자 부담하기 어려운 경험을 합리적으로 즐길 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "강남 클럽 비용은 보통 얼마인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "강남 클럽은 테이블 차지(50~100만 원)와 보틀 비용(보틀당 30~60만 원)이 주요 비용입니다. 4인 기준 테이블을 이용하면 1인 분담금은 20~40만 원 수준입니다. 게스트 입장(입장료 2~5만 원)은 테이블 없이 입장만 하는 방식으로 초기 비용이 낮습니다.",
      },
    },
    {
      "@type": "Question",
      name: "처음 강남 클럽에 가는데 비용분담은 어떻게 하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "조각닷컴에서 일행을 모집하면 테이블 정가를 참여 인원으로 나눈 1인 분담금이 공개 고지됩니다. 보틀 주문 전 일행 전원이 동의하는 것이 기본 매너이며, 추가 주문 시에도 공동 합의가 원칙입니다.",
      },
    },
    {
      "@type": "Question",
      name: "게스트 입장과 테이블 예약은 뭐가 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "게스트 입장은 입장료(2~5만 원)만 내고 클럽 플로어를 자유롭게 이용하는 방식입니다. 테이블 예약은 전용 자리와 보틀 서비스를 포함하며 비용이 높지만 일행끼리 편하게 앉아 즐길 수 있습니다. 처음 방문이라면 게스트 입장으로 분위기를 파악한 뒤 테이블을 고려하는 것을 권장합니다.",
      },
    },
    {
      "@type": "Question",
      name: "강남 클럽 드레스코드는 어떻게 되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "강남 클럽은 대부분 슬리퍼·반바지·트레이닝복 착용 시 입구에서 거절됩니다. 남성은 셔츠 또는 니트에 슈즈, 여성은 원피스나 스마트 캐주얼이 기본입니다. 방문 전 해당 클럽의 SNS나 담당자에게 드레스코드를 사전 확인하는 것이 좋습니다.",
      },
    },
    {
      "@type": "Question",
      name: "강남과 이태원 클럽은 어떻게 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "강남 클럽은 테이블 중심 문화로 드레스코드가 엄격하고 비용이 높은 편입니다. 이태원은 외국인 친화적이고 분위기가 상대적으로 자유로우며 장르 다양성이 높습니다. 처음 나이트라이프를 경험한다면 강남은 격식 있는 자리, 이태원은 자유로운 분위기를 원할 때 선택하면 좋습니다.",
      },
    },
  ],
};

const hubBreadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "가이드", item: `${SITE_URL}/guide` },
  ],
};

export default async function GuidePage() {
  const articles = await getAllArticles();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubFaqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubBreadcrumbJsonLd) }}
      />

      {/* Page header */}
      <div className="pb-10">
        <p className="brand-label mb-4">All Guides</p>
        <h1
          className="font-black mb-2"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
          }}
        >
          가이드
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          강남 나이트라이프 비용·매너 정보 — {articles.length}편
        </p>
      </div>

      <div className="divider-gold mb-8" />

      {/* Article list — editorial magazine style with OG thumbnails */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {articles.map((a, i) => (
          <a
            key={a.slug}
            href={`/guide/${a.slug}`}
            className="group flex items-start gap-6 py-6 transition"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {/* Index */}
            <span
              className="shrink-0 font-bold tabular-nums"
              style={{
                fontSize: "1.5rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-playfair)",
                lineHeight: 1,
                minWidth: "2.5rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="track-badge">{trackLabel(a.track)}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
                  {a.episode}
                </span>
              </div>
              <h2
                className="font-bold text-base leading-snug mb-1.5"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
              >
                {a.title}
              </h2>
              <p
                className="text-xs leading-relaxed line-clamp-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {a.description}
              </p>
            </div>

            {/* OG Thumbnail — hidden on mobile, shown sm+ */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/guide/${a.slug}/opengraph-image`}
              alt=""
              aria-hidden="true"
              width={112}
              height={59}
              loading="lazy"
              className="hidden sm:block shrink-0 rounded-lg object-cover"
              style={{
                width: "112px",
                height: "59px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </a>
        ))}
      </div>
    </>
  );
}
