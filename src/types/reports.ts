export type ReportType = 'article' | 'ad';
export type ReportReason = 
  | 'fake_news'
  | 'hate_speech'
  | 'inappropriate'
  | 'spam'
  | 'violence'
  | 'copyright'
  | 'misleading'
  | 'other';

export interface Report {
  id: string;
  type: ReportType;
  contentId: string;  // articleId or adId
  userId: string;
  reason: ReportReason;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  action?: 'removed' | 'flagged' | 'no_action';
  adminNotes?: string;
}