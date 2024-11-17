import { useState, useEffect } from 'react';
import { collection, query, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { User } from '../../types/user';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  PauseCircleIcon 
} from '@heroicons/react/24/outline';

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'users'));
        const snapshot = await getDocs(q);
        const fetchedUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserStatus = async (userId: string, status: User['status']) => {
    try {
      await updateDoc(doc(db, 'users', userId), { status });
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'suspended':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <PauseCircleIcon className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Languages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={user.profileImage || `https://ui-avatars.com/api/?name=${user.displayName}`}
                        alt={user.displayName}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(user.status)}
                      <span className="ml-2 text-sm text-gray-500">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={user.status}
                      onChange={(e) => updateUserStatus(user.id, e.target.value as User['status'])}
                      className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    >
                      <option value="active">Activate</option>
                      <option value="suspended">Suspend</option>
                      <option value="pending">Set Pending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}