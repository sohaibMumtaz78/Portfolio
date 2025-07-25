import { doc, getAuth, getDoc, signOut, getDocs, db, deleteDoc, addDoc, collection, app } from "./firebase.js";

const fetchUserData = async () => {
    const userID = localStorage.getItem("user")
    const user = await getDoc(doc(db, "user", userID))
    console.log("user", user)
}

// const userID = localStorage.getItem("user")

readData()

const namazlist = document.getElementById("namazlist")
const logout_btn = document.getElementById("logout_btn")
logout_btn.addEventListener('click', logout)

const addData = async () => {
    try {
        const prayername = document.getElementById("prayername");
        const prayertime = document.getElementById("prayertime");

        if (!prayername.value || !prayertime.value) {
            alert("Missing Some field");
            return;
        }

        const userID = localStorage.getItem("user");
        const today = new Date().toLocaleDateString();

        const duplicate = (await getDocs(collection(db, "user", userID, "namaz"))).docs
            .some(doc => doc.data().date === today && doc.data().prayername.toLowerCase() === prayername.value.toLowerCase());

        if (duplicate) {
            alert(`Today "${prayername.value}" namaz is already added.`);
            return;
        }

        const userPrayer = {
            prayername: prayername.value,
            prayertime: prayertime.value,
            date: today,
            uid: userID
        }

        await addDoc(collection(doc(db, "user", userID), "namaz"), userPrayer)
        alert("Namaz Record Added!");
        prayername.value = ""
        prayertime.value = ""
        readData()
    } catch (error) {
        alert(error.message);
    }
}

async function readData() {
    try {
        const userID = localStorage.getItem("user");
        const querySnapshot = await getDocs(collection(db, "user", userID, "namaz"));
        namazlist.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const { prayername, prayertime, date } = doc.data();
            const ele = `
                <li id="${doc.id}">
                    ${prayername} - ${prayertime} - ${new Date(date).toLocaleDateString()}
                    <button onclick="dltenamazlist('${doc.id}')">Delete</button>
                </li>`;
            namazlist.innerHTML += ele;
        });

        fetchUserData();
    } catch (error) {
        alert(error.message);
    }
}

window.dltenamazlist = async function (namazid) {
    try {
        const userID = localStorage.getItem("user");
        const docRef = doc(db, "user", userID, "namaz", namazid);
        await deleteDoc(docRef);
        alert("Namaz record deleted");
        readData();
    } catch (error) {
        alert(error.message);
    }
}

function showHistory() {
    window.location.replace("./history.html")
}

function logout() {
    const auth = getAuth(app);
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "./index.html";
    }).catch((error) => {
        // An error happened.
        alert(error.message)
    });
}


// function logout() {
//     const auth = getAuth(app);
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         window.location.href = "./index.html";
//     }).catch((error) => {
//         // An error happened.
//         alert(error.message)
//     });
// }


window.fetchUserData = fetchUserData;
window.addData = addData;
window.showHistory = showHistory


