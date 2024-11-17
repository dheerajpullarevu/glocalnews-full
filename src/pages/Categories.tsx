import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { NewsArticle } from '../types/news';
import NewsCard from '../components/news/NewsCard';
import AdSpace from '../components/ads/AdSpace';

export default function Categories() {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetchCategoryArticles();
    }
  }, [category]);

  const fetchCategoryArticles = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        where('category', '==', category),
        orderBy('publishedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching category articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{category} News</h1>

      <AdSpace placement="category_header" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {articles.map((article, index) => (
          <>
            <NewsCard key={article.id} article={article} />
            {(index + 1) % 6 === 0 && (
              <div className="col-span-full">
                <AdSpace placement="feed_inline" />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}