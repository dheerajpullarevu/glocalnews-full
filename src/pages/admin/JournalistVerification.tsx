import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { JournalistProfile } from '../../types/journalist';

export default function JournalistVerification() {
  const [pendingVerifications, setPendingVerifications] = useState<JournalistProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingVerifications();
  }, []);

  const fetchPendingVerifications = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'journalist'),
        where('kycStatus', '==', 'pending')
      );
      const snapshot = await getDocs(q);
      const journalists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalistProfile[];
      setPendingVerifications(journalists);
    } catch (error) {
      console.error('Error fetching verifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (journalistId: string, status: 'verified' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'users', journalistId), {
        kycStatus: status,
        verificationDate: new Date().toISOString()
      });
      setPendingVerifications(prev => 
        prev.filter(journalist => journalist.id !== journalistId)
      );
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Journalist Verification</h2>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Journalist
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Expertise
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingVerifications.map((journalist) => (
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <a
                      href={journalist.kycDocuments.idProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-900"
                    >
                      ID Proof
                    </a>
                    <a
                      href={journalist.kycDocuments.addressProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-900"
                    >
                      Address Proof
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {journalist.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-2 py-1 text-xs rounded bg-gray-100"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleVerification(journalist.id, 'verified')}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleVerification(journalist.id, 'rejected')}
                    className="text-red-600 hover:text-red-900"
                  >
                    Reject
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