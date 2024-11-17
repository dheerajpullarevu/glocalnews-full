import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { YouTubeChannel, YouTubeVideo } from '../../types/youtube';
import { useTranslation } from 'react-i18next';

export default function YouTubeManager() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchChannels();
    fetchVideos();
  }, []);

  const fetchChannels = async () => {
    try {
      const q = query(collection(db, 'youtubeChannels'), orderBy('priority'));
      const snapshot = await getDocs(q);
      const fetchedChannels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as YouTubeChannel[];
      setChannels(fetchedChannels);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const q = query(collection(db, 'youtubeVideos'), orderBy('publishedAt', 'desc'));
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

  const addChannel = async (channelData: Omit<YouTubeChannel, 'id'>) => {
    try {
      await addDoc(collection(db, 'youtubeChannels'), channelData);
      fetchChannels();
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  };

  const updateChannel = async (channelId: string, data: Partial<YouTubeChannel>) => {
    try {
      await updateDoc(doc(db, 'youtubeChannels', channelId), data);
      fetchChannels();
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('youtube.title')}</h2>
        <button
          onClick={() => {/* Open add channel modal */}}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {t('youtube.addChannel')}
        </button>
      </div>

      {/* Live Channels Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{t('youtube.liveChannels')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.filter(channel => channel.isLive).map((channel) => (
            <div key={channel.id} className="border rounded-lg p-4">
              <img
                src={channel.thumbnailUrl}
                alt={channel.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h4 className="font-semibold">{channel.title}</h4>
              <p className="text-sm text-gray-600">{channel.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-red-600 text-sm">● Live</span>
                <button
                  onClick={() => updateChannel(channel.id, { isLive: false })}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  {t('youtube.endLive')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Videos Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{t('youtube.videos')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="border rounded-lg p-4">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h4 className="font-semibold">{video.title}</h4>
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
          ))}
        </div>
      </div>
    </div>
  );
}