import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBKzW6pL5RT8paOvHEmlleQR1JYHH_D-64",
  authDomain: "loginauth-e894f.firebaseapp.com",  
  databaseURL: "https://loginauth-e894f-default-rtdb.firebaseio.com",
  projectId: "loginauth-e894f",
  storageBucket: "loginauth-e894f.appspot.com",
  messagingSenderId: "234061101909",
  appId: "1:234061101909:web:8f539d0ff4bfeb9d9e4ddc",
  measurementId: "G-B94Q8NQWFG"
};


// Initialize Firebase
firebase.initializeApp(config);


export default firebase;