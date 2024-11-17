import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserReward, UserCoupon } from '../../types/rewards';
import { useAuth } from '../../hooks/useAuth';

export default function RewardsSection() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState<UserReward[]>([]);
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRewards();
      fetchCoupons();
    }
  }, [user]);

  const fetchRewards = async () => {
    try {
      const q = query(
        collection(db, 'userRewards'),
        where('userId', '==', user?.id)
      );
      const snapshot = await getDocs(q);
      const userRewards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserReward[];
      setRewards(userRewards);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const q = query(
        collection(db, 'userCoupons'),
        where('userId', '==', user?.id)
      );
      const snapshot = await getDocs(q);
      const userCoupons = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserCoupon[];
      setCoupons(userCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {rewards.reduce((sum, r) => sum + (r.points || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {rewards.filter(r => r.type === 'badge').length}
            </div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {coupons.filter(c => c.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Coupons</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Coupons</h2>
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{coupon.couponId}</div>
                <div className="text-sm text-gray-500">
                  Expires: {new Date(coupon.expiresAt).toLocaleDateString()}
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md">
                Use Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}