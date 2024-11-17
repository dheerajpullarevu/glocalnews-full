import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface Collaboration {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'interview';
  participants: number;
  deadline: string;
  bonus: number;
  requirements: string[];
}

export default function CollaborationHub() {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollaborations();
  }, []);

  const fetchCollaborations = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'collaborations'));
      const fetchedCollaborations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Collaboration[];
      setCollaborations(fetchedCollaborations);
    } catch (error) {
      console.error('Error fetching collaborations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Collaboration Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborations.map((collab) => (
          <div key={collab.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{collab.title}</h3>
              <span className="px-2 py-1 text-sm rounded-full bg-purple-100 text-purple-800">
                {collab.type}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{collab.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="font-medium">Participants:</span> {collab.participants}
              </p>
              <p className="text-sm">
                <span className="font-medium">Deadline:</span>{' '}
                {new Date(collab.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Bonus:</span> ₹{collab.bonus}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Requirements:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {collab.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Join Collaboration
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}