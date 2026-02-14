'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './page.module.css';



interface FlavorChip {
    id: string;
    icon: string;
    label: string;
    activeColor: string;
}

const FLAVORS: FlavorChip[] = [
    { id: 'daily', icon: 'coffee', label: '日常の謎', activeColor: '#4b3621' },
    { id: 'cozy', icon: 'local_florist', label: 'ほっこり', activeColor: '#6b8e4e' },
    { id: 'logic', icon: 'psychology', label: '知的 / 論理', activeColor: '#5a6b7c' },
    { id: 'creepy', icon: 'visibility', label: 'ちょい怖', activeColor: '#7a5b8e' },
];

export default function NewMysteryPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

    const canSubmit = title.length > 0;

    function handleSubmit() {
        alert('ミステリーが投稿されました！（デモ）');
        router.push('/');
    }

    return (
        <div className={styles.page}>
            {/* ===== Header (旧レイアウト + 緑ボタン) ===== */}
            <div className={styles.header}>
                <motion.button
                    className={styles.cancelButton}
                    onClick={() => router.back()}
                    whileTap={{ scale: 0.9 }}
                >
                    キャンセル
                </motion.button>
                <h1 className={styles.pageTitle}>新しいミステリー</h1>
                <motion.button
                    className={`${styles.submitButton} ${canSubmit ? styles.submitButtonActive : ''}`}
                    onClick={handleSubmit}
                    whileTap={canSubmit ? { scale: 0.95 } : undefined}
                    disabled={!canSubmit}
                >
                    オーダーする
                </motion.button>
            </div>




            {/* ===== Flavor Chips (新機能) ===== */}
            <div className={styles.flavorSection}>
                <span className={styles.flavorLabel}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>tune</span>
                    タグを選ぶ
                </span>
                <div className={styles.flavorScroller}>
                    {FLAVORS.map((f) => {
                        const isActive = selectedFlavor === f.id;
                        return (
                            <motion.button
                                key={f.id}
                                className={`${styles.flavorChip} ${isActive ? styles.flavorChipActive : ''}`}
                                style={isActive ? { background: f.activeColor, borderColor: f.activeColor } : undefined}
                                onClick={() => setSelectedFlavor(isActive ? null : f.id)}
                                whileTap={{ scale: 0.93 }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{f.icon}</span>
                                <span>{f.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* ===== Title Input (旧サイズ: 1.1rem, 下線) ===== */}
            <input
                type="text"
                className={styles.titleInput}
                placeholder="ミステリーのタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={50}
            />
            <span className={styles.charCount}>{title.length}/50</span>

            {/* ===== Story Input (旧スタイル: カード型, 固定高さ) ===== */}
            <textarea
                className={styles.storyInput}
                placeholder="ストーリーを書いてください..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={8}
            />


        </div>
    );
}
