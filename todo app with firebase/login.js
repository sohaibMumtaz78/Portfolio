// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyB5MgeXkyIFL6ZSp1-3wCozYErN8m9iQN0",
    authDomain: "signup-login-todo-page.firebaseapp.com",
    projectId: "signup-login-todo-page",
    storageBucket: "signup-login-todo-page.firebasestorage.app",
    messagingSenderId: "740115613231",
    appId: "1:740115613231:web:8536d8c1f4171f8c6ca8da",
    measurementId: "G-TLTR57SDYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const signin_email = document.getElementById("signin_email")
const signin_password = document.getElementById("signin_password")
const login_btn = document.getElementById("login_btn")


login_btn.addEventListener('click', login);


onAuthStateChanged(auth, (user) => {
    if (user) {
        // console.log("user is login")
        const uid = user.uid;
        // ...
    } else {
        // console.log("user not is login")

    }
});


function login() {
    signInWithEmailAndPassword(auth, signin_email.value, signin_password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("user")
            alert(`Welcome ${signin_email.value}`);
             window.location.href = "todo.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

}
