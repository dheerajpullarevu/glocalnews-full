import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export interface FactCheck {
  articleId: string;
  status: 'verified' | 'false' | 'misleading' | 'unverified';
  verifiedBy: string;
  verificationDate: string;
  sources: string[];
  explanation: string;
  originalClaim: string;
  category: 'politics' | 'health' | 'science' | 'social' | 'other';
  severity: 'high' | 'medium' | 'low';
}

export async function submitFactCheck(factCheck: Omit<FactCheck, 'verificationDate'>) {
  try {
    const doc = await addDoc(collection(db, 'factChecks'), {
      ...factCheck,
      verificationDate: new Date().toISOString()
    });
    return doc.id;
  } catch (error) {
    console.error('Error submitting fact check:', error);
    throw error;
  }
}

export async function getFactCheck(articleId: string): Promise<FactCheck | null> {
  try {
    const q = query(collection(db, 'factChecks'), where('articleId', '==', articleId));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const data = snapshot.docs[0].data();
    return {
      id: snapshot.docs[0].id,
      articleId: data.articleId,
      status: data.status,
      verifiedBy: data.verifiedBy,
      verificationDate: data.verificationDate,
      sources: data.sources,
      explanation: data.explanation,
      originalClaim: data.originalClaim,
      category: data.category,
      severity: data.severity
    } as FactCheck;
  } catch (error) {
    console.error('Error getting fact check:', error);
    throw error;
  }
}