import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { NewsArticle } from '../../types/news';
import { sampleNews } from '../../data/sampleNews';

export default function NewsCarousel() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedArticles();
  }, []);

  const fetchFeaturedArticles = async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        where('featured', '==', true),
        orderBy('publishedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const featuredArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsArticle[];
      
      // If no featured articles in Firebase, use sample news
      setArticles(featuredArticles.length > 0 ? featuredArticles : sampleNews.filter(article => article.featured));
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      // Fallback to sample news
      setArticles(sampleNews.filter(article => article.featured));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  if (loading) {
    return <div className="h-96 bg-gray-100 animate-pulse rounded-xl" />;
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-xl h-[500px]">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="min-w-full relative"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <Link 
                to={`/news/${article.id}`}
                className="block group"
              >
                <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-white/80 line-clamp-2">
                  {article.summary}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}