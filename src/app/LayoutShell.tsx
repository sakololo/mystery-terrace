'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

const PAGES_WITH_OWN_HEADER = ['/search', '/gallery', '/notifications', '/collection', '/profile', '/user', '/case', '/new'];

export function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideHeader = PAGES_WITH_OWN_HEADER.some((p) => pathname.startsWith(p));

    return (
        <>
            {!hideHeader && <Header />}
            <main style={{
                paddingBottom: 'calc(var(--bottom-nav-height) + var(--bottom-nav-margin) + var(--space-lg))',
                minHeight: '100vh',
            }}>
                {children}
            </main>
        </>
    );
}
