// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyARcwvD4T4b7SPd-2v5ufcB-udBa7vl9WM',
  authDomain: 'quickcrave-fdde8.firebaseapp.com',
  projectId: 'quickcrave-fdde8',
  storageBucket: 'quickcrave-fdde8.appspot.com',
  messagingSenderId: '331469920610',
  appId: '1:331469920610:web:52c50b9910e0cde6e1743b',
  measurementId: 'G-0J4NRE9W1X',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
