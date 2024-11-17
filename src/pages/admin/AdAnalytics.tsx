import { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Ad } from '../../types/ads';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AdPerformanceData {
  dates: string[];
  impressions: number[];
  clicks: number[];
  revenue: number[];
  ctr: number[];
  ecpm: number[];
}

export default function AdAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [performanceData, setPerformanceData] = useState<AdPerformanceData | null>(null);
  const [topPerformers, setTopPerformers] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch performance data
      const adsRef = collection(db, 'ads');
      const adsSnapshot = await getDocs(adsRef);
      const ads = adsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ad[];

      // Calculate top performers
      const sortedAds = [...ads].sort((a, b) => b.performance.revenue - a.performance.revenue);
      setTopPerformers(sortedAds.slice(0, 5));

      // Generate sample performance data (replace with real data)
      const dates = generateDateRange(timeRange);
      setPerformanceData({
        dates,
        impressions: generateRandomData(dates.length, 1000, 5000),
        clicks: generateRandomData(dates.length, 50, 200),
        revenue: generateRandomData(dates.length, 100, 500),
        ctr: generateRandomData(dates.length, 1, 5),
        ecpm: generateRandomData(dates.length, 5, 15)
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading analytics...</div>;
  if (!performanceData) return <div>No data available</div>;

  const revenueData: ChartData<'line'> = {
    labels: performanceData.dates,
    datasets: [
      {
        label: 'Revenue ($)',
        data: performanceData.revenue,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const performanceMetrics: ChartData<'bar'> = {
    labels: performanceData.dates,
    datasets: [
      {
        label: 'CTR (%)',
        data: performanceData.ctr,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'eCPM ($)',
        data: performanceData.ecpm,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ad Performance Analytics</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
          className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            ${performanceData.revenue.reduce((a, b) => a + b, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average CTR</h3>
          <p className="text-3xl font-bold text-blue-600">
            {(performanceData.ctr.reduce((a, b) => a + b, 0) / performanceData.ctr.length).toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average eCPM</h3>
          <p className="text-3xl font-bold text-purple-600">
            ${(performanceData.ecpm.reduce((a, b) => a + b, 0) / performanceData.ecpm.length).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <Line data={revenueData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <Bar data={performanceMetrics} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Top Performing Ads</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">eCPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topPerformers.map((ad) => (
                <tr key={ad.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {ad.imageUrl && (
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="h-10 w-10 rounded object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                        <div className="text-sm text-gray-500">{ad.placement}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${ad.performance.revenue.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(ad.performance.ctr * 100).toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${((ad.performance.revenue / ad.performance.impressions) * 1000).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function generateDateRange(range: '7d' | '30d' | '90d'): string[] {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
  }
  return dates;
}

function generateRandomData(length: number, min: number, max: number): number[] {
  return Array.from({ length }, () => 
    Number((Math.random() * (max - min) + min).toFixed(2))
  );
}