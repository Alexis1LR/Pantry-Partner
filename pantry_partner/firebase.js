// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsz7gzD3a1uoJJw216ZDqBLR6C97jCevU",
  authDomain: "pantry-partner-efb8a.firebaseapp.com",
  projectId: "pantry-partner-efb8a",
  storageBucket: "pantry-partner-efb8a.appspot.com",
  messagingSenderId: "624900076230",
  appId: "1:624900076230:web:ed4d221cb0443bb5bc9dc7",
  measurementId: "G-P1626C00HF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
export  {firestore}