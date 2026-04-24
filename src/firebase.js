import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// REPLACE THIS WITH YOUR FIREBASE CONFIG FROM THE CONSOLE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

let app;
let db;

try {
  // Only initialize if the placeholder hasn't been replaced yet
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  } else {
    console.warn("Firebase: Using placeholder keys. Live sync will be disabled.");
    // Mock db object to prevent crashes
    db = {}; 
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
  db = {};
}

const safeRef = (db, path) => {
  try {
    return db && db.app ? ref(db, path) : null;
  } catch (e) { return null; }
};

const safeOnValue = (reference, callback, options) => {
  if (!reference) return () => {};
  try {
    return onValue(reference, callback, options);
  } catch (e) { return () => {}; }
};

const safeSet = (reference, value) => {
  if (!reference) return Promise.resolve();
  try {
    return set(reference, value);
  } catch (e) { return Promise.resolve(); }
};

export { db, safeRef as ref, safeOnValue as onValue, safeSet as set };
