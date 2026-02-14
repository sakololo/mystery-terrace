/**
 * Supabase クライアント — サーバー用（service_role key）
 *
 * ⚠️ このファイルは Server Actions / API Routes でのみ使用すること。
 * ⚠️ service_role key は RLS をバイパスするので取り扱い注意。
 *
 * 環境変数:
 *   NEXT_PUBLIC_SUPABASE_URL   — Supabase プロジェクト URL
 *   SUPABASE_SERVICE_ROLE_KEY  — service_role key（非公開）
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

let _admin: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
    if (_admin) return _admin;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
        throw new Error(
            'MYSTERY TERRACE: サーバー用 Supabase 環境変数（NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY）が未設定です。'
        );
    }

    _admin = createClient<Database>(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
    return _admin;
}
