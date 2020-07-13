//The core Firebase JS SDK is always required and must be listed first
importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");

//TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries 

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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

