'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

/* ===== Data ===== */

const STATS = [
    { icon: 'check_circle', label: '解決した謎', value: '12' },
    { icon: 'edit_note', label: '投稿した謎', value: '5' },
    { icon: 'lightbulb', label: 'なるほど', value: '156' },
    { icon: 'auto_awesome', label: 'センス', value: '89' },
];

const BADGES = [
    { label: 'なるほどの卓人', icon: 'lightbulb', color: '#cd7f32', unlocked: true, description: '「なるほど！」を累計10以上獲得' },
    { label: 'センスの片鱗', icon: 'auto_awesome', color: '#cd7f32', unlocked: true, description: '「センスあり！」を累計10以上獲得' },
    { label: 'なるほどの達人', icon: 'lightbulb', color: '#d4af37', unlocked: true, description: '「なるほど！」を累計100以上獲得' },
    { label: 'センスの達人', icon: 'auto_awesome', color: '#d4af37', unlocked: false, description: '「センスあり！」を累計100以上獲得' },
];

/* --- 推理の記録（受賞 + 下書き） --- */
const MY_DEDUCTIONS = [
    {
        caseTitle: '霧の朝の落とし物',
        deduction: '犯人は霧そのもの——朝露が証拠を消したのではなく、朝露こそが唯一残された証拠だった。',
        naruhodoCount: 42,
        senseCount: 18,
        award: 'センス賞',
        status: '受賞' as const,
    },
    {
        caseTitle: '消えた常連客のコーヒーカップ',
        deduction: 'カップの底に残されたラテアートの模様。左利きの人間が描いたそれは、従業員の中でただ一人——',
        naruhodoCount: 28,
        senseCount: 5,
        award: '正解',
        status: '受賞' as const,
    },
    {
        caseTitle: '302号室の苦い後味',
        deduction: 'レシートの数字7-14-21-28は曜日を表している。すべて火曜日。つまり毎週火曜日に何かが…',
        naruhodoCount: 0,
        senseCount: 0,
        award: null,
        status: '下書き' as const,
    },
];

/* --- 自分の謎（公開中 + 下書き） --- */
const MY_MYSTERIES = [
    { title: '深夜のテラスに残された手紙', naruhodo: 42, sense: 12, status: '公開中' as const },
    { title: '名もなき散歩道の謎', naruhodo: 67, sense: 15, status: '公開中' as const },
    { title: '図書館の暗号', naruhodo: 0, sense: 0, status: '下書き' as const },
];

const SETTINGS_LINKS = [
    { icon: 'manage_accounts', label: 'アカウント設定' },
    { icon: 'notifications', label: '通知設定' },
    { icon: 'dark_mode', label: 'テーマ切替' },
    { icon: 'help_outline', label: 'ヘルプ・お問い合わせ' },
    { icon: 'logout', label: 'ログアウト', danger: true },
];

