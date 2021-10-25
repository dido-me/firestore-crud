import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC_YUj8voQ7RScEGcZyUB5P8-8j6dhvF88",
  authDomain: "crud-firebase-peti.firebaseapp.com",
  projectId: "crud-firebase-peti",
  storageBucket: "crud-firebase-peti.appspot.com",
  messagingSenderId: "806835162115",
  appId: "1:806835162115:web:8fbe2c59f5dcb9dc611236",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
