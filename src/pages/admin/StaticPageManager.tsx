import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { StaticPage } from '../../types/cms';
import { Editor } from '@tinymce/tinymce-react';

export default function StaticPageManager() {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<StaticPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const q = query(collection(db, 'staticPages'), orderBy('lastUpdated', 'desc'));
      const snapshot = await getDocs(q);
      const fetchedPages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StaticPage[];
      setPages(fetchedPages);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    try {
      await updateDoc(doc(db, 'staticPages', selectedPage.id), {
        ...selectedPage,
        lastUpdated: new Date().toISOString()
      });
      fetchPages();
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Static Page Management</h2>
        <button
          onClick={() => {/* Add new page */}}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Add New Page
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Page List */}
        <div className="col-span-1 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">Pages</h3>
          <ul className="space-y-2">
            {pages.map(page => (
              <li
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={`p-2 rounded cursor-pointer ${
                  selectedPage?.id === page.id ? 'bg-red-50' : 'hover:bg-gray-50'
                }`}
              >
                {page.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Editor */}
        {selectedPage && (
          <div className="col-span-3 bg-white rounded-lg shadow p-4">
            <div className="space-y-4">
              <input
                type="text"
                value={selectedPage.title}
                onChange={e => setSelectedPage({ ...selectedPage, title: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Page Title"
              />

              <Editor
                value={selectedPage.content}
                onEditorChange={(content) => 
                  setSelectedPage({ ...selectedPage, content })
                }
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
              />

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedPage(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}