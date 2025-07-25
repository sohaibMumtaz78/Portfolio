import { addDoc, auth, collection, db, doc, setDoc, createUserWithEmailAndPassword, } from "./firebase.js"

console.log(auth)
const signupbtn = async () => {
    try {
        console.log("signupbtn")

        const firstname = document.querySelector("#firstname")
        const lastname = document.querySelector("#lastname")
        const email = document.querySelector("#email")
        const password = document.querySelector("#password")

        console.log("firstname", firstname.value)
        console.log("lastname", lastname.value)
        console.log("email", email.value)
        console.log("password", password.value)

        const response = await createUserWithEmailAndPassword(auth, email.value, password.value)
        console.log("User", response)
        const userUID = response.user.uid;

        const userData = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            uid: response.user.uid
        }

        // const userRes = await addDoc(collection(db, "user"), userData)
        const userRes = await setDoc(doc(db, "user", userUID), userData)
        console.log("userRes", userRes)

        alert("User Successfully SignIn")

        window.location.replace("./index.html")



    } catch (error) {
        console.log(error.message)
    }
}


window.signupbtn = signupbtn