import firebase from 'firebase';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWiZi2QkXSZDKjcGfGxN_AWP3xYiYfEJ0",
    authDomain: "firstapi-23881.firebaseapp.com",
    databaseURL: "https://firstapi-23881.firebaseio.com",
    projectId: "firstapi-23881",
    storageBucket: "firstapi-23881.appspot.com",
    messagingSenderId: "119056946884",
    appId: "1:119056946884:web:f4ae8f5e27d3e0998bdb91",
    measurementId: "G-DKMFBKD975"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export {storage,firebase as defaut};