import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Classified } from '../../types/revenue';

export default function Classifieds() {
  const [classifieds, setClassifieds] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClassifieds();
  }, []);

  const fetchClassifieds = async () => {
    try {
      const q = query(
        collection(db, 'classifieds'),
        where('status', '==', 'active'),
        orderBy('postedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedClassifieds = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Classified[];
      setClassifieds(fetchedClassifieds);
    } catch (error) {
      console.error('Error fetching classifieds:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Classifieds</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classifieds.map((classified) => (
          <div key={classified.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {classified.images[0] && (
              <img
                src={classified.images[0]}
                alt={classified.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{classified.title}</h3>
                {classified.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              
              {classified.price && (
                <p className="text-lg font-bold text-green-600 mt-2">
                  ₹{classified.price.toLocaleString()}
                </p>
              )}
              
              <p className="text-sm text-gray-600 mt-2">{classified.description}</p>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Location: {classified.location.district}, {classified.location.state}</p>
                <p>Posted: {new Date(classified.postedAt).toLocaleDateString()}</p>
              </div>
              
              <button className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}