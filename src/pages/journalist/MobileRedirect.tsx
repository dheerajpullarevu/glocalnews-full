import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppPromotion from '../../components/app/AppPromotion';

export default function MobileRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if accessing from mobile browser
    const isMobileBrowser = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobileBrowser) {
      navigate('/download-app');
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Please Use Our Mobile App
      </h1>
      <p className="text-gray-600 mb-8">
        Article submission is only available through our mobile application for better experience and features.
      </p>
      <AppPromotion />
    </div>
  );
}