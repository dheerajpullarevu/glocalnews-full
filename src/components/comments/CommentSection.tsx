import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('articleId', '==', articleId),
        orderBy('createdAt', 'desc')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    try {
      await addDoc(collection(db, 'comments'), {
        articleId,
        userId: user.id,
        userName: user.displayName,
        content: newComment,
        createdAt: new Date().toISOString()
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            rows={3}
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-6 text-gray-600">
          Please <a href="/login" className="text-red-600 hover:text-red-700">sign in</a> to comment.
        </p>
      )}

      {loading ? (
        <div>Loading comments...</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{comment.userName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}