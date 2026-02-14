'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ShareModal.module.css';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    caseTitle: string;
    caseNumber: number;
}

interface InvitationDesign {
    id: string;
    label: string;
    style: 'premium' | 'casual' | 'photo';
}

const DESIGNS: InvitationDesign[] = [
    { id: 'a', label: 'プレミアム', style: 'premium' },
    { id: 'b', label: 'カジュアル', style: 'casual' },
    { id: 'c', label: 'フォト', style: 'photo' },
];

export default function ShareModal({ isOpen, onClose, caseTitle, caseNumber }: ShareModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    async function handleShare() {
        const text = `MYSTERY TERRACE\nCASE NO. ${caseNumber}: ${caseTitle}\n\n一緒に謎を解きませんか？`;

        if (navigator.share) {
            try {
                await navigator.share({ title: 'MYSTERY TERRACE', text });
            } catch {
                /* user cancelled */
            }
        } else {
            await navigator.clipboard.writeText(text);
            alert('クリップボードにコピーしました！');
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay — Mocha glass */}
                    <motion.div
                        className={styles.overlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        className={styles.sheet}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    >
                        {/* Handle */}
                        <div className={styles.handleWrap}>
                            <div className={styles.handle} />
                        </div>

                        {/* Header */}
                        <h2 className={styles.sheetTitle}>招待状のデザインを選択</h2>
                        <p className={styles.sheetSubtitle}>お好みの雰囲気を選んでシェアしましょう</p>

                        {/* CSS Snap Carousel */}
                        <div className={styles.carousel}>
                            {DESIGNS.map((design, i) => (
                                <div key={design.id} className={styles.cardSnap}>
                                    <div className={`${styles.card} ${styles[`card_${design.style}`]}`}>
                                        {/* Premium */}
                                        {design.style === 'premium' && (
                                            <>
                                                <div className={styles.premiumGlow} />
                                                <div className={styles.premiumDivider}>
                                                    <span className="material-icons-round" style={{ fontSize: '28px', color: 'var(--color-gold)' }}>auto_awesome</span>
                                                </div>
                                                <div className={styles.premiumBody}>
                                                    <h3 className={styles.premiumTitle}>Mystery<br />Terrace</h3>
                                                    <p className={styles.premiumLabel}>Premium Invitation</p>
                                                </div>
                                                <div className={styles.premiumFooter}>
                                                    <div className={styles.premiumLine} />
                                                    <p className={styles.premiumInvite}>You are cordially invited to our terrace</p>
                                                </div>
                                            </>
                                        )}

                                        {/* Casual */}
                                        {design.style === 'casual' && (
                                            <>
                                                <div className={styles.casualDecoTop}>
                                                    <span className="material-icons-round" style={{ fontSize: '20px', transform: 'rotate(12deg)', opacity: 0.3 }}>coffee</span>
                                                </div>
                                                <div className={styles.casualDecoBottom}>
                                                    <span className="material-icons-round" style={{ fontSize: '24px', transform: 'rotate(-12deg)', opacity: 0.3 }}>eco</span>
                                                </div>
                                                <div className={styles.casualBody}>
                                                    <h3 className={styles.casualTitle}>Let&apos;s Talk.</h3>
                                                    <p className={styles.casualText}>ミステリーテラスで<br />ゆっくりお話ししませんか？</p>
                                                </div>
                                                <div className={styles.casualFooterCard}>
                                                    <p className={styles.casualFooterText}>Craft & Casual Style</p>
                                                </div>
                                            </>
                                        )}

                                        {/* Photo */}
                                        {design.style === 'photo' && (
                                            <>
                                                <img
                                                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=800&fit=crop"
                                                    alt="Cafe table with coffee"
                                                    className={styles.photoImage}
                                                />
                                                <div className={styles.photoOverlay}>
                                                    <h3 className={styles.photoTitle}>Cafe Moments</h3>
                                                    <p className={styles.photoSubtitle}>Sharing stories over coffee</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Card Label */}
                                    <div className={styles.cardLabel}>
                                        <span className={styles.cardLabelText}>{design.label}</span>
                                    </div>
                                </div>
                            ))}
                            {/* Spacer for end scrolling */}
                            <div className={styles.carouselSpacer} />
                        </div>

                        {/* Share Button */}
                        <div className={styles.shareButtonWrap}>
                            <motion.button
                                className={styles.shareButton}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                onClick={handleShare}
                            >
                                <span className="material-icons-round" style={{ fontSize: '20px' }}>ios_share</span>
                                <span>シェアする</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export { ShareModal };
