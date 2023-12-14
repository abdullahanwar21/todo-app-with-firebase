import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "./config.js";

const name = document.getElementById('name');
const form = document.getElementById('regForm');
const email = document.getElementById('email');
const password = document.getElementById('password');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(name.value);
    console.log(email.value);
    console.log(password.value);
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        addDoc(collection(db, "users"), {
            username: name.value,
            email: email.value,
            // uid: user.uid,
            // profileUrl: url
        }).then((res) => {
            console.log(res);
            window.location = 'index.html'
        }).catch((err) => {
            console.log(err);
        })
        // console.log(user);
        // window.location = 'login.html';
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});