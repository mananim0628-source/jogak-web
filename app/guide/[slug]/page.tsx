import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs, trackLabel } from "@/lib/content";
import { faqJsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import FaqSection from "@/components/FaqSection";
import TelegramCta from "@/components/TelegramCta";
import AuthorCard from "@/components/AuthorCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    return {
      title: article.title,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        type: "article",
        publishedTime: `${article.published_at}T00:00:00+09:00`,
        url: `${SITE_URL}/guide/${slug}`,
        locale: "ko_KR",
        images: [
          {
            url: `${SITE_URL}/guide/${slug}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      alternates: { canonical: `${SITE_URL}/guide/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const breadcrumbs = [
    { name: "홈", href: "/" },
    { name: "가이드", href: "/guide" },
    { name: article.episode },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(article)) }}
      />
      {article.faq?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article.faq)) }}
        />
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: "var(--text-muted)" }}>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span style={{ opacity: 0.4 }}>/</span>}
            {crumb.href ? (
              <a href={crumb.href} className="breadcrumb-link">
                {crumb.name}
              </a>
            ) : (
              <span style={{ color: "var(--text-muted)" }}>{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Track badge */}
      <div className="mb-5">
        <span className="track-badge">
          {trackLabel(article.track)} · {article.episode}
        </span>
      </div>

      {/* H1 */}
      <h1
        className="font-black leading-tight mb-4"
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2.25rem)",
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
        }}
      >
        {article.h1}
      </h1>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
        {article.description}
      </p>

      {/* E-E-A-T: Author */}
      <AuthorCard
        author={article.author}
        authorNote={article.author_note}
        publishedAt={article.published_at}
        readingTime={article.readingTime}
      />

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                background: "var(--bg-surface)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider before article body */}
      <div className="divider-gold mb-8" />

      {/* Article body */}
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* FAQ */}
      {article.faq?.length > 0 && <FaqSection items={article.faq} />}

      {/* CTA */}
      <TelegramCta />
    </>
  );
}
