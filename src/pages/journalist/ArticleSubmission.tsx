import { useAuth } from '../../hooks/useAuth';
import MobileRedirect from './MobileRedirect';

export default function ArticleSubmission() {
  const { user } = useAuth();
  const isMobileBrowser = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Redirect independent journalists to mobile app
  if (user?.type === 'independent' && !isMobileBrowser) {
    return <MobileRedirect />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Submit Article</h1>
      {/* Article submission form */}
    </div>
  );
}