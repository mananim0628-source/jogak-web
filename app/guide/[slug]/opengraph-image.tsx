import { ImageResponse } from "next/og";
import { OG_ARTICLES } from "@/lib/og-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "조각닷컴 가이드";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const meta = OG_ARTICLES[slug];
  const title = meta?.title ?? "조각닷컴 강남 나이트라이프 가이드";
  const episode = meta?.episode ?? "GUIDE";

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
            }}
          >
            {episode}
          </div>
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.32,
            maxWidth: 940,
          }}
        >
          {title}
        </div>

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
            }}
          >
            조각닷컴
          </div>
          <div style={{ color: "#FF2D87", fontSize: 24 }}>@unni_memo</div>
        </div>
      </div>
    ),
    size
  );
}
