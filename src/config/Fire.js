import firebase from 'firebase';

const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyDaf09HPq3M-RZjegiT64Vd4mAKuhXWm_g",
    authDomain: "apsdevweb-b3b9b.firebaseapp.com",
    databaseURL: "https://apsdevweb-b3b9b.firebaseio.com",
    projectId: "apsdevweb-b3b9b",
    storageBucket: "apsdevweb-b3b9b.appspot.com",
    messagingSenderId: "405217595717",
    appId: "1:405217595717:web:0ea3602514f876166c6e2c",
    measurementId: "G-RGVGZGSCEW"
};
const fire = firebase.initializeApp(config);
export default fire;