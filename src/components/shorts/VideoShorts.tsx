import { useState, useEffect, useRef } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ShareIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface VideoShort {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
  authorName: string;
  authorImage: string;
  likes: number;
  comments: number;
}

export default function VideoShorts() {
  const [shorts, setShorts] = useState<VideoShort[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});

  useEffect(() => {
    fetchShorts();
  }, []);

  useEffect(() => {
    // Pause all videos except current one
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (id === shorts[currentIndex]?.id) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    });
  }, [currentIndex, shorts]);

  const fetchShorts = async () => {
    try {
      const q = query(
        collection(db, 'shorts'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const fetchedShorts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VideoShort[];
      setShorts(fetchedShorts);
    } catch (error) {
      console.error('Error fetching shorts:', error);
    }
  };

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < shorts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    trackMouse: true
  });

  const handleShare = async (short: VideoShort) => {
    const shareData = {
      title: short.title,
      text: short.description,
      url: `${window.location.origin}/shorts/${short.id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to custom share dialog
        openShareDialog(shareData);
      }
    } else {
      openShareDialog(shareData);
    }
  };

  const openShareDialog = (shareData: { title: string; text: string; url: string }) => {
    // Implement custom share dialog
  };

  const toggleLike = (shortId: string) => {
    setLiked(prev => ({ ...prev, [shortId]: !prev[shortId] }));
  };

  return (
    <div className="h-screen bg-black" {...handlers}>
      <div
        className="h-full transition-transform duration-300"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`
        }}
      >
        {shorts.map((short, index) => (
          <div key={short.id} className="h-full relative">
            <video
              ref={el => el && (videoRefs.current[short.id] = el)}
              src={short.videoUrl}
              className="w-full h-full object-cover"
              loop
              playsInline
              muted={false}
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{short.title}</h3>
                  <p className="text-white/80 text-sm">{short.description}</p>
                  <div className="flex items-center mt-2">
                    <img
                      src={short.authorImage}
                      alt={short.authorName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 text-white">{short.authorName}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={() => toggleLike(short.id)}
                    className="p-2"
                  >
                    {liked[short.id] ? (
                      <HeartSolidIcon className="h-8 w-8 text-red-500" />
                    ) : (
                      <HeartIcon className="h-8 w-8 text-white" />
                    )}
                    <span className="text-white text-xs">{short.likes}</span>
                  </button>
                  
                  <button className="p-2">
                    <ChatBubbleLeftIcon className="h-8 w-8 text-white" />
                    <span className="text-white text-xs">{short.comments}</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare(short)}
                    className="p-2"
                  >
                    <ShareIcon className="h-8 w-8 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}