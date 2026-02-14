'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

interface CollectionMeta {
    title: string;
    baristaComment: string;
    icon: string;
    themeColor: string;
}

interface CuratedMystery {
    number: string;
    caseId: string;
    title: string;
    author: string;
    authorAvatar: string;
    excerpt: string;
    difficulty: string;
    time: string;
    likes: number;
    comments: number;
    image?: string;
}

const COLLECTIONS_META: Record<string, CollectionMeta> = {
    'best-picks': {
        title: '今週のベストピック',
        baristaComment: 'コミュニティで最も反響があった謎をバリスタが厳選しました。\n一杯のコーヒーとともに、この一週間で最も心に残る推理をどうぞ。',
        icon: 'star',
        themeColor: '#d4af37',
    },
    'beginners': {
        title: '初めてのミステリー',
        baristaComment: '論理パズルが好きなあなたへ。まずはこの謎から始めてみませんか？\nコーヒー1杯分の時間で解ける、極上の入門編です。',
        icon: 'coffee',
        themeColor: '#11d493',
    },
    'unsolved': {
        title: '未解決の\n事件簿',
        baristaComment: 'まだ誰も真相に辿り着いていない、テラス最大の謎。\n挑戦者を待っています——あなたが最初の解決者になれるかもしれません。',
        icon: 'lock',
        themeColor: '#e74c3c',
    },
};

const DEFAULT_META: CollectionMeta = {
    title: 'コレクション',
    baristaComment: 'バリスタが厳選した特集です。',
    icon: 'auto_stories',
    themeColor: '#11d493',
};

