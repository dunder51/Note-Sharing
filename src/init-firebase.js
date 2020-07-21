import firebase from 'firebase'

// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAZKo6gXSgRap0IO4U3pW-GdrcrCbHXCCo",
    authDomain: "note-sharing-a4a97.firebaseapp.com",
    databaseURL: "https://note-sharing-a4a97.firebaseio.com",
    projectId: "note-sharing-a4a97",
    storageBucket: "note-sharing-a4a97.appspot.com",
    messagingSenderId: "239984955457",
    appId: "1:239984955457:web:20d1a1e747270f26bcb6c0"
  };

// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);

const db = defaultProject.firestore();

export {db};