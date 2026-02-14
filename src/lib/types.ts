/**
 * MYSTERY TERRACE データ型定義 v3.2
 * 実装計画 v3.2 (最終版) に準拠
 */

/* ===== 定数 ===== */

export const VALID_TAGS = ['日常の謎', 'ほっこり', '知的・論理', 'ちょい怖'] as const;
export type Tag = (typeof VALID_TAGS)[number];

export const VALID_ROLES = ['初来店', 'リピーター', '常連', '顔なじみ', '古参'] as const;
export type UserRole = (typeof VALID_ROLES)[number];

export const VALID_ICONS = [
    'coffee', 'cake', 'bakery_dining', 'kettle', 'cookie',
    'donut_large', 'local_florist', 'menu_book', 'blender', 'water_drop',
] as const;
export type IconId = (typeof VALID_ICONS)[number];

export type ReactionType = 'naruhodo' | 'sense';
export type MysteryStatus = 'draft' | 'published' | 'archived';
export type DeductionStatus = 'draft' | 'published' | 'archived';
export type NotificationType = 'reaction' | 'comment' | 'system' | 'follow';
export type ReportTargetType = 'mystery' | 'deduction' | 'user';
export type ReportStatus = 'pending' | 'reviewed' | 'actioned' | 'dismissed';

/* ===== テーブル型 ===== */

export interface User {
    id: string;
    display_name: string;
    icon_id: IconId;
    bio: string | null;
    role: UserRole;
    role_updated_at: string | null;
    created_at: string;
    deleted_at: string | null;
    settings: Record<string, unknown>;
}

export interface Mystery {
    id: string;
    author_id: string | null;
    title: string;
    story_content: string;
    difficulty: string | null;
    status: MysteryStatus;
    image_url: string | null;
    tags: Tag[];
    created_at: string;
    published_at: string | null;
    archived_at: string | null;
}

export interface Deduction {
    id: string;
    mystery_id: string;
    author_id: string | null;
    title: string | null;
    content: string;
    status: DeductionStatus;
    is_certified: boolean;
    created_at: string;
    published_at: string | null;
}

export interface MysteryReaction {
    id: string;
    user_id: string;
    mystery_id: string;
    reaction_type: ReactionType;
    created_at: string;
}

export interface DeductionReaction {
    id: string;
    user_id: string;
    deduction_id: string;
    reaction_type: ReactionType;
    created_at: string;
}

export interface Bookmark {
    user_id: string;
    mystery_id: string;
    created_at: string;
}

export interface Notification {
    id: string;
    user_id: string;
    type: NotificationType;
    data: Record<string, unknown>;
    read: boolean;
    reference_id: string | null;
    created_at: string;
    read_at: string | null;
}

export interface Follow {
    follower_id: string;
    following_id: string;
    created_at: string;
}

export interface ViewHistory {
    user_id: string;
    mystery_id: string;
    viewed_at: string;
}

export interface Report {
    id: string;
    reporter_id: string;
    target_type: ReportTargetType;
    target_id: string;
    reason: string;
    status: ReportStatus;
    created_at: string;
    reviewed_at: string | null;
}

/* ===== Supabase Database Types ===== */

export interface Database {
    public: {
        Tables: {
            users: {
                Row: User;
                Insert: Pick<User, 'id' | 'display_name'> & Partial<Omit<User, 'id' | 'display_name' | 'created_at'>>;
                Update: Partial<Omit<User, 'id' | 'created_at'>>;
            };
            mysteries: {
                Row: Mystery;
                Insert: Pick<Mystery, 'author_id' | 'title' | 'story_content'> & Partial<Omit<Mystery, 'id' | 'created_at'>>;
                Update: Partial<Omit<Mystery, 'id' | 'created_at'>>;
            };
            deductions: {
                Row: Deduction;
                Insert: Pick<Deduction, 'mystery_id' | 'author_id' | 'content'> & Partial<Omit<Deduction, 'id' | 'created_at'>>;
                Update: Partial<Omit<Deduction, 'id' | 'created_at'>>;
            };
            mystery_reactions: {
                Row: MysteryReaction;
                Insert: Pick<MysteryReaction, 'user_id' | 'mystery_id' | 'reaction_type'>;
                Update: never;
            };
            deduction_reactions: {
                Row: DeductionReaction;
                Insert: Pick<DeductionReaction, 'user_id' | 'deduction_id' | 'reaction_type'>;
                Update: never;
            };
            bookmarks: {
                Row: Bookmark;
                Insert: Pick<Bookmark, 'user_id' | 'mystery_id'>;
                Update: never;
            };
            notifications: {
                Row: Notification;
                Insert: Pick<Notification, 'user_id' | 'type' | 'data'> & Partial<Pick<Notification, 'reference_id'>>;
                Update: Pick<Notification, 'read'> & Partial<Pick<Notification, 'read_at'>>;
            };
            follows: {
                Row: Follow;
                Insert: Pick<Follow, 'follower_id' | 'following_id'>;
                Update: never;
            };
            view_history: {
                Row: ViewHistory;
                Insert: Pick<ViewHistory, 'user_id' | 'mystery_id'>;
                Update: Pick<ViewHistory, 'viewed_at'>;
            };
            reports: {
                Row: Report;
                Insert: Pick<Report, 'reporter_id' | 'target_type' | 'target_id' | 'reason'>;
                Update: never;
            };
        };
    };
}
