import { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Ad, AdPlatform, AdPlacement, AdSize } from '../../types/ads';
import { useTranslation } from 'react-i18next';

export default function AdManager() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'ads'));
      const fetchedAds = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Ad[];
      setAds(fetchedAds);
    } catch (error) {
      console.error('Error fetching ads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (adId: string, status: Ad['status']) => {
    try {
      await updateDoc(doc(db, 'ads', adId), { status });
      setAds(ads.map(ad => 
        ad.id === adId ? { ...ad, status } : ad
      ));
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('ads.title')}</h2>
        <button
          onClick={() => {/* Open new ad form */}}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {t('ads.create')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('ads.ad')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('ads.placement')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('ads.performance')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('ads.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('ads.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {ad.imageUrl && (
                      <img
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="h-10 w-10 rounded-md object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {ad.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ad.platform}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {ad.placement}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {ad.performance.impressions} {t('ads.impressions')}
                  </div>
                  <div className="text-sm text-gray-500">
                    CTR: {(ad.performance.ctr * 100).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={ad.status}
                    onChange={(e) => handleStatusChange(ad.id, e.target.value as Ad['status'])}
                    className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="active">{t('ads.status_active')}</option>
                    <option value="paused">{t('ads.status_paused')}</option>
                    <option value="ended">{t('ads.status_ended')}</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {/* Open edit form */}}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    {t('common.edit')}
                  </button>
                  <button
                    onClick={() => {/* Show detailed analytics */}}
                    className="text-green-600 hover:text-green-900"
                  >
                    {t('common.analytics')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}