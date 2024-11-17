import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import { NewsArticle } from '../types/news';
import NewsCard from '../components/news/NewsCard';
import AdSpace from '../components/ads/AdSpace';

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const q = query(
        collection(db, 'articles'),
        where('searchKeywords', 'array-contains', searchTerm.toLowerCase()),
        orderBy('publishedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const searchResults = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as DocumentData
      })) as NewsArticle[];
      setArticles(searchResults);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same
}