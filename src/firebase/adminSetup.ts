import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';

export async function setupAdminAccount(email: string, password: string) {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create admin user document
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      role: 'admin',
      displayName: 'Admin',
      createdAt: new Date().toISOString(),
      status: 'active',
      permissions: ['all']
    });

    return userCredential.user;
  } catch (error) {
    console.error('Error setting up admin account:', error);
    throw error;
  }
}