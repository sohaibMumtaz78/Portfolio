// Top-level security check: Redirect if not logged in
if (!localStorage.getItem("currentUserEmail")) {
    window.location.replace("login.html"); // .replace use karne se back button kaam nahi karega
}

// Get complaints from LocalStorage or empty array
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

// Get current logged-in user's email
let currentEmail = localStorage.getItem("currentUserEmail");
let currentName = localStorage.getItem("currentUserName");

window.onload = function () {
  const currentEmail = localStorage.getItem("currentUserEmail");
  const currentName = localStorage.getItem("currentUserName");

  if (!currentEmail) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeUser").innerText = `Welcome, ${currentName}`;

  // Display existing complaints (even if first complaint)
  displayComplaints();
};

function addComplaint() {
  const currentEmail = localStorage.getItem("currentUserEmail");
  const currentName = localStorage.getItem("currentUserName");
  const text = document.getElementById("complaint").value.trim();

  if (!text) {
    alert("Please enter your complaint");
    return;
  }

  // Fetch fresh complaints from LocalStorage
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  // Add new complaint with email
  complaints.push({
    name: currentName,
    email: currentEmail,
    text: text,
    status: "Pending",
  });

  // Save back to LocalStorage
  localStorage.setItem("complaints", JSON.stringify(complaints));

  // Update list immediately
  displayComplaints();

  document.getElementById("complaint").value = "";
}

function displayComplaints() {
  const currentEmail = localStorage.getItem("currentUserEmail");
  const list = document.getElementById("complaintList");
  list.innerHTML = "";

  // Fresh data fetch karna zaroori hai
  const allComplaints = JSON.parse(localStorage.getItem("complaints")) || [];

  // Filter sirf logged-in user ke liye
  const userComplaints = allComplaints.filter((c) => c.email === currentEmail);

  userComplaints.forEach((c) => {
    const li = document.createElement("li");
    li.className = "complaint-card";

    li.innerHTML = `
            <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                <p><strong>Complaint:</strong> ${c.text}</p>
                <p><strong>Status:</strong> <b style="color:${
                  c.status === "Pending" ? "orange" : "green"
                }">${c.status}</b></p>
                
                <div style="background: #f9f9f9; padding: 8px; border-left: 4px solid #007bff; margin-top: 5px;">
                    <strong>Admin Reply:</strong> 
                    <span style="color: #333;">${
                      c.reply ? c.reply : "<i>Pending...</i>"
                    }</span>
                </div>
            </div>
        `;
    list.appendChild(li);
  });
}

// Logout function
function logout() {
  localStorage.removeItem("currentUserEmail");
  localStorage.removeItem("currentUserName");
  window.location.href = "login.html";
}


