import { getAllArticles, trackLabel } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "조각닷컴 — 강남 나이트라이프 가이드 허브",
  description:
    "강남 클럽·라운지·루프탑 바를 처음 가는 분을 위한 비용·매너·드레스코드 가이드. 혼자 가긴 부담스러운 경험을 일행과 나눠 즐기는 방법을 알려드립니다.",
  openGraph: {
    title: "조각닷컴 — 강남 나이트라이프 가이드",
    description: "비용·매너·드레스코드 — 첫 방문 전 알아야 할 모든 것",
    type: "website",
  },
};

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-6 pb-16">
        {/* Overline */}
        <p className="overline mb-6">Gangnam Nightlife Guide</p>

        {/* Headline */}
        <h1
          className="font-black leading-tight mb-6"
          style={{
            fontSize: "clamp(2rem, 6vw, 3.25rem)",
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
          }}
        >
          처음 가도{" "}
          <span
            style={{
              color: "var(--gold)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            당황하지 않는
          </span>{" "}
          법
        </h1>

        {/* Sub */}
        <p
          className="text-base leading-relaxed mb-8 max-w-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          강남 클럽·라운지·루프탑 바의 실비용·매너·드레스코드를
          첫 방문자 기준으로 정리합니다.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="/guide"
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition hover:opacity-90"
            style={{ background: "var(--gold)", color: "#1A1230" }}
          >
            가이드 보기
          </a>
          <a
            href="https://t.me/unni_memo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-full transition"
            style={{
              border: "1px solid var(--border-gold)",
              color: "var(--gold)",
              background: "var(--gold-dim)",
            }}
          >
            일행 찾기 →
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-gold mb-12" />

      {/* ── Guide Index ── */}
      <section className="mb-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2
            className="font-black text-lg"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            가이드 모음
          </h2>
          <a
            href="/guide"
            className="text-xs font-semibold transition"
            style={{ color: "var(--gold)", letterSpacing: "0.05em" }}
          >
            전체 보기 →
          </a>
        </div>

        <div className="space-y-0">
          {articles.map((a, i) => (
            <a
              key={a.slug}
              href={`/guide/${a.slug}`}
              className="group flex items-start gap-5 py-5 transition"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              {/* Index number */}
              <span
                className="shrink-0 font-bold tabular-nums mt-0.5"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-playfair)",
                  minWidth: "1.5rem",
                  letterSpacing: "0.05em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="track-badge">{trackLabel(a.track)}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
                    {a.episode}
                  </span>
                </div>
                <p
                  className="font-semibold text-sm leading-snug transition line-clamp-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {a.title}
                </p>
                <p
                  className="text-xs mt-1 line-clamp-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {a.description}
                </p>
              </div>

              {/* Arrow */}
              <span
                className="shrink-0 self-center text-sm transition group-hover:translate-x-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Brand Section ── */}
      <section
        className="rounded-2xl p-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(201,169,97,0.08) 0%, rgba(255,45,135,0.05) 100%)",
          border: "1px solid var(--border-gold)",
        }}
      >
        <p className="overline mb-3">조각 = 함께 가는 경험</p>
        <h2
          className="font-black mb-3"
          style={{ fontSize: "1.5rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          혼자 가긴 부담스럽다면
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
          같이 갈 일행끼리 비용을 나누면 프리미엄 경험의 문턱이 낮아집니다.
          <br />
          강남 클럽·라운지·루프탑 바 조각 모임을 텔레그램에서 모집합니다.
        </p>
        <a
          href="https://t.me/unni_memo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-bold px-7 py-3 rounded-full transition hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #FF2D87 0%, #C9A961 100%)",
            color: "#fff",
          }}
        >
          @unni_memo 참여하기
        </a>
      </section>
    </>
  );
}
