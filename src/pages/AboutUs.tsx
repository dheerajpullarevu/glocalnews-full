import { Link } from 'react-router-dom';
import AppPromotion from '../components/app/AppPromotion';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Glocal News</h1>
        <p className="text-xl text-gray-600">Bridging Local Stories with Global Audiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <img
            src="/images/about-hero.jpg"
            alt="Glocal News Team"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="text-gray-600">
            Founded in 2023, Glocal News emerged from a simple yet powerful idea: every local story matters. 
            We recognized the gap between grassroots journalism and digital accessibility, particularly in 
            regional languages. Today, we're India's fastest-growing hyperlocal news platform, connecting 
            communities through authentic, verified news in their preferred language.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">8+</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">500K+</div>
              <div className="text-sm text-gray-600">Daily Readers</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">1000+</div>
              <div className="text-sm text-gray-600">Journalists</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">28</div>
              <div className="text-sm text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="font-semibold mb-2">Empower Local Voices</h3>
            <p className="text-gray-600">Supporting grassroots journalism and local storytelling</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold mb-2">Ensure Truth</h3>
            <p className="text-gray-600">Rigorous fact-checking and verification processes</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold mb-2">Connect Communities</h3>
            <p className="text-gray-600">Bringing people together through shared stories</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="/images/ceo.jpg"
              alt="CEO"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">Rajesh Kumar</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="text-center">
            <img
              src="/images/cto.jpg"
              alt="CTO"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">Priya Sharma</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
          <div className="text-center">
            <img
              src="/images/editor.jpg"
              alt="Editor"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold">Anand Rao</h3>
            <p className="text-gray-600">Editor-in-Chief</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
        <p className="text-gray-600 mb-8">
          Be part of the Glocal News community and help us bring local stories to global audiences.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/become-journalist"
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Become a Journalist
          </Link>
          <Link
            to="/advertise"
            className="px-6 py-3 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
          >
            Advertise with Us
          </Link>
        </div>
      </div>
    </div>
  );
}