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
        publishedTime: article.published_at,
        url: `${SITE_URL}/guide/${slug}`,
        locale: "ko_KR",
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
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {crumb.href ? (
              <a href={crumb.href} className="hover:text-gold transition">
                {crumb.name}
              </a>
            ) : (
              <span className="text-gray-400">{crumb.name}</span>
            )}
          </span>
        ))}
      </nav>

      {/* Track badge */}
      <div className="mb-4">
        <span className="text-xs font-semibold tracking-widest text-gold uppercase border border-gold/30 px-3 py-1 rounded-full">
          {trackLabel(article.track)} · {article.episode}
        </span>
      </div>

      {/* H1 */}
      <h1 className="text-3xl font-black text-white leading-tight mb-4">
        {article.h1}
      </h1>

      <p className="text-gray-400 text-sm leading-relaxed mb-2">
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
              className="text-xs text-gray-400 border border-white/10 px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

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
