import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAV6Xy51EOlOpEaVAfbSYrThF06jUFfaf0",
  authDomain: "react-madrasa-project.firebaseapp.com",
  databaseURL: "https://react-madrasa-project.firebaseio.com",
  projectId: "react-madrasa-project",
  storageBucket: "react-madrasa-project.appspot.com",
  messagingSenderId: "542008615939",
  appId: "1:542008615939:web:9509ed3e5debb61b721a36",
  measurementId: "G-BM5YLM12ZS",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export default firebase;
