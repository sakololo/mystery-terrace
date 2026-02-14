'use client';

import { motion } from 'framer-motion';
import styles from './FeedTabs.module.css';

interface FeedTabsProps {
    activeTab: 'new' | 'archive';
    onTabChange: (tab: 'new' | 'archive') => void;
}

export default function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
    return (
        <div className={styles.tabs}>
            <button
                className={`${styles.tab} ${activeTab === 'new' ? styles.active : ''}`}
                onClick={() => onTabChange('new')}
            >
                新着 (New)
            </button>
            <button
                className={`${styles.tab} ${activeTab === 'archive' ? styles.active : ''}`}
                onClick={() => onTabChange('archive')}
            >
                定番 (Archive)
            </button>
        </div>
    );
}
