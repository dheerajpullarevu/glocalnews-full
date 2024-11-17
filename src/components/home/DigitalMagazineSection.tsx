import { useState } from 'react';
import { sampleMagazines } from '../../data/sampleMagazines';
import MagazineCard from '../magazine/MagazineCard';

export default function DigitalMagazineSection() {
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const filteredMagazines = selectedLanguage === 'all'
    ? sampleMagazines
    : sampleMagazines.filter(mag => mag.language.toLowerCase() === selectedLanguage);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Digital Magazine</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          >
            <option value="all">All Languages</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMagazines.map((magazine) => (
            <MagazineCard key={magazine.id} magazine={magazine} />
          ))}
        </div>
      </div>
    </section>
  );
}