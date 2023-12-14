
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";





  const firebaseConfig = {
    apiKey: "AIzaSyADyDkVOYZ9kT5OXn46-Nhz5qkt17T3unQ",
    authDomain: "todo-app-961d8.firebaseapp.com",
    projectId: "todo-app-961d8",
    storageBucket: "todo-app-961d8.appspot.com",
    messagingSenderId: "163379914297",
    appId: "1:163379914297:web:01ee6f2fd9c45e77010fe8",
    measurementId: "G-C55DBC3PPM"
  };


  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);

//   console.log(app);