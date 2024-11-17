import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShareIcon, BookmarkIcon, FlagIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../hooks/useAuth';
import { NewsArticle } from '../../types/news';
import ReportModal from '../modals/ReportModal';
import CommentSection from '../comments/CommentSection';
import AdSpace from '../ads/AdSpace';

interface ArticleDetailProps {
  article: NewsArticle;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Implement bookmark logic
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${article.authorName}`}
            alt={article.authorName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium">{article.authorName}</h3>
            <p className="text-sm text-gray-500">{article.region}</p>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-4">
            <button onClick={handleShare}>
              <ShareIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button onClick={toggleBookmark}>
              {isBookmarked ? (
                <BookmarkSolidIcon className="h-5 w-5 text-red-600" />
              ) : (
                <BookmarkIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <button onClick={() => setShowReportModal(true)}>
              <FlagIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />

      <div className="prose max-w-none mb-8">
        {article.content}
      </div>

      <AdSpace placement="article_content" />

      {user && <CommentSection articleId={article.id} />}

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        articleId={article.id}
      />
    </article>
  );
}