'use client';

import { getSupabase } from '@/lib/supabase';

export function LoginButton() {
    const handleLogin = async () => {
        const supabase = getSupabase();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });
    };

    return (
        <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 bg-white text-gray-700 font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200 w-full max-w-xs"
        >
            <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
            />
            <span>Google でログイン</span>
        </button>
    );
}
