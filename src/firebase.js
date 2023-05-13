
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


// const firebaseConfig = {
//     apiKey: "AIzaSyD7Gg9SEvfMrCMaAgxtAHeHWp6QZj3VK9Q",
//     authDomain: "mev-bot-42230.firebaseapp.com",
//     projectId: "mev-bot-42230",
//     storageBucket: "mev-bot-42230.appspot.com",
//     messagingSenderId: "455140240585",
//     appId: "1:455140240585:web:aeaa08a90dd44bd2177118",
//     measurementId: "G-3624CK8B02"
//   };

const firebaseConfig = {
    apiKey: "AIzaSyD7Gg9SEvfMrCMaAgxtAHeHWp6QZj3VK9Q",
    authDomain: "mev-bot-42230.firebaseapp.com",
    projectId: "mev-bot-42230",
    storageBucket: "mev-bot-42230.appspot.com",
    messagingSenderId: "455140240585",
    appId: "1:455140240585:web:a400171325bdfd02177118",
    measurementId: "G-071WZ327R6"
  };

  const app = initializeApp(firebaseConfig);


export const auth =getAuth(app)
export const db=getFirestore(app)

export const signUp=(email,password)=>{
  return createUserWithEmailAndPassword(auth,email,password)
}
export const logIn=(email,password)=>{
  return signInWithEmailAndPassword(auth,email,password)
}
