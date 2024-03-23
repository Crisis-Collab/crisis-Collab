import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCaMrCeN6SemVZB3h_3vw1bbbQWHmP_f2M",
  authDomain: "crisis-collab.firebaseapp.com",
  projectId: "crisis-collab",
  storageBucket: "crisis-collab.appspot.com",
  messagingSenderId: "589777411156",
  appId: "1:589777411156:web:2b76f4c0d6fb36101421c1"
};
  const app = initializeApp(firebaseConfig);
 export const db= getFirestore(app)
 export const auth = getAuth(app);
  export default app;
