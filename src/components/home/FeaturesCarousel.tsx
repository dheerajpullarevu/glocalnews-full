import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Hyperlocal News',
    description: 'Get news from your locality in your preferred language',
    icon: '📰',
    color: 'bg-red-100'
  },
  {
    title: 'Live News Channels',
    description: 'Watch live news channels and video updates',
    icon: '📺',
    color: 'bg-blue-100'
  },
  {
    title: 'Multi-language Support',
    description: 'Read news in 8+ Indian languages',
    icon: '🗣️',
    color: 'bg-green-100'
  },
  {
    title: 'Video Shorts',
    description: 'Quick video updates in a vertical scrolling format',
    icon: '📱',
    color: 'bg-purple-100'
  },
  {
    title: 'Fact Check',
    description: 'Verified news with fact-checking system',
    icon: '✅',
    color: 'bg-yellow-100'
  },
  {
    title: 'Breaking News Alerts',
    description: 'Stay updated with instant notifications',
    icon: '🔔',
    color: 'bg-orange-100'
  }
];

export default function FeaturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(features.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(features.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(features.length / 3)) % Math.ceil(features.length / 3));
  };

  return (
    <div className="relative overflow-hidden py-12">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {Array.from({ length: Math.ceil(features.length / 3) }).map((_, groupIndex) => (
          <div key={groupIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {features.slice(groupIndex * 3, (groupIndex + 1) * 3).map((feature) => (
              <div
                key={feature.title}
                className={`${feature.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(features.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-red-600' : 'bg-red-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}