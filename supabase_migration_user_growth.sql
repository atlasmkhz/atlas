-- ═══════════════════════════════════════════════════════════════
-- ATLAS 광장 — 마이그레이션: 나의 서재 서버 동기화 (user_growth)
-- (이미 supabase_schema.sql과 이전 마이그레이션들을 실행하셨다면,
--  이 파일만 추가로 Supabase SQL Editor에 붙여넣고 Run 하세요)
--
-- 내용: growth.js가 localStorage에 쌓는 「나의 서재」 데이터
-- (atlas_growth_v1 — 체류시간, 읽은 카드, 스크랩, 배지 등)를
-- 로그인한 사용자에 한해 서버에도 저장할 수 있도록 테이블을 만든다.
-- 비로그인 방문자는 지금처럼 localStorage만 쓰고 영향 없다.
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.user_growth (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_growth enable row level security;

drop policy if exists "growth_select_own" on public.user_growth;
create policy "growth_select_own" on public.user_growth
  for select using (auth.uid() = user_id);

drop policy if exists "growth_insert_own" on public.user_growth;
create policy "growth_insert_own" on public.user_growth
  for insert with check (auth.uid() = user_id);

drop policy if exists "growth_update_own" on public.user_growth;
create policy "growth_update_own" on public.user_growth
  for update using (auth.uid() = user_id);

grant select, insert, update on public.user_growth to authenticated;

-- ═══════════════════════════════════════════════════════════════
-- 완료. Table Editor에서 user_growth 테이블이 보이면 성공입니다.
-- ═══════════════════════════════════════════════════════════════
