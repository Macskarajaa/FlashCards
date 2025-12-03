import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

//saját Firebase App példány, ezzel érjük el az összes szolgáltatást
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)//Firestore adatbázis inicializálása