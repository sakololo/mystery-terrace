'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './page.module.css';

/* ===== Mock User Data ===== */

interface UserProfile {
    name: string;
    avatar: string;
    rank: string;
    regulars: number;
    bio: string;
    naruhodoTotal: number;
    senseTotal: number;
    awards: Award[];
}

interface Award {
    id: string;
    label: string;
    icon: string;
    color: string;
    description: string;
}

interface CaseItem {
    title: string;
    image: string;
    views: string;
    likes: number;
    difficulty?: string;
    status?: string;
    aspect: string;
}

interface SolvedCaseItem {
    caseId: string;
    title: string;
    image: string;
    likes: number;
    award: 'ベスト推理' | 'センス賞';
    aspect: string;
}

const USERS: Record<string, UserProfile> = {
    kaito: {
        name: 'Kaito',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-IzaDkmmdjWk8seIsZWLi2CsmanZ38TUdWr7_uTYP4dolUKXqOdD1AiJwhP1qCq5CszBTPWRnYCw6IXhUh-t0LoSo4QzaDqnK33PpTPnAnJ_IphfFAA_lOy5HUEfs1XXV_ZE_PHUvgksfV84BYFyWR5q7CWxZPiGnneHAdO105r9eAXmph4s5V4O1xQLiSBKydvn9_4m5F_OnukBTNymQcVzrbOHb3cb_vdm-0tfOyhN_t6_caMpvM3H1shLD63lqLsYOViHeDk',
        rank: 'Gold',
        regulars: 128,
        bio: '不可解な密室と心理トリックを専門とする。真実は常に、影の中に潜んでいる。',
        naruhodoTotal: 342,
        senseTotal: 187,
        awards: [
            { id: 'naruhodo-gold', label: 'なるほどの達人', icon: 'lightbulb', color: '#d4af37', description: '「なるほど！」を累計100以上獲得' },
            { id: 'sense-silver', label: 'センスの持ち主', icon: 'auto_awesome', color: '#6366f1', description: '「センスあり！」を累計50以上獲得' },
            { id: 'solver', label: '名探偵', icon: 'workspace_premium', color: '#e74c3c', description: '10件以上の謎を解決' },
        ],
    },
    mina: {
        name: 'Mina',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
        rank: 'Regular',
        regulars: 42,
        bio: '古書と暗号が好き。静かな場所で推理するのが至福の時間。',
        naruhodoTotal: 89,
        senseTotal: 56,
        awards: [
            { id: 'naruhodo-bronze', label: 'なるほどの卓人', icon: 'lightbulb', color: '#cd7f32', description: '「なるほど！」を累計10以上獲得' },
            { id: 'sense-bronze', label: 'センスの片鱗', icon: 'auto_awesome', color: '#cd7f32', description: '「センスあり！」を累計10以上獲得' },
        ],
    },
};

const DEFAULT_USER: UserProfile = {
    name: 'Unknown',
    avatar: '',
    rank: 'Regular',
    regulars: 0,
    bio: '',
    naruhodoTotal: 0,
    senseTotal: 0,
    awards: [],
};

const CASES: CaseItem[] = [
    {
        title: '黄昏の図書館殺人事件',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdISu0wYmUPqBlf-q_zs1bh_Cz6EvuRfb3Hf053ezVVj573xrgr2r65p-duUh3bOSF_TO_c0qT2RRgdtXXfj54omkgc7n4ROSiZLCjpBIpqarUIk2pVu6SnrapHI8jmJvuN5-97RZk2F386k1OL-htUI_kqOR6TWIn7IpgPF40WEaDp_cq8DlvTHaqOTWeUnMjZkdY4IRp3aoWkyxz3h4mGGBSh2tFikbESgGDcEWJfqnbDrTX5J0nrNKIA3kqj0h5fH_cliIX2Ag',
        views: '2.4k', likes: 412, difficulty: '難易度: 極', aspect: '3/4',
    },
    {
        title: 'デジタル・ゴーストの謎',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpMb3iOApt3Hu5bPkpHknhcqKyxCvzdIBgrvd_EuZp6YH6DrbgnUXxeUTO6nqUbMDQcwHSqVH_PMLkI37qvH1ZmqNY6lfGdC6cWE48oVmX32uLYoqLPN4GyCkrE2T7B5efx0RjTklteNo9ObwiakO04qX2O8HGMaNQ_5cpHeAOgn6zYtu7B8eVYggsKxqRWDGiqX7aTAZjjDASs69j_9Wr47SVNXfvJ-sbLK68QdtViwBR94qJrA5WXdHq1D1mbdLACRiIzot7CWY',
        views: '1.8k', likes: 285, aspect: '4/5',
    },
    {
        title: '止まった時計のレクイエム',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQOxUZzsIKta0v7pnknc8nazpGqI3jG_GZUEJtY7drsKvcqat3UCK0aLN--GWqpMYQNM1G_iamiVzEXk2BzWVSGAOu7gAPBsNZmwHiKbol0S6Ga76505PQC424mOxixm1V8Fc16owJ2LR4SBJK4rqOWJuLIUGo5sZwrRb42MYqVcVqGMvCC8rAJ3EEhYz6Yp1kHqOmQj2k6H7HGwoWy2qQ_M3BhrozufFaS9r5iWJ6lfqENGi0Ro39JEtYBYAYTC9R1lavIrl2aVE',
        views: '3.1k', likes: 562, aspect: '4/3',
    },
    {
        title: '霧の森の消失点',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDslPpZiMrcyT4z68iLMYIduZYwcUDYobMpVC2dgcPomjMwp_ghK6rIJCYp2o7xSN7E7RC5n3pdqHCqdUvgsYxwwGbCaNOWgzV0pmdSxQvgJglzIgfhDaI_RoNXywpA_AI1avMXH02ZGATgwYxTcL6pe4W-OquRn4SHrR-s-csejjXc--CUZlQK8Fv563zA_js1BfD4e6ccZF-AOSt7WLTwoZJ9GJw170SGbPXq3-b-oJdpWRsoCnkmo5HkHb9T5md3GEOfelwhNGM',
        views: '950', likes: 124, status: '完結済', aspect: '1/1',
    },
];

