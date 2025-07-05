// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBlrG-o8E9zDTSyLJa8ijCZW09aHkn0D0",
  authDomain: "expense-tracker-app-438ee.firebaseapp.com",
  projectId: "expense-tracker-app-438ee",
  storageBucket: "expense-tracker-app-438ee.firebasestorage.app",
  messagingSenderId: "150380364123",
  appId: "1:150380364123:web:83ca4926d926bd49ea9a7e",
  measurementId: "G-GNFZSH7MSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app,{
    persistence : getReactNativePersistence(AsyncStorage)
})

export const firestore = getFirestore(app)