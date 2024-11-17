import { Dialog } from '@headlessui/react';
import { 
  XMarkIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url: string;
}

const socialPlatforms = [
  {
    name: 'YouTube',
    icon: '/icons/youtube.svg',
    shareUrl: (url: string, text: string) =>
      `https://youtube.com/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
  },
  {
    name: 'Instagram',
    icon: '/icons/instagram.svg',
    shareUrl: (url: string) => `instagram://share?url=${encodeURIComponent(url)}`
  },
  {
    name: 'Facebook',
    icon: '/icons/facebook.svg',
    shareUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },
  {
    name: 'Twitter',
    icon: '/icons/twitter.svg',
    shareUrl: (url: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  },
  {
    name: 'WhatsApp',
    icon: '/icons/whatsapp.svg',
    shareUrl: (url: string, text: string) =>
      `whatsapp://send?text=${encodeURIComponent(`${text} ${url}`)}`
  },
  {
    name: 'Telegram',
    icon: '/icons/telegram.svg',
    shareUrl: (url: string, text: string) =>
      `https://telegram.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  }
];

export default function ShareModal({ isOpen, onClose, title, text, url }: ShareModalProps) {
  const handleShare = (platform: typeof socialPlatforms[0]) => {
    window.open(platform.shareUrl(url, text), '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Show success message
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <Dialog.Title className="text-lg font-semibold">
              Share
            </Dialog.Title>
            <button onClick={onClose}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className="flex flex-col items-center"
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className="w-12 h-12 mb-2"
                  />
                  <span className="text-xs text-gray-600">{platform.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded">
              <input
                type="text"
                value={url}
                readOnly
                className="flex-1 bg-transparent text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Copy
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}