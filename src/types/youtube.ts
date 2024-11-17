export interface YouTubeChannel {
  id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  isLive: boolean;
  language: string;
  region: string;
  category: string;
  priority: number;
}

export interface YouTubeVideo {
  id: string;
  videoId: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  language: string;
  category: string;
  tags: string[];
}