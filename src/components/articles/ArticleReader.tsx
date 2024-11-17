import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { NewsArticle } from '../../types/news';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

export default function ArticleReader() {
  const { id } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (article && !utterance) {
      const newUtterance = new SpeechSynthesisUtterance(article.content);
      newUtterance.lang = article.language;
      setUtterance(newUtterance);
    }
  }, [article]);

  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
    } else if (utterance) {
      window.speechSynthesis.speak(utterance);
    }
    setIsReading(!isReading);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleReading}
        className="fixed bottom-4 right-4 p-3 bg-red-600 text-white rounded-full shadow-lg"
        aria-label={isReading ? 'Stop reading' : 'Start reading'}
      >
        {isReading ? (
          <SpeakerXMarkIcon className="h-6 w-6" />
        ) : (
          <SpeakerWaveIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}