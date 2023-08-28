import  { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyCNE6tyuUARSwJkw0W13w0Inx0eO2LPTLY",
  authDomain: "video-game-app-edb83.firebaseapp.com",
  projectId: "video-game-app-edb83",
  storageBucket: "video-game-app-edb83.appspot.com",
  messagingSenderId: "470435053596",
  appId: "1:470435053596:web:865eadb9132b2afe9b5fd9"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);