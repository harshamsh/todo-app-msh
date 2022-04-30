
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCos1f7dG3VxyfhOEDlOX9ZNsmlu2kIDmU",
    authDomain: "todo-devtask.firebaseapp.com",
    projectId: "todo-devtask",
    storageBucket: "todo-devtask.appspot.com",
    messagingSenderId: "143311569843",
    appId: "1:143311569843:web:0eef31211607bb195481c6",
    measurementId: "G-D2RGB80G88"
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  export {db};