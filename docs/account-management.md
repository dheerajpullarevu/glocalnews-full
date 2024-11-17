# Glocal News Account Management Guide

## Table of Contents
1. [Media House Accounts](#media-house-accounts)
2. [Advertiser Accounts](#advertiser-accounts)
3. [Dashboard Access](#dashboard-access)
4. [User Management](#user-management)
5. [Analytics & Tracking](#analytics--tracking)

## Media House Accounts

### Account Creation Process

1. **Initial Registration**
   - Visit: `https://glocalnews.com/media-house/register`
   - Required Documents:
     - Business Registration Certificate
     - Media House License
     - GST Registration (if applicable)
     - Company PAN Card
     - Editor-in-Chief Details

2. **Verification Process**
   - Submit required documents
   - KYC verification (2-3 business days)
   - Account activation email

3. **Subscription Plans**
   ```
   Basic Plan (₹9,999/month)
   - Up to 10 journalists
   - Basic analytics
   - Standard support

   Premium Plan (₹24,999/month)
   - Up to 50 journalists
   - Advanced analytics
   - Priority support
   - Custom branding

   Enterprise Plan (Custom pricing)
   - Unlimited journalists
   - Full analytics suite
   - Dedicated support
   - White-label solution
   ```

### Dashboard Features

1. **Content Management**
   - Article approval workflow
   - Content calendar
   - Multi-language support
   - Media library

2. **Team Management**
   ```typescript
   interface TeamMember {
     role: 'editor' | 'journalist' | 'manager';
     permissions: string[];
     assignedCategories: string[];
     assignedRegions: string[];
   }
   ```

3. **Analytics**
   - Content performance
   - Journalist performance
   - Audience engagement
   - Revenue tracking

## Advertiser Accounts

### Account Creation Process

1. **Registration**
   - Visit: `https://glocalnews.com/advertiser/register`
   - Required Information:
     - Company Details
     - Billing Information
     - Campaign Goals
     - Target Demographics

2. **Account Types**
   ```
   Starter (₹50,000 minimum spend)
   - Basic targeting
   - Standard ad formats
   - Basic analytics

   Professional (₹2,00,000 minimum spend)
   - Advanced targeting
   - All ad formats
   - Detailed analytics
   - Priority support

   Enterprise (Custom)
   - Custom targeting
   - Premium inventory
   - API access
   - Dedicated manager
   ```

### Campaign Management

1. **Ad Formats**
   ```typescript
   interface AdFormat {
     type: 'banner' | 'native' | 'video' | 'sponsored';
     sizes: string[];
     placements: string[];
     pricing: {
       cpc: number;  // Cost per click
       cpm: number;  // Cost per thousand impressions
     };
   }
   ```

2. **Targeting Options**
   - Geographic (State/District/Mandal level)
   - Language
   - Interest Categories
   - Demographics
   - Device Type
   - Time of Day

## Dashboard Access

### Media House Dashboard

1. **Login Process**
   ```typescript
   interface LoginCredentials {
     email: string;
     password: string;
     twoFactorCode?: string;
   }
   ```

2. **Access Levels**
   ```typescript
   interface AccessLevel {
     role: string;
     permissions: string[];
     restrictions: string[];
   }

   const accessLevels = {
     admin: ['all'],
     editor: ['approve', 'publish', 'manage_journalists'],
     manager: ['view_analytics', 'manage_content'],
     journalist: ['create', 'edit_own']
   };
   ```

### Advertiser Dashboard

1. **Login URL**: `https://glocalnews.com/advertiser/login`

2. **Dashboard Sections**
   ```typescript
   interface DashboardSections {
     campaigns: {
       active: Campaign[];
       draft: Campaign[];
       completed: Campaign[];
     };
     analytics: {
       spend: number;
       impressions: number;
       clicks: number;
       conversions: number;
     };
     billing: {
       balance: number;
       invoices: Invoice[];
       transactions: Transaction[];
     };
   }
   ```

## User Management

### Adding Team Members (Media House)

1. **Invite Process**
   ```typescript
   interface TeamInvite {
     email: string;
     role: string;
     permissions: string[];
     regions?: string[];
     categories?: string[];
     expiresIn: number; // hours
   }
   ```

2. **Role Configuration**
   - Editor-in-Chief: Full access
   - Section Editors: Category-specific access
   - Journalists: Content creation access
   - Analytics Team: Report access

### Adding Advertiser Users

1. **User Types**
   ```typescript
   interface AdvertiserUser {
     role: 'admin' | 'manager' | 'analyst';
     permissions: {
       campaigns: boolean;
       budget: boolean;
       reports: boolean;
       billing: boolean;
     };
     spendLimit?: number;
   }
   ```

## Analytics & Tracking

### Media House Analytics

1. **Content Metrics**
   ```typescript
   interface ContentMetrics {
     views: number;
     readTime: number;
     completion: number;
     shares: number;
     engagement: {
       likes: number;
       comments: number;
       bookmarks: number;
     };
   }
   ```

2. **Revenue Tracking**
   ```typescript
   interface RevenueMetrics {
     adsRevenue: number;
     subscriptionRevenue: number;
     sponsoredContent: number;
     totalRevenue: number;
   }
   ```

### Advertiser Analytics

1. **Campaign Metrics**
   ```typescript
   interface CampaignMetrics {
     impressions: number;
     clicks: number;
     ctr: number;
     spend: number;
     conversions: number;
     roi: number;
     engagementRate: number;
   }
   ```

2. **Performance Tracking**
   - Real-time dashboard
   - Hourly/daily/weekly reports
   - Geographic performance
   - Device breakdown
   - Language-wise performance

## Best Practices

1. **Media House Management**
   - Regular content calendar updates
   - Quality checks before publication
   - Performance reviews for journalists
   - Regular analytics review

2. **Advertising Management**
   - Budget optimization
   - A/B testing campaigns
   - Audience segmentation
   - ROI tracking

## Support & Resources

1. **Technical Support**
   - 24/7 email support
   - Priority phone support (Premium/Enterprise)
   - Knowledge base access
   - Video tutorials

2. **Training Resources**
   - Onboarding guides
   - Best practices documentation
   - Regular webinars
   - Case studies

## Security & Compliance

1. **Data Protection**
   - End-to-end encryption
   - Regular security audits
   - GDPR compliance
   - Data backup

2. **Access Control**
   - Two-factor authentication
   - IP whitelisting
   - Session management
   - Audit logs