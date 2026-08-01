-- ═══════════════════════════════════════════════════════════════
-- ATLAS 광장 — 데이터베이스 스키마
-- Supabase SQL Editor에 이 파일 전체를 붙여넣고 실행하세요.
-- (Supabase 대시보드 → SQL Editor → New query → 붙여넣기 → Run)
-- ═══════════════════════════════════════════════════════════════

-- ── 1. 게시글 테이블 ──────────────────────────────────────────
create table if not exists public.agora_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null,              -- 소셜 로그인 이름이 아니라 직접 정한 활동명
  board text not null check (board in ('report','suggest','debate','question','cheer')),
  title text not null check (char_length(title) between 1 and 200),
  body text not null check (char_length(body) between 1 and 8000),
  -- '이 페이지 제안하기' 버튼에서 넘어올 때 대상 카드/글을 자동 채우는 용도.
  -- 카드 하단 버튼이 아직 없어도 나중에 그대로 쓸 수 있게 지금 필드를 만들어 둔다.
  target_url text,
  target_title text,
  is_pinned boolean not null default false,   -- 운영자가 상단 고정
  is_hidden boolean not null default false,   -- 삭제 대신 숨김(운영자용, 완전삭제는 하드삭제로 별도 처리)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agora_posts_board_idx on public.agora_posts (board, created_at desc);
create index if not exists agora_posts_user_idx on public.agora_posts (user_id);

-- ── 2. 댓글 테이블 ────────────────────────────────────────────
-- stance: 토론 게시판 댓글에만 의미가 있다(찬성/반대/중립). 다른 게시판
-- 댓글은 null로 둔다 — 형식이 태도를 만든다는 원칙을 토론에만 적용한다.
create table if not exists public.agora_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.agora_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null,
  stance text check (stance in ('agree','disagree','neutral')),
  body text not null check (char_length(body) between 1 and 4000),
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists agora_comments_post_idx on public.agora_comments (post_id, created_at asc);

-- ── 3. 프로필 테이블 ──────────────────────────────────────────
-- 소셜 로그인 닉네임을 그대로 안 쓰기로 한 원칙(왕두목 지적, 2026-08-01)을
-- 구조로 강제한다. auth.users에는 소셜 제공자의 원본 정보가 있지만,
-- 광장에 표시되는 닉네임은 이 테이블에서만 가져온다.
create table if not exists public.agora_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null unique check (char_length(nickname) between 2 and 20),
  created_at timestamptz not null default now()
);

-- ── 4. 좋아요/공감 (선택 — 응원 게시판 등에서 가벼운 반응용) ────
create table if not exists public.agora_likes (
  post_id uuid not null references public.agora_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security — 반드시 켠다. (Supabase 프로젝트 생성 시
-- "Automatically expose new tables"를 껐던 것과 같은 원칙:
-- 직접 통제한다.)
-- ═══════════════════════════════════════════════════════════════
alter table public.agora_posts enable row level security;
alter table public.agora_comments enable row level security;
alter table public.agora_profiles enable row level security;
alter table public.agora_likes enable row level security;

-- 게시글: 숨김 처리 안 된 글은 누구나(비로그인 포함) 읽을 수 있다.
create policy "posts_select_public" on public.agora_posts
  for select using (is_hidden = false);

-- 게시글: 로그인한 사용자만 자기 이름으로 작성 가능.
create policy "posts_insert_own" on public.agora_posts
  for insert with check (auth.uid() = user_id);

-- 게시글: 작성자 본인만 수정(is_hidden 제외 필드) 가능.
create policy "posts_update_own" on public.agora_posts
  for update using (auth.uid() = user_id);

-- 게시글: 작성자 본인만 삭제 가능.
create policy "posts_delete_own" on public.agora_posts
  for delete using (auth.uid() = user_id);

-- 댓글: 숨김 안 된 댓글은 누구나 읽기 가능.
create policy "comments_select_public" on public.agora_comments
  for select using (is_hidden = false);

create policy "comments_insert_own" on public.agora_comments
  for insert with check (auth.uid() = user_id);

create policy "comments_delete_own" on public.agora_comments
  for delete using (auth.uid() = user_id);

-- 프로필: 닉네임 목록은 공개(글에 이름 표시해야 하니). 단, 본인 것만 쓰기.
create policy "profiles_select_public" on public.agora_profiles
  for select using (true);

create policy "profiles_insert_own" on public.agora_profiles
  for insert with check (auth.uid() = user_id);

create policy "profiles_update_own" on public.agora_profiles
  for update using (auth.uid() = user_id);

-- 좋아요: 공개 읽기, 본인만 추가/삭제.
create policy "likes_select_public" on public.agora_likes
  for select using (true);

create policy "likes_insert_own" on public.agora_likes
  for insert with check (auth.uid() = user_id);

create policy "likes_delete_own" on public.agora_likes
  for delete using (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- 완료. 이 파일을 실행한 뒤 Supabase 대시보드 좌측
-- "Table Editor"에서 4개 테이블(agora_posts, agora_comments,
-- agora_profiles, agora_likes)이 보이면 성공입니다.
-- ═══════════════════════════════════════════════════════════════
