import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, increment, update } from "firebase/database";

// REPLACE THIS WITH YOUR FIREBASE CONFIG FROM THE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyB60oVT9PauMuMEBgEVa787zAucM9T3XKo",
  authDomain: "financial-literacy-e26e7.firebaseapp.com",
  databaseURL: "https://financial-literacy-e26e7-default-rtdb.firebaseio.com",
  projectId: "financial-literacy-e26e7",
  storageBucket: "financial-literacy-e26e7.firebasestorage.app",
  messagingSenderId: "670711696500",
  appId: "1:670711696500:web:fb25c7014f5dfd0d131521",
  measurementId: "G-NV82FW5LDF"
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
  } catch { return null; }
};

const safeOnValue = (reference, callback, options) => {
  if (!reference) return () => {};
  try {
    return onValue(reference, callback, options);
  } catch { return () => {}; }
};

const safeSet = (reference, value) => {
  if (!reference) return Promise.resolve();
  try {
    return set(reference, value);
  } catch { return Promise.resolve(); }
};

export { db, safeRef as ref, safeOnValue as onValue, safeSet as set, increment, update };
