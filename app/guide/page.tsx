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
      <h1 className="text-3xl font-black text-white mb-2">가이드</h1>
      <p className="text-gray-400 mb-10">강남 나이트라이프 비용·매너 정보</p>
      <div className="space-y-4">
        {articles.map((a) => (
          <a
            key={a.slug}
            href={`/guide/${a.slug}`}
            className="block border border-white/10 rounded-xl p-5 bg-white/3 hover:bg-white/6 hover:border-gold/30 transition group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gold tracking-wider">{trackLabel(a.track)}</span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="text-xs text-gray-500">{a.episode}</span>
            </div>
            <h2 className="text-white font-bold group-hover:text-gold transition text-base leading-snug">
              {a.title}
            </h2>
            <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{a.description}</p>
          </a>
        ))}
      </div>
    </>
  );
}
