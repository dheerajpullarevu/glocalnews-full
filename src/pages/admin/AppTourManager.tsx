import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AppScreenshot } from '../../types/cms';

export default function AppTourManager() {
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScreenshots();
  }, []);

  const fetchScreenshots = async () => {
    try {
      const q = query(collection(db, 'appScreenshots'), orderBy('order'));
      const snapshot = await getDocs(q);
      const fetchedScreenshots = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AppScreenshot[];
      setScreenshots(fetchedScreenshots);
    } catch (error) {
      console.error('Error fetching screenshots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, platform: 'android' | 'ios') => {
    try {
      const storageRef = ref(storage, `app-screenshots/${platform}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      // Add to database
      // Implementation
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">App Tour Management</h2>
        <button
          onClick={() => {/* Add screenshot modal */}}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Add Screenshot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Android Screenshots */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Android Screenshots</h3>
          {/* Screenshot list */}
        </div>

        {/* iOS Screenshots */}
        <div>
          <h3 className="text-lg font-semibold mb-4">iOS Screenshots</h3>
          {/* Screenshot list */}
        </div>
      </div>
    </div>
  );
}