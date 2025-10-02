import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyBNn9y7o6-xWBkOkMsIh2tk25FOe0EAddw",
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "snapshop-f7a08.firebaseapp.com",
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || "snapshop-f7a08",
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "snapshop-f7a08.appspot.com",
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "223195241117",
    appId: process.env.VITE_FIREBASE_APP_ID || "1:223195241117:web:f0431d1f33fa3571319274",
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || "G-R55Q0M1FVG"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)