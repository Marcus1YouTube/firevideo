import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuLNrl_nA1To4zgEFOoqs_bNBwGN5snKY",
  authDomain: "fir-video-site.firebaseapp.com",
  projectId: "fir-video-site",
  storageBucket: "fir-video-site.appspot.com",
  messagingSenderId: "446290093200",
  appId: "1:446290093200:web:90a8bbaed1fcfcff79e415",
  measurementId: "G-WG75PPV9ZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);