const SOLVED_CASES: SolvedCaseItem[] = [
    {
        caseId: '201',
        title: '古書堂の隠し扉',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeguDq2aPTeTUdnkTHWUPFcHDxRjCdwwwtZ2ZLLOBFRmb5Phjn_lVXJ-kZ7vDA96SbjaRlMmXs4-GwItK0Hb38D1UWv2ANZ2-3IDSI_ckVKVu2nh8siZg2DbRM966S-5FdedOXLGlE-0yYB6YVapqhXcnEJIicgz11WiefYjRqMic4uNYz6dOs3yFpwXjVCpSS5HnCcfgUjwlaYD44lRHttVLDh0kww03MoeqdGU0_dh4w-5vcIEKDpb2PC3NKGWCH6ugNfPWPgv0',
        likes: 89,
        award: 'センス賞',
        aspect: '3/4',
    },
    {
        caseId: '108',
        title: '消えた常連客のコーヒーカップ',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmq3rp9cVZmmgfyGrjoszT-561DJgltn-KfE-fWvtO1HfiVxiRm1iiMdmBEZs9hxssck0eOTuD8hfr94yWYyVOIdaWGXZ2qyYBmoewb8ig39q0fBX4lhGM_P1QmyV3LF0UVVVdF-uVL_kVjJ0PcZOJRMqnpabW2k3bsuqk5PrFFh3UoL_2CaUFEjlD40ecF4mk-fi5XuccNRii-v0tswjc4qRuwmG5dGrXLV5eXzoaUgVnJ2TsraYXfwsyhHbASE1AI1-yFuazd_Q',
        likes: 156,
        award: 'ベスト推理',
        aspect: '1/1',
    },
    {
        caseId: '042',
        title: '深夜のテラスに残された手紙',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFLslrDyD0IrgM7Af6rUkqnQGu-xRakhRZSzatqGLs5OkNcglDPOTIpy3XSgkURWiUj9n0DaXXPDFFb5hccNNPf4MDz2UDOMOoptoNMdse4nOJ-PmocLCZhuugnRsjbvZRLOD3nkZFIj4EnAiTOOrZyz_9HymbOCAEQZ-_5KGPIJjxIIUv4p1Fviy5jfwjpjkBm_VDiCgPkcQODOmAR9jsphr-pKcLTMOu7cJsw0C_vSC5KtzAwvZ6DqDM1IzRxEcWPqJKDVwEm9c',
        likes: 67,
        award: 'センス賞',
        aspect: '4/5',
    },
    {
        caseId: '205',
        title: '時計台の密室殺人事件',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJtdtmTHdPZ154jVhai6Bl1Otan2vazBdThNWfRC-6f-1XnW2rO9vx_SnMTK5IesQ94DngZahKf-rFppiCKWLE1Dh4uAeGkhv-zaAr0s173-jqnqwmJqatlwJqYpT708l5w_78toXzzgNO5IWUF9HicJsZHU22beq-N5Oe79WVLmEUBQjAAc_jKBtXxUwNMrEn8Va5N9MXTVq95ugkBvKC1ZmbSoN6vpsHiVGOmjDvCpHtwQMcycBfDamyVLBfxNs5AIcRfEnMgw',
        likes: 234,
        award: 'ベスト推理',
        aspect: '3/4',
    },
];

const TABS = [
    { id: 'cases', label: '創作', icon: 'edit', count: '12件' },
    { id: 'deductions', label: '名推理', icon: 'emoji_events', count: '28件' },
];

