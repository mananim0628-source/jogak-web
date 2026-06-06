import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";
const SITE_NAME = "조각닷컴";
const SITE_DESC = "강남 나이트라이프 입문 가이드 — 비용·매너·드레스코드를 실비용 기준으로 정리합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — 강남 나이트라이프 가이드`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: {
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: {
    google: "gg0_rgLBJyrGG2uVcrzFpHlHMtjq4NyvGs0wac5V5Uw",
    other: {
      "naver-site-verification": "9e0692b62daed8f77c5de227e1dc95811ca77ae8",
      "msvalidate.01": "D32BBFADE52D194D16A251DE2557C61D",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="min-h-screen bg-[#0d0820] text-white antialiased">
        <header className="border-b border-white/10 bg-[#0d0820]/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="text-gold font-bold tracking-widest text-sm uppercase">
              조각닷컴
            </a>
            <a
              href="https://t.me/unni_memo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs border border-gold/40 text-gold px-3 py-1.5 rounded-full hover:bg-gold/10 transition"
            >
              일행 찾기
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-white/10 mt-16 py-8 text-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} 조각닷컴 · 인스타그램{" "}
            <a href="https://instagram.com/jogak_note" className="text-gold/60 hover:text-gold" target="_blank" rel="noopener noreferrer">@jogak_note</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
