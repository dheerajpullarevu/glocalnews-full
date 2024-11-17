import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { DevicePhoneMobileIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';

export default function AppPromotion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
      >
        <DevicePhoneMobileIcon className="h-5 w-5 mr-2" />
        Get the App
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Download Glocal News App
            </Dialog.Title>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <DevicePhoneMobileIcon className="h-8 w-8 text-gray-600" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Android App</h4>
                    <p className="text-sm text-gray-500">Available on Google Play</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                >
                  Download
                </a>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <DeviceTabletIcon className="h-8 w-8 text-gray-600" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">iOS App</h4>
                    <p className="text-sm text-gray-500">Available on App Store</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
                >
                  Download
                </a>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Hyperlocal news in your language</li>
                  <li>• Live news channels and video updates</li>
                  <li>• Personalized news feed</li>
                  <li>• Offline reading</li>
                  <li>• Breaking news notifications</li>
                </ul>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}