const CURATED_MYSTERIES: Record<string, CuratedMystery[]> = {
    'best-picks': [
        {
            number: '#01', caseId: 'terrace-letter', title: '深夜のテラスに残された手紙',
            author: 'Kaito', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-IzaDkmmdjWk8seIsZWLi2CsmanZ38TUdWr7_uTYP4dolUKXqOdD1AiJwhP1qCq5CszBTPWRnYCw6IXhUh-t0LoSo4QzaDqnK33PpTPnAnJ_IphfFAA_lOy5HUEfs1XXV_ZE_PHUvgksfV84BYFyWR5q7CWxZPiGnneHAdO105r9eAXmph4s5V4O1xQLiSBKydvn9_4m5F_OnukBTNymQcVzrbOHb3cb_vdm-0tfOyhN_t6_caMpvM3H1shLD63lqLsYOViHeDk',
            excerpt: '閉店後のテラス席に一通の手紙が。宛名も差出人もないその便箋には、暗号めいた一文だけが書かれていた——「3番目の椅子の下を見よ」',
            difficulty: 'Beginner', time: '5分', likes: 42, comments: 12,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeguDq2aPTeTUdnkTHWUPFcHDxRjCdwwwtZ2ZLLOBFRmb5Phjn_lVXJ-kZ7vDA96SbjaRlMmXs4-GwItK0Hb38D1UWv2ANZ2-3IDSI_ckVKVu2nh8siZg2DbRM966S-5FdedOXLGlE-0yYB6YVapqhXcnEJIicgz11WiefYjRqMic4uNYz6dOs3yFpwXjVCpSS5HnCcfgUjwlaYD44lRHttVLDh0kww03MoeqdGU0_dh4w-5vcIEKDpb2PC3NKGWCH6ugNfPWPgv0',
        },
        {
            number: '#02', caseId: 'missing-cup', title: '消えた常連客のコーヒーカップ',
            author: 'Mina', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
            excerpt: '毎朝同じ時間に来ていた常連客が姿を消した翌日、彼女のいつもの席には飲みかけのカップが。中身は冷め切ったカプチーノ。でもカップの底に…',
            difficulty: 'Intermediate', time: '10分', likes: 86, comments: 23,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmq3rp9cVZmmgfyGrjoszT-561DJgltn-KfE-fWvtO1HfiVxiRm1iiMdmBEZs9hxssck0eOTuD8hfr94yWYyVOIdaWGXZ2qyYBmoewb8ig39q0fBX4lhGM_P1QmyV3LF0UVVVdF-uVL_kVjJ0PcZOJRMqnpabW2k3bsuqk5PrFFh3UoL_2CaUFEjlD40ecF4mk-fi5XuccNRii-v0tswjc4qRuwmG5dGrXLV5eXzoaUgVnJ2TsraYXfwsyhHbASE1AI1-yFuazd_Q',
        },
        {
            number: '#03', caseId: 'clock-tower', title: '【上級】時計台の密室殺人事件',
            author: 'Dr_Sato', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUv7wh9cokfG1hVS3jbJLBi575WB_6ZjHJ1O2tvzhOSX7pU0aiftAZvGNvXMLgD8dwf-0xLEaI-VC2o7MOsYdQP65r04d6vtdMniiZDTgDNK2OH7W-GZFdwAWUhdyZuyNyAk9ml7fVTSAmTF-73F59XhW6FQXGEMcMv7PppWZtJHVvIkWmhK8eeq1FNSEeYV1ItM_07JrihYPs5rlHUA4Xt5s8eVJsEyWwYHaAoCdGpieyyDIk7D9dWqM6DcO7FFkDfHidWdafHg',
            excerpt: '地上30メートルの時計台内部。唯一の入り口は内側から鍵がかけられていた。管理人は予備の鍵を持っていたが、その時刻には街の反対側にいた。',
            difficulty: 'Expert', time: '30分', likes: 156, comments: 28,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJtdtmTHdPZ154jVhai6Bl1Otan2vazBdThNWfRC-6f-1XnW2rO9vx_SnMTK5IesQ94DngZahKf-rFppiCKWLE1Dh4uAeGkhv-zaAr0s173-jqnqwmJqatlwJqYpT708l5w_78toXzzgNO5IWUF9HicJsZHU22beq-N5Oe79WVLmEUBQjAAc_jKBtXxUwNMrEn8Va5N9MXTVq95ugkBvKC1ZmbSoN6vpsHiVGOmjDvCpHtwQMcycBfDamyVLBfxNs5AIcRfEnMgw',
        },
    ],
    'beginners': [
        {
            number: '#01', caseId: 'morning-fog', title: '霧の朝の落とし物',
            author: 'Yuki', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Buqj-qXY-cDVENdzGdFas0ERG7BkFlI0L5pRDtccmCZjJmklYjRSEAzR7hMwdOO_18FuIRLNkf-pi68tFu8thUQbjjdukP5LItd1cd6UEX3kvwy-FCnZ5flCirJUr9dePLu_vyj4MKnTuMVXwprwoyWwey7IqA5GCerW3hSbrG1StoYinCIrc3ruuYzYcvav4Ze9QkTqdqSmxGi8cLpCbW3RUKNlKWHVko7Rd5Z3DFhLE6bW7M_cJx2t1H-f4ZFtUC2UxMjVW4A',
            excerpt: '通学路の途中、霧がかった朝に見つけた不思議な落とし物。持ち主を探す中で見えてきた、小さな謎と暖かい真実。',
            difficulty: 'Beginner', time: '5分', likes: 34, comments: 8,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0KlOTg40G8BglDIWt0yO6-gSGibJna1jk4zdnop-H6vk2F23HpoF3XzEl4Lr-ZumuImhBiUKEGLJkUINDaGObOB698XGiU2iE52PyCSxrXjKGp0S39yZFYuVcBVPzZKZIpOB0yD7nLWKNZkiFBIv_np4iFAE-5wf0zbRwv6jkoH1NzcAkgGaf0yZITsgLRB-wf49m_zr-yBHB105w81QhoKNwQSG60g0Gy0o2SxMK0NJCJPhkJexabWvs5GwvYBPjIiO6ckgSM38',
        },
        {
            number: '#02', caseId: 'nameless-path', title: '名もなき散歩道の謎',
            author: 'Kaito', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3-IzaDkmmdjWk8seIsZWLi2CsmanZ38TUdWr7_uTYP4dolUKXqOdD1AiJwhP1qCq5CszBTPWRnYCw6IXhUh-t0LoSo4QzaDqnK33PpTPnAnJ_IphfFAA_lOy5HUEfs1XXV_ZE_PHUvgksfV84BYFyWR5q7CWxZPiGnneHAdO105r9eAXmph4s5V4O1xQLiSBKydvn9_4m5F_OnukBTNymQcVzrbOHb3cb_vdm-0tfOyhN_t6_caMpvM3H1shLD63lqLsYOViHeDk',
            excerpt: 'いつもの散歩道に突然現れた奇妙な矢印の落書き。たどっていくと、知らなかった路地裏の小さなカフェに辿り着いた。',
            difficulty: 'Beginner', time: '8分', likes: 67, comments: 15,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEJPgKWdrSYqrn82-sKpx0OESIkUDnT1hf_UTV-kFqsIr3pnGuh4fVnbymB33uv8t_gOGCtA4vvB5-_qnn8V0DfHmPV64YltNkdVupyyN_miJu58l0UnlwMg1l9mi29HFkkvFQgFvAIf99DpBNrn3MxknTp3DyMeN6AGwNCZE2pWUb2Ob1wVlRjc_nZUh_6cTSWLpEivT0oRZ9YI8q2OxIs1BsQhbV3n0y6UTIQ24lZkL3HuvA2nMsRD9JLSuKoHn-Uy3C2vMaHR8',
        },
        {
            number: '#03', caseId: 'old-letter', title: '過去からの手紙',
            author: 'Mina', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
            excerpt: '引っ越しの片付け中、壁の裏から出てきた古い封筒。中には20年前の日付が入った手紙と、不思議な地図が……。',
            difficulty: 'Beginner', time: '7分', likes: 51, comments: 11,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFLslrDyD0IrgM7Af6rUkqnQGu-xRakhRZSzatqGLs5OkNcglDPOTIpy3XSgkURWiUj9n0DaXXPDFFb5hccNNPf4MDz2UDOMOoptoNMdse4nOJ-PmocLCZhuugnRsjbvZRLOD3nkZFIj4EnAiTOOrZyz_9HymbOCAEQZ-_5KGPIJjxIIUv4p1Fviy5jfwjpjkBm_VDiCgPkcQODOmAR9jsphr-pKcLTMOu7cJsw0C_vSC5KtzAwvZ6DqDM1IzRxEcWPqJKDVwEm9c',
        },
    ],
    'unsolved': [
        {
            number: '#01', caseId: 'diamond-liars', title: '消えたダイヤモンドと3人の嘘つき',
            author: 'Kaito_PuzzleMaster', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARqYxEORhipRaFTPiV0ibRGwaLbWqsW5dWUWknAeF5UGJXb3vkl3hVjWhWH_yYNtf7x-P5x2aosYAdBFUvaTySL9ZKa6UgO1-hF1X4sYBMhz6nbPHpqwvuQy8Js78k67H7GmLu-Tqaiq47J1DTRj0U-2UOI8r-uDVv-BFQ0jIGTRr37W8ny4hHXnRDg8ft_t5uPq8ahp1zawRAC5MxkVqxZQC7cIjyXLfXu8fHez-hX1NyF7bo-tdDDRS6mgNOQyxgm3BV6GCq7Qg',
            excerpt: 'パーティーの最中、厳重に守られていた金庫からダイヤモンドが消失。容疑者は3人、残されたのは妙な数字の羅列が書かれたメモだけ。',
            difficulty: 'Expert', time: '30分', likes: 203, comments: 45,
        },
        {
            number: '#02', caseId: 'bookstore-cipher', title: '古本屋で見つけた暗号文の謎',
            author: 'Librarian_Mina', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDroBRcrcnvNTuzsFe1hQRhrPqt0EnkYTdhGLxtVnMZqEZIoPrS3P5SRRZU1spw2ZUYIaT7rLZQTt-aqBv-bhdvnuLrvwE7OpVCMJBO4MaRSoLmuroK67hS1v5G0EJvp8bnjWzNmBkotCLCUovI5HD3O-pKrJ6SgqtWsnUtOxGX5HZunU9SwtRAdmQaptDrm0dbZ7TMJOY22BuilPzpCnmlafiVs21IRFBNnyHfvjmWXa8G-PJ5BeGq_-GW2w2g7lDa1fN5E5ujA',
            excerpt: '1920年代に出版された古い推理小説の裏表紙に、インクで直接書き込まれた奇妙なシンボル。前の持ち主の単なる落書きか、それとも……',
            difficulty: 'Hard', time: '25分', likes: 178, comments: 32,
        },
        {
            number: '#03', caseId: 'cafe-3min', title: '駅前カフェの3分間の暗号',
            author: 'Dr_Sato', authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUv7wh9cokfG1hVS3jbJLBi575WB_6ZjHJ1O2tvzhOSX7pU0aiftAZvGNvXMLgD8dwf-0xLEaI-VC2o7MOsYdQP65r04d6vtdMniiZDTgDNK2OH7W-GZFdwAWUhdyZuyNyAk9ml7fVTSAmTF-73F59XhW6FQXGEMcMv7PppWZtJHVvIkWmhK8eeq1FNSEeYV1ItM_07JrihYPs5rlHUA4Xt5s8eVJsEyWwYHaAoCdGpieyyDIk7D9dWqM6DcO7FFkDfHidWdafHg',
            excerpt: '駅前のカフェの時計はいつも3分だけ進んでいる。偶然かと思っていたが、ある日その3分間にだけ見える奇妙な現象に気づいて……',
            difficulty: 'Expert', time: '20分', likes: 142, comments: 38,
        },
    ],
};

