import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const reviews = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Hyderabad',
    rating: 5,
    comment: 'Best app for local news! I get all updates from my area instantly.',
    image: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Bangalore',
    rating: 5,
    comment: 'Love the multi-language support. Finally, news in my mother tongue!',
    image: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    location: 'Chennai',
    rating: 4,
    comment: 'Great video content and live news channels. Very informative!',
    image: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Anjali Patel',
    location: 'Mumbai',
    rating: 5,
    comment: 'The fact-checking feature helps me trust the news I read.',
    image: 'https://i.pravatar.cc/150?img=4'
  }
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="relative overflow-hidden bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
        </div>

        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-full px-4"
            >
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{review.name}</h3>
                    <p className="text-gray-600">{review.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-lg italic">"{review.comment}"</p>
              </div>
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
          {reviews.map((_, index) => (
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
    </div>
  );
}