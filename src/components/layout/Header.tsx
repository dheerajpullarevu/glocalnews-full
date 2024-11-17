import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import Logo from './Logo';
import { 
  GlobeAltIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'bn', name: 'বাংলা' }
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      // Force a re-render of translated content
      window.location.reload();
    });
  };

  // Rest of the component code...
  return (
    <header className="bg-white shadow-md">
      {/* Header content */}
    </header>
  );
}