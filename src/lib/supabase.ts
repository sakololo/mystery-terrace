/**
 * Supabase クライアント — ブラウザ用 (Client Component)
 *
 * @supabase/ssr を使用して、ブラウザ側での認証状態を管理します。
 * シングルトンとしてインスタンスを保持します。
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

let supabase: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getSupabase() {
  if (supabase) return supabase;

  supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabase;
}
