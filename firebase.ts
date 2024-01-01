import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcsLySnNYRi8eqAGl2M8Wx1ZFx4uXBFlk",
  authDomain: "datavault-971a2.firebaseapp.com",
  projectId: "datavault-971a2",
  storageBucket: "datavault-971a2.appspot.com",
  messagingSenderId: "409122612913",
  appId: "1:409122612913:web:55a7f12efa190ac1e76490",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
