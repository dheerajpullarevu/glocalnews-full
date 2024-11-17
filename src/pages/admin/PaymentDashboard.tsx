import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { JournalistEarnings } from '../../types/payment';
import { Line } from 'react-chartjs-2';

export default function PaymentDashboard() {
  const [pendingPayments, setPendingPayments] = useState<JournalistEarnings[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [monthlyStats, setMonthlyStats] = useState({
    earnings: [],
    journalists: 0,
    averageEarning: 0
  });

  useEffect(() => {
    fetchPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    try {
      // Fetch pending payments
      const pendingQuery = query(
        collection(db, 'earnings'),
        where('status', '==', 'pending')
      );
      const pendingSnapshot = await getDocs(pendingQuery);
      const pending = pendingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as JournalistEarnings[];
      setPendingPayments(pending);

      // Calculate other metrics
      // ... implementation
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const processPayments = async () => {
    // Implementation for bulk payment processing
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Dashboard</h2>
        <button
          onClick={processPayments}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Process All Payments
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Payments</h3>
          <p className="text-3xl font-bold">
            ₹{pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Paid (This Month)</h3>
          <p className="text-3xl font-bold">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Journalists</h3>
          <p className="text-3xl font-bold">{monthlyStats.journalists}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Earnings Trend</h3>
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Total Earnings',
              data: monthlyStats.earnings,
              borderColor: 'rgb(239, 68, 68)',
              tension: 0.1
            }]
          }}
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Journalist
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Articles
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
            {pendingPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.journalistId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ₹{payment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.articleId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-red-600 hover:text-red-900">
                    Process Payment
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