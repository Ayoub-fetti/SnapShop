import  {initializeApp} from 'firebase/app'
import  {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyBI7uxcpoNDpZIfPw7l_eeQlduBpVynWpE",
  authDomain: "snapshop-72316.firebaseapp.com",
  projectId: "snapshop-72316",
  storageBucket: "snapshop-72316.firebasestorage.app",
  messagingSenderId: "407737069683",
  appId: "1:407737069683:web:a6cca9a801c4052572ba06",
  measurementId: "G-GE94HDF4PB"
};


const app = initializeApp(firebaseConfig)
export const  auth = getAuth(app)
export  const db = getFirestore(app)