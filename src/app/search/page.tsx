'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const TREND_TAGS = [
    { label: '雨の日', color: 'teal' },
    { label: '放課後', color: 'orange' },
    { label: '猫の謎', color: 'stone' },
    { label: 'カフェ', color: 'rose' },
    { label: '図書室', color: 'blue' },
];



const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    teal: { bg: 'rgba(204, 251, 241, 0.5)', text: '#0f766e', border: 'rgba(94, 234, 212, 0.3)' },
    orange: { bg: 'rgba(255, 237, 213, 0.5)', text: '#c2410c', border: 'rgba(253, 186, 116, 0.3)' },
    stone: { bg: 'rgba(231, 229, 228, 0.5)', text: '#44403c', border: 'rgba(168, 162, 158, 0.3)' },
    rose: { bg: 'rgba(255, 228, 230, 0.5)', text: '#be123c', border: 'rgba(253, 164, 175, 0.3)' },
    blue: { bg: 'rgba(219, 234, 254, 0.5)', text: '#1d4ed8', border: 'rgba(147, 197, 253, 0.3)' },
};

export default function SearchPage() {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            router.push(`/search/tag/${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>探す</h1>
                <div className={styles.headerActions}>
                    <Link href="/notifications" className={styles.iconButton}>
                        <span className="material-icons-round" style={{ fontSize: '22px' }}>notifications_none</span>
                    </Link>
                    <Link href="/profile" className={styles.avatar}>
                        <span className="material-icons-round" style={{ fontSize: '22px', color: 'var(--color-primary)' }}>person</span>
                    </Link>
                </div>
            </header>

            {/* Search Bar */}
            <section className={styles.searchSection}>
                <div className={styles.searchBar}>
                    <span className="material-icons-round" style={{ color: 'var(--color-primary)', fontSize: '20px' }}>search</span>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="謎、タグ、気分で検索..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </section>

            {/* Trend Tags */}
            <section className={styles.tagSection}>
                <h2 className={styles.sectionLabel}>トレンドタグ</h2>
                <div className={styles.tagCloud}>
                    {TREND_TAGS.map((tag) => {
                        const c = TAG_COLORS[tag.color];
                        return (
                            <Link
                                key={tag.label}
                                href={`/search/tag/${encodeURIComponent(tag.label)}`}
                                className={styles.tag}
                                style={{ background: c.bg, color: c.text, borderColor: c.border }}
                            >
                                <span className={styles.tagHash}>#</span>
                                {tag.label}
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
