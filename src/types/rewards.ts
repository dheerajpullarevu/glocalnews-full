export type RewardType = 'points' | 'badge' | 'coupon';

export interface UserReward {
  id: string;
  userId: string;
  type: RewardType;
  points?: number;
  badge?: {
    name: string;
    icon: string;
    level: 'bronze' | 'silver' | 'gold' | 'platinum';
  };
  earnedAt: string;
  expiresAt?: string;
}

export interface Coupon {
  id: string;
  advertiserId: string;
  title: string;
  description: string;
  code: string;
  discount: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  terms: string[];
  validFrom: string;
  validUntil: string;
  totalCodes: number;
  remainingCodes: number;
  minPurchase?: number;
  maxDiscount?: number;
  categories: string[];
  status: 'active' | 'paused' | 'expired';
  redemptions: number;
  featured: boolean;
}

export interface UserCoupon {
  id: string;
  userId: string;
  couponId: string;
  status: 'active' | 'used' | 'expired';
  acquiredAt: string;
  usedAt?: string;
  expiresAt: string;
}

export interface RewardRule {
  id: string;
  type: 'action' | 'milestone';
  action?: 'read' | 'share' | 'comment' | 'like' | 'daily_visit';
  milestone?: {
    type: 'articles_read' | 'days_active' | 'comments_made';
    threshold: number;
  };
  reward: {
    type: RewardType;
    points?: number;
    badge?: string;
    coupon?: string;
  };
  active: boolean;
}