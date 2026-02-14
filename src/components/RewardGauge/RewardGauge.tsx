'use client';

import { motion } from 'framer-motion';
import styles from './RewardGauge.module.css';

interface RewardGaugeProps {
    current: number;
    total: number;
}

export default function RewardGauge({ current, total }: RewardGaugeProps) {
    const remaining = total - current;
    const fillPercent = Math.round((current / total) * 100);
    const segments = 4;
    const filledSegments = Math.round((current / total) * segments);

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            {/* Coffee Cup Visual Gauge */}
            <div className={styles.cupContainer}>
                <div className={styles.cupBody}>
                    <div className={styles.cupInner}>
                        <motion.div
                            className={styles.cupFill}
                            initial={{ height: 0 }}
                            animate={{ height: `${fillPercent}%` }}
                            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                        />
                        {/* Grain texture */}
                        <div className={styles.grainOverlay}>
                            <span className="material-icons-round" style={{ fontSize: '10px', opacity: 0.4 }}>grain</span>
                            <span className="material-icons-round" style={{ fontSize: '10px', opacity: 0.3, transform: 'translateY(6px)' }}>grain</span>
                        </div>
                    </div>
                    {/* Cup handle */}
                    <div className={styles.cupHandle} />
                </div>
                {/* Steam */}
                <div className={styles.steamContainer}>
                    <motion.div
                        className={styles.steam}
                        animate={{ opacity: [0.3, 0.8, 0.3], y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <motion.div
                        className={styles.steam}
                        animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                    />
                    <motion.div
                        className={styles.steam}
                        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                    />
                </div>
            </div>

            <div className={styles.info}>
                <div className={styles.labelRow}>
                    <span className={styles.label}>リワードゲージ</span>
                    <span className="material-icons-round" style={{ fontSize: '14px', color: 'var(--color-primary)' }}>auto_awesome</span>
                </div>
                <div className={styles.beans}>{current} / {total} ビーンズ</div>
                <p className={styles.desc}>
                    あと{remaining}つの謎を解いて<br />
                    <span className={styles.highlight}>限定ケースファイル</span>を獲得しましょう。
                </p>
                <div className={styles.segmentTrack}>
                    {Array.from({ length: segments }).map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.segment} ${i < filledSegments ? styles.segmentFilled : ''}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
