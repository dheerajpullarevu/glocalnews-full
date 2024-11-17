export interface Magazine {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  pages: {
    pageNumber: number;
    imageUrl: string;
  }[];
  category: string;
  language: string;
  publishedAt: string;
  author: string;
  readTime: number;
  featured: boolean;
}