import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'tehsil-mekani.firebaseapp.com',
  projectId: 'tehsil-mekani',
  storageBucket: 'tehsil-mekani.appspot.com',
  messagingSenderId: '72930630126',
  appId: '1:72930630126:web:9dcd065c5920f9c53356ff',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);
export { db, auth };
