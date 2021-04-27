import firebase from 'firebase';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWEG-3j1cxuDbxEcY8-XFC-BnEeWniDH0",
    authDomain: "fir-react-upload-8a645.firebaseapp.com",
    projectId: "fir-react-upload-8a645",
    storageBucket: "fir-react-upload-8a645.appspot.com",
    messagingSenderId: "80943843234",
    appId: "1:80943843234:web:cb914d0e6a3d521551d4fb",
    measurementId: "G-7K63BS7Z55"
  }; 

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export {storage,firebase as defaut};