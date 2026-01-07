const ADMIN_PASSWORD = "admin123";
// Fresh data hamesha loadComplaints ke andar fetch karein taake update rahe
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", checkAdmin);

function checkAdmin() {
  let pass = document.getElementById("adminPassword").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadComplaints();
  } else {
    alert("Wrong Password");
  }
}

function loadComplaints() {
  let list = document.getElementById("adminComplaintList");
  list.innerHTML = "";

  // Re-fetch from localStorage to get latest updates
  complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  complaints.forEach((c, index) => {
    let li = document.createElement("li");
    
    li.style.borderBottom = "1px solid #ccc";
    // li.style.padding = "10px";

    li.innerHTML = `
    <div class="complaint-content">
        <p class="complaint-info"><strong>User:</strong> ${c.name} (${
      c.email
    })</p>
        <p class="complaint-info"><strong>Complaint:</strong> ${c.text}</p>
        <p class="complaint-info">
            <strong>Status:</strong> 
            <span class="${
              c.status === "Pending" ? "status-pending" : "status-resolved"
            }">
                ${c.status}
            </span>
        </p>
        <p class="complaint-info">
            <strong>Reply:</strong> ${c.reply || "No reply yet"}
        </p>
    </div>

    <div class="admin-actions">
        ${
          c.status === "Pending"
            ? `<button class="btn-resolve" onclick="resolve(${index})">Resolve</button>`
            : ""
        }
        <button class="btn-delete" onclick="deleteComplaint(${index})">Delete</button>
    </div>

    <div class="admin-reply-box">
        <input type="text" id="replyText${index}" placeholder="Type reply..." class="reply-input">
        <button class="btn-reply" onclick="sendReply(${index})">Send Reply</button>
    </div>
`;

    list.appendChild(li);
  });
}

// --- Status Resolve Function ---
function resolve(index) {
  complaints[index].status = "Resolved";
  saveAndRefresh();
}

// --- Delete Function ---
function deleteComplaint(index) {
  if (confirm("Are you sure you want to delete this?")) {
    complaints.splice(index, 1); // Array se item remove karna
    saveAndRefresh();
  }
}

function sendReply(index) {
  let replyInput = document.getElementById(`replyText${index}`);
  let replyText = replyInput.value.trim();

  if (replyText === "") {
    alert("Please enter a reply");
    return;
  }

  // 1. Fresh data uthao taake array index sahi ho
  let allComplaints = JSON.parse(localStorage.getItem("complaints")) || [];

  // 2. Reply set karo
  allComplaints[index].reply = replyText;

  // 3. Wapis LocalStorage mein save karo
  localStorage.setItem("complaints", JSON.stringify(allComplaints));

  // 4. Input clear karo
  replyInput.value = "";

  // 5. UI Refresh karo (taki admin ko foran nazar aaye)
  loadComplaints();
  alert("Reply Sent!");
}
// Helper function to save and update UI
function saveAndRefresh() {
  localStorage.setItem("complaints", JSON.stringify(complaints));
  loadComplaints();
}
