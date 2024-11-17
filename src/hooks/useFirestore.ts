import { useState, useEffect } from 'react';
import { collection, query, QueryConstraint, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useFirestore<T>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const q = query(collection(db, collectionName), ...queryConstraints);
        const snapshot = await getDocs(q);
        const fetchedData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please check your internet connection.');
        // Use cached data if available
        const cachedData = localStorage.getItem(`cache_${collectionName}`);
        if (cachedData) {
          setData(JSON.parse(cachedData));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, JSON.stringify(queryConstraints)]);

  return { data, loading, error };
}