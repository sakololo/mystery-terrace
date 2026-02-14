'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './MysteryCard.module.css';

export interface Mystery {
    id: string;
    tag: string;
    tagType: 'new' | 'editors';
    title: string;
    excerpt: string;
    time: string;
    difficulty: string;
    emoji: string;
    deductionCount?: number;
    imageUrl?: string;
    userId?: string;
    authorName?: string;
    authorAvatar?: string;
}

interface MysteryCardProps {
    mystery: Mystery;
    index?: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

const SKETCH_ICONS_A = ['cooking', 'grain', 'local_florist'];
const SKETCH_ICONS_B = ['bakery_dining', 'local_florist', 'grain'];

export default function MysteryCard({ mystery, index = 0 }: MysteryCardProps) {
    const router = useRouter();
    const hasImage = !!mystery.imageUrl;
    const rotation = index % 2 === 0 ? 'rotate(1deg)' : 'rotate(-1deg)';
    const caseTag = `#CASE_${mystery.id.padStart(4, '0')}`;
    const sketchIcons = index % 2 === 0 ? SKETCH_ICONS_A : SKETCH_ICONS_B;

    return (
        <motion.div
            className={`${styles.card} ${!hasImage ? styles.cardTextOnly : ''}`}
            variants={cardVariants}
        >
            <Link href={`/case/${mystery.id}`} className={styles.link}>
                {/* Sketch overlay decorations */}
                <span className={`${styles.sketchIcon} ${styles.sketchTopRight}`}>
                    <span className="material-symbols-outlined">{sketchIcons[0]}</span>
                </span>
                <span className={`${styles.sketchIcon} ${styles.sketchBottomLeft}`}>
                    <span className="material-symbols-outlined">{sketchIcons[1]}</span>
                </span>

                {/* ① Header: Tag + Time */}
                <div className={styles.headerRow}>
                    <span
                        className={`${styles.statusBadge} ${mystery.tagType === 'new' ? styles.statusNew : styles.statusCertified}`}
                    >
                        {mystery.tagType === 'new' ? (
                            <>
                                <span className={styles.statusDot} />
                                調査進行中
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>workspace_premium</span>
                                認定済みの謎
                            </>
                        )}
                    </span>
                    <span className={styles.statusDivider} />
                    <span className={styles.timeAgo}>{mystery.time}</span>
                </div>

                {/* Author Row */}
                {mystery.authorName && (
                    <div className={styles.authorRow}>
                        <div
                            className={styles.authorLink}
                            role="link"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.push(`/user/${mystery.userId || 'unknown'}`);
                            }}
                        >
                            {mystery.authorAvatar ? (
                                <img src={mystery.authorAvatar} alt={mystery.authorName} className={styles.authorAvatar} />
                            ) : (
                                <span className={styles.authorAvatarPlaceholder}>
                                    <span className="material-icons-round" style={{ fontSize: '14px' }}>person</span>
                                </span>
                            )}
                            <span className={styles.authorName}>{mystery.authorName}</span>
                        </div>
                    </div>
                )}

                {/* ② Title (主役) — with accent line for text-only */}
                <div className={`${styles.titleWrap} ${!hasImage ? styles.titleWrapAccented : ''}`}>
                    {!hasImage && <div className={styles.accentLine} />}
                    <h3 className={styles.title}>{mystery.title}</h3>
                </div>

                {/* ③ Excerpt */}
                <p className={styles.excerpt}>{mystery.excerpt}</p>

                {/* ④-A Evidence Photo — optional, Polaroid style */}
                {hasImage && (
                    <div className={styles.polaroidFrame} style={{ transform: rotation }}>
                        <img
                            src={mystery.imageUrl}
                            alt={mystery.title}
                            className={styles.polaroidImage}
                        />
                        <div className={styles.polaroidCaption}>{caseTag}</div>
                        <span className={styles.polaroidSketchBR}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>coffee</span>
                        </span>
                    </div>
                )}

                {/* ④-B Category Tag Pill — shown when no image */}
                {!hasImage && (
                    <div className={styles.tagPillRow}>
                        <span className={styles.tagPill}>
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>sell</span>
                            {mystery.tag}
                        </span>
                        <span className={styles.caseId}>{caseTag}</span>
                    </div>
                )}

                {/* Reaction Bar */}
                <div className={styles.reactionBar}>
                    <div className={styles.reactions}>
                        <div className={styles.deductionCountChip}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chat</span>
                            <span className={styles.reactionLabel}>推理 {mystery.deductionCount ?? 0}件</span>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <motion.button
                            className={styles.actionButton}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.preventDefault()}
                            aria-label="ブックマーク"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bookmark_border</span>
                        </motion.button>
                        <motion.button
                            className={styles.actionButton}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => e.preventDefault()}
                            aria-label="シェア"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>share</span>
                        </motion.button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
