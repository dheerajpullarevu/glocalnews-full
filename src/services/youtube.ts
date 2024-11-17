import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { YouTubeChannel, YouTubeVideo } from '../types/youtube';

export async function syncYouTubeChannel(channelId: string) {
  try {
    // Fetch channel data from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    const channel = data.items[0];

    const channelData: Omit<YouTubeChannel, 'id'> = {
      channelId: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      thumbnailUrl: channel.snippet.thumbnails.high.url,
      isLive: false, // Will be updated by checking live status
      language: channel.snippet.defaultLanguage || 'en',
      region: channel.snippet.country || 'IN',
      category: 'news',
      priority: 0
    };

    await addDoc(collection(db, 'youtubeChannels'), channelData);
    return channelData;
  } catch (error) {
    console.error('Error syncing YouTube channel:', error);
    throw error;
  }
}

export async function syncYouTubeVideos(channelId: string) {
  try {
    // Fetch latest videos from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    const videos = await Promise.all(
      data.items.map(async (item: any) => {
        // Get video details including duration and view count
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${item.id.videoId}&key=${process.env.YOUTUBE_API_KEY}`
        );
        const videoData = await videoResponse.json();
        const videoDetails = videoData.items[0];

        const videoDoc: Omit<YouTubeVideo, 'id'> = {
          videoId: item.id.videoId,
          channelId: item.snippet.channelId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          duration: videoDetails.contentDetails.duration,
          viewCount: parseInt(videoDetails.statistics.viewCount),
          language: item.snippet.defaultLanguage || 'en',
          category: 'news',
          tags: item.snippet.tags || []
        };

        await addDoc(collection(db, 'youtubeVideos'), videoDoc);
        return videoDoc;
      })
    );

    return videos;
  } catch (error) {
    console.error('Error syncing YouTube videos:', error);
    throw error;
  }
}