import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-key",
    authDomain: "cox-academy-v2.firebaseapp.com",
    projectId: "cox-academy-v2",
    storageBucket: "cox-academy-v2.appspot.com",
};

// Initialize Firebase App
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to Local Emulators in Development Mode
if (process.env.NODE_ENV === 'development') {
    // Bypasses multiple connection errors on hot-reloading
    if (!global.EMULATORS_STARTED) {
        global.EMULATORS_STARTED = true;
        connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
        connectFirestoreEmulator(db, '127.0.0.1', 8080);
        connectStorageEmulator(storage, '127.0.0.1', 9199);
        console.log("Connected successfully to local Firebase Emulators!");
    }
}

export { app, auth, db, storage };
