import { firebase } from '@nativescript/firebase-core';
import { Platform } from '@nativescript/core';

export function initializeFirebase() {
  const firebaseConfig = Platform.isIOS ? {
    projectId: 'glocal-news-app',
    storageBucket: 'glocal-news-app.firebasestorage.app',
    apiKey: 'AIzaSyAP8VZVr2ncl0iq4eZnlywD4DbatH6cm2k',
    iosClientId: '1:755975454555:ios:47fb78873687ccdbeda47e',
    bundleId: 'com.example.glocalNews'
  } : {
    projectId: 'glocal-news-app',
    storageBucket: 'glocal-news-app.firebasestorage.app',
    apiKey: 'AIzaSyAY3sgX1s3sLbmeyyjljNlD11BHfndj5Tg',
    androidClientId: '1:755975454555:android:4a24f649ad95926feda47e'
  };

  firebase.initializeApp(firebaseConfig).then(() => {
    console.log('Firebase initialized successfully');
  }).catch(error => {
    console.error('Error initializing Firebase:', error);
  });
}