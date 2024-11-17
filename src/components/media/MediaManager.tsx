import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { TrashIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface MediaFile {
  name: string;
  url: string;
  path: string;
  uploadedAt: Date;
}

export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      const mediaRef = ref(storage, 'media');
      const result = await listAll(mediaRef);
      
      const filesData = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            name: item.name,
            url,
            path: item.fullPath,
            uploadedAt: new Date()
          };
        })
      );

      setFiles(filesData);
    } catch (error) {
      console.error('Error fetching media files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    setUploading(true);
    try {
      for (const file of Array.from(uploadedFiles)) {
        const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
      }
      await fetchMediaFiles();
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filePath: string) => {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      setFiles(files.filter(file => file.path !== filePath));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (loading) return <div>Loading media files...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Media Library</h2>
        <div>
          <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer">
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            Upload Files
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              accept="image/*,video/*"
            />
          </label>
        </div>
      </div>

      {uploading && (
        <div className="text-sm text-gray-500">Uploading files...</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div key={file.path} className="relative group">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
              {file.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <video
                  src={file.url}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleDelete(file.path)}
                className="p-2 text-white hover:text-red-500"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}