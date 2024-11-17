import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function Advertise() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'advertiserInquiries'), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Advertise with Glocal News</h1>
        <p className="text-xl text-gray-600">Reach millions of engaged readers across India</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Why Advertise with Us?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  📊
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Targeted Reach</h3>
                <p className="mt-2 text-gray-600">
                  Reach specific geographic locations, from state to village level, ensuring your message reaches the right audience.
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
                <h3 className="text-lg font-medium">Multi-language Support</h3>
                <p className="mt-2 text-gray-600">
                  Advertise in 8+ Indian languages to connect with users in their preferred language.
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
                <h3 className="text-lg font-medium">Multiple Ad Formats</h3>
                <p className="mt-2 text-gray-600">
                  Choose from display ads, native content, video ads, and sponsored articles.
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
                <h3 className="text-lg font-medium">Real-time Analytics</h3>
                <p className="mt-2 text-gray-600">
                  Track campaign performance with detailed analytics and insights.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Our Reach</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">500K+</div>
                <div className="text-sm text-gray-600">Daily Active Users</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">8+</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">28</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">4.2%</div>
                <div className="text-sm text-gray-600">Avg. CTR</div>
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
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We'll get back to you within 24 hours to discuss your advertising needs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={e => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
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
                  <label className="block text-sm font-medium text-gray-700">Monthly Budget</label>
                  <select
                    value={formData.budget}
                    onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="">Select budget range</option>
                    <option value="10000-50000">₹10,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-500000">₹1,00,000 - ₹5,00,000</option>
                    <option value="500000+">₹5,00,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    placeholder="Tell us about your advertising goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}