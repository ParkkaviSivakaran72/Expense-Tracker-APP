import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBlrG-o8E9zDTSyLJa8ijCZW09aHkn0D0',
  authDomain: 'expense-tracker-app-438ee.firebaseapp.com',
  projectId: 'expense-tracker-app-438ee',
  storageBucket: 'expense-tracker-app-438ee.appspot.com', 
  messagingSenderId: '150380364123',
  appId: '1:150380364123:web:83ca4926d926bd49ea9a7e',
  measurementId: 'G-GNFZSH7MSX',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
