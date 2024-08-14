import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3KS4Szl6FdSAbdAkdYJfda5Bhald1NWg",
    authDomain: "sierra-fbeaa.firebaseapp.com",
    projectId: "sierra-fbeaa",
    storageBucket: "sierra-fbeaa.appspot.com",
    messagingSenderId: "49847943002",
    appId: "1:49847943002:web:9a46ef85ac37a4f4debd63",
    measurementId: "G-P92BWJS8XL"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