export default function CollectionPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const meta = COLLECTIONS_META[id] || DEFAULT_META;
    const mysteries = CURATED_MYSTERIES[id] || CURATED_MYSTERIES['best-picks'];

    return (
        <div className={styles.page}>
            {/* Hero Header */}
            <header className={styles.hero} style={{ '--theme-color': meta.themeColor } as React.CSSProperties}>
                <motion.button
                    className={styles.backButton}
                    onClick={() => router.back()}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="material-icons-round">chevron_left</span>
                </motion.button>

                <div className={styles.heroContent}>
                    <div className={styles.heroIcon}>
                        <span className="material-icons-round" style={{ fontSize: '36px', color: meta.themeColor }}>{meta.icon}</span>
                    </div>
                    <h1 className={styles.heroTitle} style={{ whiteSpace: 'pre-line' }}>{meta.title}</h1>
                    {/* バリスタのコメント */}
                    <p className={styles.baristaComment} style={{ whiteSpace: 'pre-line' }}>{meta.baristaComment}</p>
                    <div className={styles.baristaLabel}>
                        <span className="material-icons-round" style={{ fontSize: '14px' }}>local_cafe</span>
                        Barista&apos;s Selection
                    </div>
                </div>

                {/* Decorative blur */}
                <div className={styles.heroBlur} style={{ background: meta.themeColor }} />
            </header>

            {/* Timeline Content */}
            <main className={styles.timeline}>
                <div className={styles.timelineLine} style={{ '--theme-color': meta.themeColor } as React.CSSProperties} />

                {mysteries.map((mystery) => (
                    <article key={mystery.number} className={styles.timelineItem}>
                        {/* Number + Dot */}
                        <div className={styles.timelineMarker}>
                            <span className={styles.timelineNumber} style={{ color: meta.themeColor }}>{mystery.number}</span>
                            <div className={styles.timelineDot} style={{ background: meta.themeColor }} />
                        </div>

                        {/* Card */}
                        <motion.div className={styles.mysteryCard} whileTap={{ scale: 0.99 }}>
                            {/* Optional image */}
                            {mystery.image && (
                                <div className={styles.cardImage}>
                                    <img src={mystery.image} alt={mystery.title} />
                                    <div className={styles.cardImageOverlay} />
                                </div>
                            )}

                            {/* Author row */}
                            <div className={styles.cardAuthor}>
                                <img src={mystery.authorAvatar} alt={mystery.author} className={styles.authorAvatar} />
                                <span className={styles.authorName}>{mystery.author}</span>
                                <span className={styles.cardTime}>
                                    <span className="material-icons-round" style={{ fontSize: '14px' }}>schedule</span>
                                    {mystery.time}
                                </span>
                            </div>

                            {/* Content */}
                            <h2 className={styles.cardTitle}>{mystery.title}</h2>
                            <p className={styles.cardExcerpt}>{mystery.excerpt}</p>

                            {/* Footer */}
                            <div className={styles.cardFooter}>
                                <div className={styles.cardStats}>
                                    <span className={styles.stat}>
                                        <span className="material-icons-round" style={{ fontSize: '16px' }}>favorite_border</span>
                                        {mystery.likes}
                                    </span>
                                    <span className={styles.stat}>
                                        <span className="material-icons-round" style={{ fontSize: '16px' }}>chat_bubble_outline</span>
                                        {mystery.comments}
                                    </span>
                                </div>
                                <span
                                    className={styles.difficultyPill}
                                    style={{ background: `${meta.themeColor}15`, color: meta.themeColor }}
                                >
                                    {mystery.difficulty}
                                </span>
                            </div>

                            <Link
                                href={`/case/${mystery.caseId}`}
                                className={styles.solveButton}
                                style={{ color: meta.themeColor, borderColor: `${meta.themeColor}4D` }}
                            >
                                <span className="material-icons-round" style={{ fontSize: '16px' }}>play_arrow</span>
                                この謎を解く
                            </Link>
                        </motion.div>
                    </article>
                ))}
            </main>

            {/* CTA */}
            <section className={styles.cta}>
                <motion.button
                    className={styles.ctaPrimary}
                    style={{ background: meta.themeColor, boxShadow: `0 8px 24px ${meta.themeColor}33` }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>share</span>
                    このコレクションをシェア
                </motion.button>
                <button
                    className={styles.ctaSecondary}
                    style={{ background: `${meta.themeColor}15`, color: meta.themeColor }}
                >
                    <span className="material-icons-round" style={{ fontSize: '18px' }}>bookmark_border</span>
                    マイリストに追加
                </button>
                <p className={styles.ctaCredit}>
                    <span className="material-icons-round" style={{ fontSize: '12px', marginRight: '4px', verticalAlign: 'middle' }}>local_cafe</span>
                    Presented by Mystery Terrace Barista
                </p>
            </section>
        </div>
    );
}
