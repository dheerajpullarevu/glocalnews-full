import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticleManager from './ArticleManager';
import UserManager from './UserManager';
import Analytics from './Analytics';
import MediaManager from '../../components/media/MediaManager';
import CommentModeration from '../../components/comments/CommentModeration';
import CarouselManager from './CarouselManager';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  UsersIcon,
  PhotoIcon,
  ChatBubbleLeftIcon,
  ViewfinderCircleIcon
} from '@heroicons/react/24/outline';

const AdminPanel: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-4 space-y-2">
          <Link
            to="/admin/articles"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
          >
            <DocumentTextIcon className="h-5 w-5 text-gray-500" />
            <span>{t('articles')}</span>
          </Link>
          <Link
            to="/admin/carousel"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
          >
            <ViewfinderCircleIcon className="h-5 w-5 text-gray-500" />
            <span>Carousel</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
          >
            <UsersIcon className="h-5 w-5 text-gray-500" />
            <span>{t('users')}</span>
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
          >
            <ChartBarIcon className="h-5 w-5 text-gray-500" />
            <span>{t('analytics')}</span>
          </Link>
          <Link
            to="/admin/media"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
          >
            <PhotoIcon className="h-5 w-5 text-gray-500" />
            <span>{t('media')}</span>
          </Link>
          <Link
            to="/admin/comments"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
          >
            <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500" />
            <span>{t('comments')}</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Routes>
          <Route path="articles/*" element={<ArticleManager />} />
          <Route path="carousel" element={<CarouselManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="comments" element={<CommentModeration />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;