-- ═══════════════════════════════════════════════════════════════
-- ATLAS 광장 — 마이그레이션: 관리자 삭제 권한 추가
-- (이미 supabase_schema.sql 또는 이전 마이그레이션을 실행하셨다면,
--  이 파일만 추가로 Supabase SQL Editor에 붙여넣고 Run 하세요)
--
-- 내용: 스팸/욕설 등 신고 대응을 위해, 관리자 계정
-- (c2b23ccd-ca6a-4e52-84e5-79bad6d8e310)이 본인 것이 아닌
-- 글/댓글도 삭제할 수 있도록 기존 delete 정책을 교체합니다.
-- ═══════════════════════════════════════════════════════════════

drop policy if exists "posts_delete_own" on public.agora_posts;
create policy "posts_delete_own" on public.agora_posts
  for delete using (
    auth.uid() = user_id
    or auth.uid() = 'c2b23ccd-ca6a-4e52-84e5-79bad6d8e310'
  );

drop policy if exists "comments_delete_own" on public.agora_comments;
create policy "comments_delete_own" on public.agora_comments
  for delete using (
    auth.uid() = user_id
    or auth.uid() = 'c2b23ccd-ca6a-4e52-84e5-79bad6d8e310'
  );

-- ═══════════════════════════════════════════════════════════════
-- 완료. 이제 관리자 계정으로 로그인한 상태에서 agora.html의
-- "관리자 삭제" 버튼으로 아무 글/댓글이나 지울 수 있습니다.
-- ═══════════════════════════════════════════════════════════════
