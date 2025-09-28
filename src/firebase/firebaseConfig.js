import  {initializeApp} from 'firebase/app'
import  {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBNn9y7o6-xWBkOkMsIh2tk25FOe0EAddw",
    authDomain: "snapshop-f7a08.firebaseapp.com",
    projectId: "snapshop-f7a08",
    storageBucket: "snapshop-f7a08.firebasestorage.app",
    messagingSenderId: "223195241117",
    appId: "1:223195241117:web:f0431d1f33fa3571319274",
    measurementId: "G-R55Q0M1FVG"
};
const app = initializeApp(firebaseConfig)
export const  auth = getAuth(app)
export  const db = getFirestore(app)
export const storage = getStorage(app)