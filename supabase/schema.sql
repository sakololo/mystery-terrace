-- =============================================
-- MYSTERY TERRACE — Supabase DB Schema v3.2
-- 実装計画 v3.2 (最終版) に準拠
-- =============================================

-- ===== リセット処理（既存テーブル削除） =====
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS view_history CASCADE;
DROP TABLE IF EXISTS follows CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS bookmarks CASCADE;
DROP TABLE IF EXISTS deduction_reactions CASCADE;
DROP TABLE IF EXISTS mystery_reactions CASCADE;
DROP TABLE IF EXISTS deductions CASCADE;
DROP TABLE IF EXISTS mysteries CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stickers CASCADE;      -- 旧スキーマ用
DROP TABLE IF EXISTS user_stickers CASCADE; -- 旧スキーマ用
DROP TABLE IF EXISTS theories CASCADE;      -- 旧スキーマ用
DROP TABLE IF EXISTS reactions CASCADE;     -- 旧スキーマ用

-- トリガー・関数削除
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ===== テーブル =====

-- 1. ユーザー
CREATE TABLE users (
  id              UUID PRIMARY KEY,                -- Supabase Auth uid と同一
  display_name    TEXT NOT NULL
                  CHECK (char_length(display_name) >= 2 AND char_length(display_name) <= 20),
  icon_id         TEXT NOT NULL DEFAULT 'coffee',
  bio             TEXT CHECK (bio IS NULL OR char_length(bio) <= 300),
  role            TEXT NOT NULL DEFAULT '初来店'
                  CHECK (role IN ('初来店', 'リピーター', '常連', '顔なじみ', '古参')),
  role_updated_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at      TIMESTAMPTZ,                     -- ソフトデリート用
  settings        JSONB DEFAULT '{}'::jsonb
                  CHECK (jsonb_typeof(settings) = 'object')
);

-- 2. ミステリー（ケース）
CREATE TABLE mysteries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id       UUID REFERENCES users(id),       -- 退会時 NULL に
  title           TEXT NOT NULL
                  CHECK (char_length(title) >= 2 AND char_length(title) <= 100),
  story_content   TEXT NOT NULL
                  CHECK (char_length(story_content) >= 20 AND char_length(story_content) <= 5000),
  difficulty      TEXT,                             -- 将来用（MVP では未使用）
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published', 'archived')),
  image_url       TEXT,                             -- 将来用（MVP では未使用）
  tags            TEXT[] NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at    TIMESTAMPTZ,
  archived_at     TIMESTAMPTZ
);

-- 3. 推理
CREATE TABLE deductions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mystery_id      UUID NOT NULL REFERENCES mysteries(id) ON DELETE CASCADE,
  author_id       UUID REFERENCES users(id),        -- 退会時 NULL に
  title           TEXT                               -- nullable（推理タイトルは任意）
                  CHECK (title IS NULL OR (char_length(title) >= 2 AND char_length(title) <= 100)),
  content         TEXT NOT NULL
                  CHECK (char_length(content) >= 20 AND char_length(content) <= 5000),
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft', 'published', 'archived')),
  is_certified    BOOLEAN NOT NULL DEFAULT false,   -- サーバーサイドのみ変更可
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published_at    TIMESTAMPTZ
);

-- 4. ミステリーリアクション
CREATE TABLE mystery_reactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mystery_id      UUID NOT NULL REFERENCES mysteries(id) ON DELETE CASCADE,
  reaction_type   TEXT NOT NULL CHECK (reaction_type IN ('naruhodo', 'sense')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, mystery_id, reaction_type)
);

-- 5. 推理リアクション
CREATE TABLE deduction_reactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  deduction_id    UUID NOT NULL REFERENCES deductions(id) ON DELETE CASCADE,
  reaction_type   TEXT NOT NULL CHECK (reaction_type IN ('naruhodo', 'sense')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, deduction_id, reaction_type)
);

-- 6. ブックマーク
CREATE TABLE bookmarks (
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mystery_id      UUID NOT NULL REFERENCES mysteries(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, mystery_id)
);

-- 7. 通知
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type            TEXT NOT NULL CHECK (type IN ('reaction', 'comment', 'system', 'follow')),
  data            JSONB NOT NULL DEFAULT '{}'::jsonb,
  read            BOOLEAN NOT NULL DEFAULT false,
  reference_id    UUID,                             -- 参照先の謎/推理/ユーザー ID
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_at         TIMESTAMPTZ
);

-- 8. フォロー
CREATE TABLE follows (
  follower_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)               -- 自己フォロー防止
);

-- 9. 閲覧履歴
CREATE TABLE view_history (
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mystery_id      UUID NOT NULL REFERENCES mysteries(id) ON DELETE CASCADE,
  viewed_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, mystery_id)
);

