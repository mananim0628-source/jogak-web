import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "조각닷컴 — 강남 나이트라이프 가이드",
    short_name: "조각닷컴",
    description: "강남 클럽·라운지·루프탑 바의 비용·매너·드레스코드 가이드",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#1A1230",
    background_color: "#1A1230",
    categories: ["lifestyle", "travel"],
    lang: "ko",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "가이드 보기",
        url: "/guide",
        description: "나이트라이프 가이드 모음",
      },
    ],
  };
}
