import { collection, doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from './config';
import { NewsArticle } from '../types/news';
import { User } from '../types/user';

// Collection References
export const usersRef = collection(db, 'users');
export const articlesRef = collection(db, 'articles');
export const commentsRef = collection(db, 'comments');
export const analyticsRef = collection(db, 'analytics');

// Article Operations
export async function createArticle(article: Omit<NewsArticle, 'id'>) {
  const docRef = doc(articlesRef);
  await setDoc(docRef, {
    ...article,
    publishedAt: new Date().toISOString(),
    views: 0,
    likes: 0
  });
  return docRef.id;
}

export async function incrementArticleViews(articleId: string) {
  const docRef = doc(articlesRef, articleId);
  await updateDoc(docRef, {
    views: increment(1)
  });
}

// User Operations
export async function updateUserProfile(userId: string, data: Partial<User>) {
  const docRef = doc(usersRef, userId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
}

// Analytics Operations
export async function trackEvent(eventName: string, data: any) {
  const docRef = doc(analyticsRef);
  await setDoc(docRef, {
    eventName,
    data,
    timestamp: new Date().toISOString()
  });
}