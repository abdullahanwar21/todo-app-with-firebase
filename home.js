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
const customErr = document.querySelector(".error");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    todoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
    //   if(title.value === "" || description.value === "" ){
    //     document.querySelector(".titleError").innerHTML = "Empty Title Input"
    //     document.querySelector(".descError").innerHTML = "Empty Description Input"
    // } 

      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: title.value,
          description: description.value,
        });
        title.value = ''
        description.value = ''
        console.log("Document written with ID: ", docRef.id);
        location.reload();
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
const tbody = document.getElementById("tbody");
console.log(tbody);
const getData = async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "todos"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
        // let tr = document.createElement("tr");
        // tr +=  `<tr>
        // <td>1</td>
        // <th scope="row">${doc.data().title}</th>
        // <td>${doc.data().description}</td>
        // <td>
        // <button class="btn btn-info text-light my-2" title="Edit"><i class="bi bi-pencil-square"></i></button>
        // <button class="btn btn-danger text-light" title="Delete"><i class="bi bi-trash"></i></button>
        // </td>
        // </tr>`;
        // tbody.append(tr)
        

        // let newArr = Object.entries(doc.data());
        // newArr.flatMap((item) => {
        //     // console.log(item);
        //     for (let i = 0; i < item.length; i++) {
        //         const element = item[i];
        //         console.log(element);                
        //     }
        // });
});
// console.log(arr);
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    console.log(element.title);
    // let tr = document.createElement('tr');
    tbody.innerHTML += `<tr>
    <td>1</td>
    <th scope="row">${element.title}</th>
    <td>${element.description}</td>
    <td>
    <button class="btn btn-info text-light my-2" title="Edit"><i class="bi bi-pencil-square"></i></button>
    <button class="btn btn-danger text-light" title="Delete"><i class="bi bi-trash"></i></button>
    </td>
    </tr>`;
    // tbody.appendChild(tr)
}

}
getData();

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
