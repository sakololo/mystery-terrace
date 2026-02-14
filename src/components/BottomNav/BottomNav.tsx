'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './BottomNav.module.css';

interface NavItem {
    href: string;
    label: string;
    icon: string;
    isCenter?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { href: '/', label: 'ホーム', icon: 'home' },
    { href: '/search', label: '探す', icon: 'explore' },
    { href: '/new', label: '投稿', icon: 'add', isCenter: true },
    { href: '/gallery', label: 'ギャラリー', icon: 'collections_bookmark' },
    { href: '/profile', label: 'マイページ', icon: 'person' },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className={styles.nav} role="navigation" aria-label="メインナビゲーション">
            <div className={styles.container}>
                {NAV_ITEMS.map((item) => {
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(item.href);

                    if (item.isCenter) {
                        return (
                            <Link key={item.href} href={item.href} className={styles.centerLink}>
                                <motion.div
                                    className={styles.centerButton}
                                    whileTap={{ scale: 0.85 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                >
                                    <span className="material-icons-round" style={{ fontSize: '28px' }}>
                                        {item.icon}
                                    </span>
                                </motion.div>
                                <span className={styles.sr}>{item.label}</span>
                            </Link>
                        );
                    }

                    return (
                        <Link key={item.href} href={item.href} className={styles.link}>
                            <motion.div
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                                <span className="material-icons-round" style={{ fontSize: '24px' }}>
                                    {item.icon}
                                </span>
                                <span className={styles.label}>{item.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
