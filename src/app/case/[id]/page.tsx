'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShareModal } from '@/components/ShareModal';
import styles from './page.module.css';

/* ===== Mock Data ===== */
const MOCK_CASE = {
    id: '1',
    caseNumber: 128,
    title: '302号室の苦い後味',
    tags: ['NEW CASE'],
    imageUrl: undefined as string | undefined,
    story: `カフェテラスの常連、佐藤さんが3日前から姿を消した。

彼が最後に訪れたのは火曜日の午後2時。いつものマキアートを注文し、窓際の席に座った。

「少し急いでいるんだ」そう言って、彼はいつもより早くカップを置いた。

テーブルには半分飲まれたマキアートと、暗号のような数字が書かれたレシートが残されていた。

レシートの数字：**7-14-21-28**

この数字の意味を、あなたは解き明かせるだろうか？`,
};

interface Theory {
    id: string;
    userId: string;
    author: string;
    authorRole: string;
    avatar: string;
    title: string;
    content: string;
    isCertified: boolean;
    timeAgo: string;
    reactions: { naruhodo: number; senseAri: number };
}

const BARISTA_THEORIES: Theory[] = [
    {
        id: 't1',
        userId: 'cafemaster',
        author: 'カフェマスター',
        authorRole: '古参',
        avatar: '',
        title: '犯人は猫説',
        content: '毎週火曜に現れる野良猫が、レシートをくわえて持ち去ったのを目撃したという情報があります。数字は猫カフェの座席番号では？',
        isCertified: true,
        timeAgo: '2時間前',
        reactions: { naruhodo: 89, senseAri: 45 },
    },
    {
        id: 't2',
        userId: 'nazomaster',
        author: '謎解き名人',
        authorRole: '顔なじみ',
        avatar: '',
        title: '風のいたずら説',
        content: '窓際の席は風が強く、レシートが飛ばされた可能性があります。数字7-14-21-28は単純に7の倍数、つまり曜日を表しているのでは。',
        isCertified: false,
        timeAgo: '5時間前',
        reactions: { naruhodo: 56, senseAri: 23 },
    },
];

const EVERYONE_THEORIES: Theory[] = [
    {
        id: 't3',
        userId: 'rookie',
        author: '新人探偵',
        authorRole: '初来店',
        avatar: '',
        title: 'カレンダー暗号説',
        content: '7-14-21-28は全て7日間隔。月の日曜日を示しているのではないでしょうか。佐藤さんは日曜日に何かしていた？',
        isCertified: false,
        timeAgo: '1時間前',
        reactions: { naruhodo: 12, senseAri: 5 },
    },
    {
        id: 't4',
        userId: 'mysteryfan',
        author: 'ミステリー好き',
        authorRole: 'リピーター',
        avatar: '',
        title: 'ロッカー番号説',
        content: '近くの駅のロッカー番号ではないでしょうか。4つのロッカーに何かが入っているかも。',
        isCertified: false,
        timeAgo: '30分前',
        reactions: { naruhodo: 8, senseAri: 3 },
    },
];

