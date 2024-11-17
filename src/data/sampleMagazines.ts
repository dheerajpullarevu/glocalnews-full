import { Magazine } from '../types/magazine';

export const sampleMagazines: Magazine[] = [
  {
    id: '1',
    title: 'Tech Trends 2024',
    coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60',
    description: 'Exploring the latest technological innovations shaping our future',
    pages: [
      { pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60' },
      { pageNumber: 2, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60' },
      { pageNumber: 3, imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60' }
    ],
    category: 'Technology',
    language: 'English',
    publishedAt: new Date().toISOString(),
    author: 'Tech Team',
    readTime: 15,
    featured: true
  },
  {
    id: '2',
    title: 'भारत का विकास',
    coverImage: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=60',
    description: 'भारत के विकास की कहानी और आने वाले समय में इसकी संभावनाएं',
    pages: [
      { pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=60' },
      { pageNumber: 2, imageUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&auto=format&fit=crop&q=60' },
      { pageNumber: 3, imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=60' }
    ],
    category: 'Development',
    language: 'Hindi',
    publishedAt: new Date().toISOString(),
    author: 'Development Team',
    readTime: 20,
    featured: true
  },
  {
    id: '3',
    title: 'తెలంగాణ సంస్కృతి',
    coverImage: 'https://images.unsplash.com/photo-1623091411395-09e79fdbfcf5?w=800&auto=format&fit=crop&q=60',
    description: 'తెలంగాణ సంస్కృతి మరియు సంప్రదాయాలపై ప్రత్యేక కథనం',
    pages: [
      { pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1623091411395-09e79fdbfcf5?w=800&auto=format&fit=crop&q=60' },
      { pageNumber: 2, imageUrl: 'https://images.unsplash.com/photo-1623091411395-09e79fdbfcf5?w=800&auto=format&fit=crop&q=60' },
      { pageNumber: 3, imageUrl: 'https://images.unsplash.com/photo-1623091411395-09e79fdbfcf5?w=800&auto=format&fit=crop&q=60' }
    ],
    category: 'Culture',
    language: 'Telugu',
    publishedAt: new Date().toISOString(),
    author: 'Culture Team',
    readTime: 25,
    featured: false
  }
];