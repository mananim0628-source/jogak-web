import type { Metadata } from "next";
import { Noto_Sans_KR, Playfair_Display } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
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
    <html lang="ko" className={`${notoSansKR.variable} ${playfair.variable}`}>
      <body
        className="min-h-screen antialiased"
        style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-50"
          style={{
            borderBottom: "1px solid var(--border)",
            background: "rgba(26,18,48,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="조각닷컴"
                width={28}
                height={28}
                className="rounded-full"
                style={{ border: "1px solid var(--gold-line)" }}
              />
              <span
                className="font-bold text-sm tracking-widest uppercase"
                style={{ color: "var(--gold)", fontFamily: "var(--font-playfair)" }}
              >
                조각닷컴
              </span>
            </a>
            <a
              href="https://t.me/unni_memo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-1.5 rounded-full transition"
              style={{
                border: "1px solid var(--gold-line)",
                color: "var(--gold)",
                background: "var(--gold-dim)",
              }}
            >
              일행 찾기
            </a>
          </div>
        </header>

        {/* Main */}
        <main
          className="max-w-3xl mx-auto px-5 py-12"
          style={{ position: "relative", zIndex: 1 }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          className="mt-20 py-10 text-center"
          style={{
            borderTop: "1px solid var(--border)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
          >
            © {new Date().getFullYear()} 조각닷컴 ·{" "}
            <a
              href="https://instagram.com/jogak_note"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gold)", opacity: 0.7 }}
              className="hover:opacity-100 transition"
            >
              @jogak_note
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
