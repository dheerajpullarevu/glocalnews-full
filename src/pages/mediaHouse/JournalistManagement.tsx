import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { JournalistProfile } from '../../types/journalist';

export default function JournalistManagement() {
  const [journalists, setJournalists] = useState<JournalistProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJournalists();
  }, []);

  const fetchJournalists = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'journalist'),
        where('type', '==', 'mediaHouse'),
        where('mediaHouseId', '==', 'current-media-house-id') // Replace with actual ID
      );
      const snapshot = await getDocs(q);
      const journalistsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalistProfile[];
      setJournalists(journalistsList);
    } catch (error) {
      console.error('Error fetching journalists:', error);
    } finally {
      setLoading(false);
    }
  };

  const addJournalist = async (data: Partial<JournalistProfile>) => {
    try {
      await addDoc(collection(db, 'users'), {
        ...data,
        role: 'journalist',
        type: 'mediaHouse',
        mediaHouseId: 'current-media-house-id', // Replace with actual ID
        createdAt: new Date().toISOString()
      });
      fetchJournalists();
    } catch (error) {
      console.error('Error adding journalist:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Journalists</h2>
        <button
          onClick={() => {/* Open add journalist modal */}}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Add Journalist
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Articles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journalists.map((journalist) => (
              <tr key={journalist.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={journalist.profileImage}
                      alt={journalist.displayName}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {journalist.displayName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {journalist.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {journalist.metrics.totalArticles}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {journalist.metrics.totalViews}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    journalist.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {journalist.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
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