import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Assignment } from '../../types/journalist';
import { useAuth } from '../../hooks/useAuth';

export default function AssignmentCenter() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAssignments();
    }
  }, [user]);

  const fetchAssignments = async () => {
    try {
      const q = query(
        collection(db, 'assignments'),
        where('status', '==', 'open')
      );
      const snapshot = await getDocs(q);
      const fetchedAssignments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Assignment[];
      setAssignments(fetchedAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Assignment Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{assignment.title}</h3>
              <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                ₹{assignment.payment}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{assignment.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Deadline:</span>{' '}
                {new Date(assignment.deadline).toLocaleDateString()}
              </p>
              {assignment.location && (
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Location:</span>{' '}
                  {assignment.location.district}, {assignment.location.state}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Requirements:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {assignment.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Accept Assignment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}