import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Report } from '../../types/reports';

export default function ReportManagement() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Report['status']>('pending');

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    try {
      const q = query(
        collection(db, 'reports'),
        where('status', '==', filter),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedReports = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Report[];
      setReports(fetchedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (reportId: string, action: Report['action'], status: Report['status']) => {
    try {
      await updateDoc(doc(db, 'reports', reportId), {
        action,
        status,
        reviewedAt: new Date().toISOString(),
        reviewedBy: 'admin' // Replace with actual admin ID
      });

      // If content needs to be removed, update the article/ad status
      if (action === 'removed') {
        const report = reports.find(r => r.id === reportId);
        if (report) {
          const contentRef = doc(db, report.type === 'article' ? 'articles' : 'ads', report.contentId);
          await updateDoc(contentRef, { status: 'removed' });
        }
      }

      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Report Management</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Report['status'])}
          className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="pending">Pending</option>
          <option value="reviewed">Under Review</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Content Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Reported At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize">{report.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize">{report.reason}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {report.description}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.status === 'pending' && (
                    <div className="space-x-2">
                      <button
                        onClick={() => handleAction(report.id, 'removed', 'resolved')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove Content
                      </button>
                      <button
                        onClick={() => handleAction(report.id, 'flagged', 'reviewed')}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Flag Content
                      </button>
                      <button
                        onClick={() => handleAction(report.id, 'no_action', 'rejected')}
                        className="text-green-600 hover:text-green-900"
                      >
                        No Action
                      </button>
                    </div>
                  )}
                  {report.status !== 'pending' && (
                    <span className="text-gray-500">
                      {report.action} - {report.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}