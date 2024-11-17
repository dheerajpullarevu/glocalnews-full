# Glocal News Admin Documentation
**Internal Use Only**

## Table of Contents
1. [Admin Account Creation](#admin-account-creation)
2. [Access Levels & Permissions](#access-levels--permissions)
3. [Content Moderation](#content-moderation)
4. [User Management](#user-management)
5. [Payment Management](#payment-management)
6. [Media House Management](#media-house-management)
7. [Advertiser Management](#advertiser-management)
8. [Analytics & Reporting](#analytics--reporting)
9. [System Configuration](#system-configuration)

## Admin Account Creation

### Creating Super Admin Account
```typescript
// Only accessible through Firebase Console or CLI
const superAdminRights = {
  role: 'super_admin',
  permissions: ['*'],
  accessLevel: 'full',
  canCreateAdmins: true
};
```

### Admin Hierarchy
1. **Super Admin**
   - Full system access
   - Can create other admin accounts
   - Access to system configurations
   - Cannot be deleted through interface

2. **Regional Admin**
   - State/Region specific access
   - Content moderation for assigned regions
   - User management for region
   - Analytics access for region

3. **Content Admin**
   - Article approval/rejection
   - Journalist verification
   - Content quality control
   - Category management

4. **Support Admin**
   - User support
   - Issue resolution
   - Report handling
   - Feedback management

## Access Levels & Permissions

### Permission Structure
```typescript
interface AdminPermissions {
  content: {
    approve: boolean;
    reject: boolean;
    delete: boolean;
    feature: boolean;
    editCategories: boolean;
  };
  users: {
    create: boolean;
    suspend: boolean;
    delete: boolean;
    verifyJournalists: boolean;
  };
  payments: {
    process: boolean;
    refund: boolean;
    viewReports: boolean;
  };
  system: {
    configure: boolean;
    manageAdmins: boolean;
    viewLogs: boolean;
  };
}
```

### Access Control Matrix
| Feature                  | Super Admin | Regional Admin | Content Admin | Support Admin |
|-------------------------|-------------|----------------|---------------|---------------|
| System Configuration    | ✓           | ✗              | ✗             | ✗             |
| Create Admins          | ✓           | ✗              | ✗             | ✗             |
| Manage Media Houses    | ✓           | ✓              | ✗             | ✗             |
| Process Payments       | ✓           | ✓              | ✗             | ✗             |
| Content Moderation     | ✓           | ✓              | ✓             | ✗             |
| User Management        | ✓           | ✓              | ✗             | ✓             |
| View Analytics         | ✓           | ✓              | ✓             | ✓             |

## Content Moderationhope all the webapplication and android,ios applications are done and go for deploying 

### Article Moderation
1. **Approval Workflow**
   ```typescript
   interface ArticleModeration {
     status: 'pending' | 'approved' | 'rejected' | 'featured';
     moderatorId: string;
     moderationDate: string;
     comments?: string;
     qualityScore: number;
     factCheckRequired: boolean;
   }
   ```

2. **Quality Control**
   - Content guidelines compliance
   - Fact verification
   - Image/video moderation
   - Language appropriateness
   - Source credibility

3. **Automated Checks**
   - Plagiarism detection
   - Hate speech detection
   - Adult content filtering
   - Spam detection

### Comment Moderation
- Automated filtering
- User reports handling
- Toxic comment detection
- Shadow banning capabilities

## User Management

### Journalist Verification
1. **KYC Process**
   ```typescript
   interface JournalistVerification {
     documents: {
       idProof: string;
       addressProof: string;
       pressCard?: string;
     };
     verificationStatus: 'pending' | 'verified' | 'rejected';
     verifierNotes: string;
     verificationDate?: string;
   }
   ```

2. **Performance Monitoring**
   - Article quality metrics
   - User engagement
   - Fact-check scores
   - Response to feedback

### User Moderation
1. **Account Actions**
   - Suspend account
   - Delete account
   - Reset password
   - Modify permissions

2. **Violation Handling**
   ```typescript
   interface UserViolation {
     type: 'spam' | 'abuse' | 'fake_news' | 'inappropriate_content';
     severity: 'low' | 'medium' | 'high';
     action: 'warning' | 'temporary_ban' | 'permanent_ban';
     duration?: number; // in days
     notes: string;
   }
   ```

## Payment Management

### Journalist Payments
1. **Payment Processing**
   ```typescript
   interface PaymentProcessing {
     journalistId: string;
     amount: number;
     period: {
       start: string;
       end: string;
     };
     breakdown: {
       baseAmount: number;
       bonuses: number;
       deductions: number;
     };
     status: 'pending' | 'processing' | 'completed' | 'failed';
   }
   ```

2. **Payment Verification**
   - Earnings calculation
   - Bonus verification
   - Tax deduction
   - Payment gateway integration

### Revenue Management
1. **Subscription Management**
   - Plan configuration
   - Billing cycles
   - Payment processing
   - Refund handling

2. **Advertising Revenue**
   - Campaign billing
   - Revenue sharing
   - Payment collection
   - Invoice generation

## Media House Management

### Account Verification
1. **Document Verification**
   - Business registration
   - Tax documents
   - Press credentials
   - Bank details

2. **Access Control**
   ```typescript
   interface MediaHouseAccess {
     maxJournalists: number;
     maxArticlesPerDay: number;
     features: string[];
     customization: boolean;
     apiAccess: boolean;
   }
   ```

### Content Management
1. **Publishing Rights**
   - Article quotas
   - Category restrictions
   - Regional limitations
   - Quality requirements

2. **Performance Monitoring**
   - Content quality
   - User engagement
   - Revenue generation
   - Compliance adherence

## Advertiser Management

### Campaign Oversight
1. **Ad Review Process**
   ```typescript
   interface AdReview {
     campaignId: string;
     status: 'pending' | 'approved' | 'rejected';
     reviewerId: string;
     checkpoints: {
       content: boolean;
       targeting: boolean;
       budget: boolean;
       compliance: boolean;
     };
     feedback: string;
   }
   ```

2. **Performance Monitoring**
   - Spend tracking
   - ROI analysis
   - Engagement metrics
   - Compliance checking

### Budget Management
1. **Spend Control**
   - Budget allocation
   - Spend limits
   - Payment processing
   - Refund handling

2. **Revenue Optimization**
   - Pricing strategy
   - Inventory management
   - Campaign optimization
   - Performance analysis

## Analytics & Reporting

### System Analytics
1. **Performance Metrics**
   ```typescript
   interface SystemMetrics {
     userMetrics: {
       activeUsers: number;
       newRegistrations: number;
       retentionRate: number;
     };
     contentMetrics: {
       articlesPublished: number;
       totalViews: number;
       engagementRate: number;
     };
     revenueMetrics: {
       totalRevenue: number;
       subscriptionRevenue: number;
       adRevenue: number;
     };
   }
   ```

2. **User Analytics**
   - Demographics
   - Behavior patterns
   - Content preferences
   - Device usage

### Financial Reports
1. **Revenue Reports**
   - Daily/weekly/monthly reports
   - Revenue breakdown
   - Payment reconciliation
   - Tax reports

2. **Expense Tracking**
   - Journalist payments
   - Operating costs
   - Marketing expenses
   - Infrastructure costs

## System Configuration

### Platform Settings
1. **General Configuration**
   ```typescript
   interface SystemConfig {
     features: {
       userRegistration: boolean;
       comments: boolean;
       socialSharing: boolean;
     };
     limits: {
       maxUploadSize: number;
       articleLength: number;
       commentLength: number;
     };
     security: {
       passwordPolicy: object;
       sessionTimeout: number;
       ipWhitelist: string[];
     };
   }
   ```

2. **Content Settings**
   - Category management
   - Language settings
   - Region configuration
   - Template management

### Security Settings
1. **Access Control**
   - IP whitelisting
   - 2FA requirements
   - Session management
   - API key management

2. **Audit Logs**
   - User actions
   - System changes
   - Security events
   - Error logs

## Emergency Procedures

### Critical Issues
1. **Content Crisis**
   - Fake news outbreak
   - Controversial content
   - Legal issues
   - Copyright violations

2. **System Issues**
   - Service disruption
   - Data breach
   - Payment issues
   - API failures

### Response Protocol
1. **Immediate Actions**
   - Issue assessment
   - Team notification
   - User communication
   - System lockdown (if required)

2. **Resolution Steps**
   - Problem investigation
   - Solution implementation
   - User notification
   - Prevention measures

## Support Resources

### Documentation
- System architecture
- API documentation
- User guides
- Training materials

### Contact Information
- Emergency contacts
- Support team
- Legal team
- Technical team