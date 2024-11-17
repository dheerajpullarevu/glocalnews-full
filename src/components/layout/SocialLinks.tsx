import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export default function SocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'socialLinks'));
      const fetchedLinks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SocialLink[];
      setLinks(fetchedLinks);
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-300"
        >
          <img 
            src={link.icon} 
            alt={link.platform}
            className="w-6 h-6"
          />
        </a>
      ))}
    </div>
  );
}