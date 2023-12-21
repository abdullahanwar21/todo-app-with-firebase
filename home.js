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

// let userUid;
onAuthStateChanged(auth, async (user) => {
  if (user) {
      const uid = user.uid;
      getDataOnRealTime(uid);
      
      // Add Data
      todoForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          document.querySelector(".titleError").innerHTML = ""
          if(description.value === "" || title.value === ""){
       
                document.querySelector(".titleError").innerHTML = "Empty Inputs";
                return
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
        //   todoForm.reset();
        console.log("Document written with ID: ", docRef.id);
        // location.reload(uid);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error adding document: ", error.message);
        alert(errorMessage)
      }
    });
  } else {
    // User is signed out
    window.location = "./login.html";
    // ...
  }
});

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
      data.push({ ...doc.data(), docId: doc.id });
    });

    tbody.innerHTML = "";
    data.map((item) => {
      tbody.innerHTML += `<tr>
        <th scope="row">${item.title}</th>
        <td>${item.description}</td>
        <td>${formatTimestamp(item.timestamp)}</td>        
        <td>
            <button class="btn btn-info text-light my-2" title="Edit" id="update" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger text-light" title="Delete" id="delete"><i class="bi bi-trash"></i></button>
            </td>
            </tr>`;

            function formatTimestamp(timestamp) {
                const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
                const options = { year: 'numeric', month: 'short', day: 'numeric', hour : 'numeric', minute : 'numeric'};
                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
                return formattedDate;
            }
    });

    // Deleting The Data
    const del = document.querySelectorAll("#delete");
    del.forEach((item, index) => {
      item.addEventListener("click", () => {
        if (confirm("Are You Sure To Delete it ?")) {
          // do stuff
          deleteDoc(doc(db, "todos", data[index].docId))
            .then(() => {
              data.splice(index, 1);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          return false;
        }
      });
    });

    //  Update Todo
    const upd = document.querySelectorAll("#update");
    upd.forEach((btn, index) => {
      btn.addEventListener("click",  async () => {
        // const modalTitle = document.querySelector(".modalTitle");
        // const submitBtn = document.querySelector(".submitBtn");
        // const modalDesc = document.querySelector(".modalDesc");

        
        
        // const todoRef = doc(db, "todos", data[index].docId);        
        // const dataToUpdate = {
        //         title : title.value,
        //         description : description.value
        //     };
        //         async function updateTodo() {
        //             await updateDoc(todoRef, dataToUpdate)
        //             getDataOnRealTime(uid)
        //             alert("data Update");
        //         }
        //         submitBtn.addEventListener("submit", (e) => {
            //             e.preventDefault()
            //             updateTodo();
            //         })
            
            
            
            //         modalTitle.value = data[index].title;
            //         modalDesc.value = data[index].description;
            
            // bad approach
            const title = prompt("Enter New Title", data[index].title)
            const description = prompt("ENter New Description", data[index].description)
            const todoRef = doc(db, "todos", data[index].docId);        
            const dataToUpdate = {
                title,
                description,
                timestamp : Timestamp.fromDate(new Date())
            };
            
            await updateDoc(todoRef, dataToUpdate)
            // console.log("data updated Successfully");
            getDataOnRealTime(uid);

      });
      
    });

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
