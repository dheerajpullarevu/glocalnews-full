import { useState } from 'react';
import { doc, updateDoc, increment, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../hooks/useAuth';
import { Report, ReportReason } from '../../types/reports';
import { Dialog } from '@headlessui/react';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon,
  FlagIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import { 
  HandThumbUpIcon as HandThumbUpSolidIcon,
  HandThumbDownIcon as HandThumbDownSolidIcon
} from '@heroicons/react/24/solid';

interface ArticleActionsProps {
  articleId: string;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
}

export default function ArticleActions({ 
  articleId, 
  likes, 
  dislikes,
  userLiked = false,
  userDisliked = false
}: ArticleActionsProps) {
  const { user } = useAuth();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<ReportReason>('fake_news');
  const [reportDescription, setReportDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(userLiked);
  const [disliked, setDisliked] = useState(userDisliked);

  const handleLike = async () => {
    if (!user) return;

    const articleRef = doc(db, 'articles', articleId);
    const userArticleRef = doc(db, 'userArticleInteractions', `${user.id}_${articleId}`);

    try {
      if (liked) {
        await updateDoc(articleRef, { likes: increment(-1) });
        await updateDoc(userArticleRef, { liked: false });
        setLiked(false);
      } else {
        if (disliked) {
          await updateDoc(articleRef, { dislikes: increment(-1) });
          setDisliked(false);
        }
        await updateDoc(articleRef, { likes: increment(1) });
        await updateDoc(userArticleRef, { liked: true, disliked: false });
        setLiked(true);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleDislike = async () => {
    if (!user) return;

    const articleRef = doc(db, 'articles', articleId);
    const userArticleRef = doc(db, 'userArticleInteractions', `${user.id}_${articleId}`);

    try {
      if (disliked) {
        await updateDoc(articleRef, { dislikes: increment(-1) });
        await updateDoc(userArticleRef, { disliked: false });
        setDisliked(false);
      } else {
        if (liked) {
          await updateDoc(articleRef, { likes: increment(-1) });
          setLiked(false);
        }
        await updateDoc(articleRef, { dislikes: increment(1) });
        await updateDoc(userArticleRef, { disliked: true, liked: false });
        setDisliked(true);
      }
    } catch (error) {
      console.error('Error updating dislike:', error);
    }
  };

  const handleReport = async () => {
    if (!user) return;
    setSubmitting(true);

    try {
      const report: Omit<Report, 'id'> = {
        type: 'article',
        contentId: articleId,
        userId: user.id,
        reason: reportReason,
        description: reportDescription,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'reports'), report);
      setIsReportModalOpen(false);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLike}
        className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
      >
        {liked ? (
          <HandThumbUpSolidIcon className="h-5 w-5 text-red-600" />
        ) : (
          <HandThumbUpIcon className="h-5 w-5" />
        )}
        <span>{likes}</span>
      </button>

      <button
        onClick={handleDislike}
        className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
      >
        {disliked ? (
          <HandThumbDownSolidIcon className="h-5 w-5 text-red-600" />
        ) : (
          <HandThumbDownIcon className="h-5 w-5" />
        )}
        <span>{dislikes}</span>
      </button>

      <button
        onClick={() => setIsReportModalOpen(true)}
        className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
      >
        <FlagIcon className="h-5 w-5" />
        <span>Report</span>
      </button>

      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
        <ShareIcon className="h-5 w-5" />
        <span>Share</span>
      </button>

      <Dialog
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 mb-4"
            >
              Report Article
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Report
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as ReportReason)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="fake_news">Fake News</option>
                  <option value="hate_speech">Hate Speech</option>
                  <option value="inappropriate">Inappropriate Content</option>
                  <option value="spam">Spam</option>
                  <option value="violence">Violence</option>
                  <option value="copyright">Copyright Violation</option>
                  <option value="misleading">Misleading Information</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Please provide more details about your report..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReport}
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}