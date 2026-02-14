/**
 * Supabase クライアント — サーバー用 (Server Component / Server Action)
 *
 * @supabase/ssr を使用して、Cookie ベースの認証を行います。
 * サーバーサイドで認証済みユーザー情報を取得する場合に使用します。
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function getSupabaseServer() {
    const cookieStore = await cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // Server Component からの set は無視される（Middleware で処理するため安全）
                    }
                },
            },
        }
    );
}