/* ===== Helper ===== */
function formatCount(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

/* ===== Component ===== */
export default function CaseDetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const highlightUserId = searchParams.get('highlight');
    const [activeTheoryTab, setActiveTheoryTab] = useState<'popular' | 'everyone'>('popular');
    const [isShareOpen, setIsShareOpen] = useState(false);
    const allTheories = [...BARISTA_THEORIES, ...EVERYONE_THEORIES];
    const theories = activeTheoryTab === 'popular'
        ? [...allTheories].sort((a, b) => b.reactions.naruhodo - a.reactions.naruhodo)
        : [...allTheories].sort((a, b) => {
            const aTime = a.timeAgo; const bTime = b.timeAgo;
            return 0; // keep original order for "new" tab
        });

    return (
        <div className={styles.page}>
            {/* Glass Nav Bar */}
            <div className={styles.glassNav}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => router.back()}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="material-icons-round" style={{ fontSize: '24px' }}>arrow_back</span>
                </motion.button>
                <div className={styles.navCenter}>
                    <span className={styles.caseNumber}>CASE NO. {MOCK_CASE.caseNumber}</span>
                    <span className={styles.caseSubtitle}>Mystery Terrace</span>
                </div>
                <motion.button
                    className={styles.shareButton}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsShareOpen(true)}
                    aria-label="シェア"
                >
                    <span className="material-icons-round" style={{ fontSize: '20px' }}>ios_share</span>
                </motion.button>
            </div>

            {/* Polaroid Image — only show if imageUrl exists */}
            {MOCK_CASE.imageUrl && (
                <div className={styles.polaroid}>
                    <div className={styles.polaroidInner}>
                        <img src={MOCK_CASE.imageUrl} alt={MOCK_CASE.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            )}

            {/* Tags */}
            <div className={styles.tagRow}>
                {MOCK_CASE.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* Title */}
            <h1 className={styles.caseTitle}>{MOCK_CASE.title}</h1>

            {/* Stats Row */}
            <div className={styles.timerRow}>
                <div className={styles.timerActions}>
                    <span className={styles.statItem}>
                        <span className="material-icons-round" style={{ fontSize: '16px' }}>chat</span>
                        {allTheories.length}推理
                    </span>
                    <motion.button
                        className={styles.statItem}
                        style={{ cursor: 'pointer' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className="material-icons-round" style={{ fontSize: '16px' }}>bookmark_border</span>
                    </motion.button>
                </div>
            </div>

            {/* Story Content */}
            <div className={styles.story}>
                {MOCK_CASE.story.split('\n').map((line, i) => {
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className={styles.storyParagraph}>{line}</p>;
                })}
            </div>

            {/* Resolution Tabs — underline style */}
            <div className={styles.resolutionTabs}>
                <button
                    className={`${styles.resTab} ${activeTheoryTab === 'popular' ? styles.resTabActive : ''}`}
                    onClick={() => setActiveTheoryTab('popular')}
                >
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>trending_up</span>
                    人気の推理
                </button>
                <button
                    className={`${styles.resTab} ${activeTheoryTab === 'everyone' ? styles.resTabActive : ''}`}
                    onClick={() => setActiveTheoryTab('everyone')}
                >
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>schedule</span>
                    新着順
                </button>
            </div>

            {/* Theory Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTheoryTab}
                    className={styles.theoryList}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                >
                    {theories.map((theory) => (
                        <div
                            key={theory.id}
                            className={`${styles.theoryCard} ${theory.isCertified ? styles.theoryCardCertified : ''} ${highlightUserId === theory.userId ? styles.theoryCardHighlighted : ''}`}
                            id={`theory-${theory.userId}`}
                        >
                            {/* Certified Ribbon */}
                            {theory.isCertified && (
                                <div className={styles.certifiedRibbon}>
                                    <span className="material-icons-round" style={{ fontSize: '12px' }}>military_tech</span>
                                    エキスパートの回答
                                </div>
                            )}

                            {/* Certified Medal */}
                            {theory.isCertified && (
                                <div className={styles.certifiedMedal}>
                                    <span className="material-icons-round" style={{ fontSize: '24px', color: 'var(--color-gold)' }}>military_tech</span>
                                </div>
                            )}

                            {/* User Badge */}
                            <div className={styles.theoryUser}>
                                <Link href={`/user/${theory.userId}`} className={styles.theoryAvatarLink}>
                                    <div className={styles.theoryAvatar}>
                                        <span className="material-icons-round" style={{ fontSize: '20px', color: 'var(--color-primary)' }}>person</span>
                                    </div>
                                </Link>
                                <div className={styles.theoryUserInfo}>
                                    <Link href={`/user/${theory.userId}`} className={styles.theoryAuthorLink}>
                                        <span className={styles.theoryAuthor}>{theory.author}</span>
                                    </Link>
                                    <span className={styles.theoryRole}>{theory.authorRole}</span>
                                </div>
                                <span className={styles.theoryTime}>{theory.timeAgo}</span>
                            </div>

                            {/* Theory Title */}
                            <h3 className={styles.theoryTitle}>{theory.title}</h3>

                            {/* Content */}
                            <p className={styles.theoryContent}>{theory.content}</p>

                            {/* Reactions — naruhodo & sense ONLY */}
                            <div className={styles.theoryReactions}>
                                <motion.button
                                    className={styles.reactionPill}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="material-icons-round" style={{ fontSize: '16px' }}>lightbulb</span>
                                    なるほど！ {theory.reactions.naruhodo}
                                </motion.button>
                                <motion.button
                                    className={styles.reactionPill}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span className="material-icons-round" style={{ fontSize: '16px' }}>auto_awesome</span>
                                    センスあり！ {theory.reactions.senseAri}
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Spacer for fixed input */}
            <div className={styles.inputSpacer} />

            {/* Fixed Bottom Input — glass style */}
            <div className={styles.inputArea}>
                <div className={styles.inputContainer}>
                    <textarea
                        className={styles.inputContent}
                        placeholder="あなたの推理を入力..."
                        rows={3}
                    />
                    <input
                        type="text"
                        className={styles.inputTitle}
                        placeholder="タイトル（任意）"
                    />
                    <div className={styles.inputFooter}>
                        <div className={styles.inputActions} />
                        <div className={styles.inputButtons}>
                            <motion.button
                                className={styles.draftButton}
                                whileTap={{ scale: 0.85 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                <span className="material-icons-round" style={{ fontSize: '16px' }}>save</span>
                                <span>下書き</span>
                            </motion.button>
                            <motion.button
                                className={styles.sendButton}
                                whileTap={{ scale: 0.85 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                <span className="material-icons-round" style={{ fontSize: '18px' }}>send</span>
                                <span>投稿</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                caseTitle={MOCK_CASE.title}
                caseNumber={MOCK_CASE.caseNumber}
            />
        </div>
    );
}
