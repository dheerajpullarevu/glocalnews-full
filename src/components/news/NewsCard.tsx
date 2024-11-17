import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types/news';
import { useTranslation } from 'react-i18next';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium text-red-600">{article.category}</span>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <Link to={`/news/${article.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-red-600">
            {article.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={`https://ui-avatars.com/api/?name=${article.authorName}`}
              alt={article.authorName}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">{article.authorName}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{article.views} {t('views')}</span>
            <span>{article.likes} {t('likes')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}