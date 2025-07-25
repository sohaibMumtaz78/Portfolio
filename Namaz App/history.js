import { db, collection, getDocs, doc } from "./firebase.js";
// import {  } from "";


const loadHistory = async () => {
    try {
        const userID = localStorage.getItem("user");
        if (!userID) {
            alert("User not logged in");
            window.location.href = "index.html";
            return;
        }

        const namazRef = collection(doc(db, "user", userID), "namaz");
        const querySnapshot = await getDocs(namazRef);

        const list = document.getElementById("historyList");
        list.innerHTML = "";

        if (querySnapshot.empty) {
            alert("No Namaz history found.");
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${data.prayername}</strong> 
                ${data.prayertime} <br> 
                <small>${data.date}</small>
            `;
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading history:", error);
        alert("Error loading history: " + error.message);
    }
};

document.addEventListener("DOMContentLoaded", loadHistory);

function goBack() {
    window.location.replace("./dashboard.html")
}

window.goBack = goBack
window.loadHistory = loadHistory