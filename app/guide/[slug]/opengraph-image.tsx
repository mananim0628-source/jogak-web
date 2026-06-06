import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "조각닷컴 가이드";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "조각닷컴 강남 나이트라이프 가이드";
  let episode = "GUIDE";

  try {
    const article = await getArticleBySlug(slug);
    title = article.h1 || article.title;
    episode = `${article.track.toUpperCase()} · ${article.episode}`;
  } catch {
    // notFound 슬러그는 기본값 유지
  }

  // Noto Sans KR Bold — 한글 렌더링용
  const fontData = await fetch(
    "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/notosanskr/NotoSansKR-Bold.ttf"
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d0820",
          padding: "72px 80px",
        }}
      >
        {/* 상단: 트랙 배지 */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              border: "1px solid rgba(201,169,97,0.55)",
              color: "#C9A961",
              fontSize: 26,
              fontWeight: 700,
              padding: "10px 28px",
              borderRadius: 100,
              letterSpacing: 3,
              fontFamily: "NotoSansKR",
            }}
          >
            {episode}
          </div>
        </div>

        {/* 중앙: 아티클 제목 */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.32,
            maxWidth: 940,
            fontFamily: "NotoSansKR",
          }}
        >
          {title}
        </div>

        {/* 하단: 사이트명 + 핸들 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              color: "#C9A961",
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 5,
              fontFamily: "NotoSansKR",
            }}
          >
            조각닷컴
          </div>
          <div
            style={{
              color: "#FF2D87",
              fontSize: 24,
              fontFamily: "NotoSansKR",
            }}
          >
            @unni_memo
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "NotoSansKR",
          data: fontData,
          weight: 700,
        },
      ],
    }
  );
}
