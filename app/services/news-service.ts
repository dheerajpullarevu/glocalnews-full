import { firebase } from '@nativescript/firebase-core';
import { firestore } from '@nativescript/firebase-firestore';

export async function getArticles(language: string, category: string = 'all') {
  try {
    const articlesCollection = firestore().collection('articles');
    let query = articlesCollection
      .where('language', '==', language)
      .orderBy('publishedAt', 'desc')
      .limit(20);

    if (category !== 'all') {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      publishedAt: new Date(doc.data().publishedAt)
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}