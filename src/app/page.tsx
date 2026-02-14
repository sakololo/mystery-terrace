'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeedTabs from '@/components/FeedTabs';
import MysteryCard from '@/components/MysteryCard';
import type { Mystery } from '@/components/MysteryCard';
import styles from './page.module.css';

const NEW_MYSTERIES: Mystery[] = [
  {
    id: '1',
    tag: '新着メニュー',
    tagType: 'new',
    title: '302号室の苦い後味',
    excerpt: '常連客が姿を消した。残されたのは半分飲まれたマキアートと暗号化されたレシートのみ。テーブルには謎の数字が走り書きされていた。',
    time: '2時間前',
    difficulty: '中級',
    emoji: '',
    deductionCount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    userId: 'kaito',
    authorName: 'Kaito',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARqYxEORhipRaFTPiV0ibRGwaLbWqsW5dWUWknAeF5UGJXb3vkl3hVjWhWH_yYNtf7x-P5x2aosYAdBFUvaTySL9ZKa6UgO1-hF1X4sYBMhz6nbPHpqwvuQy8Js78k67H7GmLu-Tqaiq47J1DTRj0U-2UOI8r-uDVv-BFQ0jIGTRr37W8ny4hHXnRDg8ft_t5uPq8ahp1zawRAC5MxkVqxZQC7cIjyXLfXu8fHez-hX1NyF7bo-tdDDRS6mgNOQyxgm3BV6GCq7Qg',
  },
  {
    id: '2',
    tag: 'エディターズチョイス',
    tagType: 'editors',
    title: '雨の日の、濡れていない傘',
    excerpt: '今日の朝、ドシャ降りの雨の中を歩いていたら、バス停に完全に乾いた傘が置いてあった。周囲の地面はびしょ濡れなのに、傘だけが不自然に乾いている。',
    time: '5時間前',
    difficulty: '上級',
    emoji: '',
    deductionCount: 24,
    userId: 'mina',
    authorName: 'Mina',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
    /* 画像なし — テキストのみ投稿 */
  },
  {
    id: '3',
    tag: '新着メニュー',
    tagType: 'new',
    title: '午前3時のラテアート',
    excerpt: '閉店後のカフェで、誰もいないはずのカウンターに毎朝完璧なラテアートが残されている。防犯カメラには何も映っていない。',
    time: '30分前',
    difficulty: '初級',
    emoji: '',
    deductionCount: 7,
    userId: 'sato',
    authorName: 'Dr. Sato',
    /* 画像なし — テキストのみ投稿 */
  },
];

const ARCHIVE_MYSTERIES: Mystery[] = [
  {
    id: '101',
    tag: '殿堂入り',
    tagType: 'editors',
    title: 'テラスの幽霊客',
    excerpt: '毎週金曜日の夕方、予約なしで現れる謎の常連客。注文はいつも「いつもの」だけ。誰もその正体を知らない。',
    time: '3日前',
    difficulty: '上級',
    emoji: '',
    deductionCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
    userId: 'kaito',
    authorName: 'Kaito',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARqYxEORhipRaFTPiV0ibRGwaLbWqsW5dWUWknAeF5UGJXb3vkl3hVjWhWH_yYNtf7x-P5x2aosYAdBFUvaTySL9ZKa6UgO1-hF1X4sYBMhz6nbPHpqwvuQy8Js78k67H7GmLu-Tqaiq47J1DTRj0U-2UOI8r-uDVv-BFQ0jIGTRr37W8ny4hHXnRDg8ft_t5uPq8ahp1zawRAC5MxkVqxZQC7cIjyXLfXu8fHez-hX1NyF7bo-tdDDRS6mgNOQyxgm3BV6GCq7Qg',
  },
  {
    id: '102',
    tag: '殿堂入り',
    tagType: 'editors',
    title: '砂糖壺の暗号',
    excerpt: 'テーブルの砂糖壺の中から見つかった小さなメモ。そこに書かれた数字の意味とは。誰がこの暗号を仕込んだのか。',
    time: '1週間前',
    difficulty: '中級',
    emoji: '',
    deductionCount: 31,
    userId: 'mina',
    authorName: 'Mina',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
    /* 画像なし — テキストのみ投稿 */
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'new' | 'archive'>('new');
  const mysteries = activeTab === 'new' ? NEW_MYSTERIES : ARCHIVE_MYSTERIES;

  return (
    <div className={styles.page}>
      {/* Feed Tabs */}
      <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Section Header */}
      <div className={styles.sectionRow}>
        <h2 className={styles.sectionTitle}>
          <span className="material-icons-round" style={{ fontSize: '20px', color: 'var(--color-primary)' }}>
            {activeTab === 'new' ? 'menu_book' : 'workspace_premium'}
          </span>
          <span>{activeTab === 'new' ? '今月のスペシャル' : '殿堂入りケース'}</span>
        </h2>
        <span className={styles.sectionLink}>すべて見る</span>
      </div>

      {/* Mystery Cards — Staggered animation with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className={styles.cardList}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {mysteries.map((mystery, i) => (
            <MysteryCard key={mystery.id} mystery={mystery} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
