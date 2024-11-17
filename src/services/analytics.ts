import { analytics } from '../firebase/config';
import { logEvent } from 'firebase/analytics';
import { trackEvent } from '../firebase/db';

export const AnalyticsEvents = {
  VIEW_ARTICLE: 'view_article',
  LIKE_ARTICLE: 'like_article',
  SHARE_ARTICLE: 'share_article',
  COMMENT_ADDED: 'comment_added',
  USER_SIGNUP: 'user_signup',
  LANGUAGE_CHANGED: 'language_changed',
  REGION_CHANGED: 'region_changed',
  SEARCH_PERFORMED: 'search_performed',
  AD_CLICKED: 'ad_clicked',
  AD_VIEWED: 'ad_viewed'
} as const;

type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

interface AnalyticsParams {
  [key: string]: any;
}

export async function trackAnalyticsEvent(
  eventName: AnalyticsEvent,
  params?: AnalyticsParams
) {
  try {
    // Log to Firebase Analytics
    logEvent(analytics, eventName, params);
    
    // Store in Firestore for custom analytics
    await trackEvent(eventName, {
      ...params,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
  }
}