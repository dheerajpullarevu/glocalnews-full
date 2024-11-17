import { User } from './user';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  payment: number;
  status: 'open' | 'assigned' | 'completed';
  location?: {
    state: string;
    district: string;
  };
  requirements: string[];
}

export interface JournalistProfile extends User {
  type: 'independent' | 'mediaHouse';
  mediaHouseId?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycDocuments: {
    idProof: string;
    addressProof: string;
    verificationDate?: string;
  };
  expertise: string[];
  earnings: {
    total: number;
    pending: number;
    lastPayout: string;
    payoutHistory: {
      amount: number;
      date: string;
      status: string;
    }[];
  };
  assignments: {
    current: Assignment[];
    completed: Assignment[];
    rejected: Assignment[];
  };
  metrics: {
    totalArticles: number;
    totalViews: number;
    averageEngagement: number;
    topPerformingCategories: string[];
  };
}