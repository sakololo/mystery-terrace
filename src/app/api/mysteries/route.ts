/**
 * GET /api/mysteries — ミステリー一覧取得
 * POST /api/mysteries — 新規ミステリー作成
 */

import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: Request) {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab') ?? 'new';
    const limit = parseInt(searchParams.get('limit') ?? '20', 10);

    let query = supabase
        .from('mysteries')
        .select('*')
        .eq('is_active', true)
        .limit(limit);

    if (tab === 'new') {
        query = query.order('created_at', { ascending: false });
    } else {
        // Archive: 人気順
        query = query.order('coffee_count', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const supabase = getSupabase();
        const body = await request.json();
        const { title, story_content, difficulty, time_limit_minutes, emoji, author_id } = body;

        if (!title || !story_content || !author_id) {
            return NextResponse.json(
                { error: 'title, story_content, author_id は必須です' },
                { status: 400 }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data, error } = await supabase
            .from('mysteries')
            .insert({
                title,
                story_content,
                difficulty: difficulty ?? '中級',
                time_limit_minutes: time_limit_minutes ?? 15,
                emoji: emoji ?? 'eco',
                image_url: null,
                author_id,
                is_active: true,
                subtitle: null,
            } as any)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
