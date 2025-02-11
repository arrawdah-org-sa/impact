import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWVwu96ZkZh4BY8deWk7J_aJrBgADPK4w",
  authDomain: "project-873168052185828374.firebaseapp.com",
  projectId: "project-873168052185828374",
  storageBucket: "project-873168052185828374.appspot.com",
  messagingSenderId: "788815030410",
  appId: "1:788815030410:web:b5d50ddc22da20b5bfa573"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

// Initialize Firestore
const db = getFirestore(app);

// Enable phone auth
const isDevelopment = import.meta.env.MODE === 'development';
if (isDevelopment && auth.settings) {
  auth.settings.appVerificationDisabledForTesting = true;
}

// Add reCAPTCHA verifier to window
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export { app, auth, db };