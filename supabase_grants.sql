-- ═══════════════════════════════════════════════════════════════
-- ATLAS 광장 — 테이블 접근 권한 부여 (2차 실행)
--
-- 왜 필요한가:
-- Supabase 프로젝트를 만들 때 "Automatically expose new tables"를
-- 껐기 때문에, 새로 만든 테이블에 기본 권한(GRANT)이 자동으로
-- 부여되지 않았다. RLS 정책은 "누가 어떤 행을 볼 수 있는가"를
-- 정하는 것이고, 그 이전에 "이 역할이 이 테이블에 접근할 수
-- 있는가" 자체를 GRANT로 열어줘야 한다. 둘 다 있어야 작동한다.
--
-- 증상: 401 Unauthorized / permission denied for table agora_posts
--
-- Supabase SQL Editor에 붙여넣고 Run 하세요.
-- ═══════════════════════════════════════════════════════════════

-- anon: 로그인하지 않은 방문자 (글 읽기만)
-- authenticated: 로그인한 사용자 (읽기 + 쓰기)

-- ── 게시글 ────────────────────────────────────────────────────
grant select on public.agora_posts to anon, authenticated;
grant insert, update, delete on public.agora_posts to authenticated;

-- ── 댓글 ──────────────────────────────────────────────────────
grant select on public.agora_comments to anon, authenticated;
grant insert, update, delete on public.agora_comments to authenticated;

-- ── 프로필(활동명) ────────────────────────────────────────────
grant select on public.agora_profiles to anon, authenticated;
grant insert, update on public.agora_profiles to authenticated;

-- ── 좋아요 ────────────────────────────────────────────────────
grant select on public.agora_likes to anon, authenticated;
grant insert, delete on public.agora_likes to authenticated;

-- ── 나의 서재(개인 열람 기록) — 비공개 데이터라 anon에는 select도
--    주지 않는다. 로그인한 본인만 접근한다. ───────────────────
grant select, insert, update on public.user_growth to authenticated;

-- ── 시퀀스 권한 (uuid 기본값이라 필수는 아니지만 안전하게) ────
grant usage on all sequences in schema public to authenticated;

-- ═══════════════════════════════════════════════════════════════
-- 완료. 실행 후 광장 페이지를 새로고침하면
-- "불러오지 못했습니다" 대신 "아직 첫 글이 없습니다"가 떠야 정상입니다.
-- ═══════════════════════════════════════════════════════════════
