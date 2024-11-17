export type AdPlatform = 'google' | 'meta' | 'internal' | 'taboola' | 'outbrain';

export type AdPlacement = 
  | 'feed_inline'
  | 'article_sidebar'
  | 'article_content'
  | 'sticky_bottom'
  | 'category_header'
  | 'video_pre_roll'
  | 'video_mid_roll'
  | 'newsletter';

export type AdSize = 
  | 'banner'
  | 'leaderboard'
  | 'medium_rectangle'
  | 'large_rectangle'
  | 'skyscraper'
  | 'mobile_banner'
  | 'custom';

export interface AdTargeting {
  languages?: string[];
  regions?: string[];
  categories?: string[];
  userInterests?: string[];
  deviceTypes?: ('mobile' | 'tablet' | 'desktop')[];
  timeOfDay?: ('morning' | 'afternoon' | 'evening' | 'night')[];
  userBehavior?: {
    minArticlesRead?: number;
    categories?: string[];
    timeOnSite?: number;
  };
  demographics?: {
    ageRanges?: string[];
    genders?: string[];
    incomeRanges?: string[];
  };
  retargeting?: {
    visitedCategories?: string[];
    lastVisit?: number;
    engagementScore?: number;
  };
}

export interface AdPerformance {
  impressions: number;
  clicks: number;
  ctr: number;
  revenue: number;
  ecpm: number;
  averageTimeViewed: number;
  viewability: number;
  engagementRate: number;
  conversionRate?: number;
  bounceRate?: number;
  revenueByPlatform: Record<AdPlatform, number>;
  performanceByRegion: Record<string, {
    impressions: number;
    clicks: number;
    revenue: number;
  }>;
}

export interface Ad {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  targetUrl: string;
  platform: AdPlatform;
  placement: AdPlacement;
  size: AdSize;
  customSize?: {
    width: number;
    height: number;
  };
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'ended';
  budget: {
    total: number;
    daily: number;
    spent: number;
    costPerClick?: number;
    costPerMille?: number;
  };
  targeting: AdTargeting;
  performance: AdPerformance;
  abTest?: {
    enabled: boolean;
    variants: {
      id: string;
      title: string;
      description?: string;
      imageUrl?: string;
      performance: AdPerformance;
    }[];
  };
  optimization: {
    autoOptimize: boolean;
    optimizationGoal: 'clicks' | 'conversions' | 'revenue';
    minPerformanceThreshold?: number;
    maxBudgetAdjustment?: number;
  };
}