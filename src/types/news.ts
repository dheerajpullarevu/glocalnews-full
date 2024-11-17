export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  category: string;
  language: string;
  region: string;
  location: {
    state: string;
    district: string;
    mandal: string;
    village?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  publishedAt: string;
  tags: string[];
  likes: number;
  views: number;
  featured?: boolean; // Added for carousel feature
}