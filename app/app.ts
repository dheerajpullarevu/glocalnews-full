import { Application } from '@nativescript/core';
import { initializeFirebase } from './services/firebase';

// Initialize Firebase before app starts
initializeFirebase();

Application.run({ moduleName: 'app-root' });