import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { RewardRule } from '../../types/rewards';

export default function RewardManagement() {
  const [rewardRules, setRewardRules] = useState<RewardRule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewardRules();
  }, []);

  const fetchRewardRules = async () => {
    try {
      const q = query(collection(db, 'rewardRules'), orderBy('type'));
      const snapshot = await getDocs(q);
      const rules = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as RewardRule[];
      setRewardRules(rules);
    } catch (error) {
      console.error('Error fetching reward rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRewardRule = async (rule: Omit<RewardRule, 'id'>) => {
    try {
      await addDoc(collection(db, 'rewardRules'), {
        ...rule,
        active: true
      });
      fetchRewardRules();
    } catch (error) {
      console.error('Error adding reward rule:', error);
    }
  };

  const toggleRuleStatus = async (ruleId: string, active: boolean) => {
    try {
      await updateDoc(doc(db, 'rewardRules', ruleId), { active });
      setRewardRules(rules => 
        rules.map(rule => 
          rule.id === ruleId ? { ...rule, active } : rule
        )
      );
    } catch (error) {
      console.error('Error updating rule status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reward System Management</h2>
        <button
          onClick={() => {/* Open add rule modal */}}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Add Reward Rule
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trigger
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Reward
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
            {rewardRules.map((rule) => (
              <tr key={rule.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize">{rule.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {rule.action || `${rule.milestone?.type}: ${rule.milestone?.threshold}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="capitalize">{rule.reward.type}</span>
                    {rule.reward.points && (
                      <span className="ml-2">{rule.reward.points} points</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rule.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rule.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => toggleRuleStatus(rule.id, !rule.active)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    {rule.active ? 'Deactivate' : 'Activate'}
                  </button>
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