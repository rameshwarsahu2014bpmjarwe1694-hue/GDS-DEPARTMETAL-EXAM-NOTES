// Wait until page loads
window.onload = function () {
  console.log("script.js loaded");
};

/* ADMIN LOGIN */
window.adminLogin = function () {
const email = document.getElementById("adminEmail")?.value.trim();
const password = document.getElementById("adminPassword")?.value;

if (!email || !password) {
alert("Enter email and password");
return;
}

signInWithEmailAndPassword(auth, email, password)
.then(() => {
alert("Admin Login Successful");
window.location.href = "admin-panel.html";
})
.catch((error) => {
alert(error.message);
});
};

/* CANDIDATE REGISTER */
window.register = function () {
const email = document.getElementById("email")?.value.trim();
const password = document.getElementById("password")?.value;

if (!email || !password) {
alert("Enter email and password");
return;
}

createUserWithEmailAndPassword(auth, email, password)
.then(() => {
alert("Registration Successful");
window.location.href = "candidate-login.html";
})
.catch((error) => {
alert(error.message);
});
};

/* CANDIDATE LOGIN */
window.candidateLogin = function () {
const email = document.getElementById("loginEmail")?.value.trim();
const password = document.getElementById("loginPassword")?.value;

if (!email || !password) {
alert("Enter email and password");
return;
}

signInWithEmailAndPassword(auth, email, password)
.then(() => {
alert("Login Successful");
window.location.href = "dashboard.html";
})
.catch((error) => {
alert(error.message);
});
};

/* LOGOUT */
window.logout = function () {
signOut(auth)
.then(() => {
alert("Logged Out");
window.location.href = "index.html";
})
.catch((error) => {
alert(error.message);
});
};
