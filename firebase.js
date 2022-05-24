
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyA6R6Ht2LLvOhCEntDikxQ7Zej7FqmjBJg",
//   authDomain: "baby-band-project-cd90f.firebaseapp.com",
//   databaseURL: "https://baby-band-project-cd90f-default-rtdb.firebaseio.com",
//   projectId: "baby-band-project-cd90f",
//   storageBucket: "baby-band-project-cd90f.appspot.com",
//   messagingSenderId: "14443485276",
//   appId: "1:14443485276:web:4e16ba7dc82e25365bee99",
//   measurementId: "G-7CNTNLD7J2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCv8E-fc01BZPNKnTDsS9RwFPYD6GKYLTE",
  authDomain: "baby-band-project-2.firebaseapp.com",
  databaseURL: "https://baby-band-project2-default-rtdb.firebaseio.com",
  projectId: "baby-band-project-2",
  storageBucket: "baby-band-project-2.appspot.com",
  messagingSenderId: "166912194570",
  appId: "1:166912194570:web:1c487bf3acd1d4d99307f3"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

