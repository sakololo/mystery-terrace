'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OnboardingModal.module.css';

const STORAGE_KEY = 'mystery-terrace-onboarded';

interface MannerItem {
    icon: string;
    number: string;
    title: string;
    body: string;
}

const MANNERS: MannerItem[] = [
    {
        icon: 'coffee',
        number: '01',
        title: '推理には、砂糖とミルクを。',
        body: '論理（ブラック）だけでは苦すぎます。誰かの説を否定するのではなく、「それも面白いね」という優しさ（ミルク）と、ユーモア（砂糖）を足して味わいましょう。',
    },
    {
        icon: 'spa',
        number: '02',
        title: 'テーブルの上は、いつも清潔に。',
        body: '食事の邪魔になるような、怖いもの（ホラー）や、気分の悪くなるもの（グロテスク・誹謗中傷）の持ち込みはお断りします。',
    },
    {
        icon: 'hourglass_top',
        number: '03',
        title: 'カップの底が見えなくてもいい。',
        body: 'すぐに「正解」が出なくても大丈夫。「わからない」という余韻を楽しむのも、このテラスの醍醐味です。結論を急かさないようにしましょう。',
    },
    {
        icon: 'notifications_active',
        number: '04',
        title: '何かこぼれたら、店員まで。',
        body: 'もし、マナーの悪い人や不快なものを見つけたら、自分で対処せずに「店員を呼ぶ（通報）」ボタンでお知らせください。静かに片付けに伺います。',
    },
];

export default function OnboardingModal() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const seen = localStorage.getItem(STORAGE_KEY);
        if (!seen) {
            const timer = setTimeout(() => setIsVisible(true), 600);
            return () => clearTimeout(timer);
        }
    }, []);

    function handleAccept() {
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsVisible(false);
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Full-screen cafe terrace background */}
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Real cafe terrace photo */}
                        <img
                            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=900&fit=crop&q=80"
                            alt=""
                            className={styles.bgPhoto}
                        />
                        {/* Dark vignette overlay */}
                        <div className={styles.bgOverlay} />
                    </motion.div>

                    {/* Scrollable card container */}
                    <motion.div
                        className={styles.cardScroller}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >

                        {/* Invitation Card */}
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.97 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 240, delay: 0.3 }}
                        >
                            {/* Header */}
                            <div className={styles.header}>
                                <span className={styles.logoIcon}>
                                    <span className="material-symbols-outlined">local_cafe</span>
                                </span>
                                <h2 className={styles.brand}>MYSTERY TERRACE</h2>
                                <div className={styles.divider}>
                                    <span className={styles.dividerDot} />
                                    <span className={styles.dividerLine} />
                                    <span className={styles.dividerDot} />
                                </div>
                                <h3 className={styles.title}>テラスのテーブルマナー</h3>
                                <p className={styles.subtitle}>
                                    ここは、日常の謎を楽しむためのテラスです。<br />
                                    心地よい時間を過ごすために、4つのマナーをお願いします。
                                </p>
                            </div>

                            {/* Manner Items */}
                            <div className={styles.mannerList}>
                                {MANNERS.map((m, i) => (
                                    <motion.div
                                        key={m.number}
                                        className={styles.mannerItem}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1, duration: 0.35 }}
                                    >
                                        <div className={styles.mannerIcon}>
                                            <span className="material-symbols-outlined">{m.icon}</span>
                                        </div>
                                        <div className={styles.mannerContent}>
                                            <span className={styles.mannerNumber}>{m.number}</span>
                                            <h4 className={styles.mannerTitle}>{m.title}</h4>
                                            <p className={styles.mannerBody}>{m.body}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className={styles.footer}>
                                <p className={styles.footerNote}>
                                    これらが揃って初めて、この特別な空間が守られます。
                                </p>
                                <motion.button
                                    className={styles.acceptButton}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleAccept}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                        chair
                                    </span>
                                    <span>同意して、席につく</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
