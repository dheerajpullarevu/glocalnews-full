import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsCarousel from '../components/home/NewsCarousel';
import FeaturesCarousel from '../components/home/FeaturesCarousel';
import ReviewsCarousel from '../components/home/ReviewsCarousel';
import DigitalMagazineSection from '../components/home/DigitalMagazineSection';
import AppPromotion from '../components/app/AppPromotion';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="space-y-12">
      {/* Hero Section with News Carousel */}
      <section>
        <NewsCarousel />
      </section>

      {/* Features Carousel */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('home.features')}
          </h2>
          <FeaturesCarousel />
        </div>
      </section>

      {/* Digital Magazine Section */}
      <DigitalMagazineSection />

      {/* Reviews Section */}
      <ReviewsCarousel />

      {/* App Download Section */}
      <section className="bg-red-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            {t('home.downloadApp')}
          </h2>
          <AppPromotion />
        </div>
      </section>
    </div>
  );
}