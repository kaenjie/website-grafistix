import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Konfigurasi Firebase (ganti dengan detail proyek Firebase Anda)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Authentication
const auth = getAuth(app);

// Inisialisasi Google Provider
const googleProvider = new GoogleAuthProvider();

// Ekspor module yang akan digunakan
export { auth, googleProvider };
