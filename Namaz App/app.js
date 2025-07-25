import { app, auth, signInWithEmailAndPassword } from "./firebase.js";

console.log("app", app)

const loginbtn = async () => {
    try {
        const login_email = document.querySelector("#login_email")
        const login_password = document.querySelector("#login_password")

        if (!login_email.value || !login_password.value) {
            alert("Email Required")
            return;
        }

        const response = await signInWithEmailAndPassword(auth, login_email.value, login_password.value)
        console.log("response", response.user.uid)
        localStorage.setItem("user", response.user.uid)
         window.location.replace("./dashboard.html")

        // console.log("login_email", login_email.value)
        // console.log("login_password", login_password.value)
    } catch (error) {
        alert(error.message)
    }
}

window.loginbtn = loginbtn