export default function UserProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;
    const user = USERS[userId] || DEFAULT_USER;
    const [activeTab, setActiveTab] = useState('cases');

    return (
        <div className={styles.page}>
            {/* Header Bar */}
            <header className={styles.header}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => router.back()}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="material-icons-round">arrow_back_ios</span>
                </motion.button>
                <h1 className={styles.headerTitle}>捜査官の記録</h1>
                <button className={styles.moreButton}>
                    <span className="material-icons-round">more_horiz</span>
                </button>
            </header>

            {/* Profile Section */}
            <section className={styles.profileSection}>
                <div className={styles.avatarRing}>
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className={styles.avatarImage}
                    />
                    <div className={styles.rankPill}>
                        <span className="material-icons-round" style={{ fontSize: '10px' }}>workspace_premium</span>
                        {user.rank} Member
                    </div>
                </div>

                <h2 className={styles.userName}>{user.name}</h2>

                {/* Regulars count — not clickable */}
                <div className={styles.regularsCount}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>coffee</span>
                    <span>常連さん: {user.regulars}</span>
                </div>

                <p className={styles.bio}>{user.bio}</p>

                {/* Reaction Stats */}
                <div className={styles.reactionStats}>
                    <div className={styles.reactionStat}>
                        <span className="material-icons-round" style={{ fontSize: '18px', color: '#f59e0b' }}>lightbulb</span>
                        <div className={styles.reactionStatInfo}>
                            <span className={styles.reactionStatValue}>{user.naruhodoTotal}</span>
                            <span className={styles.reactionStatLabel}>なるほど</span>
                        </div>
                    </div>
                    <div className={styles.reactionStatDivider} />
                    <div className={styles.reactionStat}>
                        <span className="material-icons-round" style={{ fontSize: '18px', color: '#8b5cf6' }}>auto_awesome</span>
                        <div className={styles.reactionStatInfo}>
                            <span className={styles.reactionStatValue}>{user.senseTotal}</span>
                            <span className={styles.reactionStatLabel}>センス</span>
                        </div>
                    </div>
                </div>

                {/* Award Badges */}
                {user.awards.length > 0 && (
                    <div className={styles.awardBadges}>
                        {user.awards.map((award) => (
                            <div key={award.id} className={styles.awardBadge} title={award.description}>
                                <span className="material-icons-round" style={{ fontSize: '14px', color: award.color }}>{award.icon}</span>
                                <span className={styles.awardBadgeLabel}>{award.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <motion.button
                    className={styles.markButton}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>bookmark_border</span>
                    この探偵をマーク
                </motion.button>
            </section>

            {/* Tab Navigation */}
            <nav className={styles.tabNav}>
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <div className={styles.tabInner}>
                            <span className="material-icons-round" style={{ fontSize: '16px' }}>{tab.icon}</span>
                            <span className={styles.tabLabel}>{tab.label}</span>
                        </div>
                        <span className={styles.tabCount}>{tab.count}</span>
                    </button>
                ))}
            </nav>

            {/* Content */}
            <main className={styles.content}>
                {activeTab === 'cases' ? (
                    <div className={styles.masonry}>
                        {CASES.map((c) => (
                            <motion.div
                                key={c.title}
                                className={styles.caseCard}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className={styles.caseImageWrap}>
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        className={styles.caseImage}
                                        style={{ aspectRatio: c.aspect }}
                                    />
                                    {c.difficulty && (
                                        <span className={styles.caseBadge}>{c.difficulty}</span>
                                    )}
                                    {c.status && (
                                        <span className={styles.caseBadge}>{c.status}</span>
                                    )}
                                </div>
                                <div className={styles.caseBody}>
                                    <h3 className={styles.caseTitle}>{c.title}</h3>
                                    <div className={styles.caseMeta}>
                                        <span>{c.views} 閲覧</span>
                                        <span className={styles.caseLikes}>
                                            <span className="material-icons-round" style={{ fontSize: '12px', color: '#d4af37' }}>lightbulb</span>
                                            {c.likes}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.masonry}>
                        {SOLVED_CASES.map((sc) => (
                            <Link
                                key={sc.caseId}
                                href={`/case/${sc.caseId}?highlight=${userId}`}
                                className={styles.trophyLink}
                            >
                                <motion.div
                                    className={styles.trophyCard}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className={styles.caseImageWrap}>
                                        <img
                                            src={sc.image}
                                            alt={sc.title}
                                            className={styles.caseImage}
                                            style={{ aspectRatio: sc.aspect }}
                                        />
                                        {/* Gold overlay shimmer */}
                                        <div className={styles.trophyOverlay} />
                                        {/* Crown icon */}
                                        <span className={styles.trophyCrown}>
                                            <span className="material-icons-round" style={{ fontSize: '20px' }}>emoji_events</span>
                                        </span>
                                    </div>
                                    <div className={styles.trophyBody}>
                                        <h3 className={styles.caseTitle}>{sc.title}</h3>
                                        <div className={styles.trophyAwardBanner}>
                                            <span className="material-icons-round" style={{ fontSize: '11px' }}>
                                                {sc.award === 'ベスト推理' ? 'workspace_premium' : 'auto_awesome'}
                                            </span>
                                            <span>{sc.award}</span>
                                        </div>
                                        <div className={styles.caseMeta}>
                                            <span className={styles.caseLikes}>
                                                <span className="material-icons-round" style={{ fontSize: '12px', color: '#d4af37' }}>lightbulb</span>
                                                {sc.likes}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
