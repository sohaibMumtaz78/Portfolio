function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!name || !email || !password) return alert("Please fill all fields");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((u) => u.email === email)) {
    return alert("Email already registered");
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful. Login now.");
  window.location.href = "login.html";
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUserEmail", email);
    localStorage.setItem("currentUserName", user.name);
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password");
  }
}

function goToAdmin() {
  window.location.href = "admin.html";
}
