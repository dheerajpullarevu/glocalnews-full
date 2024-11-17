import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { YouTubeVideo } from '../../types/youtube';
import { useTranslation } from 'react-i18next';

export default function NewsVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const q = query(
        collection(db, 'youtubeVideos'),
        orderBy('publishedAt', 'desc'),
        limit(12)
      );
      const snapshot = await getDocs(q);
      const fetchedVideos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as YouTubeVideo[];
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('youtube.newsVideos')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative pb-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">
                  {new Date(video.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  {video.viewCount.toLocaleString()} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}