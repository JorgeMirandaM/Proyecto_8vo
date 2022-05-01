//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

/*
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
*/
const firebaseConfig = {
  apiKey: "AIzaSyA6R6Ht2LLvOhCEntDikxQ7Zej7FqmjBJg",
  authDomain: "baby-band-project-cd90f.firebaseapp.com",
  databaseURL: "https://baby-band-project-cd90f-default-rtdb.firebaseio.com",
  projectId: "baby-band-project-cd90f",
  storageBucket: "baby-band-project-cd90f.appspot.com",
  messagingSenderId: "14443485276",
  appId: "1:14443485276:web:4e16ba7dc82e25365bee99",
  measurementId: "G-7CNTNLD7J2"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

