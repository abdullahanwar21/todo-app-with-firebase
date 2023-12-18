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
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const logoutBtn = document.querySelector(".logoutBtn");
const todoForm = document.querySelector("#todoForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    getDataOnRealTime(uid);
    todoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (title.value === "") {
        document.querySelector(".titleError").innerHTML = "Empty Title Input";
        return;
      } else if (description.value === "") {
        document.querySelector(".descError").innerHTML =
          "Empty Description Input";
        return;
      }

      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: title.value,
          description: description.value,
          uid: user.auth.currentUser.uid,
          timestamp: Timestamp.fromDate(new Date()),
        });
        title.value = "";
        description.value = "";
        // console.log("Document written with ID: ", setAn);
        console.log("Document written with ID: ", docRef.id);
        // location.reload(uid);
      } catch (e) {
        console.error("Error adding document: ", e.message);
      }
    });
  } else {
    // User is signed out
    window.location = "./login.html";
    // ...
  }
});

const del = document.querySelectorAll("#delete");
const upd = document.querySelectorAll("#update");

//   get all the data from database

const getDataOnRealTime = (uid) => {
  const q = query(
    collection(db, "todos"),
    where("uid", "==", uid),
    orderBy("timestamp", "desc")
  );
  onSnapshot(q, (querySnapshot) => {
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    tbody.innerHTML = "";
    const newData = data.map((item) => {
      tbody.innerHTML += `<tr>
            <th scope="row">${item.title}</th>
            <td>${item.description}</td>
            <td>
            <button class="btn btn-info text-light my-2" title="Edit" id="update"  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger text-light" title="Delete" id="delete" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-trash"></i></button>
            </td>
            </tr>`;
    });
    return newData;
  });
};

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
