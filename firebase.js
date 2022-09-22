import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDaLFOi9J7obebZTQKbjGPtuBIZffu3zzI",
  authDomain: "chainvoterauthentication.firebaseapp.com",
  projectId: "chainvoterauthentication",
  storageBucket: "chainvoterauthentication.appspot.com",
  messagingSenderId: "185045258806",
  appId: "1:185045258806:web:124b7e1cd542117ef5fe97",
  measurementId: "G-4ZKWP9MPHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;