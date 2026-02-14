'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';

const TABS = [
    { id: 'bookmark', label: 'ブックマーク' },
    { id: 'history', label: 'りれき' },
];

interface GalleryItem {
    id: string;
    type: 'image' | 'typography';
    title?: string;
    caseId?: string;
    status?: 'solved' | 'in-progress';
    image?: string;
    quote?: string;
    quoteLabel?: string;
    theme?: 'latte' | 'mint' | 'peach';
    date?: string;
    subtitle?: string;
    body?: string;
    aspect?: string;
}

const BOOKMARK_ITEMS: GalleryItem[] = [
    {
        id: '1', type: 'image', title: '霧の朝の落とし物', caseId: '#Case042', status: 'solved',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0KlOTg40G8BglDIWt0yO6-gSGibJna1jk4zdnop-H6vk2F23HpoF3XzEl4Lr-ZumuImhBiUKEGLJkUINDaGObOB698XGiU2iE52PyCSxrXjKGp0S39yZFYuVcBVPzZKZIpOB0yD7nLWKNZkiFBIv_np4iFAE-5wf0zbRwv6jkoH1NzcAkgGaf0yZITsgLRB-wf49m_zr-yBHB105w81QhoKNwQSG60g0Gy0o2SxMK0NJCJPhkJexabWvs5GwvYBPjIiO6ckgSM38',
        aspect: '3/4',
    },
    {
        id: '2', type: 'typography', theme: 'latte',
        quote: '「答えはいつも、\nありふれた景色の中に\n隠れている。」',
        quoteLabel: 'Thought Card',
    },
    {
        id: '3', type: 'image', title: '名もなき散歩道の謎', status: 'in-progress',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEJPgKWdrSYqrn82-sKpx0OESIkUDnT1hf_UTV-kFqsIr3pnGuh4fVnbymB33uv8t_gOGCtA4vvB5-_qnn8V0DfHmPV64YltNkdVupyyN_miJu58l0UnlwMg1l9mi29HFkkvFQgFvAIf99DpBNrn3MxknTp3DyMeN6AGwNCZE2pWUb2Ob1wVlRjc_nZUh_6cTSWLpEivT0oRZ9YI8q2OxIs1BsQhbV3n0y6UTIQ24lZkL3HuvA2nMsRD9JLSuKoHn-Uy3C2vMaHR8',
        aspect: '1/1',
    },
    {
        id: '4', type: 'typography', theme: 'mint', status: 'solved',
        date: '2023.11.24', subtitle: '推理メモ',
        body: '駅前のカフェの時計は、\nいつも3分だけ進んでいる。\nそれも一つの暗号かもしれない。',
        aspect: '3/4',
    },
    {
        id: '5', type: 'typography', theme: 'peach',
        subtitle: 'MEMO',
        body: '「栞を挟んだページを\nもう一度開くように。」',
    },
    {
        id: '6', type: 'image', title: '過去からの手紙', caseId: '#Case012', status: 'solved',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFLslrDyD0IrgM7Af6rUkqnQGu-xRakhRZSzatqGLs5OkNcglDPOTIpy3XSgkURWiUj9n0DaXXPDFFb5hccNNPf4MDz2UDOMOoptoNMdse4nOJ-PmocLCZhuugnRsjbvZRLOD3nkZFIj4EnAiTOOrZyz_9HymbOCAEQZ-_5KGPIJjxIIUv4p1Fviy5jfwjpjkBm_VDiCgPkcQODOmAR9jsphr-pKcLTMOu7cJsw0C_vSC5KtzAwvZ6DqDM1IzRxEcWPqJKDVwEm9c',
        aspect: '3/4',
    },
];

