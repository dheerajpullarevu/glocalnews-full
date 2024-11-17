import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { NewsArticle } from '../types/news';
import NewsCard from '../components/news/NewsCard';
import LocationSelector from '../components/location/LocationSelector';
import AdSpace from '../components/ads/AdSpace';

export default function LocalNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({
    state: '',
    district: '',
    mandal: ''
  });

  useEffect(() => {
    if (selectedLocation.state) {
      fetchLocalArticles();
    }
  }, [selectedLocation]);

  const fetchLocalArticles = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        where('location.state', '==', selectedLocation.state),
        ...(selectedLocation.district ? [where('location.district', '==', selectedLocation.district)] : []),
        ...(selectedLocation.mandal ? [where('location.mandal', '==', selectedLocation.mandal)] : []),
        orderBy('publishedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching local articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Local News</h1>
        <LocationSelector
          selectedLocation={selectedLocation}
          onChange={setSelectedLocation}
        />
      </div>

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