import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // 검색엔진
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Yeti", allow: "/" }, // 네이버
      { userAgent: "Bingbot", allow: "/" },
      // AI 답변엔진 — 인용·학습 허용 신호 (AEO 핵심)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
