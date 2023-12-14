import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const logoutBtn = document.querySelector(".logoutBtn");
const todoForm = document.querySelector("#todoForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    todoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: title.value,
          description: description.value,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

  } else {
    // User is signed out
    window.location = "./login.html";
    // ...
  }
});
//   get all the data from database

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("logout successfully");
      window.location = "./login.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
