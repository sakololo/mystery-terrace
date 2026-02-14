'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

interface FeedItem {
    id: string;
    userId: string;
    author: string;
    avatar: string;
    time: string;
    title: string;
    excerpt: string;
    likes: number;
    comments: number;
    difficulty: string;
    liked?: boolean;
}

const FEED_ITEMS: FeedItem[] = [
    {
        id: '1', userId: 'kaito', author: 'Kaito_PuzzleMaster', time: '2時間前',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARqYxEORhipRaFTPiV0ibRGwaLbWqsW5dWUWknAeF5UGJXb3vkl3hVjWhWH_yYNtf7x-P5x2aosYAdBFUvaTySL9ZKa6UgO1-hF1X4sYBMhz6nbPHpqwvuQy8Js78k67H7GmLu-Tqaiq47J1DTRj0U-2UOI8r-uDVv-BFQ0jIGTRr37W8ny4hHXnRDg8ft_t5uPq8ahp1zawRAC5MxkVqxZQC7cIjyXLfXu8fHez-hX1NyF7bo-tdDDRS6mgNOQyxgm3BV6GCq7Qg',
        title: '「消えたダイヤモンドと3人の嘘つき」',
        excerpt: 'パーティーの最中、厳重に守られていた金庫からダイヤモンドが消失した。容疑者は、執事、料理人、そして庭師の3人。現場に残されたのは、妙な数字の羅列が書かれたメモだけで...',
        likes: 42, comments: 12, difficulty: 'Expert', liked: true,
    },
    {
        id: '2', userId: 'mina', author: 'Librarian_Mina', time: '5時間前',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
        title: '古本屋で見つけた暗号文の謎',
        excerpt: '1920年代に出版された古い推理小説の裏表紙に、インクで直接書き込まれた奇妙なシンボル。これは前の持ち主の単なる落書きなのか、それとも...',
        likes: 86, comments: 5, difficulty: 'Beginner',
    },
    {
        id: '3', userId: 'sato', author: 'Dr_Sato', time: '昨日',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUv7wh9cokfG1hVS3jbJLBi575WB_6ZjHJ1O2tvzhOSX7pU0aiftAZvGNvXMLgD8dwf-0xLEaI-VC2o7MOsYdQP65r04d6vtdMniiZDTgDNK2OH7W-GZFdwAWUhdyZuyNyAk9ml7fVTSAmTF-73F59XhW6FQXGEMcMv7PppWZtJHVvIkWmhK8eeq1FNSEeYV1ItM_07JrihYPs5rlHUA4Xt5s8eVJsEyWwYHaAoCdGpieyyDIk7D9dWqM6DcO7FFkDfHidWdafHg',
        title: '【上級】時計台の密室殺人事件',
        excerpt: '地上30メートルの時計台内部。唯一の入り口は内側から鍵がかかっており、予備の鍵は管理人が持っていた。しかし、管理人はその時、街の反対側にいたという。',
        likes: 156, comments: 28, difficulty: 'Hard',
    },
];

export default function TagSearchPage() {
    const router = useRouter();
    const params = useParams();
    const tag = decodeURIComponent(params.tag as string);
    const [sort, setSort] = useState<'new' | 'popular'>('new');

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <motion.button
                    className={styles.navButton}
                    onClick={() => router.back()}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="material-icons-round">arrow_back_ios_new</span>
                </motion.button>
                <h1 className={styles.headerTitle}>タグ検索</h1>
                <button className={styles.navButton}>
                    <span className="material-icons-round">share</span>
                </button>
            </header>

            {/* Hero Tag */}
            <section className={styles.heroSection}>
                <div className={styles.heroTag}>
                    <span className={styles.heroTagText}>#{tag}</span>
                </div>
                <p className={styles.heroCount}>124件の投稿</p>
            </section>

            {/* Sort Control */}
            <section className={styles.sortSection}>
                <div className={styles.sortContainer}>
                    <button
                        className={`${styles.sortButton} ${sort === 'new' ? styles.sortActive : ''}`}
                        onClick={() => setSort('new')}
                    >新着順</button>
                    <button
                        className={`${styles.sortButton} ${sort === 'popular' ? styles.sortActive : ''}`}
                        onClick={() => setSort('popular')}
                    >人気順</button>
                </div>
            </section>

            {/* Feed */}
            <section className={styles.feed}>
                {FEED_ITEMS.map((item) => (
                    <motion.article
                        key={item.id}
                        className={styles.feedCard}
                        whileTap={{ scale: 0.99 }}
                    >
                        {/* Author */}
                        <div className={styles.feedAuthor}>
                            <Link href={`/user/${item.userId}`} className={styles.feedAvatarLink}>
                                <img src={item.avatar} alt={item.author} className={styles.feedAvatar} />
                            </Link>
                            <div className={styles.feedAuthorInfo}>
                                <Link href={`/user/${item.userId}`} className={styles.feedAuthorLink}>
                                    <p className={styles.feedAuthorName}>{item.author}</p>
                                </Link>
                                <p className={styles.feedTime}>{item.time}</p>
                            </div>
                            <button className={styles.feedMore}>
                                <span className="material-icons-round">more_horiz</span>
                            </button>
                        </div>

                        {/* Content */}
                        <h2 className={styles.feedTitle}>{item.title}</h2>
                        <p className={styles.feedExcerpt}>{item.excerpt}</p>

                        {/* Footer */}
                        <div className={styles.feedFooter}>
                            <div className={styles.feedActions}>
                                <button className={`${styles.feedAction} ${item.liked ? styles.feedActionLiked : ''}`}>
                                    <span className="material-icons-round" style={{ fontSize: '18px' }}>favorite_border</span>
                                    <span>{item.likes}</span>
                                </button>
                                <button className={styles.feedAction}>
                                    <span className="material-icons-round" style={{ fontSize: '18px' }}>chat_bubble_outline</span>
                                    <span>{item.comments}</span>
                                </button>
                            </div>
                            <span className={styles.difficultyPill}>{item.difficulty}</span>
                        </div>
                    </motion.article>
                ))}

                {/* Loading shimmer */}
                <div className={styles.shimmer} />
            </section>
        </div>
    );
}
