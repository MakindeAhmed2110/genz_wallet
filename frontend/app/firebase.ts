import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_Szgk94MddbIuZGxAp2i3lPOK7Uh2JWw",
  authDomain: "genz-wallet-ff649.firebaseapp.com",
  projectId: "genz-wallet-ff649",
  storageBucket: "genz-wallet-ff649.firebasestorage.app",
  messagingSenderId: "86564029473",
  appId: "1:86564029473:web:7fa86a78e1b2df63220f60"
};

// Initialize Firebase only if no apps exist
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
