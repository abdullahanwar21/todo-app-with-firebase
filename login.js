import { signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth } from './config.js';

const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const logError = document.querySelector('.error');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      window.location = './home.html'
      
      // ...
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        logError.innerHTML = errorCode;
    })
  })

