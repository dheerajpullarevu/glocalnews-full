import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { NewsArticle } from '../../types/news';

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Partial<NewsArticle>>({
    title: '',
    content: '',
    summary: '',
    category: '',
    language: 'en',
    region: '',
    tags: []
  });

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const docRef = doc(db, 'articles', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setArticle(docSnap.data() as NewsArticle);
          }
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await setDoc(doc(db, 'articles', id), {
          ...article,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'articles'), {
          ...article,
          publishedAt: new Date().toISOString(),
          views: 0,
          likes: 0
        });
      }
      navigate('/admin/articles');
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const storageRef = ref(storage, `articles/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setArticle(prev => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Article' : 'New Article'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={article.title}
            onChange={e => setArticle(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            value={article.summary}
            onChange={e => setArticle(prev => ({ ...prev, summary: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={article.content}
            onChange={e => setArticle(prev => ({ ...prev, content: e.target.value }))}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={article.category}
              onChange={e => setArticle(prev => ({ ...prev, category: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
            >
              <option value="">Select category</option>
              <option value="local">Local News</option>
              <option value="politics">Politics</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              value={article.language}
              onChange={e => setArticle(prev => ({ ...prev, language: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
              required
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
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/articles')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </form>
    </div>
  );
}