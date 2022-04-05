import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDSBk7_m9aIuJpP8JBCUF6Xptj_WFmpN-c",
    authDomain: "thedojosite-61b81.firebaseapp.com",
    projectId: "thedojosite-61b81",
    storageBucket: "thedojosite-61b81.appspot.com",
    messagingSenderId: "225398952925",
    appId: "1:225398952925:web:e1c7d9822591f9ebc79c34"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }