'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './page.module.css';

interface Notification {
    id: string;
    type: 'reward' | 'user' | 'system' | 'interaction';
    read: boolean;
    time: string;
    category: string;
    message: string;
    boldText?: string;
    icon?: string;
    iconBg?: string;
    avatar?: string;
    badge?: string;
}

const NOTIFICATIONS: Notification[] = [
    {
        id: '1', type: 'reward', read: false, time: '1分前',
        category: '報酬・インタラクション',
        message: 'マスターから「金の角砂糖」が届きました！あなたの考察がピックアップされました。',
        boldText: '「金の角砂糖」',
        icon: 'trophy', iconBg: 'rgba(251, 191, 36, 0.15)',
    },
    {
        id: '2', type: 'user', read: false, time: '15分前',
        category: '購読中の常連',
        message: 'Kaitoさんが新しい謎を投稿しました：「深夜のテラスに残された手紙」',
        boldText: 'Kaito',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-IzaDkmmdjWk8seIsZWLi2CsmanZ38TUdWr7_uTYP4dolUKXqOdD1AiJwhP1qCq5CszBTPWRnYCw6IXhUh-t0LoSo4QzaDqnK33PpTPnAnJ_IphfFAA_lOy5HUEfs1XXV_ZE_PHUvgksfV84BYFyWR5q7CWxZPiGnneHAdO105r9eAXmph4s5V4O1xQLiSBKydvn9_4m5F_OnukBTNymQcVzrbOHb3cb_vdm-0tfOyhN_t6_caMpvM3H1shLD63lqLsYOViHeDk',
        badge: 'coffee',
    },
    {
        id: '3', type: 'system', read: true, time: '2時間前',
        category: 'システムお知らせ',
        message: '【重要】明日午前2時よりサーバーメンテナンスを行います。一時的にアプリにアクセスできなくなります。',
        icon: 'info', iconBg: 'transparent',
    },
    {
        id: '4', type: 'interaction', read: true, time: '5時間前',
        category: 'インタラクション',
        message: 'Minaさんがあなたの投稿にコメントを残しました。',
        boldText: 'Mina',
        icon: 'chat_bubble', iconBg: 'var(--color-primary-soft)',
    },
    {
        id: '5', type: 'user', read: true, time: '昨日',
        category: '購読中の常連',
        message: 'Yukiさんが新しい考察を公開しました。',
        boldText: 'Yuki',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Buqj-qXY-cDVENdzGdFas0ERG7BkFlI0L5pRDtccmCZjJmklYjRSEAzR7hMwdOO_18FuIRLNkf-pi68tFu8thUQbjjdukP5LItd1cd6UEX3kvwy-FCnZ5flCirJUr9dePLu_vyj4MKnTuMVXwprwoyWwey7IqA5GCerW3hSbrG1StoYinCIrc3ruuYzYcvav4Ze9QkTqdqSmxGi8cLpCbW3RUKNlKWHVko7Rd5Z3DFhLE6bW7M_cJx2t1H-f4ZFtUC2UxMjVW4A',
        badge: 'coffee',
    },
    {
        id: '6', type: 'system', read: true, time: '2日前',
        category: 'システムお知らせ',
        message: '新機能「謎解きブックマーク」が追加されました。気になる謎を保存していつでも振り返りましょう。',
        icon: 'notifications_active', iconBg: 'transparent',
    },
];

export default function NotificationsPage() {
    const router = useRouter();

    return (
        <div className={styles.page}>
            {/* Sticky Header */}
            <header className={styles.header}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => router.back()}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </motion.button>
                <h1 className={styles.headerTitle}>お知らせ</h1>
                <button className={styles.filterButton}>
                    <span className="material-symbols-outlined">filter_list</span>
                </button>
            </header>

            {/* Notification List */}
            <main className={styles.list}>
                {NOTIFICATIONS.map((n) => (
                    <motion.div
                        key={n.id}
                        className={`${styles.notifItem} ${!n.read ? styles.unread : ''} ${n.type === 'system' ? styles.system : ''} ${n.read ? styles.read : ''}`}
                        whileTap={{ scale: 0.99, backgroundColor: 'rgba(0,0,0,0.02)' }}
                    >
                        {/* Avatar / Icon */}
                        <div className={styles.notifIcon}>
                            {n.avatar ? (
                                <div className={styles.avatarWrap}>
                                    <img src={n.avatar} alt="" className={`${styles.avatarImg} ${n.read ? styles.avatarRead : ''}`} />
                                    {n.badge && (
                                        <div className={`${styles.avatarBadge} ${n.read ? styles.badgeRead : ''}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'white' }}>{n.badge}</span>
                                        </div>
                                    )}
                                </div>
                            ) : n.type === 'system' ? (
                                <div className={styles.systemIcon}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{n.icon}</span>
                                </div>
                            ) : (
                                <div className={styles.rewardIcon} style={{ background: n.iconBg }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '26px', fontVariationSettings: "'FILL' 1" }}>{n.icon}</span>
                                </div>
                            )}
                            {!n.read && <div className={styles.unreadDot} />}
                        </div>

                        {/* Content */}
                        <div className={styles.notifContent}>
                            <div className={styles.notifMeta}>
                                <span className={styles.notifCategory}>{n.category}</span>
                                <span className={styles.notifTime}>{n.time}</span>
                            </div>
                            <p className={styles.notifMessage}>{n.message}</p>
                        </div>
                    </motion.div>
                ))}
            </main>
        </div>
    );
}
