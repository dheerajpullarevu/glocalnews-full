import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Coupon } from '../../types/rewards';

export default function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const q = query(collection(db, 'coupons'), orderBy('validUntil'));
      const snapshot = await getDocs(q);
      const fetchedCoupons = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Coupon[];
      setCoupons(fetchedCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveCoupon = async (couponId: string) => {
    try {
      await updateDoc(doc(db, 'coupons', couponId), {
        status: 'active'
      });
      fetchCoupons();
    } catch (error) {
      console.error('Error approving coupon:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Coupon Management</h2>
        <div className="flex space-x-4">
          <input
            type="search"
            placeholder="Search coupons..."
            className="px-4 py-2 border rounded-md"
          />
          <button className="px-4 py-2 bg-red-600 text-white rounded-md">
            Add Coupon
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Advertiser
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Valid Until
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
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{coupon.title}</div>
                    <div className="text-sm text-gray-500">{coupon.code}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.advertiserId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.discount.type === 'percentage' ? (
                    <span>{coupon.discount.value}% off</span>
                  ) : (
                    <span>₹{coupon.discount.value} off</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(coupon.validUntil).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    coupon.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : coupon.status === 'expired'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {coupon.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {coupon.status === 'paused' && (
                    <button
                      onClick={() => approveCoupon(coupon.id)}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Approve
                    </button>
                  )}
                  <button className="text-red-600 hover:text-red-900">
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