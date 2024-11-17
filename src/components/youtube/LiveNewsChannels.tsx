import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { YouTubeChannel } from '../../types/youtube';
import { useTranslation } from 'react-i18next';

export default function LiveNewsChannels() {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchLiveChannels();
  }, []);

  const fetchLiveChannels = async () => {
    try {
      const q = query(
        collection(db, 'youtubeChannels'),
        where('isLive', '==', true),
        orderBy('priority')
      );
      const snapshot = await getDocs(q);
      const liveChannels = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as YouTubeChannel[];
      setChannels(liveChannels);
    } catch (error) {
      console.error('Error fetching live channels:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('youtube.liveNews')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((channel) => (
          <div key={channel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative pb-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/live_stream?channel=${channel.channelId}&autoplay=0`}
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{channel.title}</h3>
              <p className="text-sm text-gray-600">{channel.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-red-600 text-sm">● Live</span>
                <span className="text-sm text-gray-500 ml-2">{channel.language}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}