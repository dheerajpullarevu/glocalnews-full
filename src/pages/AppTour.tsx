import { useState } from 'react';
import AppPromotion from '../components/app/AppPromotion';

const features = [
  {
    title: 'Hyperlocal News',
    description: 'Get news from your locality in your preferred language',
    icon: '📰'
  },
  {
    title: 'Live News Channels',
    description: 'Watch live news channels and video updates',
    icon: '📺'
  },
  {
    title: 'Multi-language Support',
    description: 'Read news in 8+ Indian languages',
    icon: '🗣️'
  },
  {
    title: 'Video Shorts',
    description: 'Quick video updates in a vertical scrolling format',
    icon: '📱'
  },
  {
    title: 'Fact Check',
    description: 'Verified news with fact-checking system',
    icon: '✅'
  },
  {
    title: 'Breaking News Alerts',
    description: 'Stay updated with instant notifications',
    icon: '🔔'
  }
];

export default function AppTour() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Experience Glocal News</h1>
        <p className="text-xl text-gray-600">Your window to local and global news</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-red-50 rounded-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Why Choose Glocal News?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">10M+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">8+</div>
              <div className="text-gray-600">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 mb-2">1000+</div>
              <div className="text-gray-600">Local Reporters</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Download Now</h2>
        <p className="text-gray-600 mb-8">
          Get started with Glocal News today
        </p>
        <AppPromotion />
      </div>
    </div>
  );
}