import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxKymBAeboDW74nW2lxDlZ9eZJ8A1LBBI",
  authDomain: "chronologue-c1217.firebaseapp.com",
  projectId: "chronologue-c1217",
  storageBucket: "chronologue-c1217.appspot.com",
  messagingSenderId: "806536083160",
  appId: "1:806536083160:web:55b5ee0ea1efb4184d49ad",
  measurementId: "G-S45467VMKL" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
