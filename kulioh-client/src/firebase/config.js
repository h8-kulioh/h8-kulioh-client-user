import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4vcW_yikifxUWato47GcdM9ek3i8YfUY",
  authDomain: "vinter-e1ede.firebaseapp.com",
  projectId: "vinter-e1ede",
  storageBucket: "vinter-e1ede.appspot.com",
  messagingSenderId: "982400207811",
  appId: "1:982400207811:web:229b76372677771e014b76",
  measurementId: "G-7K1GEL98G4",
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
