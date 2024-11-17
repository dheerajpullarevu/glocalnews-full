import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { NewsArticle } from '../../types/news';

export default function Portfolio() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalLikes: 0,
    avgEngagement: 0
  });

  useEffect(() => {
    if (user) {
      fetchPortfolio();
    }
  }, [user]);

  const fetchPortfolio = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        where('authorId', '==', user?.id)
      );
      const snapshot = await getDocs(q);
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      
      setArticles(fetchedArticles);
      calculateStats(fetchedArticles);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (articles: NewsArticle[]) => {
    const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
    const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
    const avgEngagement = articles.length > 0 ? (totalLikes / totalViews) * 100 : 0;

    setStats({ totalViews, totalLikes, avgEngagement });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
          <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Likes</h3>
          <p className="text-3xl font-bold">{stats.totalLikes.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
          <p className="text-3xl font-bold">{stats.avgEngagement.toFixed(2)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Published Articles</h2>
        </div>
        <div className="divide-y">
          {articles.map((article) => (
            <div key={article.id} className="p-6">
              <div className="flex items-start">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-2">{article.summary}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{article.views} views</span>
                    <span className="mx-2">•</span>
                    <span>{article.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}