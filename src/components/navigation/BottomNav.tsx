import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ChartBarIcon, 
  GlobeAltIcon, 
  BookmarkIcon,
  VideoCameraIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center ${
            isActive('/') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <HomeIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/shorts"
          className={`flex flex-col items-center ${
            isActive('/shorts') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <VideoCameraIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Shorts</span>
        </Link>

        <Link
          to="/trending"
          className={`flex flex-col items-center ${
            isActive('/trending') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <ChartBarIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Trending</span>
        </Link>

        <Link
          to="/local"
          className={`flex flex-col items-center ${
            isActive('/local') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <GlobeAltIcon className="h-6 w-6" />
          <span className="text-xs mt-1">Local</span>
        </Link>

        {user && (
          <Link
            to="/bookmarks"
            className={`flex flex-col items-center ${
              isActive('/bookmarks') ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <BookmarkIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Saved</span>
          </Link>
        )}
      </div>
    </nav>
  );
}