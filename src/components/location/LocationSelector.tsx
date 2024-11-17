import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface LocationSelectorProps {
  selectedLocation: {
    state: string;
    district: string;
    mandal: string;
  };
  onChange: (location: { state: string; district: string; mandal: string }) => void;
}

export default function LocationSelector({ selectedLocation, onChange }: LocationSelectorProps) {
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [mandals, setMandals] = useState<string[]>([]);

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedLocation.state) {
      fetchDistricts(selectedLocation.state);
    }
  }, [selectedLocation.state]);

  useEffect(() => {
    if (selectedLocation.district) {
      fetchMandals(selectedLocation.state, selectedLocation.district);
    }
  }, [selectedLocation.district]);

  const fetchStates = async () => {
    try {
      const q = query(collection(db, 'locations'));
      const snapshot = await getDocs(q);
      const uniqueStates = [...new Set(snapshot.docs.map(doc => doc.data().state))];
      setStates(uniqueStates.sort());
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchDistricts = async (state: string) => {
    try {
      const q = query(collection(db, 'locations'), where('state', '==', state));
      const snapshot = await getDocs(q);
      const uniqueDistricts = [...new Set(snapshot.docs.map(doc => doc.data().district))];
      setDistricts(uniqueDistricts.sort());
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchMandals = async (state: string, district: string) => {
    try {
      const q = query(
        collection(db, 'locations'),
        where('state', '==', state),
        where('district', '==', district)
      );
      const snapshot = await getDocs(q);
      const uniqueMandals = [...new Set(snapshot.docs.map(doc => doc.data().mandal))];
      setMandals(uniqueMandals.sort());
    } catch (error) {
      console.error('Error fetching mandals:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <select
          value={selectedLocation.state}
          onChange={(e) => onChange({ ...selectedLocation, state: e.target.value, district: '', mandal: '' })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          District
        </label>
        <select
          value={selectedLocation.district}
          onChange={(e) => onChange({ ...selectedLocation, district: e.target.value, mandal: '' })}
          disabled={!selectedLocation.state}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mandal
        </label>
        <select
          value={selectedLocation.mandal}
          onChange={(e) => onChange({ ...selectedLocation, mandal: e.target.value })}
          disabled={!selectedLocation.district}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="">Select Mandal</option>
          {mandals.map((mandal) => (
            <option key={mandal} value={mandal}>{mandal}</option>
          ))}
        </select>
      </div>
    </div>
  );
}