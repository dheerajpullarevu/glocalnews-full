import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppPromotion from '../components/app/AppPromotion';

export default function BecomeJournalist() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: '',
    experience: '',
    region: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Become a Glocal News Journalist
        </h1>
        <p className="text-xl text-gray-600">
          Turn your passion for storytelling into a rewarding career
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Why Join Us?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  💰
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Competitive Earnings</h3>
                <p className="mt-2 text-gray-600">
                  Earn up to ₹50,000/month through our performance-based payment system. Get paid for views, engagement, and quality content.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  📱
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Easy-to-use Platform</h3>
                <p className="mt-2 text-gray-600">
                  Our mobile app makes content creation and submission simple. Write, record, or use voice-to-text features.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  📈
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Growth Opportunities</h3>
                <p className="mt-2 text-gray-600">
                  Access training, mentorship, and opportunities to cover major events. Build your portfolio and reputation.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  🎯
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Reach Millions</h3>
                <p className="mt-2 text-gray-600">
                  Your stories reach our vast audience across India. Get recognized for your journalism.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Earning Potential</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">₹5</div>
                <div className="text-sm text-gray-600">Per 1000 Views</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">₹1000</div>
                <div className="text-sm text-gray-600">Breaking News Bonus</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">₹2000</div>
                <div className="text-sm text-gray-600">Exclusive Story Bonus</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">₹5000</div>
                <div className="text-sm text-gray-600">Monthly Top Performer</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Get Started</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold mb-2">Application Received!</h3>
                <p className="text-gray-600 mb-6">
                  Download our app to complete your registration and start publishing.
                </p>
                <AppPromotion />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Language</label>
                  <select
                    required
                    value={formData.language}
                    onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="">Select language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="telugu">Telugu</option>
                    <option value="tamil">Tamil</option>
                    <option value="kannada">Kannada</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="marathi">Marathi</option>
                    <option value="bengali">Bengali</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <select
                    required
                    value={formData.region}
                    onChange={e => setFormData(prev => ({ ...prev, region: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="">Select region</option>
                    <option value="north">North India</option>
                    <option value="south">South India</option>
                    <option value="east">East India</option>
                    <option value="west">West India</option>
                    <option value="central">Central India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                  <select
                    required
                    value={formData.experience}
                    onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="">Select experience</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">1-3 years</option>
                    <option value="experienced">3+ years</option>
                    <option value="professional">Professional Journalist</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="/images/journalist1.jpg"
              alt="Journalist"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 italic mb-2">
              "I earn ₹45,000 monthly covering local stories in my town. Glocal News has given me the platform to make journalism my full-time career."
            </p>
            <p className="font-medium">- Priya S., Karnataka</p>
          </div>
          <div className="text-center">
            <img
              src="/images/journalist2.jpg"
              alt="Journalist"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 italic mb-2">
              "Started as a part-time contributor, now I lead a team of local reporters. The growth opportunities here are incredible."
            </p>
            <p className="font-medium">- Rahul M., Maharashtra</p>
          </div>
          <div className="text-center">
            <img
              src="/images/journalist3.jpg"
              alt="Journalist"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600 italic mb-2">
              "The app makes it so easy to submit stories. I can focus on reporting while the platform handles everything else."
            </p>
            <p className="font-medium">- Anjali K., Tamil Nadu</p>
          </div>
        </div>
      </div>
    </div>
  );
}