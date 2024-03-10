// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPo8nLeFsY2BXnkdC7Eejbjq5Pe8vPrbo",
  authDomain: "connect-ba68d.firebaseapp.com",
  projectId: "connect-ba68d",
  storageBucket: "connect-ba68d.appspot.com",
  messagingSenderId: "1090179911110",
  appId: "1:1090179911110:web:8a3a6c1e21e4b3d442b6c7",
  measurementId: "G-G0X1WLVXC0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
