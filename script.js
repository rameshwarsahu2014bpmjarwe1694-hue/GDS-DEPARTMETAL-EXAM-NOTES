// Page loaded
window.onload = function () {
console.log("script.js loaded");
};

/* =========================
ADMIN LOGIN
========================= */
window.adminLogin = function () {

const email = document.getElementById("adminEmail").value.trim();
const password = document.getElementById("adminPassword").value;

if (!email || !password) {
alert("Enter email and password");
return;
}

window.signInWithEmailAndPassword(window.auth, email, password)
.then(function () {
alert("Admin Login Successful");
window.location.href = "admin-panel.html";
})
.catch(function (error) {
alert(error.message);
});

};

/* =========================
CANDIDATE LOGIN
========================= */
window.candidateLogin = function () {

const email = document.getElementById("loginEmail").value.trim();
const password = document.getElementById("loginPassword").value;

if (!email || !password) {
alert("Enter email and password");
return;
}

window.signInWithEmailAndPassword(window.auth, email, password)
.then(function () {
alert("Login Successful");
window.location.href = "dashboard.html";
})
.catch(function (error) {
alert(error.message);
});

};

/* =========================
REGISTER
========================= */
window.register = async function () {

const name = document.getElementById("name").value.trim();
const mobile = document.getElementById("mobile").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

if (!name || !mobile || !email || !password) {
alert("Fill all fields");
return;
}

try {

const userCredential =
await window.createUserWithEmailAndPassword(window.auth, email, password);

const uid = userCredential.user.uid;

const { doc, setDoc } = await import(
"https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js"
);

await setDoc(doc(window.db, "candidates", uid), {
name: name,
mobile: mobile,
email: email,
uid: uid,
createdAt: new Date().toISOString()
});

alert("Registration Successful");
window.location.href = "login.html";

} catch(error) {
alert(error.message);
}

};

/* =========================
LOGOUT
========================= */
window.logout = function () {

window.signOut(window.auth)
.then(function () {
alert("Logged Out");
window.location.href = "index.html";
})
.catch(function (error) {
alert(error.message);
});

};
