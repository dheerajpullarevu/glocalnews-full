export interface PaymentMetrics {
  // Base metrics
  views: number;
  uniqueReaders: number;
  readTime: number;
  shares: number;
  likes: number;
  comments: number;

  // Engagement metrics
  completionRate: number;
  returnRate: number;
  
  // Quality metrics
  factCheckScore: number;
  editorRating: number;
  
  // Bonus metrics
  isExclusive: boolean;
  isBreakingNews: boolean;
  isViralContent: boolean;
  hasMultimedia: boolean;
}

export interface PaymentStructure {
  // Base pay per 1000 views (varies by language)
  basePayPerThousandViews: {
    english: number;  // ₹50
    regional: number; // ₹75 (Higher for regional languages to promote local content)
  };
  
  // Engagement bonuses
  engagementBonuses: {
    completionRateBonus: number;     // +20% for >80% completion rate
    returnRateBonus: number;         // +15% for >50% return rate
    shareBonus: number;              // ₹5 per share
    commentEngagementBonus: number;  // ₹2 per meaningful comment
  };
  
  // Quality bonuses
  qualityBonuses: {
    factCheckBonus: number;          // +25% for verified content
    editorChoiceBonus: number;       // ₹1000 flat bonus
    exclusiveBonus: number;          // +50% of base pay
    breakingNewsBonus: number;       // ₹2000 flat bonus
    multimediaBonus: number;         // +₹500 for rich media content
  };
  
  // Viral content bonuses
  viralBonuses: {
    tier1: { views: number; bonus: number }; // 100K views: +₹5000
    tier2: { views: number; bonus: number }; // 500K views: +₹15000
    tier3: { views: number; bonus: number }; // 1M views: +₹50000
  };
  
  // Experience level multipliers
  experienceMultipliers: {
    beginner: number;    // 1x
    intermediate: number; // 1.2x
    advanced: number;    // 1.5x
    expert: number;      // 2x
  };
  
  // Regional multipliers (to promote coverage in underserved areas)
  regionalMultipliers: {
    tier1City: number;     // 1x
    tier2City: number;     // 1.2x
    tier3City: number;     // 1.3x
    ruralArea: number;     // 1.5x
  };
}

export interface PaymentThresholds {
  minimum: number;         // ₹1000 (minimum amount for withdrawal)
  express: number;        // ₹5000 (eligible for express withdrawal)
  preferredPartner: number; // ₹50000 (eligible for preferred partner benefits)
}

export interface WithdrawalMethod {
  type: 'upi' | 'bank_transfer' | 'wallet';
  details: {
    upi?: string;
    accountNumber?: string;
    ifscCode?: string;
    walletId?: string;
  };
  isVerified: boolean;
  isDefault: boolean;
}

export interface JournalistEarnings {
  id: string;
  journalistId: string;
  articleId: string;
  amount: number;
  metrics: PaymentMetrics;
  bonuses: {
    type: string;
    amount: number;
  }[];
  status: 'pending' | 'processing' | 'paid' | 'failed';
  createdAt: string;
  paidAt?: string;
  paymentMethod?: WithdrawalMethod;
  transactionId?: string;
}