-- 10. 通報
CREATE TABLE reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type     TEXT NOT NULL CHECK (target_type IN ('mystery', 'deduction', 'user')),
  target_id       UUID NOT NULL,                    -- FK なし（ポリモーフィック。API 層で存在確認）
  reason          TEXT NOT NULL
                  CHECK (char_length(reason) >= 10 AND char_length(reason) <= 500),
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at     TIMESTAMPTZ
);

-- ===== インデックス =====

-- タグ検索用 GIN インデックス
CREATE INDEX idx_mysteries_tags ON mysteries USING GIN (tags);

-- 公開済みミステリーの新着順（部分インデックス）
CREATE INDEX idx_mysteries_published ON mysteries (published_at DESC)
  WHERE status = 'published';

-- 活動中ユーザーのみ display_name UNIQUE（退会済みの衝突回避）
CREATE UNIQUE INDEX idx_users_display_name_active ON users (display_name)
  WHERE deleted_at IS NULL;

-- 通知の未読取得用
CREATE INDEX idx_notifications_user_unread ON notifications (user_id, created_at DESC)
  WHERE read = false;

-- 推理のミステリー別取得
CREATE INDEX idx_deductions_mystery ON deductions (mystery_id, created_at DESC);

-- リアクションの集計用
CREATE INDEX idx_mystery_reactions_mystery ON mystery_reactions (mystery_id);
CREATE INDEX idx_deduction_reactions_deduction ON deduction_reactions (deduction_id);

-- ===== RLS (Row Level Security) =====

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mysteries ENABLE ROW LEVEL SECURITY;
ALTER TABLE deductions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mystery_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE deduction_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE view_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- ─── users ───
CREATE POLICY "users_select" ON users
  FOR SELECT USING (true);

CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update" ON users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    -- role, role_updated_at は service_role でのみ変更可
    role = (SELECT role FROM users WHERE id = auth.uid())
  );

-- ─── mysteries ───
CREATE POLICY "mysteries_select" ON mysteries
  FOR SELECT USING (
    status = 'published' OR author_id = auth.uid()
  );

CREATE POLICY "mysteries_insert" ON mysteries
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "mysteries_update" ON mysteries
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "mysteries_delete" ON mysteries
  FOR DELETE USING (auth.uid() = author_id);

-- ─── deductions ───
CREATE POLICY "deductions_select" ON deductions
  FOR SELECT USING (
    status = 'published' OR author_id = auth.uid()
  );

CREATE POLICY "deductions_insert" ON deductions
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "deductions_update" ON deductions
  FOR UPDATE USING (auth.uid() = author_id)
  WITH CHECK (
    -- is_certified は service_role でのみ変更可
    is_certified = (SELECT is_certified FROM deductions WHERE id = deductions.id)
  );

CREATE POLICY "deductions_delete" ON deductions
  FOR DELETE USING (auth.uid() = author_id);

-- ─── mystery_reactions ───
CREATE POLICY "mystery_reactions_select" ON mystery_reactions
  FOR SELECT USING (true);

CREATE POLICY "mystery_reactions_insert" ON mystery_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mystery_reactions_delete" ON mystery_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- ─── deduction_reactions ───
CREATE POLICY "deduction_reactions_select" ON deduction_reactions
  FOR SELECT USING (true);

CREATE POLICY "deduction_reactions_insert" ON deduction_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "deduction_reactions_delete" ON deduction_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- ─── bookmarks ───
CREATE POLICY "bookmarks_select" ON bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "bookmarks_insert" ON bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bookmarks_delete" ON bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- ─── notifications ───
CREATE POLICY "notifications_select" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

-- INSERT は service_role のみ（RLS ポリシーなし = anon では不可）

CREATE POLICY "notifications_update" ON notifications
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (
    -- read と read_at のみ変更可
    user_id = (SELECT user_id FROM notifications WHERE id = notifications.id)
  );

-- ─── follows ───
CREATE POLICY "follows_select" ON follows
  FOR SELECT USING (true);

CREATE POLICY "follows_insert" ON follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "follows_delete" ON follows
  FOR DELETE USING (auth.uid() = follower_id);

-- ─── view_history ───
CREATE POLICY "view_history_select" ON view_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "view_history_insert" ON view_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "view_history_update" ON view_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "view_history_delete" ON view_history
  FOR DELETE USING (auth.uid() = user_id);

-- ─── reports ───
CREATE POLICY "reports_insert" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- SELECT/UPDATE/DELETE は service_role のみ（管理者用）

-- ===== 初回ユーザー作成用 Function =====
-- Google OAuth ログイン時に users テーブルに自動挿入

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  icons TEXT[] := ARRAY['coffee', 'cake', 'bakery_dining', 'kettle', 'cookie', 'donut_large', 'local_florist', 'menu_book', 'blender', 'water_drop'];
  random_icon TEXT;
BEGIN
  random_icon := icons[1 + floor(random() * array_length(icons, 1))::int];
  INSERT INTO public.users (id, display_name, icon_id)
  VALUES (
    NEW.id,
    'ゲスト_' || substr(NEW.id::text, 1, 8),
    random_icon
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
