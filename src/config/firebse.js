import firebase from "firebase";
import {ENV} from "../ENV"

console.log(ENV.KEY.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: ENV.KEY.REACT_APP_FIREBASE_API_KEY,
    authDomain: ENV.KEY.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.KEY.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: ENV.KEY.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:ENV.KEY.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: ENV.KEY.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: ENV.KEY.REACT_APP_FIREBASE_APP_ID,
    measurementId:ENV.KEY.REACT_APP_FIREBASE_MEASUREMENT_ID
};
const  fire = firebase.initializeApp(firebaseConfig);


export default fire;