import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Magazine } from '../../types/magazine';

interface MagazineReaderProps {
  magazine: Magazine;
  isOpen: boolean;
  onClose: () => void;
}

export default function MagazineReader({ magazine, isOpen, onClose }: MagazineReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < magazine.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg shadow-xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{magazine.title}</h2>
              <p className="text-gray-600">{magazine.description}</p>
            </div>

            <div className="relative h-[600px] bg-gray-100">
              <img
                src={magazine.pages[currentPage].imageUrl}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-full object-contain"
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                Page {currentPage + 1} of {magazine.pages.length}
              </div>

              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <button
                onClick={nextPage}
                disabled={currentPage === magazine.pages.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}