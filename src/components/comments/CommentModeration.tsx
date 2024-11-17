import { useState, useEffect } from 'react';
import { collection, query, getDocs, updateDoc, doc, deleteDoc, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function CommentModeration() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Comment['status']>('pending');

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('status', '==', filter)
      );
      const snapshot = await getDocs(q);
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (commentId: string, status: Comment['status']) => {
    try {
      await updateDoc(doc(db, 'comments', commentId), { status });
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error updating comment status:', error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Comment Moderation</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Comment['status'])}
          className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
              <div className="flex space-x-2">
                {filter === 'pending' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'approved')}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'rejected')}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No {filter} comments to display
          </div>
        )}
      </div>
    </div>
  );
}