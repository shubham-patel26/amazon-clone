import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCArL1rNX4zYx3ouSx5_SKiT_hu3iXn8tE",
    authDomain: "clone-5726e.firebaseapp.com",
    projectId: "clone-5726e",
    storageBucket: "clone-5726e.appspot.com",
    messagingSenderId: "491580177416",
    appId: "1:491580177416:web:3520823764c82fda24e5bd",
    measurementId: "G-DPF1LG29HG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth};