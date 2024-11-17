import { 
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { User } from '../types/user';

export async function signInWithPhone(verificationId: string, code: string) {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    
    // Check if user exists in our database
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document
      await createUserProfile(userCredential.user);
    }
    
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with phone:', error);
    throw error;
  }
}

async function createUserProfile(firebaseUser: FirebaseUser) {
  const user: User = {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    phoneNumber: firebaseUser.phoneNumber || '',
    displayName: firebaseUser.displayName || `User${Math.random().toString(36).slice(2, 7)}`,
    role: 'user',
    languages: ['en'],
    regions: [],
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    status: 'active'
  };

  await setDoc(doc(db, 'users', user.id), user);
  return user;
}