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
      {/* Hero */}
      <section className="text-center py-14 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-gold)" }}>
          강남 나이트라이프 가이드
        </p>
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          처음 가도{" "}
          <span style={{ color: "var(--color-gold)" }}>당황하지 않는</span> 법
        </h1>
        <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed mb-8">
          강남 클럽·라운지·루프탑 바의 실비용·매너·드레스코드를
          <br />첫 방문자 기준으로 정리합니다.
        </p>
        <a
          href="https://t.me/unni_memo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-bold text-white px-6 py-3 rounded-full transition hover:opacity-90"
          style={{ background: "linear-gradient(to right, #FF2D87, #C9A961)" }}
        >
          일행 찾기 @unni_memo
        </a>
      </section>

      {/* Guide index */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">가이드 모음</h2>
          <a href="/guide" style={{ color: "var(--color-gold)" }} className="text-xs hover:underline">
            전체 보기 →
          </a>
        </div>
        <div className="space-y-3">
          {articles.map((a) => (
            <a
              key={a.slug}
              href={`/guide/${a.slug}`}
              className="flex items-start gap-4 border border-white/10 rounded-xl p-4 hover:border-white/20 transition group"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5"
                style={{ background: "rgba(201,169,97,0.12)", color: "var(--color-gold)" }}
              >
                {trackLabel(a.track)}
              </span>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm group-hover:opacity-80 transition line-clamp-2 leading-snug">
                  {a.title}
                </p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-1">{a.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Brand section */}
      <section className="mt-16 rounded-2xl border border-white/10 p-8 text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "var(--color-gold)" }}>
          조각 = 함께 가는 경험
        </p>
        <h2 className="text-2xl font-black text-white mb-3">혼자 가긴 부담스럽다면</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          같이 갈 일행끼리 비용을 나누면 프리미엄 경험의 문턱이 낮아집니다.
          <br />
          강남 클럽·라운지·루프탑 바 조각 모임을 텔레그램에서 모집합니다.
        </p>
        <a
          href="https://t.me/unni_memo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-bold text-white px-6 py-3 rounded-full transition hover:opacity-90"
          style={{ background: "linear-gradient(to right, #FF2D87, #C9A961)" }}
        >
          @unni_memo 참여하기
        </a>
      </section>
    </>
  );
}
