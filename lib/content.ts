import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface FaqItem {
  q: string;
  a: string;
}

export interface ArticleFrontmatter {
  slug: string;
  track: "mix" | "ssul" | "info";
  episode: string;
  title: string;
  h1: string;
  description: string;
  published_at: string;
  author: string;
  author_note: string;
  instagram_posted: boolean;
  faq: FaqItem[];
  tags: string[];
}

export interface Article extends ArticleFrontmatter {
  content: string; // rendered HTML
  readingTime: number; // minutes
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content: mdContent } = matter(raw);

  const processed = await remark().use(remarkHtml).process(mdContent);
  const content = processed.toString();

  const wordCount = mdContent.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 250));

  return {
    ...(data as ArticleFrontmatter),
    slug,
    content,
    readingTime,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = getArticleSlugs();
  const articles = await Promise.all(slugs.map(getArticleBySlug));
  return articles.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}

export function trackLabel(track: string): string {
  return { mix: "믹스", ssul: "썰", info: "인포" }[track] ?? track;
}
