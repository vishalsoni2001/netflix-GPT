// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZRnWsR4vWieAHsEd-k7sm3Z07RjOF2yk",
  authDomain: "netflixgpt-d342a.firebaseapp.com",
  projectId: "netflixgpt-d342a",
  storageBucket: "netflixgpt-d342a.appspot.com",
  messagingSenderId: "1025162007363",
  appId: "1:1025162007363:web:9985385a0e996b30cc55f6",
  measurementId: "G-QTJH97CN0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); 