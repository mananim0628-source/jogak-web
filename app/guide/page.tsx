import { getAllArticles, trackLabel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "가이드 — 강남 나이트라이프 비용·매너 정보",
  description: "강남 클럽·라운지·루프탑 바의 비용 구조, 드레스코드, 매너를 실비용 기준으로 정리한 가이드 모음입니다.",
};

export default async function GuidePage() {
  const articles = await getAllArticles();

  return (
    <>
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
