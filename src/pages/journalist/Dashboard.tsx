import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { JournalistProfile } from '../../types/journalist';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function JournalistDashboard() {
  const [profile, setProfile] = useState<JournalistProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournalistData();
  }, []);

  const fetchJournalistData = async () => {
    // Implementation for fetching journalist data
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* KYC Status Banner */}
      {profile.kycStatus !== 'verified' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Complete your KYC verification to start earning
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold">₹{profile.earnings.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Articles Published</h3>
          <p className="text-3xl font-bold">{profile.metrics.totalArticles}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
          <p className="text-3xl font-bold">{profile.metrics.totalViews}</p>
        </div>
      </div>
    </div>
  );
}