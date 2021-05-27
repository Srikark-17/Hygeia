import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdjJqqM9tUj9rkQfA0HSw4mv2He1iYFaI",
  authDomain: "hygeia-bea47.firebaseapp.com",
  projectId: "hygeia-bea47",
  storageBucket: "hygeia-bea47.appspot.com",
  messagingSenderId: "858652034639",
  appId: "1:858652034639:web:ed49fb897b86da11ee4c3a",
  measurementId: "G-RLEYF9VCMJ",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const auth = app.auth();
const db = app.firestore();

export { auth, db };
