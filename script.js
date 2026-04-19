// Wait until page loads
window.onload = function () {
  console.log("script.js loaded");
};

/* =========================
   ADMIN LOGIN
========================= */
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

/* =========================
   CANDIDATE REGISTER
========================= */
window.register = async function () {

const name = document.getElementById("name")?.value.trim();
const mobile = document.getElementById("mobile")?.value.trim();
const email = document.getElementById("email")?.value.trim();
const password = document.getElementById("password")?.value;

if (!name || !mobile || !email || !password) {
alert("Fill all fields");
return;
}

if (mobile.length < 10) {
alert("Enter valid mobile number");
return;
}

try {

const userCredential =
await createUserWithEmailAndPassword(auth, email, password);

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
window.location.href = "candidate-login.html";

} catch(error) {
alert(error.message);
}

};

/* =========================
   CANDIDATE LOGIN
========================= */
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

/* =========================
   LOGOUT
========================= */
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
