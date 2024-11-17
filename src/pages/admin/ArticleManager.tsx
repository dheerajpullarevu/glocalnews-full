import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { NewsArticle } from '../../types/news';
import ArticleEditor from './ArticleEditor';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ArticleManager() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, 'articles'), orderBy('publishedAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedArticles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsArticle[];
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Article Management</h1>
              <Link
                to="new"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                New Article
              </Link>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Language
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {article.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {article.authorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {article.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {article.language}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Link
                              to={`edit/${article.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Link>
                            <button className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        }
      />
      <Route path="new" element={<ArticleEditor />} />
      <Route path="edit/:id" element={<ArticleEditor />} />
    </Routes>
  );
}