---
title: EP제작_워크플로
updated: 2026-06-06
tags: [조각닷컴, 워크플로, EP, 3채널, single-source, 확정]
관련: [[CLAUDE_조각닷컴]] · [[콘텐츠트랙_정의]] · [[웹플랫폼_AEO설계]] · [[제목30_클린재작성]]
상태: 확정 — 표준 운영 절차
---

# EP 제작·발행 워크플로 (확정)
> **새 EP = `content/{slug}.md` 1개 작성 → build-channels → 카드·릴스·웹 3채널 발행.**
> single source는 MD. 한 번 쓰면 검색 자산(웹)이 매번 같이 쌓인다.

## 0. 구조 (한눈에)
```
content/{slug}.md  (single source)
   │  build-channels {slug}  (VPS 실행, service_role=VPS env)
   ├─→ 카드 : Supabase jogak_cardnews upsert(slug) → gangnam_carousel_pacers.py {slug} → 7장 + 텔레그램
   ├─→ 릴스 : reel.scenes[] → 파이프 문자열 → jogak_btrack_pipeline.sh (video_url 필요)
   └─→ 웹  : Next.js SSG 아티클 (/guide/{slug}) — 자동
```

## 1. MD 작성 (single source)
`content/{slug}.md` 한 개. front-matter + 본문.
- **공통**: slug, track(mix|ssul|info), episode, title, h1, description, published_at, author, tags
- **카드용** `cards[]` (7장): {no, role, headline, sub, example, takeaway, action}
- **릴스용** `reel`: {video_url, scenes[]:{no, narration, caption}}
- **웹용**: 본문(마크다운) + `faq[]`:{q,a}
- 작성 가이드: 카드=12자 임팩트 / 웹 본문=AEO 산문(정의 먼저→표→FAQ) / 릴스=자막 12자.
- 주제·후킹은 [[콘텐츠트랙_정의]] 4트랙 + [[제목30_클린재작성]] 제목뱅크에서.

## 2. 발행 절차
```bash
# (VPS에서)
# 1) MD → 채널 입력 변환 + 카드 DB upsert
cd ~/jogak-web && npx tsx scripts/build-channels.ts {slug}

# 2) 카드 발행 (slug 지정)
cd ~/jogak-telegram && python3 workflows/gangnam_carousel_pacers.py {slug}

# 3) 릴스 발행 (video_url 채워진 경우)
#    build-channels 출력의 파이프 문자열 + video_url 사용
./jogak_btrack_pipeline.sh "{video_url}" "{씬1|씬2|...|씬7}"

# 4) 웹: git push → Vercel 자동 배포 (content/{slug}.md 커밋)
```

## 3. 발행 전 공통 체크리스트
- [ ] 금지어 0건 (룸살롱/마담/2차/유흥/에스코트/시세/호구/궁합/연애 + [[브랜드가이드]] 전체)
- [ ] 클린 포지션: 만남/이성/연애 프레임 없음, 경험·비용·동행 프레임
- [ ] 카드 7장 = 해당 slug 내용 맞는지 (card1 커버 확인)
- [ ] 릴스: 자막 12자, 세이프존(하단 CTA 안 가림), 무음 구간 없음, S5 숫자 카드와 일치
- [ ] 웹: 소스보기에 본문 HTML 보임(SSG) + FAQ JSON-LD + CTA(@jogakdotcom) 동작
- [ ] 발행 순서: 릴스(D-Day, 파일럿) → 카드(D+1) 권장

## 4. 측정 (조회수 아님)
- 인스타: 저장·공유·완주율(릴스)·저장(카드). 48시간 관찰.
- 웹/검색: 서치콘솔·서치어드바이저·Bing 색인/노출. AI 인용은 주요 질의어 수동 추적.
- 전환: 아티클·게시물 → @jogakdotcom 유입.

## 5. 현재 자산 상태
| 자산 | 상태 |
|---|---|
| 웹 플랫폼 Stage 1 (가이드 허브) | ✅ production (jogak-web.vercel.app), 색인 등록(구글·네이버·Bing) |
| MD single source | ✅ 2편 (mix-01, ssul-ep01) |
| build-channels 변환기 | ✅ 카드/릴스 입력 자동 생성 |
| 카드 채널 (slug 지정 발행) | ✅ 리팩터·검증 완료 |
| 릴스 채널 | ⏳ video_url 채우면 연결 (구조는 준비됨) |
| 웹 채널 | ✅ MD 직접 렌더 |

## 6. 남은 일 (보류·차후)
- **릴스 video_url 연결**: Seedance 영상 URL을 MD에 채워 릴스 채널 합류 (다음 EP부터).
- **EP.02 제작**: 라운지 클럽 주제(T2 정보성 권장) — 이 워크플로로 첫 풀 적용.
- **스카우터 자동화(보류)**: 매일 9시 trends-api → Claude 분석 → 조각닷컴 그룹 발송.
  n8n 워크플로 신규 필요(이전 것 삭제됨). [[스카우터v2_설계도]] 기반. EP 리듬 잡힌 뒤.
- **도메인**: 정식 도메인 확보 시 NEXT_PUBLIC_SITE_URL 교체 + 301 (현재 vercel 기본).
- **Stage 2(차후)**: 회원·나이트타입 테스트(봉인 자산)·모임 매칭(멤버십·평판 스키마) + PWA.

## 7. 안전 원칙 (반복 사고 방지)
- 돌아가는 발행 스크립트는 함부로 수정 금지 — 변경 시 하위호환 + 단계 검증.
- 추측 금지: 구조 모르면 점검(보고)부터, 코드 변경은 확인 후.
- "하는 김에" 범위 확장 금지 — EP 본류 우선, 곁가지는 보류 목록으로.
- service_role 키는 VPS env만. 로컬·클라이언트 노출 금지.
