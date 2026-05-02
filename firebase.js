import { initializeApp } from "https://gstatic.com";
import { getAuth, onAuthStateChanged, signOut } from "https://gstatic.com";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyDjzmo0A4KhOkrqFQdOyCEek6bsPF-UVPQ",
  authDomain: "://firebaseapp.com",
  projectId: "gds-departmental-exam-studyhub",
  storageBucket: "://appspot.com",
  messagingSenderId: "759916756080",
  appId: "1:759916756080:web:7f2c0e66458bd007e888b5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global Exports
window.auth = auth;
window.db = db;
window.doc = doc;
window.getDoc = getDoc;
window.collection = collection;
window.getDocs = getDocs;
window.signOut = signOut;

// Strict Payment Check
window.isPaidMember = false; 

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const docRef = doc(db, "candidates", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().status === "paid") {
        window.isPaidMember = true;
        console.log("Strict Access: GRANTED");
        // अगर pyq.html पर हैं, तो डेटा लोड करने का सिग्नल दें
        if (typeof window.triggerLoad === "function") window.triggerLoad();
      } else {
        window.isPaidMember = false;
        console.log("Strict Access: DENIED (Not Paid)");
      }
    } catch (e) { console.error("Auth Error", e); }
  } else {
    window.isPaidMember = false;
  }
});
