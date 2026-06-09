import { getAllArticles } from "@/lib/content";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jogak-web.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const latestDate = articles.length
    ? new Date(articles[0].published_at)
    : new Date("2026-06-08");

  const articleEntries = articles.map((a) => ({
    url: `${SITE_URL}/guide/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: latestDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified: latestDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...articleEntries,
  ];
}
