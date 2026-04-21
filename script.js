/* =========================
CANDIDATE LOGIN
========================= */
window.candidateLogin = async function () {

const email = document.getElementById("loginEmail").value.trim();
const password = document.getElementById("loginPassword").value;

if (!email || !password) {
alert("Enter email and password");
return;
}

try {

const userCredential =
await window.signInWithEmailAndPassword(window.auth, email, password);

const user = userCredential.user;

const { doc, getDoc, setDoc } = await import(
"https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js"
);

const ref = doc(window.db, "candidates", user.uid);
const snap = await getDoc(ref);

/* Old users auto add */
if (!snap.exists()) {
await setDoc(ref, {
uid: user.uid,
email: user.email,
name: "",
mobile: "",
createdAt: new Date().toISOString()
});
}

alert("Login Successful");
window.location.href = "dashboard.html";

} catch (error) {
alert(error.message);
}

};
