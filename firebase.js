
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCcylXqf3lxPZZgHBm8YLUQupW2kxd3fQM",
  authDomain: "fir-authentication-2c216.firebaseapp.com",
  projectId: "fir-authentication-2c216",
  storageBucket: "fir-authentication-2c216.appspot.com",
  messagingSenderId: "845457656807",
  appId: "1:845457656807:web:6c4df7deb6e3bb43e84b42",
  measurementId: "G-39KN685809"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
 
export {auth, app};
