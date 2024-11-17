import { useState } from 'react';
import { Magazine } from '../../types/magazine';
import MagazineReader from './MagazineReader';

interface MagazineCardProps {
  magazine: Magazine;
}

export default function MagazineCard({ magazine }: MagazineCardProps) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
        onClick={() => setIsReaderOpen(true)}
      >
        <img
          src={magazine.coverImage}
          alt={magazine.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-red-600">{magazine.category}</span>
            <span className="text-sm text-gray-500">{magazine.readTime} min read</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{magazine.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{magazine.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">{new Date(magazine.publishedAt).toLocaleDateString()}</span>
            <span className="text-sm text-gray-500">{magazine.language}</span>
          </div>
        </div>
      </div>

      <MagazineReader
        magazine={magazine}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />
    </>
  );
}