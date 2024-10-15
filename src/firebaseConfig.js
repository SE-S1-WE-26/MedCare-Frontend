// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqqBfWujGi5-DSmLYb4aoxA8eM8TQtq9g",
  authDomain: "medcare-storage.firebaseapp.com",
  projectId: "medcare-storage",
  storageBucket: "medcare-storage.appspot.com",
  messagingSenderId: "458749989081",
  appId: "1:458749989081:web:439ab09e81689be2e06ec8",
  measurementId: "G-236SQNDMTD"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
