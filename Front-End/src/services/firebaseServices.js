import { initializeApp } from 'firebase/app';
import { getDatabase ,ref,update} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2WfaQRGgvE_lGRAvG5iCrAI7s1FAKA34",
  authDomain: "cseproject-27665.firebaseapp.com",
  databaseURL: "https://cseproject-27665-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cseproject-27665",
  storageBucket: "cseproject-27665.appspot.com",
  messagingSenderId: "531803307680",
  appId: "1:531803307680:web:7a677f17bf173d15d113c5"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const updateFirebase = (updates) => update(ref(db), updates)

export {db , updateFirebase }