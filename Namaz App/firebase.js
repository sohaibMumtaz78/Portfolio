// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyAPkDPgjfCqgXvbPP6rXjs-5E2bIEQ4mdI",
    authDomain: "namaz-app-6c918.firebaseapp.com",
    projectId: "namaz-app-6c918",
    storageBucket: "namaz-app-6c918.firebasestorage.app",
    messagingSenderId: "142326707347",
    appId: "1:142326707347:web:7b7ee6d757c21e2ebfc966",
    measurementId: "G-WHG6P3XB5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
// console.log("app", app)
// console.log("db", db)


const auth = getAuth();

// const login_btn = document.querySelector("#login_btn")
// login_btn.addEventListener("click", submit)

// async function submit() {

//     try {
//         const firstname = document.getElementById("firstname").value
//         const lastname = document.getElementById("lastname").value
//         const age = document.getElementById("age").value

//         const userObj = {
//             firstname,
//             lastname,
//             age,
//         }

//         const docRef = await addDoc(collection(db, "users"), userObj)
//         console.log("DocRef", docRef)

//     } catch (error) {
//         console.log(error.message)
//     }

// }



export { app,getAuth, db, auth, getDoc, signOut, getDocs, deleteDoc, addDoc, doc, collection, setDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword }

