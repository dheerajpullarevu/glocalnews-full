import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBxyKnzYBjP4_-dBvv2bC31q8zzJ72Sx7o",
  authDomain: "glocal-news-app.firebaseapp.com",
  projectId: "glocal-news-app",
  storageBucket: "glocal-news-app.firebasestorage.app",
  messagingSenderId: "755975454555",
  appId: "1:755975454555:web:2d26dd9d53d0f749eda47e",
  measurementId: "G-MZCKEDZEDY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Firestore with offline persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  })
});

export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Enable Auth emulator in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export default app;