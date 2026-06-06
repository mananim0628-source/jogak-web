#!/usr/bin/env tsx
/**
 * build-channels <slug>
 *
 * MD single source → 채널별 입력 변환기 (어댑터 방식)
 * 기존 렌더 스크립트(gangnam_carousel_pacers.py / jogak_btrack_pipeline.sh) 무수정.
 *
 * 카드: cards[] + title → jogak_cardnews.cardnews_json upsert (Supabase)
 * 릴스: reel.scenes[].caption → "씬1|씬2|...|씬7" + video_url 출력
 *
 * 환경변수:
 *   JOGAK_SUPABASE_URL        (기본 https://lpdhtagnbqwjagtmifug.supabase.co)
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SUPABASE_URL =
  process.env.JOGAK_SUPABASE_URL ??
  "https://lpdhtagnbqwjagtmifug.supabase.co";
const SRK = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const CONTENT_DIR = path.join(process.cwd(), "content");

function loadMd(slug: string) {
  const p = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(p)) {
    console.error(`MD 파일 없음: ${p}`);
    process.exit(1);
  }
  const { data } = matter(fs.readFileSync(p, "utf8"));
  return data;
}

async function upsertCard(
  slug: string,
  data: Record<string, unknown>,
  dryRun: boolean,
) {
  if (!data.cards || !Array.isArray(data.cards) || data.cards.length === 0) {
    console.error(`[카드] cards[] 없음 — slug: ${slug}`);
    process.exit(1);
  }

  const payload = { slug, title: data.title, cards: data.cards };
  const cardnews_json = JSON.stringify(payload);

  console.log(`[카드] title: ${data.title}`);
  console.log(`[카드] cards: ${(data.cards as unknown[]).length}장`);
  console.log(`[카드] JSON 미리보기 (첫 카드):`);
  console.log(JSON.stringify((data.cards as unknown[])[0], null, 2));

  if (dryRun) {
    console.log(`\n[카드] --dry-run: Supabase upsert 생략 (구조 검증만)`);
    return;
  }

  if (!SRK) {
    console.error("[카드] SUPABASE_SERVICE_ROLE_KEY 미설정 — VPS에서 실행하거나 env 설정 필요");
    process.exit(1);
  }

  // (카드 스크립트는 created_at.desc limit 1을 읽으므로 최신 행이 곧 현재 EP)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/jogak_cardnews`, {
    method: "POST",
    headers: {
      apikey: SRK,
      Authorization: `Bearer ${SRK}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({ cardnews_json }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`[카드] Supabase upsert 실패 (${res.status}): ${err}`);
    process.exit(1);
  }

  const json = await res.json();
  console.log(`[카드] upsert 완료 → jogak_cardnews id: ${json[0]?.id ?? "?"}`);
}

function buildReelArgs(slug: string, data: Record<string, unknown>) {
  const reel = data.reel as
    | { video_url?: string; scenes?: Array<{ caption: string }> }
    | undefined;

  if (!reel || !Array.isArray(reel.scenes) || reel.scenes.length === 0) {
    console.error(`[릴스] reel.scenes[] 없음 — slug: ${slug}`);
    process.exit(1);
  }

  const pipeStr = reel.scenes.map((s) => s.caption).join("|");
  const videoUrl = reel.video_url ?? "";

  console.log(`\n[릴스] 인자 생성 완료`);
  console.log(`       씬 수: ${reel.scenes.length}`);
  console.log(`       video_url: ${videoUrl || "(미설정)"}`);
  console.log(`\n--- 릴스 스크립트 실행 명령어 ---`);
  console.log(`./jogak_btrack_pipeline.sh "${videoUrl}" "${pipeStr}"`);
  console.log(`---------------------------------\n`);

  return { pipeStr, videoUrl };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const slug = args.find((a) => !a.startsWith("--"));

  if (!slug) {
    console.error("사용법: npx tsx scripts/build-channels.ts <slug> [--dry-run]");
    console.error("예시:   npx tsx scripts/build-channels.ts mix-01-gangnam-club-basics --dry-run");
    process.exit(1);
  }

  console.log(`\n=== build-channels: ${slug}${dryRun ? " (dry-run)" : ""} ===\n`);
  const data = loadMd(slug);

  // 카드 채널
  await upsertCard(slug, data, dryRun);

  // 릴스 채널
  buildReelArgs(slug, data);

  console.log("=== 완료 ===\n");
}

main();
