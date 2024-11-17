import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { User } from '../../types/user';
import { useTranslation } from 'react-i18next';

export default function UserProfile() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Partial<User>>(user || {});

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setLoading(true);
      const storageRef = ref(storage, `profiles/${user.id}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      await updateDoc(doc(db, 'users', user.id), {
        profileImage: url
      });
      
      setProfile(prev => ({ ...prev, profileImage: url }));
    } catch (error) {
      console.error('Error uploading profile image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', user.id), {
        displayName: profile.displayName,
        bio: profile.bio,
        languages: profile.languages,
        regions: profile.regions
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t('profile.title')}</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profile.profileImage || `https://ui-avatars.com/api/?name=${profile.displayName}`}
                alt={profile.displayName}
                className="w-20 h-20 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-red-600 text-white p-1 rounded-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile.displayName}</h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('profile.displayName')}
            </label>
            <input
              type="text"
              value={profile.displayName}
              onChange={e => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('profile.bio')}
            </label>
            <textarea
              value={profile.bio}
              onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('profile.languages')}
            </label>
            <select
              multiple
              value={profile.languages}
              onChange={e => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setProfile(prev => ({ ...prev, languages: values }));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="kn">Kannada</option>
              <option value="ta">Tamil</option>
              <option value="ml">Malayalam</option>
              <option value="or">Oriya</option>
              <option value="bn">Bengali</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('profile.regions')}
            </label>
            <select
              multiple
              value={profile.regions}
              onChange={e => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setProfile(prev => ({ ...prev, regions: values }));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="north">North India</option>
              <option value="south">South India</option>
              <option value="east">East India</option>
              <option value="west">West India</option>
              <option value="central">Central India</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {loading ? t('profile.saving') : t('profile.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}