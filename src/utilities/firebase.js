import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCgM9z3llnOgso9SatbtTbyzwUGpUoDvqE",
    authDomain: "your-app-11e6f.firebaseapp.com",
    databaseURL: "https://your-app-11e6f-default-rtdb.firebaseio.com",
    projectId: "your-app-11e6f",
    storageBucket: "your-app-11e6f.appspot.com",
    messagingSenderId: "980169676428",
    appId: "1:980169676428:web:7173b87e9159bc1bdfcda9",
    measurementId: "G-2LEG0VY1GP"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase); // Get the auth instance

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);

    useEffect(() => (
        onValue(ref(database, path), (snapshot) => {
            setData(snapshot.val());
        }, (error) => {
            setError(error);
        })
    ), [path]);

    return [data, error];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
        console.log('Updating path:', path);
        console.log('Value before update:', value);

        if (!value || typeof value !== 'object') {
            console.error("Invalid value passed to updateData:", value);
            return;
        }

        const dbRef = ref(database, path);
        update(dbRef, value)
            .then(() => setResult(makeResult()))
            .catch((error) => {
                console.error("Error during Firebase update:", error);
                setResult(makeResult(error));
            });
    }, [path]);

    return [updateData, result];
};

export { firebase, database, auth };

export const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
};

export const signOut = () => firebaseSignOut(auth);

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(auth, setUser)
    ), []);

    return [user];
};
