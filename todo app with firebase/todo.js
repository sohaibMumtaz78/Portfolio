// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);
let todosColection = collection(db, "todos")

const todo_input = document.getElementById("todo_input")
const todo_btn = document.getElementById("todo_btn")
const todo_list = document.getElementById("todo_list")
const logout_btn = document.getElementById("logout_btn")

logout_btn.addEventListener('click', logout)

getTodoFromDb();
// deleteTodo()
todo_btn.addEventListener("click", addTodoDB)

async function addTodoDB() {
    try {
        const obj = {
            todo: todo_input.value,
            createDate: new Date().toISOString(),
        };
        const docRef = await addDoc(todosColection, obj)
        console.log(docRef)
        // getTodoFromDb()
        todo_input.value = "";

        const ele = `<li id="${docRef.id}">${obj.todo} <button onclick="deleteTodo('${docRef.id}')">Delete</button></li>`;
        todo_list.innerHTML += ele;


        //  await getTodoFromDb();
    }
    catch (e) {
        console.log(e)
    }
}

async function getTodoFromDb() {
    try {
        const querySnapshot = await getDocs(todosColection);
        querySnapshot.forEach((doc) => {
            console.log("Doc=>", doc.id);
            // console.log("Doc=>", doc.data());   
            // const {todo ,createDate} = doc.data();
            // // console.log(todo ,createDate)
            // const ele = `<li id = "${doc.id}">${todo} - ${new Date(createDate).toLocaleDateString()} </li>`
            // todo_list.innerHTML += ele

            const { todo } = doc.data();
            const ele = `<li id = "${doc.id}">${todo} <button onclick="deleteTodo('${doc.id}')">Delete</button></li>`;
            todo_list.innerHTML += ele
            // const btn = `<button id = "${doc.id}"> Delete</button>`
            // todo_list.innerHTML += btn



        });
    }
    catch (e) {
        console.log(e)
    }
}


window.deleteTodo = async function (id) {
    // console.log("Delte Todo", id)
    try {
        // 🔧 Correct usage
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef);

        // ✅ Remove li from DOM
        const li = document.getElementById(id);
        if (li) li.remove();
        console.log("Deleted doc:", id);
    }
    catch (e) {
        // alert(e)
        console.log(e)
    }
}

function logout() {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "login.html";
    }).catch((error) => {
        // An error happened.
    });
}

// // console.log("app=>", app)


// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
// import {
//     getFirestore,
//     collection,
//     addDoc,
//     getDocs,
//     doc,
//     deleteDoc,
// } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
// import {
//     getAuth,
//     signOut,
// } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyB5MgeXkyIFL6ZSp1-3wCozYErN8m9iQN0",
//     authDomain: "signup-login-todo-page.firebaseapp.com",
//     projectId: "signup-login-todo-page",
//     storageBucket: "signup-login-todo-page.firebasestorage.app",
//     messagingSenderId: "740115613231",
//     appId: "1:740115613231:web:8536d8c1f4171f8c6ca8da",
//     measurementId: "G-TLTR57SDYD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

// // Get DOM elements
// const todo_input = document.getElementById("todo_input");
// const todo_btn = document.getElementById("todo_btn");
// const todo_list = document.getElementById("todo_list");
// const logout_btn = document.getElementById("logout_btn");

// let todosColection = collection(db, "todos");

// // Load existing todos
// getTodoFromDb();

// // Add todo
// todo_btn.addEventListener("click", addTodoDB);

// // Logout
// logout_btn.addEventListener("click", logout);

// // Add Todo Function
// async function addTodoDB() {
//     try {
//         const obj = {
//             todo: todo_input.value,
//             createDate: new Date().toISOString(),
//         };
//         const docRef = await addDoc(todosColection, obj);
//         todo_input.value = "";

//         const ele = `<li id="${docRef.id}">
//                         ${obj.todo}
//                         <button onclick="deleteTodo('${docRef.id}')">Delete</button>
//                     </li>`;
//         todo_list.innerHTML += ele;
//     } catch (e) {
//         console.log(e);
//     }
// }

// // Get Todos from Firestore
// async function getTodoFromDb() {
//     try {
//         const querySnapshot = await getDocs(todosColection);
//         todo_list.innerHTML = "";
//         querySnapshot.forEach((docItem) => {
//             const { todo } = docItem.data();
//             const ele = `<li id="${docItem.id}">
//                             ${todo}
//                             <button onclick="deleteTodo('${docItem.id}')">Delete</button>
//                         </li>`;
//             todo_list.innerHTML += ele;
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }

// // Delete Todo (attach to window for HTML inline usage)
// window.deleteTodo = async function (id) {
//     try {
//         const docRef = doc(db, "todos", id);
//         await deleteDoc(docRef);
//         const li = document.getElementById(id);
//         if (li) li.remove();
//         console.log("Deleted doc:", id);
//     } catch (e) {
//         console.log(e);
//     }
// };

// // Logout function
// function logout() {
//     const auth = getAuth(app);
//     signOut(auth).then(() => {
//         window.location.href = "login.html";
//     }).catch((error) => {
//         console.error("Logout error:", error);
//     });
// }
