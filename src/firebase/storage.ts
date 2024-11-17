import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export async function uploadMedia(file: File, path: string) {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function uploadArticleImage(file: File, articleId: string) {
  return uploadMedia(file, `articles/${articleId}/images/${file.name}`);
}

export async function uploadProfileImage(file: File, userId: string) {
  return uploadMedia(file, `users/${userId}/profile/${file.name}`);
}