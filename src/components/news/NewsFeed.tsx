import { useState, useEffect } from 'react';
import { NewsArticle } from '../../types/news';
import { sampleNews } from '../../data/sampleNews';
import NewsCard from './NewsCard';
import NewsSkeletonLoader from './NewsSkeletonLoader';
import AdSpace from '../ads/AdSpace';

export default function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setArticles(sampleNews);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, index) => (
          <NewsSkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  // Insert ads every 3 articles
  const contentWithAds = articles.reduce((acc: (NewsArticle | 'ad')[], article, index) => {
    acc.push(article);
    if ((index + 1) % 3 === 0 && index !== articles.length - 1) {
      acc.push('ad');
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {contentWithAds.map((item, index) => (
        item === 'ad' ? (
          <AdSpace key={`ad-${index}`} placement="feed_inline" />
        ) : (
          <NewsCard key={item.id} article={item} />
        )
      ))}
    </div>
  );
}