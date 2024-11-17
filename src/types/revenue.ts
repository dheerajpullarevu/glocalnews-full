export interface Advertisement {
  id: string;
  type: 'banner' | 'native' | 'interstitial' | 'classified' | 'job';
  title: string;
  content: string;
  imageUrl?: string;
  targetLocation: {
    state?: string;
    district?: string;
    mandal?: string;
    village?: string;
  };
  targetLanguages: string[];
  targetCategories: string[];
  startDate: string;
  endDate: string;
  budget: number;
  impressions: number;
  clicks: number;
  status: 'active' | 'paused' | 'completed';
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract';
  featured: boolean;
  postedAt: string;
  expiresAt: string;
  contactEmail: string;
  views: number;
  applications: number;
}

export interface Classified {
  id: string;
  category: string;
  title: string;
  description: string;
  price?: number;
  location: {
    state: string;
    district: string;
    mandal?: string;
    village?: string;
  };
  images: string[];
  contactInfo: string;
  postedAt: string;
  expiresAt: string;
  status: 'active' | 'sold' | 'expired';
  featured: boolean;
  views: number;
  inquiries: number;
}