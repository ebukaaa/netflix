// import "firebase/auth";
// import "firebase/firestore";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ProjectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_StorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MessagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_AppId,
};

let firebaseApp;

if (firebase.apps.length === 0) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}

export const db = firebaseApp.firestore();
export const { auth } = firebase;
// export const {
//   FieldValue: { serverTimestamp },
// } = firestore;
export const defaultAvatar =
  "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png";
