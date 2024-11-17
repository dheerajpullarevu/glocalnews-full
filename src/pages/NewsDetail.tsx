import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { NewsArticle } from '../types/news';
import AdSpace from '../components/ads/AdSpace';

export default function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() } as NewsArticle);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          {/* Author info and date */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${article.authorName}`}
              alt={article.authorName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{article.authorName}</p>
              <p className="text-sm text-gray-500">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Featured image */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          {/* Article content with inline ad */}
          <div className="prose max-w-none">
            <div className="mb-6">{article.content.slice(0, 500)}</div>
            <AdSpace placement="article_content" className="my-6" />
            <div>{article.content.slice(500)}</div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <AdSpace placement="article_sidebar" />
            {/* Other sidebar content */}
          </div>
        </div>
      </div>

      {/* Sticky bottom ad */}
      <AdSpace placement="sticky_bottom" />
    </div>
  );
}