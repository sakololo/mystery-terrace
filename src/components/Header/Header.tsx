'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <h1 className={styles.logo}>MYSTERY TERRACE</h1>
                <Link href="/notifications" className={styles.notifCircle} aria-label="通知">
                    <span className="material-icons-round" style={{ fontSize: '22px' }}>notifications</span>
                    <span className={styles.notifDot} />
                </Link>
            </div>
        </header>
    );
}
