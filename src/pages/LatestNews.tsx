import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { NewsArticle } from '../types/news';
import NewsCard from '../components/news/NewsCard';
import AdSpace from '../components/ads/AdSpace';
import { sampleNews } from '../data/sampleNews';

export default function LatestNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        orderBy('publishedAt', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      
      // If no articles in Firebase, use sample news
      setArticles(fetchedArticles.length > 0 ? fetchedArticles : sampleNews);
    } catch (error) {
      console.error('Error fetching latest news:', error);
      // Fallback to sample news
      setArticles(sampleNews);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={`${article.id}-container`}>
            <NewsCard article={article} />
            {(index + 1) % 6 === 0 && (
              <div className="col-span-full mt-6">
                <AdSpace placement="feed_inline" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}