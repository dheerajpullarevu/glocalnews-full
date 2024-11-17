import { useState, useEffect } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { NewsArticle } from '../../types/news';
import ArticleDetail from './ArticleDetail';

export default function ArticleSwiper() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        orderBy('publishedAt', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < articles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    trackMouse: true
  });

  if (!articles.length) return null;

  return (
    <div {...handlers} className="h-full relative overflow-hidden">
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${articles.length * 100}%`
        }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="w-full flex-shrink-0"
          >
            <ArticleDetail article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}