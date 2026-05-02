import { initializeApp } from "https://gstatic.com";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged // <-- नया इम्पोर्ट
} from "https://gstatic.com";

import {
  getFirestore,
  doc,    // <-- नया इम्पोर्ट
  getDoc  // <-- नया इम्पोर्ट
} from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyDjzmo0A4KhOkrqFQdOyCEek6bsPF-UVPQ",
  authDomain: "://firebaseapp.com",
  projectId: "gds-departmental-exam-studyhub",
  storageBucket: "gds-departmental-exam-studyhub.firebasestorage.app",
  messagingSenderId: "759916756080",
  appId: "1:759916756080:web:7f2c0e66458bd007e888b5"
};

// INIT
const app = initializeApp(firebaseConfig);

// SERVICES
const auth = getAuth(app);
const db = getFirestore(app);

// GLOBAL EXPORTS (Window object for HTML access)
window.app = app;
window.auth = auth;
window.db = db;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;

// --- PAID STATUS CHECK LOGIC ---

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User Logged In:", user.uid);
    
    try {
      // candidates कलेक्शन में यूजर का स्टेटस चेक करना
      const docRef = doc(db, "candidates", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        
        // अगर यूजर 'paid' है
        if (userData.status === "paid") {
          console.log("Access Granted: Paid User");
          // यहाँ हम एक ग्लोबल वेरिएबल सेट कर रहे हैं जिसे pyq.html पहचान लेगा
          window.isPaidMember = true; 
          
          // अगर pyq.html में डेटा लोड करने का कोई फंक्शन है, तो उसे यहाँ कॉल करें
          if (typeof loadPYQData === "function") {
             loadPYQData();
          }
        } else {
          console.log("Access Denied: Not a Paid User");
          window.isPaidMember = false;
          // अगर आप चाहें तो यहाँ अलर्ट दिखा सकते हैं
        }
      }
    } catch (error) {
      console.error("Error checking paid status:", error);
    }
  } else {
    console.log("User Not Logged In");
    window.isPaidMember = false;
  }
});
