import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";




const firebaseConfig = {
  apiKey: "AIzaSyCRmsEDhhja6vIls3iUvqf3MEgneCJua80",
  authDomain: "baby-band-innovatec.firebaseapp.com",
  databaseURL: "https://baby-band-innovatec-default-rtdb.firebaseio.com",
  projectId: "baby-band-innovatec",
  storageBucket: "baby-band-innovatec.appspot.com",
  messagingSenderId: "538055189356",
  appId: "1:538055189356:web:d4ac7300da51be2e720949",
  measurementId: "G-2EL0302EBE"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