const HISTORY_ITEMS: GalleryItem[] = [
    {
        id: 'h1', type: 'image', title: '消えた常連客のコーヒーカップ', caseId: '#Case108',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmq3rp9cVZmmgfyGrjoszT-561DJgltn-KfE-fWvtO1HfiVxiRm1iiMdmBEZs9hxssck0eOTuD8hfr94yWYyVOIdaWGXZ2qyYBmoewb8ig39q0fBX4lhGM_P1QmyV3LF0UVVVdF-uVL_kVjJ0PcZOJRMqnpabW2k3bsuqk5PrFFh3UoL_2CaUFEjlD40ecF4mk-fi5XuccNRii-v0tswjc4qRuwmG5dGrXLV5eXzoaUgVnJ2TsraYXfwsyhHbASE1AI1-yFuazd_Q',
        aspect: '1/1',
    },
    {
        id: 'h2', type: 'image', title: '深夜のテラスに残された手紙', caseId: '#Case042', status: 'solved',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeguDq2aPTeTUdnkTHWUPFcHDxRjCdwwwtZ2ZLLOBFRmb5Phjn_lVXJ-kZ7vDA96SbjaRlMmXs4-GwItK0Hb38D1UWv2ANZ2-3IDSI_ckVKVu2nh8siZg2DbRM966S-5FdedOXLGlE-0yYB6YVapqhXcnEJIicgz11WiefYjRqMic4uNYz6dOs3yFpwXjVCpSS5HnCcfgUjwlaYD44lRHttVLDh0kww03MoeqdGU0_dh4w-5vcIEKDpb2PC3NKGWCH6ugNfPWPgv0',
        aspect: '3/4',
    },
    {
        id: 'h3', type: 'image', title: '時計台の密室殺人事件', caseId: '#Case205',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJtdtmTHdPZ154jVhai6Bl1Otan2vazBdThNWfRC-6f-1XnW2rO9vx_SnMTK5IesQ94DngZahKf-rFppiCKWLE1Dh4uAeGkhv-zaAr0s173-jqnqwmJqatlwJqYpT708l5w_78toXzzgNO5IWUF9HicJsZHU22beq-N5Oe79WVLmEUBQjAAc_jKBtXxUwNMrEn8Va5N9MXTVq95ugkBvKC1ZmbSoN6vpsHiVGOmjDvCpHtwQMcycBfDamyVLBfxNs5AIcRfEnMgw',
        aspect: '3/4',
    },
];

const TAB_ITEMS: Record<string, GalleryItem[]> = {
    bookmark: BOOKMARK_ITEMS,
    history: HISTORY_ITEMS,
};

const THEME_STYLES: Record<string, { bg: string; textColor: string; borderColor: string }> = {
    latte: { bg: 'rgba(242, 235, 228, 0.8)', textColor: 'var(--color-mocha)', borderColor: 'rgba(160, 77, 19, 0.05)' },
    mint: { bg: 'rgba(232, 243, 240, 0.8)', textColor: '#134e4a', borderColor: 'rgba(160, 77, 19, 0.05)' },
    peach: { bg: 'rgba(249, 240, 236, 0.8)', textColor: '#7c2d12', borderColor: 'rgba(160, 77, 19, 0.05)' },
};

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState('bookmark');
    const items = TAB_ITEMS[activeTab];

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>MY GALLERY</h1>
                <p className={styles.subtitle}>日常の栞</p>
            </header>

            {/* Tab Switcher */}
            <nav className={styles.tabNav}>
                <div className={styles.tabContainer}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Masonry Grid */}
            <main className={styles.masonry}>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        className={styles.masonryItem}
                        whileTap={{ scale: 0.97 }}
                        layout
                    >
                        {item.type === 'image' ? (
                            <div className={styles.imageCard}>
                                <img
                                    src={item.image}
                                    alt={item.title || ''}
                                    className={styles.cardImage}
                                    style={{ aspectRatio: item.aspect || '3/4' }}
                                />
                                <div className={styles.cardCaption}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <p className={styles.cardSub}>{item.caseId || (item.status === 'in-progress' ? 'In progress...' : '')}</p>
                                </div>
                                {item.status === 'solved' && (
                                    <div className={styles.solvedBadge}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>workspace_premium</span>
                                        <span className={styles.finLabel}>Fin.</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                className={styles.typoCard}
                                style={{
                                    background: THEME_STYLES[item.theme || 'latte'].bg,
                                    color: THEME_STYLES[item.theme || 'latte'].textColor,
                                    borderColor: THEME_STYLES[item.theme || 'latte'].borderColor,
                                    aspectRatio: item.aspect || '1/1',
                                }}
                            >
                                {item.quote ? (
                                    <>
                                        <span className="material-symbols-outlined" style={{ opacity: 0.4 }}>format_quote</span>
                                        <p className={styles.quoteText}>{item.quote}</p>
                                        <div className={styles.quoteDivider} />
                                        <p className={styles.quoteLabel}>{item.quoteLabel}</p>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.typoBody}>
                                            {item.date && <p className={styles.typoDate}>{item.date}</p>}
                                            {item.subtitle && <h4 className={styles.typoSubtitle}>{item.subtitle}</h4>}
                                            {item.body && <p className={styles.typoText}>{item.body}</p>}
                                        </div>
                                        {item.theme === 'mint' && (
                                            <div className={styles.typoDecor}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '32px', opacity: 0.2 }}>edit_note</span>
                                            </div>
                                        )}
                                    </>
                                )}
                                {item.status === 'solved' && (
                                    <div className={styles.solvedBadge}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--color-primary)' }}>workspace_premium</span>
                                        <span className={styles.finLabel}>Fin.</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ))}
            </main>
        </div>
    );
}
