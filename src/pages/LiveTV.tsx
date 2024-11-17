import LiveNewsChannels from '../components/youtube/LiveNewsChannels';
import NewsVideos from '../components/youtube/NewsVideos';

export default function LiveTV() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <LiveNewsChannels />
      <NewsVideos />
    </div>
  );
}