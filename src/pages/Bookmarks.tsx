import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { NewsArticle } from '../types/news';
import NewsCard from '../components/news/NewsCard';

export default function Bookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  const fetchBookmarks = async () => {
    try {
      const q = query(
        collection(db, 'bookmarks'),
        where('userId', '==', user?.id)
      );
      const snapshot = await getDocs(q);
      
      const articlePromises = snapshot.docs.map(async (doc) => {
        const articleRef = doc.data().articleId;
        const articleSnap = await getDocs(collection(db, 'articles'));
        const articleData = articleSnap.docs[0].data() as DocumentData;
        return { 
          id: articleSnap.docs[0].id,
          ...articleData
        } as NewsArticle;
      });

      const articles = await Promise.all(articlePromises);
      setBookmarks(articles);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same
}