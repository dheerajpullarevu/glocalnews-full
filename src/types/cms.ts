interface StaticPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'published' | 'draft';
  language: string;
}

interface AppScreenshot {
  id: string;
  platform: 'android' | 'ios';
  imageUrl: string;
  title: string;
  description: string;
  order: number;
}

interface JournalistArticle {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'story' | 'magazine';
  status: 'draft' | 'pending' | 'published' | 'rejected';
  authorId: string;
  category: string;
  language: string;
  images: string[];
  publishedAt?: string;
  featuredImage?: string;
  tags: string[];
}

export type { StaticPage, AppScreenshot, JournalistArticle };