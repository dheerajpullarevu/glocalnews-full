import { useEffect, useState } from 'react';
import { Ad, AdPlacement } from '../../types/ads';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useLocation } from 'react-router-dom';

interface AdSpaceProps {
  placement: AdPlacement;
  className?: string;
}

export default function AdSpace({ placement, className = '' }: AdSpaceProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const q = query(
          collection(db, 'ads'),
          where('placement', '==', placement),
          where('status', '==', 'active')
        );
        
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          // Get a random ad from available ones
          const ads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ad));
          const randomAd = ads[Math.floor(Math.random() * ads.length)];
          setAd(randomAd);
          
          // Record impression
          recordImpression(randomAd.id);
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      }
    };

    fetchAd();
  }, [placement, location.pathname]);

  const recordImpression = async (adId: string) => {
    // Implement impression tracking
  };

  const handleClick = async () => {
    if (!ad) return;
    
    // Record click
    try {
      // Implement click tracking
      window.open(ad.targetUrl, '_blank');
    } catch (error) {
      console.error('Error recording click:', error);
    }
  };

  if (!ad) return null;

  const adStyle = {
    width: ad.customSize?.width || getDefaultSize(ad.size).width,
    height: ad.customSize?.height || getDefaultSize(ad.size).height,
  };

  return (
    <div 
      className={`ad-space ${getPlacementClass(placement)} ${className}`}
      style={adStyle}
    >
      {ad.platform === 'internal' ? (
        <button
          onClick={handleClick}
          className="w-full h-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {ad.imageUrl && (
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          )}
          {!ad.imageUrl && (
            <div className="w-full h-full bg-gray-100 p-4">
              <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
              {ad.description && (
                <p className="text-sm text-gray-600">{ad.description}</p>
              )}
            </div>
          )}
        </button>
      ) : (
        // Render Google Ads or Meta Ads component
        <div id={`ad-${ad.id}`} className="w-full h-full" />
      )}
    </div>
  );
}

function getDefaultSize(size: Ad['size']) {
  switch (size) {
    case 'banner':
      return { width: 468, height: 60 };
    case 'leaderboard':
      return { width: 728, height: 90 };
    case 'medium_rectangle':
      return { width: 300, height: 250 };
    case 'large_rectangle':
      return { width: 336, height: 280 };
    case 'skyscraper':
      return { width: 160, height: 600 };
    default:
      return { width: 300, height: 250 };
  }
}

function getPlacementClass(placement: AdPlacement): string {
  switch (placement) {
    case 'feed_inline':
      return 'my-4';
    case 'article_sidebar':
      return 'sticky top-4';
    case 'article_content':
      return 'my-6 mx-auto';
    case 'sticky_bottom':
      return 'fixed bottom-0 left-0 right-0 bg-white shadow-up';
    case 'category_header':
      return 'mb-6';
    default:
      return '';
  }
}