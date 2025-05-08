// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyC030N8GYzZLtebzixbMXZOJzDtItaB0jI",
  authDomain: "expo-auth-2bad2.firebaseapp.com",
  projectId: "expo-auth-2bad2",
  storageBucket: "expo-auth-2bad2.firebasestorage.app",
  messagingSenderId: "326486980525",
  appId: "1:326486980525:web:e107cbf8f7fe6d422c5324",
  measurementId: "G-PP640HQ42W"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// const database = getDatabase(firebase);
export { firebase   };