export default function ProfilePage() {
    return (
        <div className={styles.page}>
            {/* Page Header */}
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>マイページ</h1>
                <button className={styles.settingsIcon}>
                    <span className="material-icons-round" style={{ fontSize: '22px' }}>settings</span>
                </button>
            </header>

            {/* 1. Profile Header */}
            <section className={styles.profileSection}>
                <div className={styles.avatar}>
                    <span className="material-icons-round" style={{ fontSize: '48px', color: 'var(--color-primary)' }}>person</span>
                </div>
                <h2 className={styles.userName}>ユダ</h2>
                <p className={styles.handle}>@yuda_mystery</p>
                <p className={styles.tenure}>
                    <span className="material-icons-round" style={{ fontSize: '14px' }}>local_cafe</span>
                    テラス常連 3ヶ月
                </p>
                <p className={styles.bio}>いつも窓際の席で考察中。論理パズルとコーヒーが好き。</p>
                <button className={styles.editButton}>
                    <span className="material-icons-round" style={{ fontSize: '16px' }}>edit</span>
                    プロフィール編集
                </button>
            </section>

            {/* 2. Stats Cards (horizontal scroll) */}
            <section className={styles.statsSection}>
                <div className={styles.statsScroller}>
                    {STATS.map((stat) => (
                        <motion.div
                            key={stat.label}
                            className={styles.statCard}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="material-icons-round" style={{ fontSize: '24px', color: 'var(--color-primary)' }}>{stat.icon}</span>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. 推理の記録 */}
            <section className={styles.highlightSection}>
                <h3 className={styles.sectionTitle}>推理の記録</h3>
                {MY_DEDUCTIONS.map((d) => (
                    <div key={d.caseTitle} className={`${styles.highlightCard} ${d.status === '下書き' ? styles.draftCard : ''}`}>
                        <div className={styles.highlightAward}>
                            {d.status === '受賞' ? (
                                <>
                                    <span className="material-icons-round" style={{ fontSize: '14px' }}>
                                        {d.award === '正解' ? 'check_circle' : 'auto_awesome'}
                                    </span>
                                    {d.award}
                                </>
                            ) : (
                                <>
                                    <span className="material-icons-round" style={{ fontSize: '14px' }}>edit_note</span>
                                    下書き
                                </>
                            )}
                        </div>
                        <p className={styles.highlightCase}>「{d.caseTitle}」への推理</p>
                        <p className={styles.highlightText}>{d.deduction}</p>
                        {d.status === '受賞' && (
                            <div className={styles.highlightMeta}>
                                <span className="material-icons-round" style={{ fontSize: '14px' }}>lightbulb</span>
                                {d.naruhodoCount}
                                <span className="material-icons-round" style={{ fontSize: '14px', marginLeft: '8px' }}>auto_awesome</span>
                                {d.senseCount}
                            </div>
                        )}
                    </div>
                ))}
            </section>

            {/* 4. 自分の謎 */}
            <section className={styles.postsSection}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>自分の謎</h3>
                    <span className={styles.postCount}>{MY_MYSTERIES.length}件</span>
                </div>
                {MY_MYSTERIES.map((mystery) => (
                    <div key={mystery.title} className={styles.postItem}>
                        <div className={styles.postContent}>
                            <h4 className={styles.postTitle}>{mystery.title}</h4>
                            <div className={styles.postMeta}>
                                {mystery.status === '公開中' ? (
                                    <>
                                        <span className={styles.postStat}>
                                            <span className="material-icons-round" style={{ fontSize: '14px' }}>lightbulb</span>
                                            {mystery.naruhodo}
                                        </span>
                                        <span className={styles.postStat}>
                                            <span className="material-icons-round" style={{ fontSize: '14px' }}>auto_awesome</span>
                                            {mystery.sense}
                                        </span>
                                    </>
                                ) : (
                                    <span className={styles.postStat} style={{ color: 'var(--color-text-light)' }}>
                                        <span className="material-icons-round" style={{ fontSize: '14px' }}>edit_note</span>
                                        編集中
                                    </span>
                                )}
                            </div>
                        </div>
                        <span className={`${styles.postStatus} ${mystery.status === '下書き' ? styles.draft : ''}`}>
                            {mystery.status}
                        </span>
                    </div>
                ))}
            </section>

            {/* 5. 称号 */}
            <section className={styles.badgeSection}>
                <h3 className={styles.sectionTitle}>称号</h3>
                <div className={styles.badgeGrid}>
                    {BADGES.map((badge) => (
                        <div
                            key={badge.label}
                            className={`${styles.badge} ${!badge.unlocked ? styles.badgeLocked : ''}`}
                        >
                            <div
                                className={styles.badgeIcon}
                                style={{
                                    background: badge.unlocked ? `${badge.color}15` : 'rgba(0,0,0,0.04)',
                                    color: badge.unlocked ? badge.color : '#ccc',
                                }}
                            >
                                <span className="material-icons-round" style={{ fontSize: '20px' }}>
                                    {badge.unlocked ? badge.icon : 'lock'}
                                </span>
                            </div>
                            <span className={styles.badgeLabel}>{badge.unlocked ? badge.label : '???'}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Settings */}
            <section className={styles.settingsSection}>
                {SETTINGS_LINKS.map((item) => (
                    <button
                        key={item.label}
                        className={`${styles.settingsItem} ${item.danger ? styles.settingsDanger : ''}`}
                    >
                        <span className="material-icons-round" style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span className={styles.settingsLabel}>{item.label}</span>
                        <span className="material-icons-round" style={{ fontSize: '18px', marginLeft: 'auto', opacity: 0.3 }}>chevron_right</span>
                    </button>
                ))}
            </section>
        </div>
    );
}
